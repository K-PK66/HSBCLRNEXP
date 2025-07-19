# Linux Primer

First, use `ssh student@hsbc-xian-linux82.neueda.com` to reach the SSH connect to the remote machine of Linux.

```shell
student@hsbc-xian-linux82.neueda.com's password: n3u3da!
Last login: Thu Jul 17 03:12:21 2025 from 210.74.156.195
   ,     #_
   ~\_  ####_        Amazon Linux 2
  ~~  \_#####\
  ~~     \###|       AL2 End of Life is 2026-06-30.
  ~~       \#/ ___
   ~~       V~' '->
    ~~~         /    A newer version of Amazon Linux is available!
      ~~._.   _/
         _/ _/       Amazon Linux 2023, GA and supported until 2028-03-15.
       _/m/'           https://aws.amazon.com/linux/amazon-linux-2023/

[student@ip-172-30-0-153 ~]$ 
```

Linux, the operation system, uses `man`, the command in abbreviation of *manual* to offer help of certain commands.

```bash
man ls
```

You can also refer to [Stackoverflow.com](stackoverflow.com) or other websites for help &mdash; **please clarify the operation system type of RHEL or Debian if so.**

> There're so many Linux operation systems on market due to its open-source property.

## Basic File Commands

`cd`, the command abbreviating *change directory* the phrase, can get about some folders.

```bash
# All commands below can get the terminal to HOME
cd ~
cd
cd $HOME
# Commands below will switch the terminal to specific folders, using the absolute path
cd /etc/bin
# Commands below will switch the terminal to specific folders, using the relative path
cd ../..
cd etc/bin
```

> You may be confused on what is the difference between the absolute path and the relative one. The absolute path will start with a `/` that stands for the primary root of every thing, which is not featured in relative path.
> The relative paths are dependent on the current directory.

`mkdir`, the abbreviation of phrase *make directory*, will create directories or child directories when parent directories do not exist.

```bash
[student@ip-172-30-0-153 ~]$ mkdir gu
[student@ip-172-30-0-153 ~]$ cd gu
[student@ip-172-30-0-153 gu]$
```

We can also create directory by `mkdir` inside a directory we've just created. After creation, we can use `ls` to view the attributes of files and directories.

> **Linux is case-sensitive** &mdash; please check the capitalized letters in your commands and make sure that the name of directories or files you entered is correct before running your command.

|Options|Description|
|-------|-----------|
|`-l`|Long listing format, with permissions, ownership, size & timestamp|
|`-h`|Human-readable sizes, usually used with `-l`|
|`-a`|Show all files, including hidden ones|
|`-A`|Show almost all, excluding `.` and `..` from `-a`|
|`-S`|Sort by file size, largest first|
|`-t`|Sort by modification time, newest first|
|`-r`|Reverse the order of the sort|
|`-R`|Recursive listing &mdash; lists all subdirectories and their contents|
|`-d`|List directories themselves|
|`-i`|Show the inode number for each file|
|`-1`|Show one file per line|
|`-F`|Add symbol indicators|
|`-X`|Sort by file extension|
|`-c`|Sort by change time|

```bash
[student@ip-172-30-0-153 gu]$ mkdir dir1
[student@ip-172-30-0-153 gu]$ cd
[student@ip-172-30-0-153 ~]$ ls gu
dir1
# list attributes of all files and directories in /etc/cron.daily
[student@ip-172-30-0-153 ~]$ cd ..
[student@ip-172-30-0-153 home]$ cd ..
[student@ip-172-30-0-153 /]$ ls -a /etc/cron.daily
total 12
-rwx------ 1 root root 219 Jul 27  2018 logrotate
-rwxr-xr-x 1 root root 618 Apr 29  2019 man-db.cron
-rwx------ 1 root root 208 Jul 27  2018 mlocate
# List the file/directories in /etc/cron.daily in ascending order of size
[student@ip-172-30-0-153 /]$ ls -Sr /etc/cron.daily
mlocate  logrotate  man-db.cron
# Show all hidden files in your home directory
[student@ip-172-30-0-153 /]$ ls -a $HOME
.  ..  .bash_history  .bash_logout  .bash_profile  .bashrc  gu
# Show more human-readable file sizes for those in /etc/cron.daily
[student@ip-172-30-0-153 /]$ ls -sh /etc/cron.daily
total 12K
4.0K logrotate  4.0K man-db.cron  4.0K mlocate
[student@ip-172-30-0-153 /]$ 
```

## Process

A ***Process*** is an instance of a program being executed in a multitasking operating system. Thus, all process start as a file containing executable code (also called a ***binary***).

Use `ps`, the command to show process status which allocates your own processes and all processes with extra attributes and what the columns mean.

```bash
[student@ip-172-30-0-153 ~]$ ps
  PID TTY          TIME CMD
 7319 pts/0    00:00:00 bash
 7593 pts/0    00:00:00 ps
[student@ip-172-30-0-153 ~]$ 
```

We can access other attributes by using `-o $indicator_name$`.

```bash
[student@ip-172-30-0-153 ~]$ ps -o tty
TT
pts/0
pts/0
```

