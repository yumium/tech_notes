# Linux

### TODO

Finish exercises in Command-line env. chapter

- curl

From linux commandline (files, networking)



#### The shell :turtle:

- `echo`
- `date`
- `which`
- `pwd`
- `cd`
- `ls`: -l long format, -S sort by size, -t sort by mod time, -a all files, -A all files except current and parent dir
- `mv`
- `cp`
- `rm`
- `mkdir`
- `man`
- `cat`
- `less`







```shell
# Primary way to interact w/ computer to do more complex tasks
# Windows: powershell; Linux: bash, etc.
echo $SHELL

# How does shell work?
#  Computer comes with a lot of util programs
#  Bash calls these programs with arguments
#  Bash is actually a progrmming language, and keywords like "echo" are variables in the language

# The shell prompt (you can customize it)
zaiyuming@zaiyuming-Vostro-5581:~$ 

# show date
date

# echoing the words back
echo hello
echo "Hello world"
echo Hello\ World  # escape

# PATH: the directories bash searches to find programs
echo $PATH

# Which: which program is run? giving you the absolute path of that file
which echo

# print (current) working directory
pwd

# change directory. Path argument is relative path to your current directory
cd /Documents

# parent directory
cd ..

# current directory
cd .
cd ./Computer_Science  # same as cd /Computer_Science

# list files in current dir
ls
ls .. # list files in that (relative) path
ls ./Year_2

# ~ always expands to home dir
cd ~/Documents

# go back to prev. diretory (like alt tab)
cd -

# getting help
ls --help
cd --help

# more info with files
cd ~
ls ../../ -l

drwxr-xr-x   2 root root      4096 Jan 23 08:56 bin
drwxr-xr-x   4 root root      4096 Feb 27 13:16 boot
drwxrwxr-x   2 root root      4096 Apr 10  2020 cdrom
drwxr-xr-x  21 root root      5520 Mar  7 12:30 dev
drwxr-xr-x 142 root root     12288 Mar  4 09:47 etc
drwxr-xr-x   4 root root      4096 Apr 10  2020 home
lrwxrwxrwx   1 root root        32 Feb 26 13:07 initrd.img -> boot/initrd.img-5.4.0-66-generic
lrwxrwxrwx   1 root root        32 Feb 26 13:07 initrd.img.old -> boot/initrd.img-5.4.0-65-generic
drwxr-xr-x  20 root root      4096 Dec 27 19:03 lib
drwxr-xr-x   2 root root      4096 Dec 27 19:03 lib64
drwx------   2 root root     16384 Apr 10  2020 lost+found
drwxr-xr-x   3 root root      4096 Apr 10  2020 media
drwxr-xr-x   2 root root      4096 Feb  3  2020 mnt
drwxr-xr-x   5 root root      4096 Jan  5 18:45 opt
dr-xr-xr-x 302 root root         0 Mar  7 10:32 proc
drwx------   8 root root      4096 Apr 23  2020 root
drwxr-xr-x  34 root root       980 Mar  7 12:05 run
drwxr-xr-x   2 root root     12288 Mar  4 09:47 sbin
drwxr-xr-x  17 root root      4096 May  6  2020 snap
drwxr-xr-x   2 root root      4096 Feb  3  2020 srv
-rw-------   1 root root 924339200 Aug 23  2020 swapfile
dr-xr-xr-x  13 root root         0 Mar  7 10:32 sys
drwxrwxrwt  21 root root     12288 Mar  7 12:50 tmp
drwxr-xr-x  13 root root      4096 Oct 14 16:26 usr
drwxr-xr-x  14 root root      4096 Feb  3  2020 var

# 3 pairs of permissions (read, write/modify, execute) for owner, group that owns, all users
# permission for directory: see files in dir, rename/create/remove files in dir, can you enter this dir
# If you have w permission on file but not on dir, you can empty the file but cannot delete it
# To execute a file, you need x permission for file and x for all directories in the path to that file

# rename or move
mv ying.md yang.md  # rename
mv yang.md ./Documents/ying.md  # move and rename

# copy (and rename), cp from to
cp ./Documents/ying.md ./yang.md

# remove a file
rm ./Documents/ying.md

# remove entire directory and sub-directories
rm ./trash -r  # -r means recursive

# make new directory
mkdir trash

# remove a directory (only if it's empty, as safety measure)
rmdir ./trash

# manual, easier to read than --help
# can even work on user-defined programs if it comes with a manual (eg. man rlwrap)
man ls
```



Part 2

```shell
# Streams: input and output
# default: input is your keyboard on shell; output is printing on shell

# set input and output
< input > output

# examples
echo hello > hello.txt
cat hello.txt  # cat prints content in a file
cat < hello.txt > hello2.txt
cat < hello.txt >> hello2.txt # append the content to end of file, instead of rewrite

# pipe: take output of left as input to right
# Note, the 2 programs don't know each other! They are just taking inputs and producing outputs
ls -l | tail -n1 > ls.txt  # put last line of ls to ls.txt

# pipe can let you extract text
# but pipe isn't just about text, it works on images as well
# can creates lots of interesting programs
curl --head --silent google.com | grep -i content-length | cut --delimiter=' ' -f2
```



Part 3

```shell
# root is the superuser
# most of the time you don't run as root, so you don't accidently destroy your computer
sudo stuff # do as superuser

cd sys/class/backlight/intel_backlight
sudo echo 10000 > brightness  # doesn't work, as writing to brightness doesn't have sudo anymore

# one way to do this
sudo su  # switch to superuser
echo 10000 > brightness
exit

# second way to do this
echo 10000 | sudo tee brightness # tee writes to file & also send to standard output
```



Part 4

```shell
# opening a file using appropriate tool
xdg-open the-missing-semester.mp4
```



On the semantics of pipe

```shell
# Consider the function
shout () {
	for i in {5..10..2}; do
		echo "$1"
    done
}

output () {
	echo "$1"
}

# Why doesn't this work?
shout | output  # prints nothing
output 1  # prints 1

# The output function prints from its ARGUMENTS, but functions on the receiving end of the pipe reads form STDIN (standard input)
# The standard way to grab STDIN is to use the `read` keyword, like this:
output1 () {
	read foo
	echo "$foo"
}

output2 () {
	while read -r data; do
		echo "$data"
    done
}

# This will work
shout | output1  # 5
shout | output2  # 5, 7, 9
```





#### Directories

- `/etc`: system-wide config
- `/home`: user's home dir
- `/lib`: library files used by system
- `/media`: mount point for removable media (e.g., UBS, CD-ROMs)
- `/mnt`: mount points
- `/opt`: optional software
- `/proc`: virtual file system for kernel
- `/root`: home for root acc
- `/sbin`: system binaries
- `/tmp`: temporary storage
- `/usr`: all programs and support files for regular users
  - `/usr/bin`: user executables
  - `/usr/lib`: share libraries
