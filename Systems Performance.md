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


| #  | Tool              | Check                                                                                 | Section |
|----|-------------------|---------------------------------------------------------------------------------------|---------|
| 1  | `uptime`          | Load averages to identify if load is increasing or decreasing (compare 1-, 5-, and 15-minute averages). | 6.6.1   |
| 2  | `dmesg -T | tail` | Kernel errors including OOM events.                                                   | 7.5.11  |
| 3  | `vmstat -SM 1`    | System-wide statistics: run queue length, swapping, overall CPU usage.                | 7.5.1   |
| 4  | `mpstat -P ALL 1` | Per-CPU balance: a single busy CPU can indicate poor thread scaling.                  | 6.6.3   |
| 5  | `pidstat 1`       | Per-process CPU usage: identify unexpected CPU consumers, and user/system CPU time for each process. | 6.6.7   |
| 6  | `iostat -sxz 1`   | Disk I/O statistics: IOPS and throughput, average wait time, percent busy.            | 9.6.1   |
| 7  | `free -m`         | Memory usage including the file system cache.                                         | 8.6.2   |
| 8  | `sar -n DEV 1`    | Network device I/O: packets and throughput.                                           | 10.6.6  |
| 9  | `sar -n TCP,ETCP 1` | TCP statistics: connection rates, retransmits.                                      | 10.6.6  |
| 10 | `top`             | Check overview.                                                                       | 6.6.6   |