To manage process, we can use some special `Ctrl` key presses. For example, `Ctrl+C` will terminate currently running process on terminal and `Ctrl+Z` will stop/sleep the currently running process on terminal so that user can start it later.

> *Stop*, the word used above, is different from *terminate* &mdash; the latter one will mob the process completely from the memory and will release all resources the terminated-already process previously occupied, but the former one will not.

`PID`, the abbreviation of phrase `Process ID`, can be referred after `kill` command to terminate *YOUR OWN* process with `PID` as the number. `kill -9 $PID$` will terminate the process **regardless**, which can be hazardous.

`strace`, the command read as *S-trace*, is to view the C library calls on a live running program to see what it's doing. `lsof`, the abbreviation of *List Open Files*, can view all the files and network ports a program has open.

```bash
# Identify the processes running
ps u
# Identify the daemon processes on the system
ps -e -o pid,ppid,cmd,stat,tty | grep '?'
# Start up a few more shell processes & list all current processes running
vi test
:!sh
bash
ps u
# Terminate the vi process
pkill vi
```

## Variables

> Suppose a scenrio where we have 3 environments `DEV`, `QA` and `PROD`. Our application uses a database to store important information, e.g. users account details.
>
> - Should `DEV` applications be able to query the production database? &mdash; Not advisable.
> - Should the `PROD` environment applications be able to connect with the `DEV` database? &mdash; Negative.

Let's say our app has a variable for the database server hostname called `DBHOST` and our hostnames for `DEV` and `PROD` are `db.dev.neueda.com` and `db.prod.neueda.com` respectively &mdash; `DBHOST`, our variable, must be set before running the command to such hostnames.

Export your variable to make it available to your app by `export DBHOST`. It's also possible to conduct the 2 operations in one single go for Bash & Ksh shells &mdash;

```bash
export DBHOST=db.dev.neueda.com
```

> Linux takes space-separated elements as different values, so do **NOT** employ space to surround `=`, the equivalent sign.

Use `set` to view all variables for current terminal shell session. `env`, the short for `environment`, is used to view all exported variables for your terminal shell session.

To view a specific variable, use `echo`. To remove a variable from session, use `unset`.

```bash
man ls
# check the current state of MANPATH variable
echo $MANPATH
# create the variable MANPATH and set the value to hello
MANPATH=hello
# check whether the MAN help page is still available
man ls
# make MANPATH an environment variable
export MANPATH
# check help page again
man ls
# make the help page work again
unset MANPATH
man ls
```

## The File-Work

Use `echo` and `>` to redirect the output to a certain file, rather than screen, the default output device. This will empty the file and add what you `echo`ed to the file if it exists and will create the file otherwise.

> Taken such things into consideration, please do **NOT** use `>` to redirect to the file you are using.

Use `cat` to display what the file contains.

```bash
[student@ip-172-30-0-153 ~]$ echo hello
hello
[student@ip-172-30-0-153 ~]$ echo hello > test.txt
[student@ip-172-30-0-153 ~]$ cat test.txt
hello
```

Use `>>` to append what you `echo`ed to the end of the file if the file exists. A file with the contents will be created otherwise.

```bash
[student@ip-172-30-0-153 ~]$ echo hello > test.txt
[student@ip-172-30-0-153 ~]$ cat test.txt
hello
[student@ip-172-30-0-153 ~]$ echo fuck >> test.txt
[student@ip-172-30-0-153 ~]$ cat test.txt
hello
fuck
```

Use `cp`, the short of *copy*, `mv`, the short of *move*, `rm`, the short of *remove* and `rmdir` to make basic file manipulation.

> `mv` can also function to rename a file. Both `cp` and `mv` follow the syntax `$command$ $src$ $dest$` and `$command$ $src$ $src$ $src$ ... $directory$`.
> Anyone cannot remove any non-empty directory by `rmdir` the command, but can remove it by `rm -r`.

```bash
[student@ip-172-30-0-153 ~]$ mkdir gu
[student@ip-172-30-0-153 ~]$ cd gu
[student@ip-172-30-0-153 gu]$ echo hello > test_gu.txt
[student@ip-172-30-0-153 gu]$ cd
[student@ip-172-30-0-153 ~]$ rmdir gu
rmdir: failed to remove ‘gu’: Directory not empty
[student@ip-172-30-0-153 ~]$ rm -r gu
[student@ip-172-30-0-153 ~]$ 
```

To change one's access to a file, use `chmod`. Above all, Linux offers information about the access of a file in format `drwxrwxrwx` with the meanings below.

```plain
 |current_User|Group_member|Others|
-| r   w   x  | r    w   x | rwx  |
```

`0` and `1`, the binary flag, can be used to imply the access of such 3 kinds of users. We can, thus, use 3 decimal digits representing the binary compound to grant multiple accesses at a time.