- `/var`: data that is likely to change
  - `/var/log`: record system activity







#### System Environment

Information stored in a shell session

shell variables and environment variables

Loaded by reading startup files (e.g., `~/.bashrc`)



- `printenv`: list of env variables, `printenv <var>` prints value of var, same as `echo $var`
- `export`: mark variables to be passed to child processes
- `set`: set variable values
- `alias`: list of aliases (not displayed in `printenv`. replacement string that expands to linux command (not an env variable), used for shorthands (e.g., `alias gs='git status'`)



```bash
# set environment variable only for this process
VAR=VALUE command

# set environment variable for all subsequent processes
export VAR=VALUE
command
```







#### Shell Tools and Scripting :page_with_curl:

Shell script cheatsheet: https://devhints.io/bash#conditionals

```shell
# defining variables
foo=bar
echo $foo

# spaces are important!
foo = bar #this doesn't work, this is calling foo with arguments, = and bar

# double quote can be used like fstring in python
echo "Value is $foo"
echo 'Value is $foo'
```

A program:

```shell
mcd () {
	mkdir -p "$1"  # access first arg with $1, similarly for $2 - $9
	cd "$1"
}
```





#### **Conditional execution vs. condition testing**

First, let me explain how error is propagated. Every function finishes with an exit code, a number in range 0-255. 0 means success and all other number means failure.

In conditional execution, the LHS is executed. And based on the exit code, we decide whether we will execute the RHS. Example:

```shell
mkdir files && cd files
```

In conditional statements we are taking the usual meaning of && and ||. But since the conditions short-circuit, it kind of behaves like conditional execution

```shell
while [[ $nIter -lt $MAX_ITER && $? -eq 0 ]]; do ...
```

remember $!!!!!!!!!!!!!!!!!!!!!!!!!!



Simple script to scan for virus

```sh
#!/bin/bash

echo "Starting program at $(date)"

echo "Running progarm $0 with $# arguments with pid $$"
# $0: current program, $# is # of args, $$ is program id

for file in "$@"; do  # $@ all the args
	grep virus "$file" > /dev/null 2> /dev/null
	# redirect STOUT and STERR to null register to trash
	if [[ "$?" -ne 0 ]]; then
		echo "File $file does not have any virus"
	fi
done
```

Regexp

```shell
ls *.py  # files ending with .py
ls project?  # ? is a wildcard for a single character
rm image.{png,jpg}  # like + in regexp
touch file{,1,2,3}
touch project{1,2}/src/test/test{1,2,3}.py  # like cartesian product. You need to create the directories first tho
touch {foo,bar}/{a..j}  # .. acts like a range

shellcheck mcd.sh  # semantically checks your script
```

Other tools

``` shell
find . -name Year_2 -type d  # Find from current directory a directory of name "Year_2"

find . -name Year_2 -type d | cd  # This doesn't work, as cd when running, doesn't take any inputs
cd $(find . -name Year_2 -type d)  # This will work

find . -path '**/test/*.py' -type f  # Find in path some folders, followed by test, then some file ending with .py

find . -name "*.tmp" -exec rm {} \;  # Find and remove

# Interactive text finder
cat yang.txt | fzf
```



#### Globs and Regexp

Globs and regexp are both used to match things. Globs are used in the console to match filenames to be used as inputs. Regexp are used mainly in scripts to test user input or parse data. Regexp is seen in many different programs (`bash`, `grep` etc.) and each have slightly different syntax. We'll introduce the syntax used by `bash` below

Globs: http://mywiki.wooledge.org/BashGuide/Patterns

```shell
* # maches any string. including null string
? # matches any single character
[...] # matches any one of the enclosed characters

# exmaples
fsc test*.scala
fsc [34].?.scala
```

Extended globs

```shell
# disabled by default. To enable, do
shopt -s extglob  # shopt is for shell options

?(list) # matches 0 or 1 occurence of the given patterns
*(list) # matches 0 or more occurences of the given patterns
+(list) # matches 1 or more occurences of the given patterns
@(list) # matches one of the given patterns
!(list) # matches anything but the given patterns

# example
$ ls
names.txt  tokyo.jpg  california.bmp
$ echo !(*jpg|*bmp)
names.txt
```



Regexp: http://mywiki.wooledge.org/RegularExpression

``` shell
ab  # concatenation
a|b  # union
a*  # star
[[:digit:]]  # matches any digit 0-9
[[:alpha:]]  # matches any english letter a-zA-Z
[[:upper:]]  # uppercase letters
[[:lower:]]  # lowercase letters
[[:space:]]  # whitespace: spaces, tabs, carriage returns

# BRE (basic reg exp), use by grep and sed
.  # matches any single character
[fog]  # matches f or o or g

# ERE (extended reg exp), used by bash in [[ str =~ regexp ]]
a+  # aa*
ab? # a(b|)
a{3} # aaa
a{3,} # aaaa*
a{,3} # |a|aa|aaa
a{3,5} # aaa|aaaa|aaaaa
```

Note: In the new version of bash, it's disallowed for regexp to be a string, so you need to use escapes





#### Cursor movement

Moving

- `C-a`: to beginning
- `C-e`: to end
- `C-f`: forward one character
- `C-b`: backward one character
- `Alt-f`: forward one word
- `Alt-b`: backward one word
- `C-l`: clear screen



Modifying text

- `C-d`: delete til beginning of word
- `C-k`: delete til end
- `C-u`: delete til beginning
- `Alt-d`: delete til end of word



### Permissions

Unix was designed to be a multiuser system (back then computers were expensive, before PC times)

- `id`: display ID information of current user
- `chmod`: change permissions of a file, use octal mode `chmod 600 foo.txt` or symbolic mode (`chmod u=rw foo.txt`, same effect). 
  - u - user, g - group, o - other, a - all 3 buckets; + add - remove = set
- `su`: `su [user]` start shell as another user
- `sudo`: execute command as another user
- chown: change file owner 
- chgrp: change file group
- passwd: reset your own password

id: returns current user's uid, gid (id of default group for user), and groups the user belongs to

In most linux versions, the default group contains only the user, but not always

```bash
[me@linuxbox ~]$ id
uid=1000(me) gid=1000(me) groups=4(adm),20(dialout),24(cdrom),25(floppy),
29(audio),30(dip),44(video),46(plugdev),108(lpadmin),114(admin),1000(me)
```



`/etc/passwd`: where we store user (login) name, uid, gid, home dir, and default shell binary

`/etc/group`: group definition (group name, id, user names that belong to the group)

`/etc/shadow`: where password is stored, permissions is `---------`



If these files are deleted, linux cannot map user name to user id. File permissions are stored as user id. User probably not able to login, as most login service reads from `/etc/passwd`



File permissions are split into 3 buckets: owner of the file, group the file belongs to, and all other users



When you do `ls -l` you see the permissions of files, something like this `-rwxr-xr-x`

r: allow file to be opened and read

w: allow file to be written to or truncated (rename & delete by directory attributes)

x: allow file to be treated like a program and executed







### Processes



- `ps`: see other doc
- `jobs`: give list of jobs launched from terminal, numbered with job number
- `fg`: `fg %<job_number>` brings process back to foreground

- `kill`: send signals to processes `kill -signal PID`





Other process related commands

- pstree: process arranged in tree-like pattern
- vmstat: system resource usage



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





### Kernel

`df`: Disk free

`du`: Disk used (`du -shc /<dir>/*` directory size totals)

`taskset`: Change CPU affinity of processes (https://quickref.me/taskset.html)



#### Task priority

```
nice`: `nice -n -10 command_to_run
```

- Change priority of the command to run
- Default priority all at 0. Range is -20 to 19. negative = higher priority
- Only sudo can assign negative priorities

`renice`: `renice 10 -p process_id` => change priority of already running process



https://blogs.oracle.com/linux/post/task-priority





#### /proc

/proc pseudo filesystem

Only exists in memory, not persisted on disk. Gives information about the kernel. It’s a virtual file system (VFS), so gives illusion of file system Kernel synthetize data on every user I/O, so most files in /proc behave like pipes

/proc/meminfo

```
MemTotal:        7823412 kB   // Total memory size (RAM)
MemFree:         2433100 kB   // Total memory free
MemAvailable:    4020868 kB   // Estimate of total memory available (free memory + easily reclaimable ones (page caches, slab caches, ...)
Buffers:          132568 kB   // Transient, in-memory cache for block devices, used to consolidate data from multiple read/write requests and execute them in a block I/O operation. Typically a small value
Cached:          2555960 kB   // Size of the page cache
SwapCached:            0 kB
Active:          3245436 kB   // Total memory of pages in active LRU lists
Inactive:         820488 kB   // Total memory of pages in inactive LRU lists
Active(anon):    2290152 kB   // ... for anonymous pages
Inactive(anon):    31824 kB
Active(file):     955284 kB   // ... for page cache
Inactive(file):   788664 kB
Unevictable:      909912 kB   // Total memory of pages unevictable (some pages must be kept in main memory
Mlocked:          299120 kB   // Total memory pinned in memory by `mlock()`, used by applications to specify memory range to block
SwapTotal:       1808384 kB   // Total swap space
SwapFree:        1808384 kB   // Total available swap space
Dirty:              9724 kB   // Total memory modified and waiting to be written back
Writeback:             0 kB   // Total amount of actively written-back pages
AnonPages:       2287856 kB   // Total memory of anonymous pages
Mapped:           927816 kB   // Total memory for mapping files
Shmem:            645444 kB   // Total shared memory
KReclaimable:     136048 kB
Slab:             239580 kB
SReclaimable:     136048 kB
SUnreclaim:       103532 kB
KernelStack:       32608 kB   // Total kernal stack memory. Each user space process gets a kernel stack used for executing kernel functions (e.g., sys calls, traps ...). Always in main memory and not attached to LRU lists
PageTables:        67664 kB   // Total memory of page tables. Page tables are used to track mapping from virtual to physical memory
NFS_Unstable:          0 kB 
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     5720088 kB
Committed_AS:   14363624 kB
VmallocTotal:   34359738367 kB
VmallocUsed:       52184 kB
VmallocChunk:          0 kB
Percpu:             3456 kB
HardwareCorrupted:     0 kB
AnonHugePages:         0 kB
ShmemHugePages:        0 kB
ShmemPmdMapped:        0 kB
FileHugePages:         0 kB
FilePmdMapped:         0 kB
CmaTotal:              0 kB
CmaFree:               0 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
Hugetlb:               0 kB
DirectMap4k:      286968 kB
DirectMap2M:     7776256 kB
DirectMap1G:           0 kB
```



https://access.redhat.com/solutions/406773

https://blogs.oracle.com/linux/post/understanding-linux-kernel-memory-statistics

https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/deployment_guide/s2-proc-meminfo#s2-proc-meminfo

https://superuser.com/questions/521551/cat-proc-meminfo-what-do-all-those-numbers-mean

`free` gives parses memory information from `/proc/meminfo` and makes it easier to consume.

```
zaiyu@zaiyu-Vostro-5581:~$ free -h
              total        used        free      shared  buff/cache   available
Mem:           7.5G        2.3G        2.5G        634M        2.7G        4.0G
Swap:          1.7G          0B        1.7G
```



Mapping:

- `Mem: total` => `MemTotal`
- `Mem: used` => `MemTotal` - `MemFree`
- `Mem: free` => `MemFree`
- `Mem: buffers` => `Buffers`
- `Mem: Cached` => `Cached`
- `Swap: total` => `SwapTotal`
- `Swap: used` => `SwapTotal` - `SwapFree`
- `Swap: free` => `SwapFree`

`pmap`: Give schema of memory mapping of a particular process. Example output dump

```
$ pmap 1234
1234:   /usr/bin/example_process
0000000000400000    4K r-x-- /usr/bin/example_process
0000000000601000   12K rw--- /usr/bin/example_process
00007fffb6b2b000   56K r---- [heap]
00007fffb6b30000  2048K rw--- [heap]
00007fffb6d2c000    4K r-x-- /lib/x86_64-linux-gnu/libc-2.31.so
00007fffb6d2d000    4K r---- /lib/x86_64-linux-gnu/libc-2.31.so
00007fffb6d2e000    4K rw--- /lib/x86_64-linux-gnu/libc-2.31.so
00007fffb6e00000   64K rw--- [stack]
00007fffb6e40000    4K r---- [vdso]
00007fffb6e41000   12K r-x-- [vdso]
00007fffb6e45000     4K rw--- [vdso]
```



- Start address
- Size of that block
- Process permissions on that block
- Name of memory mapped

Each process has their own virtual memory block. Of course all memory is in them ain memory block, so they need to be mapped to the process virtual memory, e.g., executable files (for this process), shared libraries needed, heap & stack etc.





### Networking

#### netstat



vmstat reports information about processes, memory, paging, block IO, traps, disks and cpu activity.

```
FIELD DESCRIPTION FOR VM MODE
   Procs
       r: The number of runnable processes (running or waiting for run time).
       b: The number of processes in uninterruptible sleep.

   Memory
       swpd: the amount of virtual memory used.
       free: the amount of idle memory.
       buff: the amount of memory used as buffers.
       cache: the amount of memory used as cache.
       inact: the amount of inactive memory.  (-a option)
       active: the amount of active memory.  (-a option)

   Swap
       si: Amount of memory swapped in from disk (/s).
       so: Amount of memory swapped to disk (/s).

   IO
       bi: Blocks received from a block device (blocks/s).
       bo: Blocks sent to a block device (blocks/s).

   System
       in: The number of interrupts per second, including the clock.
       cs: The number of context switches per second.

   CPU
       These are percentages of total CPU time.
       us: Time spent running non-kernel code.  (user time, including nice time)
       sy: Time spent running kernel code.  (system time)
       id: Time spent idle.  Prior to Linux 2.5.41, this includes IO-wait time.
       wa: Time spent waiting for IO.  Prior to Linux 2.5.41, included in idle.
       st: Time stolen from a virtual machine.  Prior to Linux 2.6.11, unknown.
```









### Data wrangling

#### Regular expressionssi

Regular expressions are unbelievably irregular among different tools. The above guide is a short version for regexp used in `bash`. The guide below is for regexp used in `sed`.

Language construct

- `(exp1|exp2)`: Match exp1 or exp2
- `[abc]`: Match `a`, `b`, or `c`
- `[^abc]`: Match character that's not `a`, `b`, or `c``
- ``.`: Any character
- `{}`: n times of preceding construct, see above
- `*`: 0 or more preceding construct
- `+`: 1 or more preceding construct
- `?`: 0 or 1 of preceding construct
- `^`: start of line; `$`: end of line
  Use this as regexp matches expression in the middle as well (think of this as adding .* to both ends)
  Don't confuse `^` with the same used inside square brackets
  Always good practise to use these 2 to "bound" the line
- `(...)`: Capture group to extract info
  Depending on the regexp given by the tool, you may be able to capture a group and apply operators on the whole group without outputting the data
  **^^This is v. useful**
- `(..(..))`: Nested group to extract more info



Shorthands

- `\d`: Any digit
- `\D`: Any Non-digit character
- `[0-6]`, `[^n-p]`, `[A-Za-z0-9_]`: Any character in range (to avoid writing them all out)
- `\w`: Any alphanumeric character (= `[A-Za-z0-9_]`)
- `\W`: Any Non-alphanumeric character (eg. &$#*@!)
- `\t`: tab; `\n`: new line; `\r`: carriage return
- `\s`: match any whitespace character (see above)



Misc

- Use `\` to escape, eg. `\/`, `\.`,`\?`, 

- Always try to make your regexp as specific as possible
- Capture groups:
  Some tools have capturing groups to reference back to the groups
  eg. \0 is full matched text, \1 is group 1, \2 is group 2 etc.
  Example usage:
  Search for "(\d+)-(\d+)" and replace it with "\2-\1" to swap the 2 numbers
- Regexp is v. useful is extracting data out from a complex expression



Resources:

- Regexp debugger: https://regex101.com/

- Tutorial: https://regexone.com/

- **/^1?\$|^(11+?)\1+​\$/**

- This above expression matches any non-prime number. Note the capture group \1 can contain arbitrarily large amount of information, so it is not a regular language
  https://www.noulakaz.net/2007/03/18/a-regular-expression-to-check-for-prime-numbers/

- 





Tools in this chapter:

- `ssh`: secure shell

- `grep`: global regular expression print

- `sed`: stream editor

- `awk`: a programming language specialised for manipulating lines of text. It contains all the functionalities of `grep` and `sed`. See guide for full info

  ```
  BEGIN { rows = 0 }
  $1 == 1 && $2 ~ /^c[^ ]*e$/ { rows += $1 }
  END { print rows }
  ```

- `less`: get STIN (or given file name) to be a easily view-able format that fits inside the terminal

- `sort`: sort lines in STIN, or concatenation of all files given

- `head`: print first lines of a file (default 10)

- `tail`: print last lines of a file (default 10)

- `uniq`: deals with **adjacent** matching lines (usually preceded by a sort)

- `paste`: combine lines with deliminator (can do other things as well probably)

- `bc`: terminal calculator, `bc -i` to use

- `gnuplot`: plotting tool, haven't used it yet

- `xargs`: very cool util that takes input and feed them as argument to a command, will learn to use it when the need arises

- `wc`: word count

- `tr`: translate characters

- `cut`: Remove sections from each line of files

- `paste`: Merge lines of files

- `comm`: compare files

- `join`




#### tr

Syntax:

```shell
tr [OPTIONS] SET1 [SET2]
```

Replaces characters in SET1 with that in SET2. 
The characters are read from left to right, each character in SET1 is mapped to the character in SET2 in the same position. If characters repeat in SET1, we overwrite.

```shell
# w -> W
tr w W

# w -> W
tr www WWW

# w -> W
tr www abW
```

If len(SET1) > len(SET2), last character in SET2 is repeated to match the length
If len(SET1) < len(SET2), SET2 is truncated to match the length

`tr` then takes input from `stdin` and does character replacement, and write to `stdout`

See characters sets (e.g., `[:digit:]`, `[a-d]` ...) here: https://phoenixnap.com/kb/linux-tr

Flags:
- `-c`: take complement of SET1  `tr -c [:alpha:] _ # turn all non-letters into underscores`
- `-d`: deletes characters from SET1  `tr -cd [:alpha:]  # delete everything that are not letters`
- `-s`: process the output by replaces repeated character in the last operand (SET2, or SET1 if SET2 not specified)  `echo "abc" | tr -s abc s   # returns s`
- `-t`: truncates SET1 to length of SET2 (overwrites default behaviour)

Example

```sh
cat genesis | tr -sc [A-Z][a-z] '\n' | sort | uniq -c > genesis.hist

# This counts the occurence of words in genesis
# The `tr` command replaces all non-alpha character with spaces, and -s ensures only 1 consecutive one, effectly putting words in a list
```

#### less

Easier to navigate files. And as it doesn't need to read entire file to display it, start up is quick on large files.


#### head

Get first 10 lines from `stdin`.

Flags:

- `-n <num>`: Get first `num` lines instead of 10
- `-c <bytes>`: Get first `bytes` bytes of the input


#### tail

Print last 10 lines from `stdin` or file

Flags:

- `-n <num>`: Get last `num` lines instead of 10
- `+<NUM>`: Print from line NUM (1-based)
- `-c <bytes>`: Output last `bytes` bytes instead
- `-f`: Output appended data as the file grows
- `-s <N>`: with `-f`, sleep for approximately N seconds (default 1) between iterations
- `--pid <PID>`: with `-f`, terminates after PID dies
- `--retry`: keep trying to open the file if inaccessible



#### sort

sort lines of text files

Flags:

- `-b`: Ignore leading blanks
- `-f`: Ignores case, fold lower case to upper case characters
- `-g`: General numeric sort, sorts according to parsed numbers, not lexicographic ('3' comes before '111')
- `-n`: Numeric sort
- `-h`: Human numeric sort, in addition ('2k' < '1G' etc.)
- `-M`: Month sort (unknown < 'JAN' < ... < 'DEC')
- `-r`: Reverse the result of comparisons
- `-c`: Check for sorted input, do not sort
- `-C`: Check for sorted input, but do not print first wrong line
- `-o`: Write result to file instead of `stdout`
- `-s`: Stable sort
- `--parallel <N>`: Number of parallel sorting processes
- `-u`: Output only first of an equal run
- `-z`: Delimiter is NUL, not `\n`
- `+<FIELD>.<CH>`: Sort starting with <CH>-th character of field FIELD (0-based). E.g. `sort +1.50` sorts starting with 50th character of field 1 




#### uniq

Report or omit repeated lines

- `-c`: prefix lines by # of occurences
- `-u`: only print unique lines
- `-d`: only print duplicated lines, one for each group
- `-D`: only print duplicated lines, print all
- `-f <N>`: avoid comparing the first N fields
- `--group`: show all items, separating groups with an empty line
- `-i`: ignore case when comparing
- `-s <N>`: avoid comparing the first N characters
- `-z`: delimiter is NUL, not default `\n`


#### cut

Remove sections from each line of files

- `-b <LIST>`: output only these bytes
- `-c <LIST>`: output only these characters
- `-d <DELIM>`: use DELIM instead of TAB for field delimiter
- `-s`: do not print lines not containing delimiters
- `--complement`: complement the set of selected bytes, characters, or fields
- `-z`: line delimiter is NUL, not `\n`

Here `LIST` is the list of positions. Example:

```shell
echo abcd | cut -b 1 --complement   # bcd
```


#### paste

Merge lines of files

- `-d <LIST>`: Use <LIST> delimiter instead of TAB (default)
- `-s`: paste one file at a time instead of in parallel

Examples:
```shell
paste file1 file2 file3
# line1_of_file_1 <TAB> line1_of_file_2 <TAB> line1_of_file_3
# line2_of_file_1 <TAB> line2_of_file_2 <TAB> line2_of_file_3
# ...
````

```shell
paste -d <DELIM> file1 file2 file3
# line1_of_file_1 <DELIM> line1_of_file_2 <DELIM> line1_of_file_3
# line2_of_file_1 <DELIM> line2_of_file_2 <DELIM> line2_of_file_3
# ...
````

```shell
paste -s file1 file2 file3
# line1_of_file_1 <DELIM> line2_of_file_1 <DELIM> line3_of_file_1 ...
# line1_of_file_2 <DELIM> line2_of_file_2 <DELIM> line3_of_file_2
# line1_of_file_3 <DELIM> line2_of_file_2 <DELIM> line3_of_file_3
````


#### join

Join lines of files on chosen field.

Each line of file is broken into field by delimiter (default ' '). So line 'A 1 A' has fields ['A', '1', 'A'].

We join the files on a field, default is 1st field for both files, then print out each line `<joined_value> <other_fields_in_line_in_file1> <other_fields_in_line_in_file2> 

Flags:

- `-a <1 or 2>`: also print unpaired lines for file 1 or 2
- `-i`: ignores case on join field
- `-t <DELIM>`: use custom delimiter to separate fields
- `-v <1 or 2>`: same as `-a` but suppress joined lines
- `-1 FIELD`: join on FIELD for file 1, FIELD is an index (1-based)
- `-2 FIELD`: join on FIELD for file 2, FIELD is an index (1-based)
- `-j FIELD`: equivalent to `-1 FIELD -2 FIELD`
- `--check-order`: check input i correctly sorted
- `--header`: treat first line as header, print it but don't involve in join
- `-z`: line delimiter is NUL, not `\n`

Example:
```shell
cat file1.txt
# A 1 A
# B 2 B
# C 3 C

cat file2.txt
# 1 1
# 1 2
# 2 3

join -1 2 file1.txt file2.txt
# 1 A A 1
# 1 A A 2
# 2 B B 3
```


#### grep

In the simplest terms, grep (global regular expression print) will search input files for a search string, and print the lines that match it. Beginning at the first line in the file, grep copies a line into a buffer, compares it against the search string, and if the comparison passes, prints the line to the screen. Grep will repeat this process until the file runs out of lines. Notice that nowhere in this process does grep store lines, change lines, or search only a part of a line. 

Syntax: `grep PATTERNS [FILES ...]`

```shell
# This line adds quotation marks on each line, so you can pipe it to `xargs` to another function without having spaces break up arguments
xargs -d '\n' -I{} echo "\"{}\""

# or do this to directly execute the command, here we're doing rm
xargs -d '\n' -I{} sh -c 'rm "{}"'
```


Flags:

- `-e`: Use extended regex. Can be abbreviated to `egrep`
- `-f`: Interpret pattern as fixed strings, not regex. Can be abbreviated to `fgrep`
- `-g`: Basic regex. This is the default
- `-e PATTERN`: Use PATTERN pattern. Can be applied multiple times to return lines that match at least of these patterns.
- `-f FILE`: Obtain patterns from FILE. Can also be used multiple times
- `-i`: Ignore case distinctions in patterns and input data
- `-v`: Invert match
- `-w`: Matches must form whole words
- `-x`: Matches must form whole lines, equivalent to wrapping pattern with ^ and $
- `-c`: Suppress normal output, instead output the # of matching lines
- `--color`: Colour your outputs!
- `-m NUM`: Stop reading a file after NUM matching lines
- `-o`: Print only the matched portion of each line
- `-q`: Write nothing to `stdout`. Exit with zero status immediately if any match is found
- `-H`: Output each line with the file name. Default when there is more than 1 file to search
- `-h`: Suppress outputting file name
- `-n`: Prefix each output line with 1-based line number in the file
- `-r`: Read all files under each directory
- `-A NUM`: Print NUM lines after each matched line
- `-B NUM`: Print NUM lines before each matched line
- `-C NUM`: Print NUM lines around each matched line (half above half below)

```shell
cat a_file

boot
book
booze
machine
boots
bungie
bark
aardvark
broken$tuff
robots

# simplest use
grep "boo" a_file

# print line number
grep -n "boo" a_file

# print lines that do not match
grep -v "boo" a_file

# don't print lines, just give # of matching lines
grep -c "boo" a_file

# print filenames of files in the query that have lines matching the search string
grep -l "boo" *_file

# ignore case
grep -i "BOO" a_file

# exact matches
grep -x "boot" a_file

# Add additional lines after the matched lines, lines don't repeat if there are overlaps
grep -A2 "boo" a_file  # add 2 additional lines

# You can also match with regular expressions (the above are all just concatenation of characters)
grep "e$" a_file   ""# Lines that end with e

# Turn on -E to get a wider range of regexp (turn it on always)
grep -E "boots?" a_file

```



#### sed

sed performs basic text transformations on an input stream (a file or input from a pipeline) in a single pass through the stream, so it is very efficient. However, it is sed's ability to filter text in a pipeline which particularly distinguishes it from other types of editor.

A `sed` program consists of one or more `sed` commands, passed in by one or more of the -e, -f options, or the first non-option argument if zero of these options are used. 

Each `sed` command has the following syntax:

```shell
[addr]X[options]
```

- `X` is the single character `sed` command identifier
- `[addr]` Optional line address the command is applied to. Can be single line number, range of line, or regex (only operate on matched lines)
- `[options]` Options specific to the `sed` command

Commands within a *script* or *script-file* can be separated by semicolons (;)

```shell
sed [FLAGS] [COMMANDS] [input-file]
```

Flags:
- `--debug`: annotate program execution
- `-n`: suppress automatic printing
- `-e script`: add scrip to the commands to be executed
- `-f script-file`: add the contents of script-file to be commands to be executed
- `-i`: edit file in-place
- `-E/-r`: use extended regex in the script



Commands:
- `s`: substitute. Syntax `s/regexp/replacement/flags`. Replaces first matched portion with `replacement`. Flags:
  - `g`: Apply replacement to all matches, not just first
  - `number`: Only replace *number*th match
  - `p`: If substitution was made, print new pattern space
  - `w filename`: If substitution was made, write result to named file
  - `e`: 
  - `i`: Regexp match in case in-sensitive manner
  - `m`: 
- `#`: comment. Begins a comment in sed scripts
- `q`: exit. Exit without further operation
- `d`: delete. Delete pattern space, go to next line
- `P`: print. Print out pattern space, usually used with `-n` (e.g., `sed -n 2p` => prints only second line)
- `n`: next. Does nothing for line and go to next line, usually used to skip lines. (e.g., seq 6 | sed 'n;n;s/./X/` => prints 1 2 X 4 5 X)
- `{ commands }`: group. Group commands enclosed between { and } together, useful to apply a batch of commands to a single line (e.g., `sed -n '2{s/2/X/ ; p}`)
- `y/source/dest`: transliterate. Works like `tr source dest`
- `a text`: append. Append `text` after line
- `i text`: insert. Insert `text` before line
- `c text`: replace. Replace the line(s) with text
- `=`: line number. Print out current line number before each line
- `r filename`: read. Read file of `filename` and insert into current cycle. (e.g., `sed '2r/etc/hostname`, reads `/etc/hostname` and insert in)
- `w filename`: write. Write the pattern space to `filename`. 



### Processes

```shell
# let process sleep for $1 # of seconds
sleep 20
^C  # bash sends SIGINT (signal interrupt) to the process. do man signal
```

Catching signals:

```python
#!/usr/bin/env python3
import signal, time

def handler(signum, time):
	print("\nI got a SIGINT, but I am not stopping")

signal.signal(signal.SIGINT, handler)
i = 0
while True:
	time.sleep(.1)
	print("\r{}".format(i), end="")
	i += 1
```

```shell
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ ./sigint.py 
15^C
I got a SIGINT, but I am not stopping
23^C
I got a SIGINT, but I am not stopping
26^C
I got a SIGINT, but I am not stopping
29^C
I got a SIGINT, but I am not stopping
77^\Quit (core dumped)
```

Handler is useful when you want to save things to a file before ^C etc.

`SIGKILL` cannot be captured. Though if a process start children processes and you SIGKILL the parent, children processes will still run

Signals:

```shell
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ kill -l
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 5) SIGTRAP
 6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM
16) SIGSTKFLT	17) SIGCHLD	18) SIGCONT	19) SIGSTOP	20) SIGTSTP
21) SIGTTIN	22) SIGTTOU	23) SIGURG	24) SIGXCPU	25) SIGXFSZ
26) SIGVTALRM	27) SIGPROF	28) SIGWINCH	29) SIGIO	30) SIGPWR
31) SIGSYS	34) SIGRTMIN	35) SIGRTMIN+1	36) SIGRTMIN+2	37) SIGRTMIN+3
38) SIGRTMIN+4	39) SIGRTMIN+5	40) SIGRTMIN+6	41) SIGRTMIN+7	42) SIGRTMIN+8
43) SIGRTMIN+9	44) SIGRTMIN+10	45) SIGRTMIN+11	46) SIGRTMIN+12	47) SIGRTMIN+13
48) SIGRTMIN+14	49) SIGRTMIN+15	50) SIGRTMAX-14	51) SIGRTMAX-13	52) SIGRTMAX-12
53) SIGRTMAX-11	54) SIGRTMAX-10	55) SIGRTMAX-9	56) SIGRTMAX-8	57) SIGRTMAX-7
58) SIGRTMAX-6	59) SIGRTMAX-5	60) SIGRTMAX-4	61) SIGRTMAX-3	62) SIGRTMAX-2
63) SIGRTMAX-1	64) SIGRTMAX	
```

Read with `man 7 signal`

Shortcuts

```shell
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ stty -a
speed 38400 baud; rows 24; columns 80; line = 0;
intr = ^C; quit = ^\; erase = ^?; kill = ^U; eof = ^D; eol = <undef>;
eol2 = <undef>; swtch = <undef>; start = ^Q; stop = ^S; susp = ^Z; rprnt = ^R;
werase = ^W; lnext = ^V; discard = ^O; min = 1; time = 0;
```

```shell
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ sleep 10
^Z  # signal to stop
[2]+  Stopped                 sleep 10

# to continue, do fg or bg to continue in foreground or background
bg %2 # 2 is identifier for the job

# let a process run in the background using &
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ sleep 200 &
[1] 8061  # that's the process ID

# see jobs using jobs
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ jobs
[1]+  Running                 sleep 200 &

# when you close the terminal, a SIGHUP signal is sent to the processes which will stop them
# if you don't want that behaviour either do
nohup sleep 200 &
# or do this after the process is executed
sleep 200 &
disown %2  # or whichever number it is

# programs with nohup will no longer appear in jobs after you close and reopen a terminal. You can stop it by saving its PID and call kill on it later
nohup sleep 200 &
$! > bg_pid.txt
kill `cat bg_pid.txt`

# one last thing. `kill` can be used not just for stopping programs! They can send signals as well
kill -HUP %1
kill -STOP %1
```





#### **Terminal Multiplexers**

tmux: session > window > pane; avoids the need to have 10 terminals open

```shell
# start default tmux session
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ tmux
# do ^B ; d to detach
[detached (from session 0)]

# name your new session
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ tmux new -t foobar
[detached (from session foobar-1)]

# go back to session
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ tmux a -t foobar
# ^D to exit
[exited]

# show current sessions
zaiyuming@zaiyuming-Vostro-5581:~/Tech/missing/part4$ tmux ls
0: 1 windows (created Tue Mar  9 15:52:50 2021) [80x23]

# more commands, ^B ;
# c: create new window
# p: previous window
# n: next window
# 1: go to window numbered 1
# $: renamqe current session
# ,: rename current window
# ": create new pane horizontalluy
# %: create new pane vertically
# arrow: move between panes
# space: switch between layouts
# z: zoom in/out of a pane
```

tmux syncs across different terminals, as it's just a process running in the background.

Besides managing windows, tmux also keep the processes in a session running when you detach from the session



#### **Dotfiles**

aliases - kinda like a variable but you don't need the $ every time to use it

```shell
alias gs="git status" # alias takes 1 argument
alias mv="mv -i" # alias into function itself to add flag automatically

# check what the alias is
alias gs
```

./bashrc

Go to github and search dotfiles to see what people have done!

There are many many more dotfiles for other things, like git.

GNU Stow: put all dotfiles in one folder and use symlinks to allow system to link to them from their default locations



#### **Remote Machines**

ssh: Secure shell, open session in remote machine

https://wiki.cs.ox.ac.uk/support/RemoteAccess

```shell
ssh ug19yuz@ecs.ox.ac.uk
# then type in password

logout # for logging out

# you can also execute commands to remote machine and pipe the result back
ssh ug19yuz@ecs.ox.ac.uk ls -l

# copy a file to remote machine, given specified path
scp notes.md ug19yuz@ecs.ox.ac.uk:foobar.md

# copy from where you started (if failed in the middle before)
rsync -avP . ug19yuz@ecs.ox.ac.uk:cmd
```

Some comments:

- I have set up a security key (and its password is omitted when I am logged in). This way I don't need to enter my password to ssh into the remote machine
- You can also create a config file and add username etc. so that `scp` and `rsync` can also use this. This is better than alias but I can't be bothered
- When using tmux in remote machine, it's useful to change ctrl-B to ctrl-somethingElse so that it doesn't execute on your own machine. Basically have 2 config files







#### Editor (vim)

To do:

- search in file explorer
- open and close editor
- switch between editors
- more vscode commands
- switch between 



How to learn

1. Start with tutorial
2. Stick with it to get familiar
3. Look things up as you go

Vim is a modal editor:

- normal mode (esc)
- insert mode (i)
- replace mode (R)
- selection (v)
  - visual line(shift-v)/block(^V)
- command line (:)

Command line:

:q  quit (more specifically, close the current window)

:qa  close all open windows

:q! quit and DISCARD ALL CHANGES

:w   write, basically ^S

:w <filename>   write to the file with <filename>

:wq  write and quit

:r  retrieve line from file and paste it below

:h   help (eg. :h :w), not yet implemented in vscode

:!<command>  execute external command



tabs -> windows. Each window displays a single buffer



**Navigating**

| key                      | effect                                                       |
| ------------------------ | ------------------------------------------------------------ |
| h,j,k,l                  | left, down, up, right                                        |
| w,b,e                    | next/beginning/end of word                                   |
| 0,$                      | beginning/end of line                                        |
| _                        | first non-space character in line                            |
| ^                        | first non-blank character                                    |
| H,M,L                    | top/middle/bottom of screen                                  |
| ^U, ^D                   | scroll up/down                                               |
| gg, G                    | beginning/end of file                                        |
| :{number} <ENTER>        | jump to that line                                            |
| f,t,F,T{character}       | find/to next/previous {character} in current line<br />[good with ct:, dt: etc. to change/delete to : or smth else] |
| /{regexp}<br />?{regexp} | search, n/N for navigating matches<br />search in backwards direction |
| ^O                       | go back where you executed the search                        |
| g*/g#                    | next/prev of current word                                    |
| ^G                       | show line no., col no. and other info                        |
| %                        | jump to matching (, [, { when on top of one                  |
| >>, <<                   | Indent, unindent                                             |
|                          |                                                              |
|                          |                                                              |
|                          |                                                              |
|                          |                                                              |
|                          |                                                              |





**Editing**

| key       | effect                                                       |
| --------- | ------------------------------------------------------------ |
| i         | go into insert mode                                          |
| o,O       | insert line below/above                                      |
| d{motion} | delete {motion}                                              |
| c{motion} | change {motion}, basically delete followed by insert         |
| a         | append, aka. enter insert mode in next character<br />[good to follow from e] |
| A         | apppend to end of line                                       |
| .         | repeat previous editing change, for doing small repetitive tasks |
| x         | delete a character                                           |
| s         | substitute a character, equal to xi                          |
| r         | go into replace mode, replace a character?                   |
| u, U      | undo, undo whole line                                        |
| ^C        | redo                                                         |
| y{motion} | yank {motion}                                                |
| p, P      | paste after/before cursor                                    |
| ~         | flip case of character                                       |
|           |                                                              |
|           |                                                              |
|           |                                                              |
|           |                                                              |
|           |                                                              |

{motion}: w - word, e - end of word, $ - end of line, l - character, <same char> - line



**VIsual mode**





**Counts**

You can combine nouns and verbs with a count, which will perform a given action a number of times.

- `3w` move 3 words forward
- `5j` move 5 lines down
- `7dw` delete 7 words, you can also do `d7w`
- `2dd` delete 2 lines



**Modifiers**

You can use modifiers to change the meaning of a noun. Some modifiers are `i`, which means “inner” or “inside”, and `a`, which means “around”.

- `ci(` change the contents inside the current pair of parentheses
- `ci[` change the contents inside the current pair of square brackets
- `da'` delete a single-quoted string, including the surrounding single quotes



**Options**, use :set

- ic: ignore case in search (:set noic)
  `/<word>\c <ENTER>` to ignore case in this one search
- hls: highlight words (:nohlsearch)
- is: incrementally highlight words (:set nois)



**Advanced**

Substitution:

​	 To substitute new for the first old in a line type    		:s/old/new
​     To substitute new for all 'old's on a line type       		:s/old/new/g
​     To substitute phrases between two line #'s type       	:#,#s/old/new/g
​     To substitute all occurrences in the file type        			:%s/old/new/g
​     To ask for confirmation each time add 'c'            		 :%s/old/new/gc

Write part from file:

- Use v to select the part your want and do `: w <filename>` to write only that part to file



**Misc**

- Vim copies and pastes with its own register. You can access the system's clipboard with ^C and ^V normally.



Other things about vim

- ~/.vimrc: config file
- Plugins
- Vim mode for other stuff (bash, python REPL, vscode, jupyter notebook)
- 







#### Debugging

**Print statements** is the simplest way, but not the best way to get the most information out.

**Logging** is also good, and it has the advantage that it shows you places where you won't look at before

- Debugging level is useful: aka. only print severe logs or all logs

- Having each level with a different colour is useful, esp. when you have thousands of logs
  Colours can be set using ANSI escape code in terminals

  ```shell
  printf "\e[38;2;255;0;0m  This is red     \e[0m"
  ```

- Most Ubuntu logs are stored in `/var/log/`

- `journalctl` extracts all system logs and displays them

- You can do `logger <msg>` to add your own log to system log

**Debugger** is the next tool. It allows you to execute code in a "step-by-step" manner and investigate program state in each state

- `python3 -m ipdb <program>`: 
  - `l`: list code
  - `s`: step, one line at a time go through execution
  - `restart`: restart the program
  - `c`: run step wise until first uncaught error
  - `p <args>`: print value of a variable at this moment
    `p locals()` give you python dict that shows value of all the variables (local is a python function)
  - `b <linenum>`: puts a breaking point at a line number, so doing `c` will run till program reaches that line
  - `q`: quit debugger

- `gdb` is good for C, C++, and any binary. It can show you nice low-level machine state, like the stack and values held in registers
  eg `gdb --arg sleep 20`
- `sudo strace` can run the code as a blackbox and give you all the system calls it made
  eg. `sudo strace ls -l > /dev/null`
- You can also use various static analysis tools that analyses the semantics of your code and report if any error is found (eg. type error, undefined variables)
  - `pyflakes`, `mypy` (which does some type checking, see type_error.py in the folder)
  - `writegood` for english



#### Profiling

You can do `start = time.time()` in python and do `print(time.time() - start)` to get the time.

But that's the **real time**, which is time from start to finish of the call. This can account for a lot of things, such as CPU spending time context switch to other tasks before returning to this task

There is **user time** which is amount of CPU time spent in user-mode code for the process, **system time** the same as user time but counting the time spent in the kernel for the process

```shell
# `time` gets you the 3 times
time curl https://www.google.com/ &> /dev/null
```

There are 2 types of profiling tools

1. tracing profiler: "Follows" your code as your program goes along, logs the amount of time your program spends on each part of your code. The downside is the overhead likely to be high
2. sampling profiler: Stop the program at each period (eg. 100ms), look at stack trace, and log where you are. If there are enough data, we can get a pretty good statistic on the time spent on each part of your code

For python, you can use **cProfile**

Example:

```shell
# -m means use module, -s tottime means sort by total time spent
2007:~/Tech/Python/Saves/Project Euler$ ▷ python3 -m cProfile -s tottime ~/Tech/missing/part6/grep.py 1000 '^(import|\s*def)[^,]*$' *.py | less
```

most time spent on: printing, compiling re, searching for pattern

Another example:

```shell
# tac is like cat but reversed, which basically prints the last line first
python3 -m cProfile -s tottime get_url.py | tac
```

the profiler doesn't tell us which call corresponds to which call in the function. Instead we can use the **line_profiler** module in python (and provide a `@profile` decorator)

```
kernprof -l -v get_url.py
```

We can also use a **memory_profiler** to get info about memory usage:

```
python3 -m memory_profiler mem.py
```

We can use **perf** to track CPU stats.

Ways to visualise profiling data (as humans not really great at interpreting lots of numbers quickly)

- Flame graph (x-axis corresponds to % of time spent)
- Call graph (what function called what, can be used to see what function is using an expensive resource for example)
  `pycallgraph`, `graphviz`





#### Build system

Encode commands to run to build a target or run a test suite or any standard pipeline, into a single tool. You might also want to encode file dependencies. `npm` has lots of support for creating build system by tracking dependencies etc.

##### **Make**

- Make is its own language. It's weird like bash but weird in a different way
- Every call to make does the minimum work to rebuild
- The documentation is actually v. long (make.pdf in current dir). Either try to adapt existing Makefile or do a quick tutorial
- Standard make targets: https://www.gnu.org/software/make/manual/html_node/Standard-Targets.html#Standard-Targets



#### **Repositories:**

- Sometimes you want dependencies on packages, which could be too difficult to track with the makefile. That's where repositories come in
- `pypy`, `npm`, `apt`  etc.
- close vs. open repo



#### **Versions:**

- Versions are useful, as newer versions of a package might break another package
- Semantic versioning:
  major.minor.patch, eg. v8.1.7
  try `python --verison` `scala --version`
  - patch: change to code that doesn't change the interface (all backward compatible)
  - minor:  **adding** things to library (eg. a feature). increase minor num and set patch num to 0. This is important bc someone else's software need that feature, then it needs v8.x.y where x >= 2 and y can be anything.
  - major: backward **incompatible** changes
- Try to bring down version requirement as low as possible when writing software



#### **CI - continuous integration**

- eg. Run testsuite when someone submits a pull request, Update on pypy when someone pushes to a commit
- They are all "event triggered actions (ie. scripts)"
- Board CI platforms: `Azure Pipelines`, `Git Actions`
- Github Pages CI: have .md files in your repo. And the CI will refresh the website whenever there is a push. It uses the jekyll, which takes plain text into static websites and blogs
  https://jekyllrb.com/







#### **Daemons**

= background processes. Eg. network manager, display manager ...

Daemons usually have their name ending in the letter d

In Linux, `systemd` is the master daemon that spawns smaller daemons. To create your own daemon, add it to systemd.

```shell
# /etc/systemd/system/myapp.service
[Unit]
Description=My Custom App
After=network.target

[Service]
User=foo
Group=foo
WorkingDirectory=/home/foo/projects/mydaemon
ExecStart=/usr/bin/local/python3.7 app.py
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

`cron` is a daemon your linux system already have set up to run scheduled tasks

`systemctl status` to check which daemons are running and what is spawned by what





#### **Back-ups**

Hardware failure do happen

Learn more: https://missing.csail.mit.edu/2019/backups/



#### **APIs**

Facebook, Spotify etc. all have nice APIs that could be used to do non-trivial tasks. The possibilities are endless

Most of these APIs have similar format: structured URLs, often `api.<service>.com`. Use `curl` and `jq` (for JSON files)

Tool to chain different APIs: https://ifttt.com/





#### Redirecting output

3 streams:
`stdin` with stream ID 0, `stdout` 1, `stderr` 2.

`>` is redirect output (clears the file first), `>>` is append.

`>` is shorthand for `1>`, aka. redirect `stdout`

```sh
# Redirects stdout
$> python ./do-stuff.py > output.txt

# Redirects both stdout and stderr
$> python ./do-stuff.py > output.txt 2> error.txt

# Redirects both to same file
$> python ./do-stuff.py >> output.txt 2>> output.txt

# Or do this in one operator (like "output stderr to same destination as stdout")
$> python ./do-stuff.py > output.txt 2>&1
```









#### curl

https://www.affiliate-engine.com/scraping/how-to-use-curl-for-web-scraping/#web-scraping-using-curl



#### symlink

A symbolic link is like a windows shortcut. We create it using the `ln` util

To create a symbolic link for a directory, do

```shell
ln -s [absolute path to the folder you want to create symlink] [absolute path to folder to place the symlink in]
```

For example

```shell
ln -s ~/Project/mycroft-core/skills/ ~/Documents/skills/
```

And you can check the symlinks with `ls -l`



