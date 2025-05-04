# Systems Performance

## Introduction

**What is systems performance?**

Systems performance studies the performance of an entire computer system, including all major software and hardware components. Anything in the data path, from storage devices to application software, is included, because it can affect performance.

Typical motivations: 1) improve end-user experience by reducing latency, 2) save cost

*full stack* performance is different from *full stack* in the traditional sense. Traditional *full stack* usually only considers the application layer. Full stack in performance also consider the underlying system all the way to bare metal.

($$ image page 41)


**Roles**

Generally as part of a different role (e.g., Network engineers focus on network performance, HFT quant devs focus on performance in the trading hot path). Performance engineers work in big firms that solely focus on performance work (e.g., helping teams speed up stuff, build performance tools etc.)

**Activities**

1. Setting performance objectives and performance modelling for a future product
2. Performance characterization of prototype software and hardware.
3. Performance analysis of in-development products in a test environment.
4. Non-regression testing for new product versions.
5. Benchmarking product releases.
6. Proof-of-concept testing in the target production environment.
7. Performance tuning in production.
8. Monitoring of running production software.
9. Performance analysis of production issues.
10. Incident reviews for production issues.
11. Performance tool development to enhance production analysis.

These days with canary releases (small traffic to prod machine) and blue-green deployment (slowly shift traffic from backup to new machine) mean teams don't always follow all the performance steps. You'll likely do some of these steps in your work.


**Perspectives**

Workload perspective => app developers

Resource perspective => sys admins


**Why performance is challenging**

Subjectivity: "The average disk I/O response time is 1 ms" is good or bad depends on who is asking

Complexity: 
- Systems are complex and it's not obvious where to look first => form hypothesis then check and see
- Performance issues may come from interactions between subsystems that performance well in isolation => cascading failure, 1 failed component causes performance issues in others
- Bottlenecks can also be complex and related in unexpected ways; fixing one may simply move the bottleneck elsewhere in the system 

Multiple performance issues: there can be a lot, so another task is figuring out which is worth solving


**Latency**

Latency is a measure of time spent waiting. Used broadly, it can mean the time for any operation to complete, such as an application request, a database query, a file system operation, and so forth.

As a metric, latency can allow maximum speedup to be estimated -> query time from 100ms to 20ms is 5x speed up


**Observability**

Observability refers to understanding a system through observation, and classifies the tools that accomplish this.

*Counters, Statistics and Metrics*

Applications and the kernel typically provide data on their state and activity: operation counts, byte counts, latency measurements, resource utilization, and error rates. They are typically implemented as integer variables called counters that are hard-coded in the software, some of which are cumulative and always increment. These cumulative counters can be read at different times by performance tools for calculating statistics: the rate of change over time, the average, percentiles, etc.

```
$ vmstat 1 5
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r b swpd free buff cache si so bi bo in cs us sy id wa st
19 0 0 6531592 42656 1672040 0 0 1 7 21 33 51 4 46 0 0
26 0 0 6533412 42656 1672064 0 0 0 0 81262 188942 54 4 43 0 0
62 0 0 6533856 42656 1672088 0 0 0 8 80865 180514 53 4 43 0 0
34 0 0 6532972 42656 1672088 0 0 0 0 81250 180651 53 4 43 0 0
31 0 0 6534876 42656 1672088 0 0 0 0 74389 168210 46 3 51 0 0
```

Metric: a statistic that has been selected to evaluate or monitor a target.

Alerts: used when metrics go over some limit. 

| Level                                 | Example         |
|---------------------------------------|-----------------|
| Alerts - Event Processing             | Prometheus      |
| Metrics - Performance Monitoring UIs  | Grafana         |
| Statistics - Performance Tools/Agents | vmstat          |
| Counters - Applications/Kernel        | /proc           |


*Profiling*

In systems performance, the term profiling usually refers to the use of tools that perform sampling: taking a subset (a sample) of measurements to paint a coarse picture of the target.

An effective visualization of CPU profiles is flame graphs.

We can check other issues by focusing flamegraph on specific paths: CPU time in spin paths => lock contention, CPU time in memory allocation functions (e.g. malloc) => memory issues



*Tracing*

Tracing is event-based recording, where event data is captured and saved for later analysis or consumed on-the-fly for custom summaries and other actions.

Example trace tools: `strace` for Linux sys calls, `tcpdump` for Linux network packets, `Ftrace`, `BCC`, `bpftrace` etc. more general purpose

Static instrumentation: hard-coded software instrumentation points added to the source code. Linux has many (use `tracepoints`)

