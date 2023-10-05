# MIT CSAIL - The missing semester

### TODO

Finish exercises in Command-line env. chapter

- curl



### 1. The shell :turtle:

Part 1

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





LEDs

In `/sys/classes/leds` you can change the scrollock led for the keboard



More utils

`nano`: simple text editor

`touch`: util to create new empty file (amongst other things that no one uses it for)

`sh`: dash runs commands. It can also turn files into executables

```shell
#!/bin/sh  //run with dash (aka. set dash as the the interpreter)
curl --head --silent https://missing.csail.mit.edu  #the input to dash
```

`chmod`: change permission of files





### 2. Shell Tools and Scripting :page_with_curl:

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

```bash
mcd () {
	mkdir -p "$1"  # access first arg with $1, similarly for $2 - $9
	cd "$1"
}
```

To avoid typing, save the program in `mcd.sh` and then do `source mcd.sh` on the cmd to execute this file and hence add the function to bash. bash is like an interpreter

```shell
# $_ give last argument
mkdir AVeryLongDirName
cd $_

# !! give last command
reboot
sudo !!  # which is sudo reboot

# $? gets the error message
echo "Hello"
echo $?  # 0 - everything is fine

grep virus mcd.sh
echo $?  # 1 - grep didn't find it

# In bash, truth values are flipped
true
echo $?  # 0
false
echo $?  # 1

# || and && have opposite control flow behaviour
false || echo "Oops fail"
true || echo "Will not be printed"
true && echo "Thing went well"
false && echo "Thing will not print"
false; echo "Thing will print regardless"  # command concat

# grabbing values
foo=$(pwd)  # execute the function pwd and save the result in foo

# process substitution
cat <(ls) <(ls ..)  # <(stuff) executes stuff in the parenthesis and put it in a temporary file. This is useful when program expects a file rather than a string

# text substitution
sudo apt install $(cat .my_packages) # $(stuff) executes stuff and insert its output to the command. Here we let aptitude install software in a pre-set list
```

**Conditional execution vs. condition testing**

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



### Aside1. Globs and Regexp

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



### 3. Data wrangling

#### Regular expressions

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

- # **/^1?\$|^(11+?)\1+​\$/**

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



**Getting content from ssh**

```bash
# Use quotation to specify the pipe
$ sshox 'journalctl | grep sshd | grep "Disconnected from"' > ssh.log
$ less ssh.log
```



**grep**

In the simplest terms, grep (global regular expression print) will search input files for a search string, and print the lines that match it. Beginning at the first line in the file, grep copies a line into a buffer, compares it against the search string, and if the comparison passes, prints the line to the screen. Grep will repeat this process until the file runs out of lines. Notice that nowhere in this process does grep store lines, change lines, or search only a part of a line. 

```bash
vim a_file

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



**sed**

sed performs basic text transformations on an input stream (a file or input from a pipeline) in a single pass through the stream, so it is very efficient. However, it is sed's ability to filter text in a pipeline which particularly distinguishes it from other types of editor.

```bash
# Scan every line, replace longest string that match the regexp pattern with the replacement, output on STOUT
# not 100% sure what the -e part does
# note you can also add more files as arguments
sed 's/bo*/b/' a_file

# Replace onto current file
sed -i 's/bo*/b/' a_file_copy

# NOTE: never do this in sed or any other program, as this can sometimes give race conditions
sed 's/bo*/b/' a_file_copy > a_file_copy

# & is the string that matches the regexp
sed -E 's/[0-9]+/(&)/' numbers

# Capture groups also work, but you need the -E (or -r) flag for extended regexp
grep -E '\.ox\.ac\.uk$' emails |
sed -E 's/(\w+).(\w+)@(keble|chch).ox.ac.uk/\1 \2 @ \3/'

# even cooler
grep -E '\.ox\.ac\.uk$' emails |
sed -E 's/(\w+).(\w+)@(keble|chch).ox.ac.uk/\1,\2,\3/' >
new_members.csv

# There are many more sed commands, the general pattern is "sed '/pattern/ command/ my_file'"
# Prints all lines starting with b, use -n to suppress the default printing as sed prints all lines by default
sed -n '/^b/ p' a_file

