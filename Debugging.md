Source: MS

https://learn.microsoft.com/en-us/visualstudio/debugger/debugging-absolute-beginners?view=vs-2022&tabs=csharp#next-steps




## Debuggers

Debuggers help finding bugs quicker, take skill and practice but very useful.

Performance issues use profiler (see Brendon Gregg)

Tips on how to locate bugs:
- If you can find where code breaks / exception, great. Use debugger to help find it. Think about what you expected your code to do, and what happened instead
- Examine assumptions and check each to see if they are true (e.g., using right API? using the right way? contain typos? variable expectations?)

Debugger features:
- 

Basic debugger workflow:
- Run to find where code breaks
- If you know where then add break points directly
- Inspect variables, memory etc. at break points
- Fix bug / change code, rerun, repeat until you fix the issues



How a debugger works (e.g., `GDB`):
- 


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