Dynamic instrumentation: allow tracing for an already running program. Works similar to debugger, modifies in-memory instructions to insert instrumentation routines (except unlike debugger the program continues running and doesn't trigger a trap to handover control to interactive debugger)

Dynamic instrumentation is amazing because it's hard to know where to look before running the program. Dynamic insturmentation allow engineers to locate the performance problem faster, without needing to keep restarting the program


**Experimentation**

Most experimentation tools are benchmarking tools

Macro-benchmark: simulate higher level real-world workload (racecar lap time), can be done simulating client workload eg via trace replaying

Micro-benchmark: test specific component (racecar 0-60mph time)

Micro-benchmarks tend to be faster to run, iteratre, debug, and is more stable

Sometimes experimentation can expose problems faster than observability



**Methodologies**

Methodologies are a way to document the recommended steps for performing various tasks in systems performance. Without a methodology, a performance investigation can turn into a fishing expedition: trying random things in the hope of catching a win.

E.g. A simple 60-second debug checklist

| #  | Tool              | Check                                                                                 | Section |
|----|-------------------|---------------------------------------------------------------------------------------|---------|
| 1  | `uptime`          | Load averages to identify if load is increasing or decreasing (compare 1-, 5-, and 15-minute averages). | 6.6.1   |
| 2  | `dmesg -T \| tail` | Kernel errors including OOM events.                                                   | 7.5.11  |
| 3  | `vmstat -SM 1`    | System-wide statistics: run queue length, swapping, overall CPU usage.                | 7.5.1   |
| 4  | `mpstat -P ALL 1` | Per-CPU balance: a single busy CPU can indicate poor thread scaling.                  | 6.6.3   |
| 5  | `pidstat 1`       | Per-process CPU usage: identify unexpected CPU consumers, and user/system CPU time for each process. | 6.6.7   |
| 6  | `iostat -sxz 1`   | Disk I/O statistics: IOPS and throughput, average wait time, percent busy.            | 9.6.1   |
| 7  | `free -m`         | Memory usage including the file system cache.                                         | 8.6.2   |
| 8  | `sar -n DEV 1`    | Network device I/O: packets and throughput.                                           | 10.6.6  |
| 9  | `sar -n TCP,ETCP 1` | TCP statistics: connection rates, retransmits.                                      | 10.6.6  |
| 10 | `top`             | Check overview.                                                                       | 6.6.6   |




## Methodologies

From Brandon on why learning man-pages of tools isn't enough

> I noticed that, whenever there was a performance issue, the senior system administrators had
their own mental procedures for moving quickly through tools and metrics to find the root
cause. They understood which metrics were important and when they pointed to an issue, and
how to use them to narrow down an investigation. It was this know-how that was missing from
the man pages—it was typically learned by watching over the shoulder of a senior admin or
engineer.

Another interesting observation

> Of all the chapters in this book, this one has changed the least since the first edition. Software,
hardware, performance tools, and performance tunables have all changed over the course of
my career. What have remained the same are the theory and methodologies: the durable skills
covered in this chapter.



### Terminologies & Concepts

- IOPS: I/O operations per second => rate of data transfer (e.g., Disk I/O)
- Throughput: The rate of work performed. 
- Response time: The time for an operation to complete. This includes any time spent waiting
- Latency: A measure of time an operation spends waiting to be serviced. If entire operation, equal to response time
  - Eg., network service request ---> connection establishment ---> data transfer ---> completion
    Here the operation is to transfer data (e.g., via HTTP GET request)
    The latency is the connection establishment portion, as it's the wait time before the data transfer can take place
    The response time is the entire duration (connection establishment + data transfer)
  - Latency is time-based so performance can be easy to quantify which bottleneck is bigger + an estimate for speed up

- Utilisation: For resources that service requests, how busy the resource is  => % during time interval doing work
  - Time-based: U=B/T, utilisation = busy time / observed time. When system approach 100% utilisation we tend to see performance degrade
  - Capacity-based: Think of 100% capacity as system cannot do more work. Proportion of work done over theoretical maximum amount of work done

- Saturation: Degree a resource has queued work it cannot service
- Bottleneck: The resource that limits performance of overall system
- Workload: The input to system or load applied
- Time scales

$$ page 65 table

- Trade offs: good/fast/cheap pick 2
  - CPU vs memory: caches speed up compute; while compute can help with compression
  - File system record size: small record size uses file system cache efficiently, large record sizes improve streaming performance
  - Network buffer size: small buffer scales better, large buffer have higher throughput

- Tuning efforts: Performance tuning is most effective when done closest to where the work is performed. This is usually at application level. This is because it's easier to tune a specialised system (application) than a general one (DBMS)
- Level of appropriateness: how deep to go and how much to spend on performance engineering depends on business => big tech firms can spend more as cost saving is huge, HFT spend more as profitability enhancement is huge, startups may spend more to improve end user experience 
- When to stop analysis: generally 1) when you've explained bulk of performance problem, 2) when potential ROI is less than cost of analysis, 3) when there are bigger ROIs elsewhere
- Scalability: The performance of the system under increasing load
  - Throughput vs. Load: may observe linear increase in throughput with load until after some point start dropping off
  - Response time vs load: may observe constant response time with more load until after some point response time slowly or quickly increases with more load
- Study the resources (IOPS, Throughput, Utilisation, Saturation) vs the workloads (Throughput, Latency)





### Methodology

$$ Fill in rest of methodology as I learn, and understand different analysis patterns (observational, experimental ...)



**Streetlight anti-method**

User tries to debug a performance problem using a set of tools not because they're appropriate, but because those are the ones the user is familiar with.

> One night a police officer sees a drunk searching the ground beneath a streetlight and asks what he is looking for. The drunk says he has lost his keys. The police officer can’t find them either and asks: “Are you sure you lost them here, under the streetlight?” The drunk replies: “No, but this is where the light is best.”  



**Random Change Anti-method**

User propose a random guess on what the problem might be, tries to make the change, and observe some metrics if they improve or not.

This can eventually lead to the solution, but is very time consuming



**Blame someone else anti method**

This wastes other people's resources and eventually drags the problem on.

> “Maybe it’s the network. Can you check with the network team if they’ve had dropped packets or something?”  

To counter someone like this, ask them for a screenshot of evidence on why our team is responsible



**Ad hoc checklist method**

Useful for support professionals looking at a particular system, developing checklist based on recent experience for that product

> Example: Run iostat –x 1 and check the r_await column. If this is consistently over 10 (ms) during load, then either disk reads are slow or the disk is overloaded.  



**Problem statement method**

A checklist of questions support staff can ask customers, sometimes can resolve issue straight away using these questions without needing to run a single line of codee

1. What makes you think there is a performance problem?

2. Has this system ever performed well?

3. What changed recently? Software? Hardware? Load?

4. Can the problem be expressed in terms of latency or runtime?

5. Does the problem affect other people or applications (or is it just you)?

6. What is the environment? What software and hardware are used? Versions? Configuration?



**Scientific method**

1. Question: the performance problem statement
2. Hypothesis: what you think cause of poor performance is
3. Test: run observational or experimental test
4. Analysis: analyze result

