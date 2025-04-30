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

Macro-benchmark: simulate higher level real-world workload (racecar lap time)

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







The RED method



Workload characterisation method



Drill-down analysis method



Latency analysis method



Method R



Event tracing method



Baseline stats method



Static performance tuning method



Cache tuning method



Micro-benchmarking method



Performance mantras method





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





