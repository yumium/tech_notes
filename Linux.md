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

TTY software, after user authenticates via pswd, redirects user command to TTY file (e.g., `/dev/ttyX/`), which is then read and executed by shell (e.g., `bash`). Output is done vice versa.