Example: 

Observational

1. What is causing slow database queries?

2. Hypothesis: Noisy neighbors (other cloud computing tenants) are performing disk I/O, contending with database disk I/O (via the file system).

3. Prediction: If file system I/O latency is measured during a query, it will show that the file system is responsible for the slow queries.

4. Test: Tracing of database file system latency as a ratio of query latency shows that less than 5% of the time is spent waiting for the file system.

5. Analysis: The file system and disks are not responsible for slow queries.



Experimental

1. Why do HTTP requests take longer from host A to host C than from host B to host C?
2. Hypothesis: Host A and host B are in different data centers.

3. Prediction: Moving host A to the same data center as host B will fix the problem.

4. Test: Move host A and measure performance.

5. Analysis: Performance has been fixed—consistent with the hypothesis



You can also do a negative test => deliberately trying to hurt performance 





**Diagnosis cycle method**

Hypothesis -> instrumentation -> data -> hypothesis

Like doctors making a series of small examinations

You want to move from hypothesis to data as quickly as possible so bad hypothesis can be eliminated quickly





**Tools method**

1. List available performance tools (optionally, install or purchase more).

2. For each tool, list useful metrics it provides.

3. For each metric, list possible ways to interpret it

Though it again is limited to what tools the user knows. Sometimes this list can get long





**The USE method**

For every resource, check utilization, saturation, and errors.  



Resources: All physical server functional components (CPUs, buses, . . .). Some software  resources can also be examined, provided that the metrics make sense.

Utilization: For a set time interval, the percentage of time that the resource was busy servicing work. While busy, the resource may still be able to accept more work; the degree to which it cannot do so is identified by saturation.

Saturation: The degree to which the resource has extra work that it can’t service, often waiting on a queue. Another term for this is pressure

Errors: The count of error events.



The USE method metrics are usually expressed as follows:

Utilization : As a percent over a time interval (e.g., “One CPU is running at 90% utilization”)

Saturation: As a wait-queue length (e.g., “The CPUs have an average run-queue length of four”)

Errors: Number of errors reported (e.g., “This disk drive has had 50 errors”)



Like Tools method but iterate over resources.

Even when some resources can't be checked right now, performance engineers can add it to the list of "known unknowns"



Hardware components

$$ page 89 -> metrics

Measure as averages per interval or counts. Measure combination of metrics to these, save commands to execute fast.

Some metrics are hard to measure or impossible, save them to known unknowns.

Luckily most problems can be solved using simple metrics.

$$ Appendix A => USE method checklist for Linux systems



Software components

Mutex locks: Utilisation = time the lock is held, saturation = threads queued waiting on the lock

Thread pools: Utilisation = time threads busy processing work, saturation = # of requests waiting to be serviced by the thread pool

Process/thread capacity: Utilisation = usage of limited # of processes or threads, saturation = waiting on allocation, errors = when allocation failed (e.g., "cannot fork")

File descriptor capacity: similar to process/thread capacity, but for file descriptors



Suggested interpretations:

Utilisation: Utilisation at 100% is usually a sign of bottleneck (check saturation and its effect to confirm). Some resources can't be easily interrupted (e.g., hard disks) so queueing delays become more frequent as utilisation increases

Saturation: Any degree of saturation (non-zero) can be a problem. It may be measured as the length of a wait queue, or as time spent waiting on the queue

Errors: Non-zero error counters are worth investigating, especially if they are increasing while performance is poor



$$ USE method on Microservices





**The RED method $$**





**Workload characterisation method**

Focus on input to the system

Answer following questions:

- Who is causing the load? Process ID, user ID, remote IP address?
- Why is the load being called? Code path, stack trace?
- What are the load characteristics? IOPS, throughput, direction (read/write), type? Include
  variance (standard deviation) where appropriate.
- How is the load changing over time? Is there a daily pattern?





**Drill-down analysis method**

Drill-down analysis starts with examining an issue at a high level, then narrowing the focusbased on the previous findings, discarding areas that seem uninteresting, and digging deeperinto the interesting ones. 

This can be deeper level of software or hardware stack

3 stage drill-down analysis:

1. Monitoring: This is used for continually recording high-level statistics over time, and
   identifying or alerting if a problem may be present.

2. Identification: Given a suspected problem, this narrows the investigation to particular
    resources or areas of interest, identifying possible bottlenecks.
3. Analysis: Further examination of particular system areas is done to attempt to root-cause
    and quantify the issue



Example

1. Monitoring: Netflix Atlas: an open-source cloud-wide monitoring platform [Harrington 14].

2. Identification: Netflix perfdash (formally Netflix Vector): a GUI for analyzing a single
instance with dashboards, including USE method metrics.
3. Analysis: Netflix FlameCommander, for generating different types of flame graphs; and
command-line tools over an SSH session, including Ftrace-based tools, BCC tools, and
bpftrace.



The "Why" loop, another perspective

1. A database has begun to perform poorly for many queries. Why?
2. It is delayed by disk I/O due to memory paging. Why?
3. Database memory usage has grown too large. Why?
4. The allocator is consuming more memory than it should. Why?
5. The allocator has a memory fragmentation issue
6. etc.





**Latency analysis method**

Latency analysis examines the time taken to complete an operation and then breaks it intosmaller components, continuing to subdivide the components with the highest latency so thatthe root cause can be identified and quantified.

Of course, many times in HFT systems there can be no particular part that is slow.

You can do this in a binary search fashion, dividing system into parts A and B, drilling down to the slower part recursively.

Example:

1. Is there a query latency issue? (yes)
2. Is the query time largely spent on-CPU or waiting off-CPU? (off-CPU)
3. What is the off-CPU time spent waiting for? (file system I/O)
4. Is the file system I/O time due to disk I/O or lock contention? (disk I/O)
5. Is the disk I/O time mostly spent queueing or servicing the I/O? (servicing)
6. Is the disk service time mostly I/O initialization or data transfer? (data transfer)