# Delete lines not starting with b
sed '/^[^b]/ d' a_file

# You can also specify a range (via line numbers) on the lines to execute the command on
sed -n '1,5 p' a_file  # print line 1 to 5
sed -n '2,$ p' a_file  # print line 2 to end of file (note ^ doesn't work for start of file, just use 1)

# You can also specify range by regexp, start from first line that matches first regexp and end on first line after that matches second regexp (or stop at end of file)
sed -n '/boot/,/boot/ p' a_file

```



**sort**

- `-r`: reverse order
- `-n`: numeric order (lexicographic by default, which make 11 < 2)



**head, tail**

- `-n`: specify how many lines (eg. `-n5` for 5 lines)



**uniq**

- `-c`: count the # of repeats and put it in front of the line
- `-d`: only print duplicated lines
- `-u`: only print unique lines



**paste and bc**

```bash
# -s combines all lines with delimitor (-d) +
# -l then tells bc to interpret it as matlab???
# adds all numbers.
# the last 0 is for style points
cat numbers <(echo 0) | paste -sd+ | bc -l

```



















### 4. Command-line Environment

**Job Control**

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





**Terminal Multiplexers**

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



**Dotfiles**

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



**Remote Machines**

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







### 5. Editor (vim)

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





### 6. Debugging & Profiling

There are many debuggers, each for a particular language. For profilers, 

#### Debugging

**Print statements** is the simplest way, but not the best way to get the most information out.

**Logging** is also good, and it has the advantage that it shows you places where you won't look at before

- Debugging level is useful: aka. only print severe logs or all logs

- Having each level with a different colour is useful, esp. when you have thousands of logs
  Colours can be set using ANSI escape code in terminals

  ```bash
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

```bash
# `time` gets you the 3 times
time curl https://www.google.com/ &> /dev/null
```

There are 2 types of profiling tools

1. tracing profiler: "Follows" your code as your program goes along, logs the amount of time your program spends on each part of your code. The downside is the overhead likely to be high
2. sampling profiler: Stop the program at each period (eg. 100ms), look at stack trace, and log where you are. If there are enough data, we can get a pretty good statistic on the time spent on each part of your code

For python, you can use **cProfile**

Example:

```bash
# -m means use module, -s tottime means sort by total time spent
2007:~/Tech/Python/Saves/Project Euler$ ▷ python3 -m cProfile -s tottime ~/Tech/missing/part6/grep.py 1000 '^(import|\s*def)[^,]*$' *.py | less
```

most time spent on: printing, compiling re, searching for pattern

Another example:

```bash
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



### 7. Metaprogramming

#### Build system

Encode commands to run to build a target or run a test suite or any standard pipeline, into a single tool. You might also want to encode file dependencies. `npm` has lots of support for creating build system by tracking dependencies etc.

**Make**

- Make is its own language. It's weird like bash but weird in a different way
- Every call to make does the minimum work to rebuild
- The documentation is actually v. long (make.pdf in current dir). Either try to adapt existing Makefile or do a quick tutorial
- Standard make targets: https://www.gnu.org/software/make/manual/html_node/Standard-Targets.html#Standard-Targets



**Repositories:**

- Sometimes you want dependencies on packages, which could be too difficult to track with the makefile. That's where repositories come in
- `pypy`, `npm`, `apt`  etc.
- close vs. open repo



**Versions:**

- Versions are useful, as newer versions of a package might break another package
- Semantic versioning:
  major.minor.patch, eg. v8.1.7
  try `python --verison` `scala --version`
  - patch: change to code that doesn't change the interface (all backward compatible)
  - minor:  **adding** things to library (eg. a feature). increase minor num and set patch num to 0. This is important bc someone else's software need that feature, then it needs v8.x.y where x >= 2 and y can be anything.
  - major: backward **incompatible** changes
- Try to bring down version requirement as low as possible when writing software



**CI - continuous integration**

- eg. Run testsuite when someone submits a pull request, Update on pypy when someone pushes to a commit
- They are all "event triggered actions (ie. scripts)"
- Board CI platforms: `Azure Pipelines`, `Git Actions`
- Github Pages CI: have .md files in your repo. And the CI will refresh the website whenever there is a push. It uses the jekyll, which takes plain text into static websites and blogs
  https://jekyllrb.com/



**Test terms:**

- **Test suite**: A collection of tests
- **Integration test**: Test relationship between sub-systems
  say you are building a parser. Integration tester could test the whole system by letting it parse a whole file
- **Regression test**: Test things that were broken in the past. Add a test for each bug you fixed, prevent program from "regressing" to earlier bugs
- **Mocking**: Mock a part of your function that needs to be there, but isn't used. 
  eg. you are creating a ssh functionality and a test cares a functionality that doesn't need a real remote connection. You can then "mock" the connection to save time.



### 8. Potpourri

**Keyboard remapping**

- CAPSLOCK to be esc in vim
- Insert to something else, cus insert is horrendous
- ?: new browser tab



**Daemons**

= background processes. Eg. network manager, display manager ...

Daemons usually have their name ending in the letter d

In Linux, `systemd` is the master daemon that spawns smaller daemons. To create your own daemon, add it to systemd.

```bash
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



