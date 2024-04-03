# Aeron Cookbook



### **Aeron Cookbook architecture**

​		<u>CLIENT APPLICATION</u>			     <u>MEDIA</u>

Publication		-> 	Sender		<-> Media

​	|					    |

Client conductor    ------   Driver conductor

​	|					    |

Subscription	<-		Receiver	    <-> Media

   <u>Client</u>				<u>Media Driver</u>



Media = the medium which messages are transported.

- Sender/Receiver to media via IPC/UDP  (IPC = "inter-process communication")
- Sender/Receiver to driver conductor via volatile fields & queues
- Client conductor to driver conductor via IPC ring / broadcast buffers
- Publication->sender and receiver->subscription via IPC log buffer (aka. shared memory)

Media driver = flexible, can be configured for low latency applications or otherwise



Driver conductor: accepts commands from clients and orchestrates actions with the media driver

Receiver: receive messages from connected media. Send NAK and Status messages as required

Sender: sends messages to connected media.

Client conductor: communicating with driver conductor



Media driver threading mode:

- `ThreadingMode.DEDICATED`: 3 threads for sender, receiver, and driver conductor
- `ThreadingMode.SHARED_NETWORK`: 2 threads for sender/receiver, and driver conductor
- `ThreadingMode.SHARED`: 1 thread for entire media driver





### **Basic sample**

```java
public static void main(String[] args)
{
    final String channel = "aeron:ipc"; // channel config, https://github.com/real-logic/aeron/wiki/Channel-Configuration
    final String message = "my message"; // message to send
    final IdleStrategy idle = new SleepingIdleStrategy(); // parks thread for 1 micro
    final UnsafeBuffer unsafeBuffer = new UnsafeBuffer(ByteBuffer.allocate(256)); // buffer to hold the message to be sent
    try (MediaDriver driver = MediaDriver.launch()) // creates media driver
        Aeron aeron = Aeron.connect(); // aeron object, primary API used in application
        Subscription sub = aeron.addSubscription(channel, 10); // polled to receive message
        Publication pub = aeron.addPublication(channel, 10)); // messages to be sent to
    {
        while (!pub.isConnected()) // wait for connected state reached
        {
            idle.idle();
        }
        unsafeBuffer.putStringAscii(0, message); // message written to unsafe buffer
        System.out.println("sending:" + message);
        while (pub.offer(unsafeBuffer) < 0) // buffered offered to publication
        {
            idle.idle();
        }
        FragmentHandler handler = (buffer, offset, length, header) ->
            System.out.println("received:" + buffer.getStringAscii(offset));
        while (sub.poll(handler, 1) <= 0) // subscription polled until message received
        {
            idle.idle();
        }
    }
}
```

output

```
sending:my message
received:my message
```





### Publications and Subscriptions

Subscription subscribes to (Channel, Stream ID) pair.

Publication sending to the same (Channel, Stream ID) pair will have distinct `header.sessionId()`

Aeron guarantees ordering at (Channel, Stream ID, Session ID) level.



Note, the (Channel, Stream ID) is that of the target subscription when defining the publication. So think of publication *pushing* to subscription, not pulling.



When a publication send data via `offer` and `tryClaim`, these methods are non-blocking. The messages are added to the Log Buffer. The Media Driver takes messages from the log buffer and sends them across the medium asynchronously. Throughput depends on the quality of the network.



Types of publications

- `ConcurrentPublication`: Work with multiple senders, are thread safe.
- `ExclusivePublication`: Not thread safe, but can give higher throughput.



`.offer(msg)`

Copies message to log buffer.

There are five response codes possible when calling `offer` on a publication:

- a value greater than zero provides the new stream position, and indicates that the log buffer now contains the data in the supplied byte buffer. The data may or may not have been fragmented during the write to the term.
- a value of `-1` indicates that there is no subscription connected. Subscriptions can come and go naturally, so this does not indicate an error.
- a value of `-2` indicates that the offer was back pressured. See [below](https://aeroncookbook.com/aeron/publications-subscriptions/#back-pressure)
- a value of `-3` indicates that an admin action was underway as the log buffer terms were being rotated at that moment. The application should attempt the `offer` again. See [Log Buffers](https://aeroncookbook.com/aeron/log-buffers-images)
- a value of `-4` indicates that the publication is now closed and is unable to accept data.
- a value of `-5` indicates that offer failed due to the log buffer reaching the maximum position of the stream given term buffer length multiplied by three. When this happens, it is suggested the term buffer size be increased and/or the message size decreased.



`.tryClaim(msg)`

For even better performance, publication can claim a segment of the log buffer, and write directly into it. It then calls `.commit` when writing is done.

There are five response codes possible when using `tryClaim` to get a `BufferClaim`:

- a value greater than zero provides the new position in the stream. No data has been written yet, but the returned `BufferClaim.buffer()` can be used for the write.
- a value of `-1` indicates that there is no subscription connected.
- a value of `-2` indicates that the offer was back pressured. See [below](https://aeroncookbook.com/aeron/publications-subscriptions/#back-pressure)
- a value of `-3` indicates that an admin action was underway as the log buffer terms were being rotated at that moment. The application should attempt the `tryClaim` again. See [Log Buffers](https://aeroncookbook.com/aeron/log-buffers-images/)
- a value of `-4` indicates that the publication is now closed and is unable to accept data.
- a value of `-5` indicates that offer failed due to the log buffer reaching the maximum position of the stream given term buffer length multiplied by three. When this happens, it is suggested the term buffer size be increased and/or the message size decreased.



Back pressuring means the receiver end is not able to handle the producer throughput, and Log Buffer is filled.





### Log buffers and images

A log buffer is split into 4 sections: 3 equally sized sections (each a Term with unique Term ID), and a metadata section.

Each term in one of 3 logical states:

- `clean` terms have yet to have data written to them,
- an `active` term is where data is being written to,
- and `dirty` terms hold data that is no longer active, but is temporarily available for retransmission.

The terms follows the state cycle: `clean` -> `active` -> `dirty` -> `clean` ...

When you `offer` a message to the Log Buffer, you may get `admin action` response, which means the Term is getting rotated.

​	This way, when the dirty term is getting flushed, the clean term is getting written, and the active term holds the new dirty data in case of retransmission.



Each message going into the Log Buffer is given a header that contains order information. When the message is received on the other end, the header order information is used.



Buffer positions

In a happy path scenario, the positions are moved as follows:

- As the Publisher Application writes to the Publication, the publisher position is increased. The data is appended to the term buffer, which updates the committed data position (i.e. the `pub-pos`)
- The Publisher Application Media Driver Sender checks for any new data appended in the term buffer. If it finds data to send, the data is sent and `snd-pos` is updated.
- The Subscriber Application Media Driver Receiver receives data from the network buffer. It updates the `rcv-hwm` and `rcv-pos` after appending the data to the local term buffer.
- The Subscriber polls the term buffer, and once it has consumed the message, the `sub-pos` is increased.

`rcv-hwm` is the high water mark position of the receiver.

Positions of buffers can be viewed at runtime using Aeron Tooling.











### Two Agent Example

```java
public static void main(String[] args)
{
	final String channel = "aeron:ipc";
    final int stream = 10;	// arbitrary stream number
    final int sendCount = 1_000_000;
    final IdleStrategy idleStrategySend = new BusySpinIdleStrategy();
    final IdleStrategy idleStrategyReceive = new BusySpinIdleStrategy();
	final ShutdownSignalBarrier barrier = new ShutdownSignalBarrier();
    
    // construct Media Driver, cleaning up media driver folder on start/stop
    final MediaDriver.Context mediaDriverCtx = new MediaDriver.Context()
        	.dirDeleteOnStart(true)
        	.threadingMode(ThreadingMode.SHARED)
        	.sharedIdleStrategy(new BusySpinIdleStrategy())
        	.dirDeleteOnShutdown(true);
    final MediaDriver mediaDriver = MediaDriver.launchEmbedded(mediaDriverCtx);
    
    // construct Aeron, pointing at the media driver's folder
    final Aeron.Context aeronCtx = new Aeron.Context()
        	.aeronDirectoryName(mediaDriver.aeronDirectoryName());
    final Aeron aeron = Aeron.connect(aeronCtx);
    
    // construct the subs and pubs
	final Subscription subscription = aeron.addSubscription(channel, stream);
    final Publication publication = aeron.addPublication(channel, stream);
    
    // construct the agents
    final SendAgent sendAgent = new SendAgent(publication, sendCount);
    final ReceiveAgent receiveAgent = new ReceiveAgent(subscription, barrier, sendCount);
    
    // construct agent runners
    final AgentRunner sendAgentRunner = new AgentRunner(idleStrategySend, Throwable : printStackTrace, null, sendAgent);
    final AgentRunner receiveAgentRunner = new AgentRunner(idleStrategyReceive, Throwable : printStackTrace, null, receiveAgent);
    
    LOGGER.info("starting");
    
    // start the runners
    AgentRunner.startOnThread(sendAgentRunner);
    AgentRunner.startOnThread(receiveAgentRunner);

    // wait for the final item to be received before closing
    barrier.wait();
    
    // close the resources
    receiveAgentRunner.close();
    sendAgentRunner.close();
    aeron.close();
    mediaDriver.close();  
}
```