**Method R $$**





**Event tracing method**

Sometimes summary statistics don't tell the real story and can't pinpoint the problem. So we need to drill down individual sequence of events

Look for following information: 

- Input: All attributes of an event request: type, direction, size, and so on
- Times: Start time, end time, latency (difference)
- Result: Error status, result of event (e.g., successful transfer size)





**Baseline stats method**

Record and save baseline performance stats. Usually this is done automatically at regular intervals (e.g., daily), usually with profilers and tracers built in.

The data can be saved to a file or a database.

Then after change the same metrics can be measured again, then overlay on top of "normal" baseline to see any differences





**Static performance tuning method**

Performance measurement when system is at rest and no load is applied

- Does the component make sense? (outdated, underpowered, etc.)
- Does the configuration make sense for the intended workload?
- Was the component autoconfigured in the best state for the intended workload?
- Has the component experienced an error such that it is now in a degraded state?



Examples of issues that can be found using performance debugging under zero load

- Network interface negotiation: selecting 1 Gbits/s instead of 10 Gbit/s
- Failed disk in a RAID pool
- Older version of the operating system, applications, or firmware used
- File system nearly full (can cause performance issues)
- Mismatched file system record size compared to workload I/O size
- Application running with a costly debug mode accidentally left enabled
- Server accidentally configured as a network router (IP forwarding enabled)
- Server configured to use resources, such as authentication, from a remote data center
  instead of locally





**Cache tuning method**

1. Aim to cache as high in the stack as possible, closer to where the work is performed, reducing the operational overhead of cache hits. This location should also have more metadata available, which can be used to improve the cache retention policy.
2. Check that the cache is enabled and working.
3. Check the cache hit/miss ratios and miss rate.
4. If the cache size is dynamic, check its current size.
5. Tune the cache for the workload. This task depends on available cache tunable parameters.
6. Tune the workload for the cache. Doing this includes reducing unnecessary consumers of the cache, which frees up more space for the target workload.

Look out for double caching: 2 caches caching same data

Also performance gain from improving lower level cache misses may give more improvement than improving misses for cache closer to the CPU





**Micro-benchmarking method**

Typically performed using some load generator tool that simulates a certain load, with some other observability tool for measuring performance. Though these can also be the same tool chain.

Some example targets for micro-benchmarks are: 

- Syscall time: For fork(2), execve(2), open(2), read(2), close(2)
- File system reads: From a cached file, varying the read size from one byte to one Mbyte
- Network throughput: Transferring data between TCP endpoints, for varying socket
  buffer sizes





**Performance mantras method**

This is a tuning methodology that shows how best to improve performance, listing actionable items in order from most to least effective

1. Don’t do it.
2. Do it, but don’t do it again.
3. Do it less.
4. Do it later.
5. Do it when they’re not looking.
6. Do it concurrently.
7. Do it more cheaply.



Example:

1. Don’t do it: Eliminate unnecessary work.
2. Do it, but don’t do it again: Caching.
3. Do it less: Tune refreshes, polling, or updates to be less frequent.
4. Do it later: Write-back caching.
5. Do it when they’re not looking: Schedule work to run during off-peak hours.
6. Do it concurrently: Switch from single-threaded to multi-threaded.
7. Do it more cheaply: Buy faster hardware





$$ Modelling: page 108, equations

$$ Capacity planning: page 109



### Useful statistics

Averages: we want to combine related latency statistics together into a single statistsic

Arithmetic mean

Geometric mean: useful for measuring layers of latencies that has a multiplicative effect

​	a network layer working on the same packet, each layer has a latency, calculate the geometric mean of latency across layers to compare before and after fix ($$)

Harmonic mean: $$ page 113

Averages over time: try averages over time for different time intervals

​	E.g. CPU utilisation can peak at 100% for small intervals. Could be useful to take second, minute, hour averages

Decayed average: $$ ??

Limitations: it hides details work with other metrics together



Standard deviations => useful for spread of data

​	Coefficient of Variation = std/mean, or std as % of mean

Percentiles => 99-th percentile etc. useful for capturing slowest group, also good for forming SLAs



Also good to check distributions => bimodal distribution cannot be captured well using average



Outliers: best to use a histogram



### Monitoring

Time based: time is on x axis, other metrics (e.g., utilisation) on y axis. This is useful to see patterns over "normal" usage

For large scale systems (e.g., compute spanning hundreds of thousands of instances), you need a central monitoring tool





### Visualisations

Line chart: useful for seeing distribution or trend

​	Can also do indexed line chart on percentile

Scatter plots: useful for seeing outliers, but of course more data points than line charts

Heat maps: like scatter plots but with some aggregation

Timeline charts: useful for frontend (waterfall of tasks) and backend apps (threads on CPUs)

Surface plots: additional dimension is for different CPUs

$$ See page 122 or examples





## Operating Systems $$



Use this to supplement OS knowledge





## Observability tools



Observability tools today are more diverse than before, eliminating may dark corners. Linux tracing ability have significantly improved thanks to dynamic instrumentation tools.



$$ All tools

Most tools target a specific resource. Some tools (perf, Ftrace, BCC) target many resources.



$$ Static performance tools

Analysis of system at rest (zero load)



$$ Crisis tools

Make sure these tools are installed so no need to install them when a crisis is happening



$$ By tool type

**Fixed counters**

Usually implemented as unsigned integers incremented when events occur (network packets, disk I/O etc.)

A common kernel approach is storing a pair of cumulative counters: (count events, total time in event). This gives you average latency directly. And as the number is cumulative, you can take per-second slices and calculate the stats in that second

These metrics are usually "for free" as kernel is already recording them by default, and using them is a matter of reading them in user space (which has negligable cost)



