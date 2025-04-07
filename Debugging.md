Source: MS

https://learn.microsoft.com/en-us/visualstudio/debugger/debugging-absolute-beginners?view=vs-2022&tabs=csharp#next-steps




## Debuggers

Debuggers help finding bugs quicker, take skill and practice but very useful.

Performance issues use profiler (see Brendon Gregg)

Tips on how to locate bugs:
- If you can find where code breaks / exception, great. Use debugger to help find it. Think about what you expected your code to do, and what happened instead
- Examine assumptions and check each to see if they are true (e.g., using right API? using the right way? contain typos? variable expectations?)

## Debugger features:

Debugging Cpp code in VSCode

- Define config in launch.json
- VSCode uses your local debugger (e.g., gdb) to build and debug
- F5 to start
- Change variable name by clicking (relative to current stack)
- Add variables to watch



Basic debugger workflow:
- Run to find where code breaks
- If you know where then add break points directly
- Inspect variables, memory etc. at break points
- Fix bug / change code, rerun, repeat until you fix the issues





## How does a debugger work?


**gdb**

After adding a breakpoint in your program, gdb replaces first instruction of your breakpoint function with a special trap instruction

Original code
```
foo():
e24dd008    sub     sp, sp, #8
e58d0004    str     r0, [sp, #4]
e58d1000    str     r1, [sp]
e59d0004    ldr     r0, [sp, #4]
...
```


New code
```
foo():
07f001f0    It's a trap!
e58d0004    str     r0, [sp, #4]
e58d1000    str     r1, [sp]
e59d0004    ldr     r0, [sp, #4]
...
```

This trap instruction causes the running process to trigger a trap for OS to regain control. The OS then puts that process to sleep and wakes the debugger, who can then inspect the process state

```c
// This is a snippet from the linux kernel
#define AARCH32_BREAK_ARM     0xe7f001f0  // pre-agreed breakpoint instruction

int aarch32_break_handler(struct pt_regs *regs)
{
    // ...
    else {
        /* 32-bit ARM instruction */
        __le32 instr;
        get_user(instr, (__le32 __user *)pc);
        arm_instr = le32_to_cpu(instr);
        bp = (arm_instr & 0xff000000) == AARCH32_BREAK_ARM;

	// Not a breakpoint trap, kill the process
        if (!bp)
            return -EFAULT;
	
	// put process to sleep and wakes debugger
        send_user_sigtrap(TRAP_BRKPT);
    }
    return 0;
}
```

```c
// This is a snippe from the gdb debugger, agrees value with linux kernel
/* For new EABI binaries.  We recognize it regardless of which ABI
 * is used for gdbserver, so single threaded debugging should work
 * OK, but for multi-threaded debugging we only insert the current
 * ABI's breakpoint instruction.  For now at least.  */
#define arm_eabi_breakpoint 0xe7f001f0UL
```

DWARF: debugging data format, used to store variable, process etc. info. Constructed at compile time

When we instruct gdb to continue, it replaces the trap instruction with the original instruction and continues.




## Other tips

### Flaky tests

Flaky test = tests that fails, but if rerun repeatedly, eventually passes.

Example reasons for flaky tests:
- Data state leaked from previous test
- Test assumes existence of some dataset, which may not be present at test time
- Service limits (e.g., too many SQL queries, say from previous tests)
- Random values
- Datetime sensitive => test environment has different tz information than local
- Race conditions

Try to do a lot of reruns to get the tests to fail. Use log lines for clues