```bash
[student@ip-172-30-0-153 ~]$ ls -l
total 4
-rw-rw-r-- 1 student student 11 Jul 17 08:23 test.txt
# deny permission to read
[student@ip-172-30-0-153 ~]$ chmod u-r test.txt
[student@ip-172-30-0-153 ~]$ ls -l
total 4
--w-rw-r-- 1 student student 11 Jul 17 08:23 test.txt
# grant ALL permission to ALL groups of user
[student@ip-172-30-0-153 ~]$ chmod 777 test.txt
[student@ip-172-30-0-153 ~]$ ls -l
total 4
-rwxrwxrwx 1 student student  11 Jul 17 08:23 test.txt
# grant ALL permission to ALL groups of user, except writing access for group members
[student@ip-172-30-0-153 ~]$ chmod 757 test.txt
[student@ip-172-30-0-153 ~]$ ls -l
total 4
-rwxr-xrwx 1 student student  11 Jul 17 08:23 test.txt
```

We can use `2>&1` to store errors &mdash; `2>` is essentially the `stderr`, short for *standard error*, and `&1`, standing for the `stdout` redirection, to merge `stderr` and `stdout` into the same file.

In the example below, `&1` will redirect to `both.txt`, the file entered previously.

```bash
[student@ip-172-30-0-153 ~]$ ls -z > both.txt
ls: invalid option -- 'z'
Try 'ls --help' for more information.
[student@ip-172-30-0-153 ~]$ cat both.txt
[student@ip-172-30-0-153 ~]$ ls -z > both.txt 2>&1
[student@ip-172-30-0-153 ~]$ cat both.txt
ls: invalid option -- 'z'
Try 'ls --help' for more information.
[student@ip-172-30-0-153 ~]$ 
```

Think about the following commands. They will be frequently used in Git-related chapter.

```bash
# create a directory and consider it a project directory
[student@ip-172-30-0-153 ~]$ mkdir gu
# navigate to the project directory
[student@ip-172-30-0-153 ~]$ cd gu
# list all files, including hidden
[student@ip-172-30-0-153 gu]$ ls -a
.  ..
# create or edit 3 different txt files in the same directory
[student@ip-172-30-0-153 gu]$ touch 1.txt
[student@ip-172-30-0-153 gu]$ touch 2.txt && touch 3.txt
[student@ip-172-30-0-153 gu]$ ls -a
.  ..  1.txt  2.txt  3.txt
# check line ending of 1.txt, the file, after inserting a line
[student@ip-172-30-0-153 gu]$ echo hello > 1.txt && cat -A 1.txt
hello$
# '$' stands for LF. '^m$' stands for CRLF.
# count lines in that file
[student@ip-172-30-0-153 gu]$ wc -l 1.txt
1 1.txt
[student@ip-172-30-0-153 gu]$ echo fuck >> 1.txt && wc -l 1.txt
2 1.txt
# search for 'hell', the specific text, in 1.txt
[student@ip-172-30-0-153 gu]$ grep 'hell' 1.txt
hello
# 'hell' above will be displayed in a different font color and font weight
# find recently modified files
[student@ip-172-30-0-153 gu]$ ls -lt | head -n 2
total 4
-rw-rw-r-- 1 student student 11 Jul 18 01:50 1.txt
# compare 2 files
[student@ip-172-30-0-153 gu]$ diff 1.txt 2.txt
1,2d0
< hello
< fuck
# set file permission for execution
[student@ip-172-30-0-153 gu]$ chmod 754 1.txt
[student@ip-172-30-0-153 gu]$ ls -lt | head -n 2
total 4
-rwxr-xr-- 1 student student 11 Jul 18 01:50 1.txt
# compress the project folder
[student@ip-172-30-0-153 gu]$ cd
[student@ip-172-30-0-153 ~]$ tar -czvf gu.zip gu
gu/
gu/1.txt
gu/2.txt
gu/3.txt
# check the zip size
[student@ip-172-30-0-153 ~]$ ls
gu  gu.zip
[student@ip-172-30-0-153 ~]$ ls -sh && ls -sh gu
total 4.0K
   0 gu  4.0K gu.zip
total 4.0K
4.0K 1.txt     0 2.txt     0 3.txt
[student@ip-172-30-0-153 ~]$ 
```

***

# Git

An open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Go to [download page of Git](https://git-scm.com/downloads) to acquire Git for various operation systems.

> Due to the environment the author was under when this note is written, all below will be suitable for macOS **ONLY**. All commands will be input in Terminal, the command line of macOS.

According to the instructions for macOS, enter `brew install git` to install git. Download and install will complete minutes later. Then `git config --global core.editor "/Applications/Visual Studio Code.app/Contents/MacOS/Electron --wait"` to change the default code editor to Visual Studio Code.

In Visual Studio Code, search and select *Shell Command: Install 'code' command in PATH* to make the command `code .` able to wake up Visual Studio Code directly.

Use `git clone $url$` to clone a repository to local computer as a directory. Then we can use Linux instructions to create files or directory in that repo directory &mdash; use `git add $file_name$` to make the created (or maybe edited) file available for commit afterwards. Use `git rm $file_name$` to remove the file from the list to commit if you want to.

Use `git commit -m '$brief_description_of_the commit$'` to validate the commit. Then use `git push` to push the commit to the git site.

We can also check the status of a commit we are to make by using `git status` the command &mdash; it will return the difference between the local directory and the branch on site along with what can be added to the to-commit list.

***