*system wide*

- vmstat: virtual and physical memory statistics, system-wide
- mpstat: per-CPU usage
- iostat: per-disk I/O usage, reported from the block device interface
- nstat: TCP/IP stack statistics
- sar: various statistics



*per-process*

- ps: process status, various process stats, incl. memory and CPU usage
- top: top processes, sorted by CPU usage and other stats
- pmap: lists process memory segments with usage stats



**Profiling**

Usually collected at fixed rate (99Hz) and for a small duration (1 min). 99Hz is used instead of 100Hz to prevent sampling in lockstep, which can lead to under/over counting.

Has time and memory overhead to update counters and store them.



*system wide*

- **perf**: standard linux profiler
- profile: A BPF-based CPu profiler
- Intel VTune Amplifier XE: Linux and Windows profiling



*per-process*

- **gprof**: the GNU profiling tool
- **cachegrind**: from valgrind toolkit
- Java Flight Recorder: Java's special purpose profiler



**Tracing**

Tracing instruments every occurence of an event, so has much higher overhead than profiling. This needs to be taken into account as the final numbers can be misleading.



*system wide*

- tcpdump: network packet tracing (uses libpcap)
- biosnoop: block I/O tracing (uses BCC or bpftrace)
- execsnoop: new processes tracing (uses BCC or bpftrace)
- perf: the standard Linux profiler, can also trace events
- Ftrace: the linux built-in tracer
- BCC: a BPF-based tracing library
- bpftrace: another BPF-based tracer



*per-process*

- strace: system call tracing
- gdb: a source-level debugger





**Monitoring**

Monitoring software and agents for Linux:

- Performance Co-Pilot (PCP): supports dozens of different agents (called Performance Metric Domain Agents: PMDAs)
- **Prometheus**: dozens of different exporters for databases, hardware, messaging, storage, HTTP, APIs, and logging
- collectd: supports dozens different plugins



$$ Monitoring architecture







### Observability sources

$$ big table and picture



#### /proc

Each process has a directory named by its PID

Inside the directory contains various files about that process

/proc is dynamically created by kernel and not backed by storage devices (the file exists in memory)

The file interface allows users to access kernel statistics using tools that can deal with files (POSIX file system calls open(), read(), close(); cd, cat, grep, awk and other shell tools)

Overhead of reading /proc files is negligable, though displaying kernel stats as text will add some overhead

`top` basically reads the /stats file of every process, which can actually be resource intensive if large # of processes or refreshing on every screen refresh. (in those cases top will display itself as the highest resource intensive process)



Per-process statistics

```shell
$ ls -F /proc/18733
...
```

- limits: In-effect resource limits
- maps: Mapped memory regions
- sched: Various CPU scheduler statistics
- schedstat: CPU runtime, latency, and time slices
- smaps: Mapped memory regions with usage statistics
- stat: Process status and statistics, incl. total CPU and memory usage
- statm: Memory usage summary in units of pages
- status: stat and statm information, labeled
- fd: Directory of file descriptor symlinks (also see fdinfo)
- cgroup: Cgroup membership information
- task: Directory of per-task (thread) statistics



System-wide statistics

```shell
$ cd /proc; ls -Fd [a-z]*
```

- cpuinfo: Physical processor information, including every virtual CPU, model name, clock speed, and cache sizes.
- diskstats: Disk I/O statistics for all disk devices
- interrupts: Interrupt counters per CPU
- loadavg: Load averages
- meminfo: System memory usage breakdowns
- net/dev: Network interface statistics
- net/netstat: System-wide networking statistics
- net/tcp: Active TCP socket information
- pressure/: Pressure stall information (PSI) files
- schedstat: System-wide CPU scheduler statistics
- self: A symlink to the current process ID directory, for convenience
- slabinfo: Kernel slab allocator cache statistics
- stat: A summary of kernel and system resource statistics: CPUs, disks, paging, swap, processes
- zoneinfo: Memory zone information





#### /sys

Originally provide device driver statistics but has been extended to include any statistic type





#### delay accounting

Linux systems with the CONFIG_TASK_DELAY_ACCT option track time per task in the followingstates:

- Scheduler latency: Waiting for a turn on-CPU
- Block I/O: Waiting for a block I/O to complete
- Swapping: Waiting for paging (memory pressure)
- Memory reclaim: Waiting for the memory reclaim routine



Technically these stats are sourced from schedstats and combined with other delay accounting states.



Where to read

- Documentation/accounting/delay-accounting.txt: the documentation
- tools/accounting/getdelays.c: an example consumer





#### netlink

netlink is a special socket address family (AF_NETLINK) for fetching kernel information.

$$ Didn't look into much





#### Tracepoints

Tracepoints are a Linux kernel event source based on static instrumentation

Tracepoints are hardcoded into various parts of the kernel (e.g., startand end of system calls, scheduler events, file system operations, and disk I/O)



Example tracepoints

```shell
$ perf list tracepoint
List of pre-defined events (to be used in -e):
[...]
	block:block_rq_complete [Tracepoint event]
	block:block_rq_insert [Tracepoint event]
	block:block_rq_issue [Tracepoint event]
[...]
	sched:sched_wakeup [Tracepoint event]
	sched:sched_wakeup_new [Tracepoint event]
	sched:sched_waking [Tracepoint event]
	scsi:scsi_dispatch_cmd_done [Tracepoint event]
	scsi:scsi_dispatch_cmd_error [Tracepoint event]
	scsi:scsi_dispatch_cmd_start [Tracepoint event]
	scsi:scsi_dispatch_cmd_timeout [Tracepoint event]
[...]
	skb:consume_skb [Tracepoint event]
	skb:kfree_skb [Tracepoint event]
[...]
```



Now let's look into 1 specific trace point