**FUSE file system**

... I zoned out



**Back-ups**

Hardware failure do happen

Learn more: https://missing.csail.mit.edu/2019/backups/



**APIs**

Facebook, Spotify etc. all have nice APIs that could be used to do non-trivial tasks. The possibilities are endless

Most of these APIs have similar format: structured URLs, often `api.<service>.com`. Use `curl` and `jq` (for JSON files)

Tool to chain different APIs: https://ifttt.com/



**Common command-line flags/patterns**

- `--help`: print condensed information on how to use the service
- `--version`: print version number, also useful to check if a software is installed
- `--verbose/-v`: increase info printed from tool. You can do `-vvvv` (more v's) to increase info even more
- dry run flag: run the tool, not make changes but inform you what you would have done. This is useful for changes that cannot be undone
- `-i`: interactive mode
- `-r`: recurse, eg. for `rm`, `cp` etc.

When your argument has the same shape as a flag, eg. a file called `-i`. To get around it, use `--`, which tells the program that whatever follows it aren't flags

```bash
# remvoe file "-i"
rm -- -i
```



**Window managers**

The default is the "floating window manager"

There's also "tiling window manager" which is like panes in tmux



**VPNs**

Make your traffic on the internet seems like it comes from somewhere else.

It might not give you more security, because you are simply shifting your trust from internet provider to the VPN provider



**Markdown**

Been using it for over a year :)



**Hammerspoon (desktop automation on macOS)**

[Hammerspoon](https://www.hammerspoon.org/) is a desktop automation framework for macOS. It lets you write Lua scripts that hook into operating system functionality, allowing you to interact with the keyboard/mouse, windows, displays, filesystem, and much more.

- Save layouts for different locations (work, home etc.) where there are different displays
  It can even detect changes, eg. connecting to a network

Similar tools exist in linux



**Booting in live USB**

The OS lives in the USB and lets you boot into it to interact with the machine. Useful for retrieving data when OS is dead



**Docker, Vagrant, VMs, Cloud, OpenStack**

VM: virtual machine, useful to create a separate environment to test things

You can also rent VM from the cloud (AWS, Google Cloud): eg. web service, slack bot, doing ML



**Notebook programming environments**

Jupyter: Interactive notebook that can evaluate snippets of code, good for ML









### Author's notes

Initial feel of bash: Learning curve is steeper than I thought. Main reasons being:

- Bash is an entire programming language that's not quite like other languages as it's quite low-level, so a lot to learn
- Lots of utilities to learn (eg. grep, sed, awk etc.)







### curl

https://www.affiliate-engine.com/scraping/how-to-use-curl-for-web-scraping/#web-scraping-using-curl



### symlink

A symbolic link is like a windows shortcut. We create it using the `ln` util

To create a symbolic link for a directory, do

```bash
ln -s [absolute path to the folder you want to create symlink] [absolute path to folder to place the symlink in]
```

For example

```bash
ln -s ~/Project/mycroft-core/skills/ ~/Documents/skills/
```

And you can check the symlinks with `ls -l`



