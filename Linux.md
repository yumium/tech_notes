`ps` stats 


When you run `ps aux`, it typically returns the following columns of information:

- USER: The username of the owner of the process.
- PID: The process ID.
- %CPU: The percentage of CPU usage.
- %MEM: The percentage of memory usage, percentage of RSS on total RAM size.
- VSZ: Virtual memory size in kilobytes. All allocated memory to process, so RSS + memory that is swapped out and not on physical RAM (e.g., on swap memory in disk)
- RSS: Resident Set Size, or the amount of physical memory in RAM used by the process. This includes code, data, and libraries (can be shared with other processes). 
- TTY: The terminal associated with the process (if any). 
- STAT: The process status (e.g., running, sleeping).
- START: The start time of the process.
- TIME: The total CPU time the process has used.
- COMMAND: The command that initiated the process.

`a` is for all users, not just current user. `u` gives more detail, `x` exclude prcesses without controlling terminal (e.g., background services, daemons)

A **controlling terminal** is the terminal that started the process and used to take output, Ctrl+C will send a SIGINT to the process. Background processes don't need control terminal to start.

**TTY = teletypewriter**, originally it's a physical device users type to interact with computer. Now it's virtual

TTY software, after user authenticates via pswd, redirects user command to TTY file (e.g., `/dev/ttyX/`), which is then read and executed by shell (e.g., `bash`). Output is done vice versa. This is implemented by the OS kernel. The `/proc/tty/drivers` file contains other supported drivers.

Pseudo-terminals is a software abstraction to allow process to talk as if they're talking to a real TTY, but isn't. This can be useful, say, to operate with a terminal remote, say via SSH. I still don't fully understand how it works, perhaps interesting to "build your own" (https://biriukov.dev/docs/fd-pipe-session-terminal/4-terminals-and-pseudoterminals/). Used also in software like `tmux`

Getting one level of child processes from parent process: `ps -p <pid of parent>`

Getting process tree of parent process to child processes: `pstree -p <pid of parent>`

Show tree of only my processes: `ps -fjH -u myname`

Process states: https://man7.org/linux/man-pages/man1/ps.1.html

- D = uninterruptible sleep. Usually due to waiting for I/O, it can only wake up by end of that I/O, not by interrupt. This is due to preventing interrupting I/O in the middel and lead to data corruption. Implemented in some linux kernels. Normal `S` interruptible sleep can also be interrupted by signals, such as SIGINT

Adding other fields (e.g., psr for which processing is being used): `ps -eLo pid,comm,psr,%cpu,%mem,user,args`


---

`df`: Disk free

`du`: Disk used   (`du -shc /<dir>/*` directory size totals)

`id`: Check your own UID or ID of others given username

`stat`: Check ownership and other stats about file/dir (last modified etc.)

`taskset`: Change CPU affinity of processes (https://quickref.me/taskset.html)

`nice`: `nice -n -10 command_to_run`
- Change priority of the command to run
- Default priority all at 0. Range is -20 to 19. negative = higher priority
- Only sudo can assign negative priorities

`renice`: `renice 10 -p process_id` => change priority of already running process

`pgrep`: like `ps aux | grep`

To read: https://blogs.oracle.com/linux/post/task-priority


/proc pseudo filesystem

Only exists in memory, not persisted on disk. Gives information about the kernel.
It’s a virtual file system (VFS), so gives illusion of file system
Kernel synthetize data on every user I/O, so most files in /proc behave like pipes


/proc/meminfo

https://access.redhat.com/solutions/406773

https://blogs.oracle.com/linux/post/understanding-linux-kernel-memory-statistics

https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/deployment_guide/s2-proc-meminfo#s2-proc-meminfo

https://superuser.com/questions/521551/cat-proc-meminfo-what-do-all-those-numbers-mean



---

To learn:

- `history`
- `netstat`