```shell
$ perf trace -e block:block_rq_issue
[...]
	0.000 kworker/u4:1-e/20962 block:block_rq_issue:259,0 W 8192 () 875216 + 16
[kworker/u4:1]
	255.945 :22696/22696 block:block_rq_issue:259,0 RA 4096 () 4459152 + 8 [bash]
	256.957 :22705/22705 block:block_rq_issue:259,0 RA 16384 () 367936 + 32 [bash]
[...]

	# ts(in seconds), process details(name/threadID), event description, arguments; arguments provide additional context info about the trace event
```



Note, tracepoints are technically the trace functions placed at the event position in the kernel. E.g., `trace_sched_wakeup()`. This function sits inside `kernel/sched/core.c`

TRACE_EVENT macro defines and formats the event arguments, auto-generates the `trace_sched_wakeup()` code

We can see the format string for each traceevent like this

```shell
# cat /sys/kernel/debug/tracing/events/block/block_rq_issue/format
name: block_rq_issue
ID: 1080
format:
    field:unsigned short common_type; offset:0; size:2; signed:0;
    field:unsigned char common_flags; offset:2; size:1; signed:0;
    field:unsigned char common_preempt_count; offset:3; size:1; signed:0;
    field:int common_pid; offset:4; size:4; signed:1;
    field:dev_t dev; offset:8; size:4; signed:0;
    field:sector_t sector; offset:16; size:8; signed:0;
    field:unsigned int nr_sector; offset:24; size:4; signed:0;
    field:unsigned int bytes; offset:28; size:4; signed:0;
    field:char rwbs[8]; offset:32; size:8; signed:1;
    field:char comm[16]; offset:40; size:16; signed:1;
    field:__data_loc char[] cmd; offset:56; size:4; signed:1;
    
print fmt: "%d,%d %s %u (%s) %llu + %u [%s]", ((unsigned int) ((REC->dev) >> 20)),
((unsigned int) ((REC->dev) & ((1U << 20) - 1))), REC->rwbs, REC->bytes,
__get_str(cmd), (unsigned long long)REC->sector, REC->nr_sector, REC->comm
```

The final string defines the formatting used

Tracers can typically access arguments by their names

```shell
# perf trace -e block:block_rq_issue --filter 'bytes > 65536'
	0.000 jbd2/nvme0n1p1/174 block:block_rq_issue:259,0 WS 77824 () 2192856 + 152
[jbd2/nvme0n1p1-]
	5.784 jbd2/nvme0n1p1/174 block:block_rq_issue:259,0 WS 94208 () 2193152 + 184
[jbd2/nvme0n1p1-]
[...]
```



Tracepoint overhead

There is overhead in creating the tracevents, having the tracer post-process the events, and file system overhead in recording them.

Whether that overhead can pertubate your recording depend on your task. In modern computers, 10k events per second won't have noticeable different (e.g., disk events) while 100k+ events per second can (e.g., scheduler events)





#### kprobes

Short for kernel probes. This is for dynamic instrumentation in the kernel where functions can be called at start and return of kernel functions

```shell
$ bpftrace -e 'kprobe:do_nanosleep { printf("sleep by: %s\n", comm); }'
Attaching 1 probe...
sleep by: mysqld
sleep by: mysqld
sleep by: sleep
^C
```

We can add argument to the functions as part of the context

```shell
$ bpftrace -e 'kprobe:do_nanosleep { printf("mode: %d\n", arg1); }'
Attaching 1 probe...
mode: 1
mode: 1
mode: 1
[...]
```

With return function probing we can sample the function runtime

```shell
$ bpftrace -e 'kprobe:do_nanosleep { @ts[tid] = nsecs; }
kretprobe:do_nanosleep /@ts[tid]/ {
@sleep_ms = hist((nsecs - @ts[tid]) / 1000000); delete(@ts[tid]); }
END { clear(@ts); }'
Attaching 3 probes...
@sleep_ms:
[0] 1280 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
[1] 1 | [2, 4) 1 | [4, 8) 0 | [8, 16) 0 | [16, 32) 0 | [32, 64) 0 | [64, 128) 0 | [128, 256) 0 | [256, 512) 0 | [512, 1K) 2 | |
|
|
|
|
|
|
|
|
|
```

^^ Formatting didn't work, but basically shows histogram of 1280 times in 0 ms (rounded down), 1 time in 1ms, 1 time in [2, 4) ms

$$ Have a look and gain deeper understanding of overhead



#### uprobes

Probes for user-space programs, interface similar to kprobes

```shell
$ bpftrace -l 'uprobe:/bin/bash:*'
uprobe:/bin/bash:rl_old_menu_complete
uprobe:/bin/bash:maybe_make_export_env
uprobe:/bin/bash:initialize_shell_builtins
uprobe:/bin/bash:extglob_pattern_p
uprobe:/bin/bash:dispose_cond_node
uprobe:/bin/bash:decode_prompt_string
[..]
```

^^ Points to insert tracepoints inside program `/bin/bash`








#### USDT

$$ static tracepoints in user-space programs






#### Hardware Counters (PMCs)

PMCs = performance monitoring counters

These are specific counters in the hardware, you can observe them using `perf stat` without specifying events with `-e`, below is the PMC results for running `gzip`

```shell
$ perf stat gzip words
    Performance counter stats for 'gzip words':
    156.927428      task-clock (msec)   # 0.987 CPUs utilized
    1               context-switches    # 0.006 K/sec
    0               cpu-migrations      # 0.000 K/sec
    131             page-faults         # 0.835 K/sec
    209,911,358     cycles              # 1.338 GHz
    288,321,441     instructions        # 1.37 insn per cycle
    66,240,624      branches            # 422.110 M/sec
    1,382,627       branch-misses       # 2.09% of all branches
    0.159065542     seconds time elapsed
```

The statistics after the hash is interesting

On Linux PMCs are accessed via the perf_event_open(2) syscall and are consumed by tools including perf(1)

In many CPUs, there can be hundreds of PMCs available, but usually only a few registers available for tracking, so you need to pick which PMCs to track.

PMCs usually tracked in 2 modes:

- counter: Just counts the # of events
- overflow sampling: Every specified number of events raise an interrupt so state can be captured

Counter is useful for quantifying problems and overflow sampling can then be used to show the code responsible.

Some challenges with PMCs:

- Overflow sampling may not record the correct instruction pointer that triggered the event, due to interrupt latency (often called “skid”) or out-of-order instruction execution. Some chips include supports for *precise events* that capture them more accurately
- Cloud providers usually have PMCs disabled on hosts

PMC documentation is available per chip manufacturer (Intel, AMD, Arm)






#### Other sources







### sar

$$ monitoring, we use Prometheus






## Benchmarking

Benchmarking tests performance in a controlled manner, allowing choices to be compared, regressions to be identified, and performance limits to be understood.

Reasons for doing benchmarking:
- System design: Comparing different systems, system components, or applications. Industry benchmarks can be used
- Proofs of concept: To test the performance of software or hardware under load, before purchasing or committing to production deployment -> we did this with visualisation tools to test feasibility of generating metrics online
- Tuning: Testing tunable parameters and configuration options, to identify those that are worth further investigation with the production workload.
- Development: For both non-regression testing and limit investigations during product development. 
    - Non-regression testing may be an automated battery of performance tests that run regularly, so that any performance regression can be discovered early -> eg. daily training tests backtest runtime
    - For limit investigations, benchmarking can be used to drive products to their limit during development, in order to identify where engineering effort is best spent to improve product performance -> eg. testing how much market date the feed architecture can take
- Capacity planning: Determining system and application limits for capacity planning, either to provide data for modeling performance, or to find capacity limits directly.
- Troubleshooting: To verify that components can still operate at maximum performance. For example: testing maximum network throughput between hosts to check whether there may be a network issue.
- Marketing: Determining maximum product performance for use by marketing (also called benchmarketing).

Note: gradual rollouts make benchmarking less necessary --- new instances can be tested on some production traffic directly. But there benchmarking can still be useful to explain performance.


### Effective benchmarking

Benchmarks are surprisingly difficult to get right. 

> In this article we survey 415 file system and storage benchmarks from 106 recent papers. We found that most popular benchmarks are flawed and many research papers do not provide a clear indication of true performance.

From: “A Nine Year Study of File System and Storage Benchmarking” [Traeger 08]

Key characteristic of good benchmarks:

- Repeatable: To facilitate comparisons
- Observable: So that performance can be analyzed and understood
- Portable: To allow benchmarking on competitors and across different product releases
- Easily presented: So that everyone can understand the results
- Realistic: So that measurements reflect customer-experienced realities
- Runnable: So that developers can quickly test changes

Also good to calculate price/performance ratio, price can be 5-year cost of hardware ($$ why)

What to be aware of when performing benchmarking

- What is being tested
- What the limiting factor or factors are
- Any perturbations that might affect the results
- What conclusions may be drawn from the results

Many times people get performance experts involved after running the benchmark. But it's actually better to get them involved while the benchmark is running so they can directly analyse the live system.





### Common benchmarking pitfalls

**Casual benchmarking**

> you benchmark A, but actually measure B, and conclude you’ve
measured C.

> For example, many tools claim or imply that they measure disk performance, but actually test file system performance. The difference can be orders of magnitude, as file systems employ cach- ing and buffering to substitute disk I/O with memory I/O. Even though the benchmark tool may be functioning correctly and testing the file system, your conclusions about the disks will be wildly incorrect.

Benchmarking is hard for beginners, you really need to drill down and understand what is happening.




**Blind faith**

Don't trust a common benchmarking tool just because it is popular



**Numbers without analysis**

> If you’ve spent less than a week studying a benchmark result, it’s probably wrong.

A simple verification checklist

- Assuming the benchmark tool isn’t buggy
- Assuming the disk I/O test actually measures disk I/O
- Assuming the benchmark tool drove disk I/O to its limit, as intended
- Assuming this type of disk I/O is relevant for this application




**Complex benchmark tools**

Benchmark tools should be simple so its own effects can be understood




**Ignoring pertubations**

Example pertubations: device interrupts (pinning the thread while performing interrupt service routines), kernel CPU scheduling decisions (waiting before migrating queued threads to preserve CPU affinity), and CPU cache warmth effects

A simple way to counter pertubations is to make your benchmarks run longer (pertubations matter less). Also good to do many benchmark runs, the std shouldn't be high.


$$ A few more shortfalls, mostly for business-related cases, it's quite interesting


### Benchmarking types

Ordered in workload closeness to production from artificial to actual:

- Micro-benchmark
- Simulation
- Replay
- Production


<u>Micro-benchmark</u>

Micro-benchmarking uses artificial workloads that test a particular type of operation, for example, performing a single type of file system I/O, database query, CPU instruction, or system call.

These are simpler to run, simple to repeat.

Example micro-benchmark tools:

- CPU: SysBench
- Memory I/O: lmbench (in Chapter 6, CPUs)
- File system: fio
- Disk: hdparm, dd or fio with direct I/O
- Network: 

Again, most benchmarking tools have some flaws, you can also create your own for your workload but keep it as simple as possible.

A common way to write performance tests is similar to writing application tests => think about the system load at production and effectively "map out" the area. This usually means taking several ares of workload and testing a cross-production of scenarios from them.

Example:

Dimensions: sequential or random I/O, I/O size, and direction (read or write)

$$ table

Other possible dimensions:

- Working set size: The size of the data being accessed (e.g., total file size):
    - Much smaller than main memory: So that the data caches entirely in the file system cache, and the performance of the file system software can be investigated.
    - Much larger than main memory: To minimize the effect of the file system cache and drive the benchmark toward testing disk I/O.
- Thread count: Assuming a small working set size:
    - Single-threaded: To test file system performance based on the current CPU clock speed.
    - Multithreaded sufficient to saturate all CPUs: To test the maximum performance of the system, file system, and CPUs.

Another view:

- sunny day performance: focus on top speeds
- cloudy/rainy day performance: testing non-ideal situations, including contention, perturbations, and workload variance.



<u>Simulation</u>

This is a kind of macro-benchmarking

Measures complex inter-process performance that is hard to cumbersome to track using micro-benchmarking. Also good to simulate "peak" workload (e.g., holiday sale  season for an online market place)

Eg. "Production NFS workload is composed of the following operation types and
probabilities: reads, 40%; writes, 7%; getattr, 19%; readdir, 1%; and so on"

Simulation can be stateless or stateful (where next event depends on some previous event), e.g., NFS R/W workload tend to follow in groups, so P(write|write) > P(read|write), these cases we can train a Markov model to simulate on

A drawback of simulation is if user behaviour changes, need to change the simulation, otherwise result inaccurate



<u>Replay</u>

Replay log traces of events.

The difficulty is to capture and replay these events at the right level. Example of what could go wrong:

> A customer is considering upgrading storage infrastructure. The current production workload is traced and replayed on the new hardware. Unfortunately, performance is worse, and the sale is lost. The problem: the trace/replay operated at the disk I/O level. The old system housed 10 K rpm disks, and the new system houses slower 7,200 rpm disks. However, the new system provides 16 times the amount of file system cache and faster processors. The actual production workload would have shown improved performance, as it would have returned largely from cache—which was not simulated by replaying disk events.

So sometimes no better than simulation. Need to really understand what is going on and what you're measuring


<u>Industry standards</u>

Some standardised benchmarks and workloads (e.g., for DBMS performance)



### Methodology

**Passive benchmarking**

Use it once and forget strategy.

Typical steps:

1. Pick a benchmark tool.
2. Run it with a variety of options.
3. Make a slide deck of the results.
4. Hand the slides to management.


Potential issues:

- Invalid due to benchmark software bugs
- Limited by the benchmark software (e.g., single-threaded)
- Limited by a component that is unrelated to the benchmark target (e.g., a congested network)
- Limited by configuration (performance features not enabled, not a maximum configuration)
- Subject to perturbations (and not repeatable)
- Benchmarking the wrong thing entirely



**Active benchmarking**

Trace performance while the benchmarking program is running, makes sure you know more deeply what is actually happening and what you're measuring.



**Ramping load**

Adding load in small increments and measuring the delivered throughput until a limit is reached.

$$ Add picture



**Sanity check**

When you get a benchmark sanity check that it makes sense. Example:

> An NFS server is benchmarked with 8 Kbyte reads and is reported to deliver 50,000 IOPS. It is connected to the network using a single 1 Gbit/s Ethernet port. The network throughput required to drive 50,000 IOPS × 8 Kbytes = 400,000 Kbytes/s, plus protocol headers. This is over 3.2 Gbits/s—well in excess of the 1 Gbit/s known limit. Something is wrong!






### Benchmark questions checklist

Basic questions to check when given a benchmark result to verify its accuracy:

- Why not double? Why was the operation rate not double the benchmark result? This is really asking what the limiter is. Answering this can solve many benchmarking problems, when you discover that the limiter is not the intended target of the test.
- Did it break limits? This is a sanity check (Section 12.3.8, Sanity Check).
- Did it error? Errors perform differently than normal operations, and a high error rate will skew the benchmark results.
- Does it reproduce? How consistent are the results?
- Does it matter? The workload that a particular benchmark tests may not be relevant to your production needs. Some micro-benchmarks test individual syscalls and library calls, but your application may not even be using them.
- Did it even happen? The earlier Ignoring Errors heading in Section 12.1.3, Benchmarking Failures, described a case where a firewall blocked a benchmark from reaching the target, and reported timeout-based latency as its result.


More questions:

In general:
- Does the benchmark relate to my production workload?
- What was the configuration of the system under test?
- Was a single system tested, or is this the result of a cluster of systems?
- What is the cost of the system under test?
- What was the configuration of the benchmark clients?
- What was the duration of the test? How many results were collected?
- Is the result an average or a peak? What is the average?
- What are other distribution details (standard deviation, percentiles, or full distribution details)?
- What was the limiting factor of the benchmark?
- What was the operation success/fail ratio?
- What were the operation attributes?
- Were the operation attributes chosen to simulate a workload? How were they selected?
- Does the benchmark simulate variance, or an average workload?
- Was the benchmark result confirmed using other analysis tools? (Provide screenshots.)
- Can an error margin be expressed with the benchmark result?
- Is the benchmark result reproducible?


For CPU/memory-related benchmarks:
- What processors were used?
- Were processors overclocked? Was custom cooling used (e.g., water cooling)?
- How many memory modules (e.g., DIMMs) were used? How are they attached to sockets?
- Were any CPUs disabled?
- What was the system-wide CPU utilization? (Lightly loaded systems can perform faster due to higher levels of turbo boosting.)
- Were the tested CPUs cores or hyperthreads?
- How much main memory was installed? Of what type?
- Were any custom BIOS settings used?

For storage-related benchmarks:
- What is the storage device configuration (how many were used, their type, storage
protocol, RAID configuration, cache size, write-back or write-through, etc.)?
- What is the file system configuration (what types, how many were used, their
configuration such as the use of journaling, and their tuning)?
- What is the working set size?
- To what degree did the working set cache? Where did it cache?
- How many files were accessed?

For network-related benchmarks:
- What was the network configuration (how many interfaces were used, their type and configuration)?
- What was the network topology?
- What protocols were used? Socket options?
- What network stack settings were tuned? TCP/UDP tunables?