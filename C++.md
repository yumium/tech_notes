# C++

To learn

- pragma once to break header dependency. Why moving header files can improve build time. Why some forward declare doesn't need size some does.


https://www.cplusplus.com/info/description/

C++ is...

- Compiled
- Strong-typed unsafe (no type enforcing)
- Both manifest and inferred typing
- Many paradigms (OOP, procedural ...)
- Upwards compatible with C

Problems C++ tries to solve over C (so you should focus on these first)

- OOP features (class, new, template, private, public ...)
- Stricter type checking
- Memory management (constructors and destructors, and smart pointers)
- Flexible variable declaration and scoping
- Struct with constructors, destructors ...
- More standard libraries (e.g., STL) for complex data structures





### TODO

- [ ] cpp core guidelines (prioritise the ones in the appendix)
  - [ ] Chapter 3 (page 43)
- [ ] asynchronous I/O (`std::future`, `std::promise`)
- [ ] `std::swap` (page 89)
- [ ] Concurrency chapter from tour of cpp book can be better explained in cpp concurrency in action book
- [ ] Ranges concept and ranges library
- [ ] Customer allocators
- [ ] Inline specifier:
- https://ryonaldteofilo.medium.com/inline-and-one-definition-rule-in-c-db760ec81fb2
- https://en.cppreference.com/w/cpp/language/inline
- Different from what you may think, about saying if multiple definitions of the same function appear in the same namespace (e.g., when you import .h in multiple .cpp files), telling compiler they are indeed the same function (no need to raise error).
- Look at inheritance avoidance in cpp examples
- Use of templates in b+
- std::duque
- CPP implementations for the 3 types, maybe write them but low priority

Feedback on missing coverage for SMFT

- Concurrency primitives
- AsyncIO primitives
- Type traits `std::is_same`, `std::is_arithmetic`
- `std::aligned_storage`
- Use of RAII elsewhere (mutexes, look at RAII usage with OrderLockGuard)
- Compiler flags "(-Wall -Wextra -O2 -g, etc.)"



Feedback on missing coverage for HFT:

🧠 Memory Management & Layout

- Custom memory allocators (pool, arena, monotonic)
- Placement new / aligned new
- std::pmr (polymorphic memory resource)
- Memory alignment and padding (alignas, alignof)
- Cache-line optimization (false sharing prevention)
- NUMA-awareness (non-uniform memory access)

⚙️ Concurrency & Lock-Free Programming
- std::atomic, memory orderings (relaxed, acquire, release, seq_cst)
- Lock-free queues, ring buffers, and freelists
- Spinlocks and busy-wait strategies
- Hazard pointers
- Read-Copy-Update (RCU) mechanisms
- Fences and memory barriers (std::atomic_thread_fence)

🧵 Thread Management & Real-Time Control
- Thread pinning / CPU affinity (sched_setaffinity, pthread_setaffinity_np)
- Real-time OS tuning (e.g., isolcpus, nohz_full, rtprio)
- Real-time scheduling policies (SCHED_FIFO, SCHED_RR)
- Thread priority management
- Measuring and reducing context-switch latency

⏱️ High-Precision Timing
- rdtsc, rdtscp and timestamp counter calibration
- Nanosecond-level timers (clock_gettime with CLOCK_MONOTONIC_RAW)
- Latency benchmarking and histogramming tools
- Using cycle counters for profiling (CPU cycle precision)

🧬 Low-Level Performance & Tuning
- SIMD with intrinsics (SSE, AVX, AVX-512 via <immintrin.h>)
- Inline assembly for critical paths
- Branch prediction hints ([[likely]], [[unlikely]])
- Loop unrolling and instruction pipelining strategies
- Compiler flags for performance:
- -march=native, -flto, -fno-rtti, -fno-exceptions
- -fvisibility=hidden, -fomit-frame-pointer

🌐 Networking (Kernel Bypass & Market Data)
- Kernel-bypass networking (DPDK, Solarflare/OpenOnload, Netmap)
- AF_XDP sockets
- Multicast UDP optimization (e.g., SO_REUSEPORT, SO_BUSY_POLL)
- TCP tuning (TCP_NODELAY, socket buffer tuning)
- Zero-copy networking (sendfile, mmap, splice)

🛠️ Binary Introspection & Build
- ELF tools: objdump, nm, readelf, strip, ldd
- Linker scripts and section tuning
- Profilers: perf, gprof, gperftools
- Symbol visibility and binary layout analysis
- Build tuning for minimal runtime & fast startup




Compiling C++ code using GCC (`g++`) 

```
Usage: g++.exe [options] file...
Options:
  -pass-exit-codes         Exit with highest error code from a phase.
  --help                   Display this information.
  --target-help            Display target specific command line options.
  --help={common|optimizers|params|target|warnings|[^]{joined|separate|undocumented}}[,...].
                           Display specific types of command line options.
  (Use '-v --help' to display command line options of sub-processes).
  --version                Display compiler version information.
  -dumpspecs               Display all of the built in spec strings.
  -dumpversion             Display the version of the compiler.
  -dumpmachine             Display the compiler's target processor.
  -print-search-dirs       Display the directories in the compiler's search path.
  -print-libgcc-file-name  Display the name of the compiler's companion library.
  -print-file-name=<lib>   Display the full path to library <lib>.
  -print-prog-name=<prog>  Display the full path to compiler component <prog>.
  -print-multiarch         Display the target's normalized GNU triplet, used as
                           a component in the library path.
  -print-multi-directory   Display the root directory for versions of libgcc.
  -print-multi-lib         Display the mapping between command line options and
                           multiple library search directories.
  -print-multi-os-directory Display the relative path to OS libraries.
  -print-sysroot           Display the target libraries directory.
  -print-sysroot-headers-suffix Display the sysroot suffix used to find headers.
  -Wa,<options>            Pass comma-separated <options> on to the assembler.
  -Wp,<options>            Pass comma-separated <options> on to the preprocessor.
  -Wl,<options>            Pass comma-separated <options> on to the linker.
  -Xassembler <arg>        Pass <arg> on to the assembler.
  -Xpreprocessor <arg>     Pass <arg> on to the preprocessor.
  -Xlinker <arg>           Pass <arg> on to the linker.
  -save-temps              Do not delete intermediate files.
  -save-temps=<arg>        Do not delete intermediate files.
  -no-canonical-prefixes   Do not canonicalize paths when building relative
                           prefixes to other gcc components.
  -pipe                    Use pipes rather than intermediate files.
  -time                    Time the execution of each subprocess.
  -specs=<file>            Override built-in specs with the contents of <file>.
  -std=<standard>          Assume that the input sources are for <standard>.
  --sysroot=<directory>    Use <directory> as the root directory for headers
                           and libraries.
  -B <directory>           Add <directory> to the compiler's search paths.
  -v                       Display the programs invoked by the compiler.
  -###                     Like -v but options quoted and commands not executed.
  -E                       Preprocess only; do not compile, assemble or link.
  -S                       Compile only; do not assemble or link.
  -c                       Compile and assemble, but do not link.
  -o <file>                Place the output into <file>.
  -pie                     Create a position independent executable.
  -shared                  Create a shared library.
  -x <language>            Specify the language of the following input files.
                           Permissible languages include: c c++ assembler none
                           'none' means revert to the default behavior of
                           guessing the language based on the file's extension.

Options starting with -g, -f, -m, -O, -W, or --param are automatically
 passed on to the various sub-processes invoked by g++.exe.  In order to pass
 other options on to these processes the -W<letter> options must be used.
```

For most uses you can do:

```shell
gcc -std=c++11 main.cpp -o out
```







**STL libraries**

STL is a library in C++ -> libc++, libstdc++. libstdc++ is from GNU project, less aggressive on adopting new C++ standards, good for general-purpose programming. libc++ created with Clang/LLVM suite, more aggresstive on adopting new C++ standards, more lightweight and performant.

The STL source code is difficult to read because:

- It's super optimised
- It's general
- It's portable, so #ifdef macros everywhere
- Resilient, so lots of __ prefixing names to prevent conflict
- Undocumented



**C++ standards**

- C++ is standardized by the ISO. The standard outlines the syntax and semantics of each version of the C++ programming language.
- This document specifies the form and establishes the interpretation of programs written in the C programming language.[1)](https://www.iso.org/obp/ui/#iso:std:iso-iec:9899:ed-4:v1:en:fn:1) It specifies
  - — the representation of C programs;
  - — the syntax and constraints of the C language;
  - — the semantic rules for interpreting C programs;
  - — the representation of input data to be processed by C programs;
  - — the representation of output data produced by C programs;
  - — the restrictions and limits imposed by a conforming implementation of C.
  - https://www.iso.org/obp/ui/#iso:std:iso-iec:9899:ed-4:v1:en
- Current status of standards: https://isocpp.org/std/status

Different machines that can run C++ then write implementation that satisfies the standard, so C++ can be ported to different devices.









## Basics of C++

### Compilation process

Interfaces are represented in cpp via declarations

```cpp
double sqrt(double); 

class Vector
{
public:
	Vector(int s);
    double& operator[](int i);
    int size();

private:
    double* _elem;
    int _sz;
}
```

Typically we separate interface and implementation into separate files. Interface in the .h file, which can then be included in other files that depend on that interface/declaration. And a separate implementation file (which includes that .h file for consistency of signatures)

```cpp
// user.cpp
#include <Vector.h>
#include <smath>

double sqrt_num(Vector& v)
{
    double sum = 0;
    for (int i = 0; i != v.size(); i++)
    {
        sum += std::sqrt(v[i]);
    }
    
    return sum;
}
```

```cpp
// Vector.cpp
#include <Vector.h>

Vector::Vector(int s) : elem(new double[s]), sz(s) { }

double& Vector::operator[](int i) { return elem[i]; }

int Vector::size() { return sz; }
```

In this case we have 3 files:

- Vector.h: vector interface
- user.cpp: includes Vector.h, user program
- Vector.cpp: includes Vector.h, vector implementation

The 2 .cpp files depend on Vector.h, so when we change Vector.h we need to recompile the .cpp files. Otherwise  the 2 .cpp files are independent (ie. if Vector.cpp changes, we don't need to recompile user.cpp, which makes sense as interface stays the same)

Here #include just pastes the content of the file to the source



The 4 kinds of source files:

1. Regular source file: .cpp
2. Header files: .h, usually just contains declarations
3. Object files: .o, compiled into binary form, except references to functions, symbols are left blank (the address they point to is blank)
4. Binary executables: no special file extension, produced by linker



https://courses.cms.caltech.edu/cs11/material/cpp/mike/misc/compiling_c++.html

Preprocessing: 

- Handles preprocessor directives like `#include` and `#define`, `#if`, `#ifdef` etc.
- `#include` pastes the target content into your current file, hence it's a way for you to reuse your code
- `#define` should not be used, preferring over `const int var = 100`



Compilation: 

- the "pure" C++ files are then parsed, converted to assembly, and optimised. Here the compiler targets a specific instruction set architecture (ISA) like x86-64, ARM, RISC-V. 
- Then the hardware specific backend (assembly tool-chain) converts the assembly into machine code (binary). Most compiler errors are generated by this point. The files are usually kept so if the source file isn't change, no recompilation is needed.



Linking: 

- Linking binary files together so the symbols (aka. variables) can link each other via addresses.



Example C++ compilers: GCC, Clang, MSVC

GCC part of GNU project, end-to-end compiler. Clang works with LLVM, (LLVM = language-agnostic intermediate representation (like typed assembly). Compilers of languages only need to compile to LLVM IR, then write common LLVM IR optimisers, which eventually target to ASM)



Note, an executable program is created for a specific hardware. The executable code is not portable per se. C++ programs are portable.





#### Preprocessor definitions



**macro definitions (#define, #undef)**

When the preprocessor encounters this directive, it replaces any occurrence of `identifier` in the rest of the code by `replacement`. Downside is no type or syntax checking

```cpp
#define TABLE_SIZE 100
int table1[TABLE_SIZE];
int table2[TABLE_SIZE];
```

becomes

```cpp
int table1[100];
int table2[100];
```



You can also define functional macros, which replaces function name with expression on the right, alongside the correct arguments

```cpp
#include <iostream>
using namespace std;

#define getmax(a,b) ((a)>(b)?(a):(b))

int main()
{
  int x=5, y;
  y= getmax(x,2);
  cout << y << endl;
  cout << getmax(7,x) << endl;
  return 0;
}
```

becomes

```cpp
#include <iostream>
using namespace std;

int main()
{
  int x=5, y;
  y= ((x)>(2)?(x):(2));
  cout << y << endl;
  cout << ((7)>(x)?(7):(x)) << endl;
  return 0;
}
```



Defined macros are not affected by block structure. A macro lasts until it is undefined with the `#undef` preprocessor directive

```cpp
#define TABLE_SIZE 100
int table1[TABLE_SIZE];
#undef TABLE_SIZE
#define TABLE_SIZE 200
int table2[TABLE_SIZE];
```

becomes

```cpp
int table1[100];
int table2[200];
```



`#` in the RHS replaces the argument with a string literal

```cpp
#define str(x) #x
cout << str(test);
```

becomes

```cpp
cout << "test";
```



`##` on the RHS simply concatenates two arguments

```cpp
#define glue(a,b) a ## b
glue(c,out) << "test";
```

becomes

```cpp
cout << "test";
```



Because preprocessor replacements happen before C++ syntax check, complex preprocessor replacements can make the code less readable.


Multiple statements in a macro should use the do-while loop like so

```cpp
#define FOO(a, b)
  do {
    if (a != b) {
      LOG_CRITICAL("Expected equal, got {} and {}", a, b);
      return false;
    }
  } while (0)
```

This is safer because simply using braces won't work in the following scenario

```cpp
if (pred)
   FOO(a,b);  // macro here
else
   bar();
```

This is because using only braces we'll have an empty else statement before the semicolon, and the `else` after causes a syntax error





**Conditional inclusions (#ifdef, #ifndef, #if, #endif, #else, and #elif)**

These directives allow to include or discard part of the code of a program if a certain condition is met.

```cpp
// If defined
#ifdef TABLE_SIZE
int table[TABLE_SIZE];
#endif  

// If no defined
#ifndef TABLE_SIZE
#define TABLE_SIZE 100
#endif
int table[TABLE_SIZE];

#if TABLE_SIZE>200
#undef TABLE_SIZE
#define TABLE_SIZE 200
 
#elif TABLE_SIZE<50
#undef TABLE_SIZE
#define TABLE_SIZE 50
 
#else
#undef TABLE_SIZE
#define TABLE_SIZE 100
#endif
 
int table[TABLE_SIZE];
```



The behavior of `#ifdef` and `#ifndef` can also be achieved by using the special operators `defined` and `!defined` respectively in any `#if` or `#elif` directive:

```cpp
#if defined ARRAY_SIZE
#define TABLE_SIZE ARRAY_SIZE
#elif !defined BUFFER_SIZE
#define TABLE_SIZE 128
#else
#define TABLE_SIZE BUFFER_SIZE
#endif 
```





**Line control (#line)**

Basically let us specify the line number and file name (e.g., when exceptions are thrown)

```cpp
#line number "filename"
```

Example:

```cpp
#line 20 "assigning variable"
int a?;
```

Where `number` is the new line number that will be assigned to the next code line. `"filename"` is an optional parameter that allows to redefine the file name that will be shown.

The following lines will increase line number by 1 incrementally.





**Error directive (#error)**

This directive aborts the compilation process when it is found, generating a compilation error that can be specified as its parameter

```cpp
#ifndef __cplusplus
#error A C++ compiler is required!
#endif 
```





**Source file inclusion (#include)**

When the preprocessor finds an `#include` directive it replaces it by the entire content of the specified header or file.

```cpp
#include <header>
#include "file" 
```

There are 2 slightly different syntax for #include files

```cpp
#include <iostream>  // usually for library files
#include "person.h"  // usually for user source files
```

The inclusion behaviour is the same, difference is in the search path for files. The difference is implementation specific to the pre-processor used. Below is from the C standard

- A preprocessing directive of the form

  ```
  #include <h-char-sequence> new-line
  ```

  searches a sequence of implementation-defined places for a **header** identified uniquely by the specified sequence between the `<` and `>` delimiters, and causes the replacement of that directive by the entire contents of the **header**. How the places are specified or the header identified is implementation-defined.

- A preprocessing directive of the form

  ```
  #include "q-char-sequence" new-line
  ```

  causes the replacement of that directive by the entire contents of the **source file** identified by the specified sequence between the `"` delimiters. The named **source file** is searched for in an implementation-defined manner. If this search is not supported, or if the search fails, the directive is reprocessed as if it read

  ```
  #include <h-char-sequence> new-line
  ```

  with the identical contained sequence (including `>` characters, if any) from the original directive.

So the standard only gives semantic separation but no info on concrete differences.

Here's the gcc implementation details (https://gcc.gnu.org/onlinedocs/cpp/Search-Path.html)

- `#include "file"` searches first from currrent directory before going into standard system directories
- `#include <file>` only searches through standard system directories

Include chains: If C.h includes B.h includes A.h, then compiler first processes A.h, then B.h (pasting the processed A.h in), then C.h





**Predefined macro names**

The following macro names are always defined (they all begin and end with two underscore characters, `_`):

| macro             | value                                                        |
| :---------------- | :----------------------------------------------------------- |
| `__LINE__`        | Integer value representing the current line in the source code file being compiled. |
| `__FILE__`        | A string literal containing the presumed name of the source file being compiled. |
| `__DATE__`        | A string literal in the form "Mmm dd yyyy" containing the date in which the compilation process began. |
| `__TIME__`        | A string literal in the form "hh:mm:ss" containing the time at which the compilation process began. |
| `__cplusplus`     | An integer value. All C++ compilers have this constant defined to some value. Its value depends on the version of the standard supported by the compiler: **`199711L`**: ISO C++ 1998/2003**`201103L`**: ISO C++ 2011Non conforming compilers define this constant as some value at most five digits long. Note that many compilers are not fully conforming and thus will have this constant defined as neither of the values above. |
| `__STDC_HOSTED__` | `1` if the implementation is a *hosted implementation* (with all standard headers available) `0` otherwise. |

The following macros are optionally defined, generally depending on whether a feature is available:

| macro                              | value                                                        |
| :--------------------------------- | :----------------------------------------------------------- |
| `__STDC__`                         | In C: if defined to `1`, the implementation conforms to the C standard. In C++: Implementation defined. |
| `__STDC_VERSION__`                 | In C: **`199401L`**: ISO C 1990, Ammendment 1**`199901L`**: ISO C 1999**`201112L`**: ISO C 2011In C++: Implementation defined. |
| `__STDC_MB_MIGHT_NEQ_WC__`         | `1` if multibyte encoding might give a character a different value in character literals |
| `__STDC_ISO_10646__`               | A value in the form `yyyymmL`, specifying the date of the Unicode standard followed by the encoding of `wchar_t` characters |
| `__STDCPP_STRICT_POINTER_SAFETY__` | `1` if the implementation has *strict pointer safety* (see `get_pointer_safety`) |
| `__STDCPP_THREADS__`               | `1` if the program can have more than one thread             |



Example

```cpp
#include <iostream>
using namespace std;

int main()
{
  cout << "This is the line number " << __LINE__;
  cout << " of file " << __FILE__ << ".\n";
  cout << "Its compilation began " << __DATE__;
  cout << " at " << __TIME__ << ".\n";
  cout << "The compiler gives a __cplusplus value of " << __cplusplus;
  return 0;
}
```



#### Non standards

$$ Look at other non-standards used in BF (inlining, branch prediction)

**pragma once**

A non-standard that is implemented in most compiler. If added to a file, it is only included in the first include, all subsequent include on the same file is ignored.

This simplifies file dependencies (solving problems are redefinitions) and can speed up compilation

ID-ing files usually done by comparing file path.

Example
File "grandparent.h"

```cpp
#pragma once

struct foo 
{
    int member;
};
```

File "parent.h"

```cpp
#include "grandparent.h"
```

File "child.c"

```cpp
#include "grandparent.h"
#include "parent.h"  // The second time `grandparent` (inside parent.h) is included is ignored
```

Main challenge is it's not trivial to know if the file is the same file (e.g., in the presence of symlinks, same file copied many times). One alternative is to resort to old way of using include guards.

```cpp
#ifndef GRANDPARENT_H
#define GRANDPARENT_H
... contents of grandparent.h
#endif /* !GRANDPARENT_H */
```

Downside of include guards is overhead of maintaining these constants, additional compilation time from evaluating the macros and code bloat







### Program structure

```cpp
#include <iostream>	// instructors preprocessor to include a section of standard C++ code, known as `header iostream`

/* This functions prints `Hello World` to the standard output */
int main()
{
	std::cout << "Hello World!";	// C++ statement
}
```

- `main` is the entry point of the program

C++ does not care about indentation or new lines (apart from preprocessor directives which must be in their own lines). The above program could have equally been written as

```cpp
#include <iostream>

int main() { std::cout << "Hello World!"; }
```




### Variables and types

Identifiers: sequence of letters, digits or underscore characters (`_`). Must begin with letter

Reserved keywords: bool, break, delete, do ...

C++ is a case sensitive language, so variable `DELAY_TIME` and `delay_time` are not the same.



Fundamental data types

| Group                    | Type names*                  | Notes on size / precision                          |
| ------------------------ | ---------------------------- | -------------------------------------------------- |
| Character types          | **char**                     | Exactly one byte in size. At least 8 bits.         |
|                          | **char16_t**                 | Not smaller than `char`. At least 16 bits.         |
|                          | **char32_t**                 | Not smaller than `char16_t`. At least 32 bits.     |
|                          | **wchar_t**                  | Can represent the largest supported character set. |
| Integer types (signed)   | **signed char**              | Same size as `char`. At least 8 bits.              |
|                          | *signed* **short** *int*     | Not smaller than `char`. At least 16 bits.         |
|                          | *signed* **int**             | Not smaller than `short`. At least 16 bits.        |
|                          | *signed* **long** *int*      | Not smaller than `int`. At least 32 bits.          |
|                          | *signed* **long long** *int* | Not smaller than `long`. At least 64 bits.         |
| Integer types (unsigned) | **unsigned char**            | (same size as their signed counterparts)           |
|                          | **unsigned short** *int*     |                                                    |
|                          | **unsigned** *int*           |                                                    |
|                          | **unsigned long** *int*      |                                                    |
|                          | **unsigned long long** *int* |                                                    |
| Floating-point types     | **float**                    |                                                    |
|                          | **double**                   | Precision not less than `float`                    |
|                          | **long double**              | Precision not less than `double`                   |
| Boolean type             | **bool**                     |                                                    |
| Void type                | **void**                     | no storage, lack of type                           |
| Null pointer             | **decltype(nullptr)**        | A special type of pointer                          |

There are also strict size types (e.g., `uint32_t`). These guarantee the underlying type to be exact 32 bits, so overflows exactly after 2^32-1. Whereas `unsigned` takes size of whatever is most efficient on the target machine (usually means can fit inside the register). It basically says a "small unsigned integer", with a minimum range.

Unless we need a type to be of exact length, preferred `signed` over `int32_t`, so compiler can choose whatever works best in hardware (e.g., what can fit inside a register, say).

.`size_t`: Type to store the maximum size of a theoretically possible object of any type in C++. The actual definition is hardware dependent (usually a `uint64_t`). Used for array indexing and loops. Always use `size_t` for this purpose as otherwise you can have overflow. `size_t` allows programmers to write portable code


```cpp
for (size_t i = 0; i < N; i++) {
    // ...
}

// Downloop
for (size_t i = vec.size(); i--; ) {
    // ...
}

// Infinite loop as size_t is non-negative
for (size_t i = vec.size(); i >= 0; i--) {
    // ...
}

// Can be Infinite loop
// Let's assume in this compiler, `i` is a `int32_t`
// `arr.size()` returns a size_t type, which is an unsigned interger value. Say this value is larger than maximum representable value for `int32_t`
// `i` is a signed int, as `i` increments and eventually overflows, cpp casts it as if it's an unsigned value
// Eventually `i` increments to be the maximum representable for `uint32_t`, but it's still smaller than arr.size()
// In the next loop, `i` loops back to be 0, and the for loop will never finish
for (int i = 0; i < arr.size(); i++)
{
	// ...
}
```





#### Variable declarations

```cpp
int a;
float mynumber;
```

C++ is strongly typed, every variable must have its type explicitly defined before first use. This tells the compiler the memory needed to be reserved for the variable and how to interpret its value.

If variables have the same type, they can be declared on the same line

```cpp
int a, b, c;
```

Note the below common mistake

```cpp
int* a, b;  // `a` is of type int*, `b` is of type int
b = 0;
a = &b;
*a += 1;
std::cout << *a << std::endl;  // 1

int *a, *b; // Both are of type int*
```

We can initialize variables in several (equivalent) ways

```cpp
int a = 3;  // c-like, assignment initialisation
int a (3);  // constructor initialisation
int a {3};  // uniform initialisation
```

Simultaneous assignment is done like this

```cpp
int a = 0, b = 0;  // assign a and b to 0
int a = 0, b;      // assign a to 0, b unassigned
```

After C++11, we always prefer uniform initialisation, as it'll work for almost all types. We can also omit `{}` where the default constructor will be called.

You can let the compiler deduce the type for you using `auto` and `decltype` keywords (use the same type as something else), though this probably reduces readability and hence should not be used extensively. These are called "placeholder" types where type information is filled out at compile time

```cpp
int foo = 0;
auto bar = foo;  // the same as: int bar = foo;
deltype(foo) baz;  // the same as: int baz;
```

Generally use of `auto` is preferred than explicitly stating the type. Arguments published by microsoft:

We recommend that you use the auto keyword for most situations—unless you really want a conversion—because it provides these benefits:

- Robustness: If the expression's type is changed—including when a function return type is changed—it just works.
- Performance: You're guaranteed that there's no conversion.
- Usability: You don't have to worry about type name spelling difficulties and typos.
- Efficiency: Your coding can be more efficient.

Conversion cases in which you might not want to use auto:
- You want a specific type and nothing else will do.
- In expression template helper types—for example, (valarray+valarray).

Caveat:

- Abusing `auto`, e.g., for simple types can actually reduce readability. Compare the following 

```cpp
double limit_of(Account acc) { /* ... */ };

// Not obvious what type of `limit_a` is 
auto limit_a = limit_of(acc_a);

// Clear what type of `limit_a` is
double limit_b = limit_of(acc_b);
```

Using `auto` for cases where return type is obvious is fine

```cpp
auto stratagem = std::make_shared<ems::Stratagem>(install_gem(config));

auto nor = test::order_request({.symbol = "AAPL", .quantity = 100});
```






### Constants

#### Literals

```cpp
// Integer Numerals
a = 75;
a = -273
a = 0113; // octal, digits preceded with 0
a = 0x4b; // hexadecimal, digits preceded with 0x

75         // int (adding type information)
75u        // unsigned int
75l        // long
75ul       // unsigned long 
75lu       // unsigned long 

// Floating Point Numerals
f = 3.14159;
f = 6.02e23;  // Scientific notation
f = 1.6e-19;
f = 3.0

3.14159L;  // long double (adding type information)
6.02e23f;  // float

// Character and string literals
s = 'z';  // A character
s = "Hello World!";  // A string
s = "string expressed in \
two lines"  // This is equivalent to the string below
s = "string expressed in two lines" 

// Boolean Literals
bool foo = true;
bool bar = false;

// Null Pointer Literals
int* p = nullptr;
```



#### Escapes for special characters

| Escape code | Description           |
| ----------- | --------------------- |
| `\n`        | newline               |
| `\r`        | carriage return       |
| `\t`        | tab                   |
| `\v`        | vertical tab          |
| `\b`        | backspace             |
| `\f`        | form feed (page feed) |
| `\a`        | alert (beep)          |
| `\'`        | single quote (`'`)    |
| `\"`        | double quote (`"`)    |
| `\?`        | question mark (`?`)   |
| `\\`        | backslash (`\`)       |



#### Defining constants

Sometimes it's convenient to give a constant a name, instead of writing out that constant everywhere

```cpp
#include <iostream>
using namespace std;

const double pi = 3.14159;
const char newline = '\n';

int main ()
{
    double r=5.0;
    double circle;
    
    circle = 2 * pi * r;
    cout << circle;
    cout << newline;
}
```









### Operators

Assignment `=`

```cpp
int a = 10;
int y = 2 + (x = 5); // Assignment is an expression that returns the value assigned. Here we assign 5 to x, then 2+5=7 to y
x = y = z = 5;  // Multiple assignment
```



Arithmetic operators: +, -, *, /, %


Compound assignment: +=, -=, *=, /=, %=, and more ...

Increment and decrement: ++, --

```cpp
x = 3;
y = ++x; // Incremented before evaluation, y is set to 4

x2 = 3;
y = x++; // Evaluated before incremented, y is set to 3
```

Relational: ==, !=, >, <, >=, <=

Logical: !, &&, ||

​	C++ logical operator short-circuits

Ternary

```cpp
string s = 7 > 5 ? "larger" : "smaller";
```



Comma operator

Expressions are evaluated from left to right, but only right most is considered for output

```cpp
int res = (b = 3, b += 1, ++b); // res = 5
```



Bitwise operator: &, |, ^, ~, <<, >>

| operator | asm equivalent | description                      |
| -------- | -------------- | -------------------------------- |
| `&`      | `AND`          | Bitwise AND                      |
| `|`      | `OR`           | Bitwise inclusive OR             |
| `^`      | `XOR`          | Bitwise exclusive OR             |
| `~`      | `NOT`          | Unary complement (bit inversion) |
| `<<`     | `SHL`          | Shift bits left                  |
| `>>`     | `SHR`          | Shift bits right                 |



Return size in bytes of variable or type

```cpp
x = sizeof (char); // 1
y = sizeof (x);	   // depends on the type of x
```



Operator precedence (highest to lowest priority)

| Level        | Precedence group             | Operator                           | Description                      | Grouping      |
| :----------- | :--------------------------- | :--------------------------------- | :------------------------------- | :------------ |
| 1            | Scope                        | `::`                               | scope qualifier                  | Left-to-right |
| 2            | Postfix (unary)              | `++ --`                            | postfix increment / decrement    | Left-to-right |
| `()`         | functional forms             |                                    |                                  |               |
| `[]`         | subscript                    |                                    |                                  |               |
| `. ->`       | member access                |                                    |                                  |               |
| 3            | Prefix (unary)               | `++ --`                            | prefix increment / decrement     | Right-to-left |
| `~ !`        | bitwise NOT / logical NOT    |                                    |                                  |               |
| `+ -`        | unary prefix                 |                                    |                                  |               |
| `& *`        | reference / dereference      |                                    |                                  |               |
| `new delete` | allocation / deallocation    |                                    |                                  |               |
| `sizeof`     | parameter pack               |                                    |                                  |               |
| `(*type*)`   | C-style type-casting         |                                    |                                  |               |
| 4            | Pointer-to-member            | `.* ->*`                           | access pointer                   | Left-to-right |
| 5            | Arithmetic: scaling          | `* / %`                            | multiply, divide, modulo         | Left-to-right |
| 6            | Arithmetic: addition         | `+ -`                              | addition, subtraction            | Left-to-right |
| 7            | Bitwise shift                | `<< >>`                            | shift left, shift right          | Left-to-right |
| 8            | Relational                   | `< > <= >=`                        | comparison operators             | Left-to-right |
| 9            | Equality                     | `== !=`                            | equality / inequality            | Left-to-right |
| 10           | And                          | `&`                                | bitwise AND                      | Left-to-right |
| 11           | Exclusive or                 | `^`                                | bitwise XOR                      | Left-to-right |
| 12           | Inclusive or                 | `|`                                | bitwise OR                       | Left-to-right |
| 13           | Conjunction                  | `&&`                               | logical AND                      | Left-to-right |
| 14           | Disjunction                  | `||`                               | logical OR                       | Left-to-right |
| 15           | Assignment-level expressions | `= *= /= %= += -=>>= <<= &= ^= |=` | assignment / compound assignment | Right-to-left |
| `?:`         | conditional operator         |                                    |                                  |               |
| 16           | Sequencing                   | `,`                                | comma separator                  | Left-to-right |





### Basic I/O

C++ *stream* provides abstraction for input and output operations on sequential media.

| stream | description                      |
| ------ | -------------------------------- |
| `cin`  | standard input stream            |
| `cout` | standard output stream           |
| `cerr` | standard error (output) stream   |
| `clog` | standard logging (output) stream |



**cout**

```cpp
cout << 120;  // Implicit conversation is done
cout << "Hello" << " World!"; // Chaining allowed
cout << "The number is " << x << ".";  // This can be used like Python's f-string
```



`endl`

```cpp
cout << "First sentence." << endl;
cout << "Second sentence." << endl;
```

`endl` will produce a newline character, but also instructs the stream's buffer to be flushed. So use `\n` when just needing the newline character.



**cin**

```cpp
int age;
cout << "What is your age?" << endl;
cin >> age;
```

cin is rarely used as we usually need some good parsing of input data.

If user inputs something that cannot be parsed as an `int` in this case, the extraction fails, and program will continue to run without setting `age`. This is generally not what we want.

cin also checks for whitespace, new-line ... so it usually doesn't take in entire string but just first word. (use `getline` for this)



**stringstream**

Converts a string into a stream, which exposes the data to be used using stream operators.

```cpp
#include <sstream>
using namespace std;

string mystr = "1204";
int myint;
stringstream(mystr) >> myint;  // myint = 1204
```





### Const and constexpr $$

`const` used to mark variable as immutable. Mainly used for const correctness when passing references/pointers as function arguments

```cpp
const int a = 3; // cannot modify a

const T* t;			// cannot modify object		can reassign t to diff pointer
T* const t; 		// can modify object		cannot reassign t to diff pointer
const T* const t;	// cannot modify object		cannot reassign t to diff pointer
const T& t;			// cannot modify object		cannot reassign t
T& const t;			// invalid, references can't be reseated
```



`constexpr` roughly means "to be evaluated at compile time"



### RAII

Resource Acquisition Is Initialisation, another name is Scope Bound Resource Management (SBRM) => because exit scope is most common use case

RAII is a design principle when designing classes that own resources. Make sure resources are released at the end of object lifetime, and also if acquisition fails, releases at reverse order of init.

By binding resource acquisition with object lifetime, clean up is done automatically when objects are destroyed (scope exit, stack unwinding ...)

RAII can be summarized as follows:

- encapsulate each resource into a class, where
  - the constructor acquires the resource and establishes all class invariants or throws an exception if that cannot be done,
  - the destructor releases the resource and never throws exceptions;
- always use the resource via an instance of a RAII-class that either
  - has automatic storage duration or temporary lifetime itself, or
  - has lifetime that is bounded by the lifetime of an automatic or temporary object.

The standard library classes follow RAII (e.g., std::string, std::vector ...)

```cpp
std::mutex m;
 
void bad() 
{
    m.lock();             // acquire the mutex
    f();                  // if f() throws an exception, the mutex is never released
    if (!everything_ok())
        return;           // early return, the mutex is never released
    m.unlock();           // if bad() reaches this statement, the mutex is released
}
 
void good()
{
    std::lock_guard<std::mutex> lk(m); // RAII class: mutex acquisition is initialization
    f();                               // if f() throws an exception, the mutex is released
    if (!everything_ok())
        return;                        // early return, the mutex is released
}
```

RAII wasn't possible in C because C isn't OOP (there are no destructors)



### Lambda Expression

```cpp
#include <algorithm>
#include <cmath>

void abssort(float* x, unsigned n) {
    std::sort(x, x + n,
        // Lambda expression begins
        [](float a, float b) {
            return (std::abs(a) < std::abs(b));
        } // end of lambda expression
    );
}
```

Capture group

Captures variables in scope

- `[&total, factor]`: & means pass by reference, otherwise by value
- `[]`: No variables are captured
- `[&]`: Capture all by reference
- `[=]`: Capture all by value
- `[&, total]`: Capture all by reference, apart from variable `total`. You can do the same with `=`
- `[&, &total]`: NOT ALLOWED

Caveats:

- Reference can mutate variables outside, by value can't
- Reference introduces lifetime dependency, if lambda running async, it may be gone when lambda executes
- Reference reflects change of variable outside
- Capture group and function body are both required, argument list can be omitted if no argument

Parameter list:

- `auto y = [] (int first, int second){ return first + second; };`:
- `auto y = [] (auto first, auto second){ return first + second; };`: Using auto makes the function templated, one for each `auto` input

Mutable specifier

- By default, all variables passed in are const-by-value.
- `[&, n] (int a) mutable { m = ++n + a; }(4);`: This allows the value to be mutated inside the function
- `[&] (int a) mutable { m = ++n + a; }(4);`: As `n` is passed by reference here instead of by value as above, this will mutate the value outside the function

Exception specifier

- `[]() noexcept { throw 5; }();`: `noexcept` disallows lambda body to throw, here compiler will throw an error

Return type

- `auto x1 = [](int i){ return i; };`: Return type is automatically deduced, here it's an int. You cannot use brace-init-list as return type, like `... return{i, j};`
- `auto x1 = [](int i) -> int { return i; };`: You can using trailing return type signature to specify the type (e.g., when there are multiple return statements in the lambda

Lambda body, can refer to:

- Captured variables
- Parameters to function
- Locally defined variables
- Class data members, only if `this` is captured

```cpp
[this] () { // blah };  // `this` is a pointer so captured by value
[&foo = _foo] () { // blah };  // `foo` is a member of the class, pass by reference into the lambda
```

- Variable with static storage location, e.g., global vars







### Dynamic memory

Some cases memory cannot be determined before program execution, such as in cases where memory depends on user input.



**New operator: allocate memory**

```cpp
int * foo;
foo = new int [5];	// Allocate space for 5 integers

int * bar;
bar = new int;	// Allocates space for an integer

cout << foo[0];
cout << foo[1];
cout << *foo;
cout << *(foo+1);
// etc.
```

The biggest difference between allocating memory with `new` and arrays is that for `new`, the size of array does not need to be determined at compile time, ie. it doesn't need to be a constant expression.

Of course, memory allocation will not always be successful. There are 2 ways C++ can deal with this:

- By default, a `bad_alloc` exception is thrown
- If you declare `foo = new (nothrow) int [5];`, then if memory allocation fails it will return `nullptr`. Using the exception is more efficient, as it avoids null check every time.



**Delete operator**

```cpp
delete[] foo;
delete bar;
```

Deallocates memory for the pointer. If `nullptr` is provided, there will be no effects.



**new vs. malloc**

- `new` returns a typed pointer, `malloc` does not
- `new` throws error by default if no allocation, `malloc` returns nullptr
- `new` have size calculated by compiler based on type, `malloc` you must specify size
- `new` calls constructor and destructor at `delete`, `malloc` doesn't.  So for `malloc` the uninitialised state can be error-prone

```cpp
int* a = new int;
int* b = (int*)malloc(sizeof(int));  // As int is a simple type, leaving it uninitialised is OK
```

Technically `new` is allocated to `free-store` and `malloc` to `heap`, but that's conceptual difference. Almost all implementation they're the same region.

Bottomline: Unless you have to use C, use `new` not `malloc`. And since RAII, don't use `new` unless you have to allocate to stack.

​	`malloc` is basically a C thing, in C++ we use `new`





#### Stack vs. Heap memory

- Stack memory is used to store local variables in a function. Deallocation is automatic and fast as often just need to change sp (so 1 instruction instead of what malloc needs)
- Heap memory is used for large allocations. It needs manual deallocation and generally slower, so more likely to cause memory leaks.
  - Note, `malloc` does not always trigger a sys call. OS typically only give memory to a process in pages, so C++ process will get a page, then slice it up to each time malloc is called.

Stack memory is allocated for local variables, function parameters, RAII etc. Heap allocation only if using `new` or `malloc`. RAII as in putting a resource manager object like `std::vector` on the stack, that manages memory it uses on the heap. 

Arrays (so fixed size) are placed inside the stack (though too large and it can cause stack overflow during runtime).

Exceptions are

- Global and static variables are stored in data segment or BSS (all zeros, used for zero data or uninitialised data)
- rvalues could be stored in registers
- Large return values could be optimised to use return value optimisation to be constructed where it is needed
  - How RVO works: when a function returns a value normally it'll copy the value again to the memory location of caller after constructing the return value. RVO allows the value to be constructed directly at caller's memory region.





#### Memory ownership

When we say a variable, process etc. "owns" memory, we mean they are responsible for the initialisation and destruction of the memory, preventing leaks or double delete etc.

`std::shared_ptr` has share ownership because a group of variables may own the memory, only last one out of scope calls the destructor







### lvalue vs rvalue

lvalue: (locator value), which must have address in memory, can appear on LHS

rvalue: (right value), does not have address in memory, cannot appear on LHS

```cpp
int y = 10;    // y is an lvalue
int z = y + 5; // y + 5 is an rvalue

int &ref = y;  // ref is an lvalue reference to x
ref = 20;      // x is now 20

int &&rref = 10;  // rref is an rvalue reference to the temporary 10 - $$ how does && work?
rref = 20;        // temporary 10 is now modified to 20
```

The introduction of rvalue is to avoid compiler from always allocating memory. So values can, say, be stored in a register.

The introduction of rvalue references which allows resources to be moved rather than copied

```cpp
std::string s1 = "Hello";
std::string s2 = std::move(s1);  // s1 is an lvalue, but std::move converts it to an rvalue

std::string createString() {
    return "Hello, World!";
}
std::string s = createString(); // s can "steal" the temporary string
```

More interesting cases
```cpp
int& get_value()
{
    static int i = 10;
    return i;
}

get_value() = 20;  // OK, assigning to an lvalue

void set_value(int& i) { ... }
void set_value_c(const int& i) { ... }

set_value(10);  // not OK, cannot assign rvalue to non-const reference
set_value_c(10);  // OK, this is just a shorthand, compiler will allocate temporary  storage for the object passed as argument
// so functions taking const reference is more flexible to use, though it leaves less room for optimisation as we don't know whether we can steal the argument or not

std::string first_name = "Yuming";
std::string last_name = "Zai";
std::string full_name = first_name + last_name;
// All LHS here are lvalues
// All RHS here are rvalues, `first_name + last_name` is rvalue

void print_name(const std::string& name)
{
    std::cout << "[lvalue]" <<  name << std::endl;
}

void print_name(std::string&& name)
{
    std::cout << "[rvalue]" <<  name << std::endl;
}

print_name("Yuming"); // picks rvalue one, uses more specific overload even when both overloads are compatible
```









## Program structure

### Statements and flow control



**if and else**

```cpp
// single line statement in `if`
if (x == 100)
    cout << "x correct";

// multiple line statement in `if`
if (x == 100)
{
    cout << "x correct";
    cout << x;
}

// else
if (x == 100)
    cout << "x correct";
else
    cout << "x incorrect"
    
// else if
if (x == 100)
    cout << "x correct";
else if (100-x < 10 && x-100 < 10)
    cout << "x close";
else
    cout << "x incorrect";
```





**while**

```cpp
while (true) {
    if (x < 10)
        x++
    else
        break
}
```





**do-while**

```cpp
do {
    x++
} while (x < 10);
```

Statement is executed before first evaluation of guard. Useful when statement needs to execute at least once.





**for**

```cpp
// initiaited, then repeat (check, execute body, execute increment)
for (int i = 0; i < N; i++)
{
    cout << a[i] << ", ";
}
```

Note, the 3 parts (initialization, condition, statement) are all optional

- No initialization and no increase acts like a while loop

```cpp
for (;n<10;)
```

- No initialization only can be used when initialization is taken care of elsewhere

```cpp
for (;n<10;n++)
```

- No condition is equivalent to `while (true) {}`

```cpp
for (n=0;;n++)
```

You may want to execute multiple statements in each part. We can separate out the expressions with `,` to make up the simple expression 

```cpp
for ( n=0, i=100 ; n!=i; n++, i-- )
{
    // blah (this is executed 50 times, if values of n and i are not altered in the loop)
}
```



Range

```cpp
// for ( declaration : range) statement;
for (char c : str)
```

Range commonly use the `auto` type declaration to declare the type

```cpp
for (auto c : str)
```





**Jump statements**

break: break out of enclosing loop

continue: skip to next iteration

```cpp
int main ()
{
    for (int n=10; n>=0; n--)
    {
        if (0<n && n<=3)
            continue;
        if (n==0)
        {
            cout << "countdown aborted!";
            break;
        }
        cout << n << ", ";
    }
}

// 10, 9, 8, 7, 6, 5, 4, countdown aborted!
```



goto: jumps to label. Used only in very low programming, not in high-level. This statement ignores loops and does no stack unwinding, so is recommended to only be used in the same block, especially in the presence of local variables.

```cpp
int main ()
{
    int n=10;
mylabel:
    cout << n << ", ";
    n--;
    if (n>0) goto mylabel;
    cout << "liftoff!\n";
}
```

Labels are created with the label name followed by colon





**Switch**

```cpp\
switch (x) {
	case 1:
	case 2:
	case 3:
		cout << "x is 1, 2, or 3";
		break;
    default:
    	cout << "x is not 1, 2, or 3";
}
```

- Evaluates head and compare with constants top-down. 
- Matches the first case and executes the code block. It "falls through" with break statements (will flow into default clause too)
- Each `case` keyword must be followed by a constant expression, not variables. If you want ot use variables, use `if` statements
- The `default` clause is executed (if it exists) when no case is matched
- Code after the `switch` clause is execute next if no matches inside `switch` and no `default` clause

When to use switch:
- Modern C++ barely have any switch statements
- In cases of many else-if statements in sequence, syntax may be cleaner with `switch` statements
- Switch cases can perform better in some cases when compiler can optimise to use less # of conditional statements





### Functions

```cpp
int add (int a, int b)
{
    int r;
    r = a + b;
    return r;
}

// Function with no return value (a procedure)
void greet ()
{
    std::cout << "Hello!" << endl;
}

// Return 0 for main function to indicate success. If this isn't given, compiler will add it
void main ()
{
    std::cout << "Hello world!" << endl;
    return 0;
}

// Pass by reference (default is by value). Do this for large values like strings or arrays
void incr (int& a)
{
    a++;	// Do as you would as if it's a local variable
}

// Add `const` keyword to qualify arguments as constant, so changes are forbidden
void say (const string& s)
{
    std::cout << s << end;
}

/*
Pass by reference is considerably faster for larger data types, as it only copies the reference to the subroutine stack, not the entire value.
Though pass by reference introduces the possibility of side effects, so we can use the `const` qualifier as displayed earlier.
Pass by reference for smaller datatypes like `int` can actually worsen performance, as each access needs 2 cycles (fetch address, then fetch value) instead of 1 cycle (fetch value from stack)
*/

// Default values
int divide (int a, int b=2)
{
    return a/b;
}
```


Note, for default values can only be in .h files (not .cpp source files). So you want to do this:

`MyClass.h` file

```cpp
std::string to_string(bool compact=false) const;
```

`MyClass.cpp` file

```cpp
std::string to_string(bool compact) const
{
    // Your code
}
```

In addition, you can only define arguments with default values from left to right. You cannot skip like you do in Python. This makes default values in C++ rather limited.

```cpp
void do_stuff(int a = 1; int b = 2; int c = 3) { //blah }

do_stuff(4, 5);  // this specifies a and b. There's no way in the language to specify only a and c
```

Return types
- You can use `auto` as return type to have compiler do type deduction
- If there are multiple return statements, they must all deduce to the same type
```cpp
auto f(bool val)
{
    if (val) return 123; // deduces return type int
    else return 3.14f;   // Error: deduces return type float
}
```



Declaring functions

Functions must be declared textually before they are used. However, it's possible to declare a protofunction (its signature), use it, then define it later further down in the code

Protofunctions are necessary for functions which are mutually recursive, as you cannot define one without the other

```cpp
int odd(int);

int even(int x)
{
    if (x==0)
        return true;
    else
        return odd(x-1);
}

int odd(int x)
{
    if (x==0)
        return false;
    else
        return even(x-1);
}
```





#### Argument passing and value return

Guidelines F.15: Prefer simple and conventional ways to passing information

Reason: Using “unusual and clever” techniques causes surprises, slows understanding by other programmers, and encourages bugs.

`X f()`: Out only and not expensive to move:

`f(X&)`: In/out, could be expensive to move, so modify directly via reference

`f(X)`: In, cheap or impossible to copy (e.g., int, unique_ptr)

`f(const X&)`: In, expensive to move





#### Structured binding

Generally speaking, we can use structured binding for `std::tuple`, `std::array`, and `struct`/`class` with public members

```cpp
// many times a function may want to return more than 1 value, struct is an easy way to return multiple values
struct Entry {
    string name;
    int age;
}

Entry read_entry(std::vector<std::string>& names, std::vector<int>& ages, int uid)
{
	return {names[i], ages[i]};
}

// client code can then use structured binding to unpack returned values
auto [n, a] = read_entry(names, ages, 5);
```





### Overloads

```cpp
// overloading functions
#include <iostream>
using namespace std;

int operate (int a, int b)
{
  return (a*b);
}

double operate (double a, double b)
{
  return (a/b);
}

int main ()
{
  int x=5,y=2;
  double n=5.0,m=2.0;
  cout << operate (x,y) << '\n';
  cout << operate (n,m) << '\n';
  return 0;
}
```

Different functions with the same but different parameter types / # of parameters are overloaded. The correct subroutine will be called base on the argument types.

Overloading is an alternative to using default values









### Namespace and scope

Scope

- Local scope: Inside block of function or lambda, only accessible within this block
- Class scope: Members of a class, accessible as per class privacy information
- Namespace scope: All other variables live in the namespace 

Same name can exist across namespaces. Names within a namespace cannot conflict.

Namespaces can be used when your name clashes with that of `std`, say

You can define namespaces

```cpp
namespace foo
{
	int value() { return 5; }
}

namespace bar
{
    const double pi = 3.1416;
    double value() { return 2*pi; }
}
```

You access variables inside namespaces by qualifying the variable with the namespace name and `::`

```cpp
int main()
{
    cout << foo::value() << "\n";  // 5
    cout << bar::value() << "\n";  // 6.2832
    cout << bar::pi << "\n";       // 3.1416
    return 0;
}
```

You can define the same namespace in different parts of the code

```cpp
namespace foo { int a; }
namespace bar { int b; }
namespace foo { int c; }
```

You can have nested namespaces. The child namespace can refer to parent without qualifiers. Parent namespace can refer to child with qualifiers. When C++ searches in nested namespaces, it does backward search. Say if the current namespace is `foo::bar`, and C++ cannot find the variable `baz` inside `foo::bar`, it'll try to find `baz` in namespace `foo`

```cpp
namespace A
{
    int i = 1;

    namespace B
    {
	int j = 2;
        int k = i + j;
    }

    int foo() { return i + B::j; }  // returns 3
}
```

You cannot forward declare for namespaces

```cpp
namespace Q
{
    namespace V
    {
	void f();
    }

    void V::f() {};  // OK
    void V::g() {};  // Error: V::g not defined yet

    namespace V
    {
	void g();
    }
}
```

Unnamed namespaces

Visible in unqualified form within the same file, but not outside file (internal linkage). Useful if you want to declare variables for the file but not to any namespace.

```cpp
namespace {
    int i = 1;
}
```

With `using` keyword, all names inside the namespace can be used in the scope the `using` statement is declared, without qualifiers. If there is name ambiguity on used names, a compilation error will fire.

```cpp
#include <iostream>
using namespace std;

namespace first
{
  int x = 5;
}

namespace second
{
  double x = 3.1416;
}

int main () {
  {
    using namespace first;
    cout << x << '\n';  // 5
  }
  {
    using namespace second;
    cout << x << '\n';  // 3.1416
  }
  return 0;
}
```

Ambiguous name example:

```cpp
namespace B
{
    void f(int);
    void f(double);
}
 
namespace C
{
    void f(int);
    void f(double);
    void f(char);
}
 
void h()
{
    using B::f;  // introduces B::f(int), B::f(double)
    using C::f;  // introduces C::f(int), C::f(double), and C::f(char)
    f('h');      // calls C::f(char)
    f(1);        // error: B::f(int) or C::f(int)?
    void f(int); // error: f(int) conflicts with C::f(int) and B::f(int)
}
```

Namespace aliasing

As namespaces must be unique globally, they tend to be long. Use namespace aliases to abbreviate the long name for use in the current file.

```cpp
namespace a_very_long_namespace_name { class Foo {}; }
namespace AVLNN = a_very_long_namespace_name;
void Bar(AVLNN::Foo foo){ }
```














## Built-in data types



### Strings

Old, C string representation

```cpp
char *myString = "Hello";
char myString[6] = {'H', 'e', 'l', 'l', 'o', 0};
```

The last character in the array is the null character, `\0`, containing nominal value 0. For most libraries it assumes the strings ends with null character, such as `prinf`

C++ uses `std::string`, which comes with benefits like:

- Memory management: frees `char*` via RAII, automatic reallocation
- Rich functionalities: iterators, operator overloading (`+=` etc.), move semantics
- Bound checking
- Performance optimisation (e.g., small-string optimisation)
- etc.

`std::string` is type shorthand for `std::basic_string<char>`. Others include `std::wstring` for `std::basic_string<wchar>`, `std::u32string` for `std::basic_string<char32_t>` etc. `wchar` is no narrower than `char`, in Microsoft compiler it's 16-bit. UNICODE UTF-16 fits `char16_t`, UTF-32 fits `char32_t` etc.

Elements of basic strings are stored contiguously, i.e. `&*(s.begin() + n) = &*s.begin() + n`



**Methods**

Accessors: `at`, `[]`, `data()` returns pointer to char array, `c_str` returns non-modifiable c string, `basic_string_view` to return string view

Iterators: `begin`, `end`, `rbegin`, `rend` => iterates the characters

Capacity: 

- `.empty()`: if string is empty
- `.size()`: size of current string in # of bytes (so it's # of characters of `std::string`)
- `.length()`: same as `.size()`
- `.max_size()`: max potential length the string can reach on system (usually much higher than capacity)
- `.capacity()`: # of bytes of storage allocated for the string, not limit on string size and object and reallocate
- `.reserve(new_cap_bytes)`: if new request is bigger than current capacity, immediately increases capacity to at least `new_cap_bytes`, otherwise non-inding request to shrink capacity as per implementation
- `.resize(n, c)`: truncate to `n` characters or append character `c` until length `n` is reached
- `.clear()`: erase content of string to make it into empty string
- `.shrink_to_fit()`: non-inding request to shrink capacity

Access

- `operator[]`: returns character at position. If position given is length of string, returns null character at end of string
- `.back()`: returns reference to last character of string (undefined behaviour for empty strings)
- `.front()`: ^^ first character

Modifiers (includes string operations (e.g., `std::string::substr`))

- `operator+=`: extends string by adding additional characters at end
- `operator+`: returns newly constructed string object with lhs ++ rhs, can be between string and char
- `relational ops`: <, > etc. uses `string::compare` for comparison
- `<<`, `>>`
- `.append(const string& str)`: appends copy of str (is overloaded with other argument types)
- `.append(const string& str, size_t subpos, size_t sublen)`: appends copy of substring 
- `.push_back(c)`: appends `c` to end of string
- `.pop_back()`: erases last character of string
- `.assign(const string& str)`: replaces current content with copy of str, (is overloaded with other argument types)
- `.assign(const string& str, size_t subpos, size_t sublen)`: replaces current content with copy of str[subpos, subpos+sublen)
- `.insert(size_t pos, const string& str)`: insert str as position pos, (is overloaded with other argument types)
- `.insert(size_t pos, const string& str, size_t subpos, size_t sublen)`: insert str[subpos, subpos+sublen) at pos
- `.erase(size_t pos, size_t len)`:  erases string[pos, pos+len), (is overloaded with other argument types)
- `.erase(const_iterator p)`: erases character pointed by `p` 
- `.erase(const_iterator first, const_iterator last)`: erases string[first..last)
- `.replace(size_t pos, size_t len, const string& str)`: removes string[pos, pos+len) and inserts str (is overloaded with other argument types)
- `.replace(size_t pos, size_t len, const string& str, size_t subpos, size_t sublen)`: removes string[pos, pos+len) and inserts str[subpos, subpos+sublen)
- `.substr(pos, len = npos)`: return copy of str[pos, pos+len)
- `.find(const string& str / const char* s / char c, size_t pos = 0)`: searches string for the first occurrence of str/s/c, if `pos` is given search in space str[pos, N)

A note on npos: `std::string::npos` is defined as `-1` with type `size_t`. As `size_t` is an unsigned type, this represented the largest possible value for this type. Used as default value for arguments `len`, this means "until the end of the string"



A note on performance of `+` concat operator:
- The `std::basic_ostringstream` library probably won't be much faster
- `+` simple usecases are OK, but slower when you do `a + b + c`. C++ doesn't have triple overloading on operators so this operation is done as `(a + b) + c`. So result of `a + b` is allocated temporarily then appends `c` to it. Worstcase if capacity of `a + b` isn't enough that's another allocation, so # of allocations can be worst case O(N) where N is the # of subjects.



More utility functions around strings inside header `<string>`
- `std::istringstream& getline( std::istringstream& input, std::string& str, char delim = '\n');` Used to separate stringstream into lines using delimiter. Usage is usually

```cpp
std::string line;  // placeholder object for getline to write into
while (std::getline(input, line)) {
    // do stuff
}

// Another way
for (std::string line; std::getline(input, line);) {
    // do stuff
}
```

- `int stoi (const std::string& str, std::size_t* pos = nullptr, int base = 10);` Parse string to int, this is the C++ library version of `strtoi` from C. Throws `std::invalid_argument` if parsing failes, throws `std::out_of_range` if resulting value out of range of output type.



More implementation details in libc++: https://joellaity.com/2020/01/31/string.html

Source code difficult to read directly, as it's highly optimized, general (`std::string` = `std::basic_string<char8>`), portable (`#ifdef` everywhere), resilient (private identifiers are preceeded with `_`), and undocumented.

```cpp
templace <class _CharT, class _Traits, class _Allocator>
class _LIBCPP_TEMPLACE_VIS basic_string : private __basic_string_common<true> {
  // code omittted

  private:
    // 3*8 = 24 bytes long
    struct __long {
      size_t __cap_;
      size_t __size_;
      char* __data_;
    };

    struct __short {
      unsigned char __size_;
      char __data_[23];
    };

    // convenience constants used for checking mode
    static const size_t __short_mask = 0x01;
    static const size_t __long_mask = 0x1ul;

    // only used to calculate __n_words
    union __ulx {
      __long __lx;
      __short __lxx;
    };

    // __n_words = 3 in 64-bit systems
    enum { __n_words = sizeof (__ulx) / sizeof (size_t) };

    // used as convenience for methods that don't care long/short string mode (e.g., __zero())
    struct __raw {
      size_t __words[__n_words];
    };

    // std::string internal rep
    struct __rep {
      union {
	__long __l;
	__short __s;
	__raw __r;
      };
    };

    void __zero() {
      
    }

  public:
    size_t capacity() {
      if (__cap_ & 1) { // long string mode.
	// Clear last flag bit from __cap_
        size_t buffer_size = __cap_ & ~1ul;
	// Subtract 1 because the null terminator takes up one spot in
	// the character buffer.
	return buffer_size - 1;
      }

      // handle short string mode
    }

    size_t size() {
      if (__size_ & 1u == 0) {
	return __size_ >> 1;
      }

      // handle long string mode
    }

    // omitted code
}

```
- 2 modes, short and long strings modes. Uses `union` to reuse same bytes for both modes. Short string mode is optimized to store up to 22 characters without heap allocation.
- `__cap_`: amount of space in underlying buffer. Least significant bit indicates short or long mode, so capacity always even number. If capacity is to be excee, reallocation takes place
- `__size_`: size of current string
- `__size_` for short strings are left shifted by 1, as the last bit is used as mode flag shown above

Strings cannot be `constexpr` as it cannot be constructed during compile time. For this we need to use `string_view`.

`string_view` is like strings but does not own the underlying object. If the string_view is deleted, the underlying data is kept in place. It's basically a pointer with length information

```cpp
// string_view
struct {
    int len;
    char* data;
};
```

Because of this, `string_view` can be a constexpr, as the compiler just needs to store the data in `.rodata` vector at compile time and make the pointer point to it.

```cpp
constexpr std::string_view my_string = "Hello World";
```



**String views**

A standard way to pass string to functions as pointers.

A std::string_view is essentially { pointer(), size() }

Out-of-bound behaviour is not defined (compared to str.at() or std::span)

String views don't own the pointer

```cpp
string_view bad()
{
    string s = "ABC";
    return(&s[0], 2); // bad: returning a pointer to local
}
```

Constructors

```cpp
int main()
{
    std::string cppstr = "foo";
    std::string_view cppstr_v (cppstr); // overload constructor that takes string_view
    std::string_view cppstr_v2 (cppstr.begin(), cppstr.end()); // construct from iterators
    
    char chars[3] = {'A', 'B' 'C'};
    std::string_view cppstr_v3 (chars, 3); // consturct from pointer and size
}
```

Otherwise has similar method as strings

In modern c++ you should really use `string_view` as argument type rather than `const string&`. I provides the same benefits (no ownership, no allocation) with 1 fewer pointer indirection

​	(for `const string&` the code needs to first need to unpack reference to the string object, then unpack reference othe char* array inside the object)

This change should be simple as `std::string` has a conversion function to `string_view` (via std::string::operator string_view)

```cpp
int get_len(string_view s)
{
	return s.size();
}

std::cout << get_len("ABC") << std::endl;
```








### Arrays (built-in)

Arrays are stored in the stack (see stack vs. heap)

```cpp
// Declaring an array
int foo [5];

// Initializing arrays
int foo [5] = { 1, 2, 3, 4, 5 };
int foo [5] = { 1, 2, 3 }	// Creates array [1,2,3,0,0]
int foo [5] = { }	// Creates array [0,0,0,0,0]

// Can also omit size when initializing
int foo [] = { 1, 2, 3, 4, 5 };
int foo [] { 1, 2, 3, 4, 5 };	// Universal init, no need for `=`

// Accessing
x = foo[2];

// Multidimensional arrays
int mat [5][5];

// Multidimentional arrays is an abstraction for the programmer, as same index can be achieved by multiplying the indices (specifically, mat[n][m] is at n*WIDTH+m)
cout << mat[3][5] == mat[15] << endl;

// Arrays can only be passed by reference in C++
void print (int a[], int length)
{
	for (int n=0; n<length; n++)
        cout << a[n] << ' ';
    cout << '\n';
}

// Arrays passed in can be multidimensional
void print (int a[][2], int length)
{
    for (int n=0; n<length; n++)
        cout << a[n][0] << ' ';
    	cout << a[n][1] << '\n';
}

/*
So when passing a multidimensional array as argument, we "lose" a dimension.

Consider a unidimensional array (int a[])
___, ___, ___, ___, ___, ___, ...
^ ptr
Knowing the pointer address and size of each cell (deduced from type), we can get to any position in the array

For a 2-dimensional array (int a[][3])
ptr -> 	___, ___, ___,
		___, ___, ___,
		___, ___, ___,
		...
We are given the width of the array, then knowing also the pointer address and size of each cell (deduced from type), we can get to any position in this 2-dimensional array.

This generalises to all dimensions
*/
```

In C++, you cannot pass array by value, so all array variables are pointer to the first value of the array.





### Pointers & References

```cpp
// Address-of operator
foo = &myvar;
// Mnemonic: And is the Address

// Dereference operator, this operator unpacks the address to *dereference* the reference
baz = *myvar;

// Declaring pointers
int * number;  // A pointer `number` pointing to a (usually 32-bit) integer
// Types are needed to know what kind of data the uniform size addresses are storing

// Be careful in multiple declaration
int * p1, p2; // This declares pointer p1 and int p2
int * p1, * p2; // This declares both as pointers

// Storing value to the field the pointer is pointing
p = &arr[10];
*p = 20;   // stores `20` at arr[10]

// Points can only be incremented or decremented, with value that gets implicitly multiplied by the base size of the unerlying type
char * mychar;
int * myint;
mychar = mychar + 1;  // Increases by 1 (byte)
myint = myint + 1;  // Increases by 4 (byte)

// Incrementing/Decrementing can be mixed with pointer operations. The implicit precedence can be made explicity with brackets
*(p++);
*(++p);
++(*p);  // This and below increments the pointed value
(*p)++;

// To prevent pointer modification, use `const`
const int * p = &x;

// As a safety feature, we cannot assign the pointer value of a `const` pointer to a non-const pointer
const int * p = &x;
int * q = p; // not allowed

// Pointer to strings
const char * foo = "Hello"; // A character array of 6 bytes is initialized to the corresponding value, and address of first char is returned to `foo`

// Pointers to pointers
char a;
char * b;
char ** c;
a = 'a';
b = &a;
c = &b;
cout << **c << endl;

// Void pointers
// These are pointers without type information. This gives them great flexibility, but they cannot be dereferenced until casted to a typed pointer
void * data;
//...
if sizeof(x) == sizeof(char)
    pchar = (char *) data;

// Null pointers
// A place-holder value for pointers that point to nowhere
int * p = nullptr;
int * q = nullptr;
cout << p == q << endl; // true

// You can pass functions as arguments to other functions as pointers, then just dereference the function to use it
int operation (int x, int y, int (*functocall)(int,int))
{
    int g;
    g = (*functocall)(x,y);
    return g;
}
// This is one of the ways to pass functions as arguments. Other ways include using the <function> template or using lambda functions
```



A reference is roughly a const pointer. It holds the address of another variable, but it must be declared (so cannot be nullptr) on creation and cannot be changed. Referencing and dereferencing is automatic (no need to specify explicitly). Arithmetic on pointers cannot be performed on references.

```cpp
int& ref;  // Not allowed, must initialise on declaration

int x = 3;
int y = 2;

int& ref = x;
cout << ref << endl; // 3, no need to use dereference operator
ref = 4;  // no need to use dereference operator
cout << x << endl; // 4

int* ptr = &x;
cout << *ptr << endl;
*ptr = 3;
cout << *ptr << endl;
ptr = &y;
cout << *ptr << endl;
ptr = nullptr;
```







### Data structures

A data structure is a group of data element together under one name.

```cpp
struct product {
    // members of the struct
    int weight;
    double price = 0;  // default values upon construction for struct
    char[] name;

    void raise_price(double by) { };  // methods
} apple;

product banana, melon;

apple.weight = 100;
apple.price = 0.9;
apple.name = "apple";

cout << apple.price;
```

Note the exact dimensions of `struct` is machine dependent (from padding).



You can create pointer to `struct`

```cpp
product * pprod;
pprod = &apple;
cout << pprod->price;	// This dereferences the struct then returns the member. This operation is used as it's one cycle in machine language
```

| Expression | What is evaluated                            | Equivalent |
| :--------- | :------------------------------------------- | :--------- |
| `a.b`      | Member `b` of object `a`                     |            |
| `a->b`     | Member `b` of object pointed to by `a`       | `(*a).b`   |
| `*a.b`     | Value pointed to by member `b` of object `a` | `*(a.b)`   |



`struct` can be nested, and members referenced by chaining `.`

```cpp
struct movies_t {
    string title;
    int year;
}

struct friends_t {
    string name;
    string email;
    movies_t favorite_movie;
} charlie, maria;

// initialisation ...

cout << charlie.favorite_movie.year;
```

We can also initialize structs using curly brackets, nesting if members are also structs/arrays etc. Members not specified are empty initialised (ptr => nullptr, int => 0, float => +0)

```cpp
struct example {
    struct addr_t {
       uint32_t port;
    } addr;
    union {
       uint8_t a8[4];
       uint16_t a16[2];
    } in_u;
};
struct example ex = { // start of initializer list for struct example
                     { // start of initializer list for ex.addr
                        80 // initialized struct's only member
                     }, // end of initializer list for ex.addr
                     { // start of initializer-list for ex.in_u
                        {127,0,0,1} // initializes first element of the union
                     } };
```

For designated initialiser list (since c++20), the order of arguments must follow that of struct declaration. A good rule of thumb is to declare struct fields to be in alphabetical order, this way the caller will know the order of declaration (without needing to check at the definition each time).

```cpp
struct Point
{
    int a;
    int b;
}

Point right{.a=10; .b=20};
Point wrong{.b=20; .a=10};  // Compiler error
```

Structs vs. Class: The two constructs are identical in C++ except that in structs the default accessibility is public, whereas in classes the default is private. If you cast a struct object to identically defined class, the default methods will still be public.





### Type aliases

```cpp
// typedef existing_type new_type_name
typedef char C;
typedef unsigned int WORD;
typedef char * pChar;
typedef char field [50];

C mychar, anotherchar;
WORD myword;
...
```

This simply gives another name for the type.

Another semantically equivalent syntax is to use the `using` keyword

```cpp
using C = char;
using WORD = unsigned int;
using pChar = char *;
using field = char [50];
```

One use of type aliases is to have a easy way to switch, say between `int` and `long`, by just changing the alias declaration, instead of changing it every in the code.





### Unions

Syntactically like `struct`, but all members occupy the same space. So a union's size is that of its largest variant

```cpp
union mytypes_t {
    char c;
    int i;
    float f;
} mytypes;
```

They all occupy the same underlying 4-byte long memory. When you access  `mytypes.char` and `mytypes.f`, they cast the underlying memory to the respective types. Changing one member affects the other members, as the underlying memory changed.

The language does not track what underlying type is actually under the union object. It is up to the programmer to decide



```cpp
// A slightly more interesting example
union mix_t {
    int l;	// 4 bytes
    struct {
        short hi;	// 2 bytes
        short lo;	// 2 bytes
    } s;
    char c[4];	// 4 bytes
} mix;
```

Of course, the actual machine representation of these types can vary across machine types, so this introduces potential portability issues.



In modern C++, prefer `std::variant` over `union` for more safety





### Anonymous unions

You can define union inside a `struct` and not giving it a name, which omits the union name during use.

```cpp
struct book1_t {
    char title[50];
    char author[50];
    union {
        float dollars;
        int yen;
    } price;
} book1;

struct book2_t {
    char title[50];
    char author[50];
    union {
        float dollars;
        int yen;
    };
} book2;

// initialisation ...

cout << book1.price.dollars;
cout << book2.dollars;
```





### Enumerated types (enum)

A list of values what can be passed around and compared. These values are implicitly converted to `int` underlying. Enums make your code more readable and less error prone by giving it names, during compilation only ints are passed.

```cpp
enum colors_t { black, blue, green, cyan, red, purple, yellow, white };

colors_t mycolor = blue;
if (mycolor != green)
    cout << "CORRECT!\n";
```

By default, members are assigned integers from 0, then 1, 2, and so on ... But you can specify the actual value some of the member take. If a member is not specified a value, it's taken as the value of the previous member + 1

```cpp
enum months_t { january=1, february, march, april,
                may, june, july, august,
                september, october, november, december} y2k;
```

Conversion to and from int

```cpp
colors_t mycolor = blue;
int i = mycolor; // implicit conversion used
bool eq = i == mycolor;  // true
colors_t thecolor = i;
```



**Enumerated types with enum class**

You can create enum types that have more type safety (there is no implicit conversion to/from integers, you have to use `static_cast`, comparison can only be done between enum values of same class).

```cpp
enum class Colors { blue, green }

mycolor = Colors::blue;
if (mycolor != Colors::green)
    cout << "CORRECT!\n";

enum class EyeColor : char { blue, green, brown };	// Specify the underlying representation type
```

Can also create using constructor, just put enum integer as arg

```cpp
auto blue = Colors{0};
auto green = Colors{1};
```

Enum class is the modern way to do enums in C++, though plain enums are still common in production code.








## Classes



Structure of class

```cpp
class class_name {
    access_specifier_1:
    	member1;
    access_specifier_2:
    	member2;
    ...
} object_name;
```

Classes = A collection of members

Semantically class and struct are basically identical, except default access and inheritence is public in structs, private in classes





### Access specifiers

- private: accessible only from within class or other members of same class (called "friends")
- protected: accessible from members of same class or derived class
- public: accessible from anywhere the object is visible.

An example class

```cpp
class Rectangle {
    	int width, height;  // first methods without access specifier are set to `private` by default
    
    public:
    	void set_values (int w, int h) {
            width = w;
            height = h;
        }
    
    	int area () {
            return width*height;
        }
}

Rectangel rect;
rect.set_values(3,4);
cout << rect.area(); 	// 12
```

You can also define class methods outside of class using the scope operator (::)

```cpp
class Rectangle {
    	int width, height;  // first methods without access specifier are set to `private` by default
    public:
    	void set_values (int,int);
    	int area () {
            return width*height;
        }
}

void Rectangle::set_values (int w, int h) {
    width = w;
    height = h;
}
```

Functions defined directly inside the class are automatically marked as inline functions, while functions defined later outside of the class are marked as not inline.



### Constructor function

```cpp
class Rectangle {
    int width, height;
    
  public:
    Rectangle (int,int); // Constructor function must have the same name as class
    
    int area () {return (width*height);}
};

Rectangle::Rectangle (int a, int b) {
  width = a;
  height = b;
}

int main () {
  Rectangle rect (3,4);
  Rectangle rectb (5,6);
  cout << "rect area: " << rect.area() << endl;
  cout << "rectb area: " << rectb.area() << endl;
  return 0;
}
```



Overloading constructors

```cpp
#include <iostream>
using namespace std;

class Rectangle {
    	int width, height;
	
    public:
    	Rectangle ();
    	Rectangle (int, int);
		int area (void) { return (width*height); }
};

Rectangle::Rectangle () {	// The default constructor, used when no parameters are applied during object instantiation
    width = 5;
    height = 5;
}

Rectangle::Rectangle (int a, int b) {
    width = a;
    height = b;
}mae

int main () {
	Rectangle rect (3,4);
    Rectangle rect;
    cout << "rect area: " << rect.area() << endl;
    cout << "rectb area: " << rect.area() << endl;
    return 0;
}
```



### Initialisation

These are semantically equivalent ways to instantiate an object

```cpp
#include <iostream>
using namespace std;

class Circle {
    	double radius;
    
    public:
    	Circle(double r) { radius = r; }
    	double circum () { return 2*radius*3.14159265; }
};

int main () {
	Circle foo (10.0);		// functional form
    Circle bar = 10.0;		// assignment init.
    Circle baz {10.0};		// uniform init.
    Circle qux = {10.0};	// POD-like init. (uniform with `=`)
}
```

One possible advantage of the uniform initialization syntax is that they make the call to constructors explicit:

```cpp
Rectangle rect;		// default constructor called, but not obvious
Rectangle rectb();	// function declaration (a function that returns a Rectangle)
Rectangle rectc{};	// default constructor called
```

Syntax choice is largely personal preference on style.



Member initialization in constructors

We can abbreviate the member initialization part of the constructor. This effectively calls the constructor with the arguments given (usually we invoke the Copy constructor here).

```cpp
class Rectangle {
    	int width, height;
    
	public:
    	Rectangle(int,int);
    	int area () { return width*height; }
};

Rectangle::Rectangle (int x, int y) : width(x), height(y) { }	// No other statements apart from initialization, so nothing between curly brackets
```

For class members that are not initiated in the constructor, if they are fundamental types (int, char ...) they are left uninitialized, if they are class types they need to be initialized in the constructors.

Note, if instead of using member initialisation, you assign it in the constructor. The member will be initialised to default first (see above) then assigned the new value. This can cause performance overhead.

```cpp 
#include <iostream>
using namespace std;

class Circle {
    double radius;
  public:
    Circle(double r) : radius(r) { }
    double area() {return radius*radius*3.14159265;}
};

class Cylinder {
    Circle base;
    double height;
  public:
    Cylinder(double r, double h) : base (r), height(h) {} 	// Here we call constructor of `Circle` to initialize `base`
    double volume() {return base.area() * height;}
};

int main () {
  Cylinder foo (10,20);

  cout << "foo's volume: " << foo.volume() << '\n';
  return 0;
}
```



Pointer to class

Of course, you can create a pointer to an object of a class

```cpp
Rectangle * prect;
```

Then, to access members of that object, use the `->` operator

```cpp
cout << prect->area() << '\n';
```





### Overloading operators

Operators can also be overloaded to support, say expressions like `a + b` where a and b are objects of the same type.

The syntax for defining overloading operators as a member function of the class is:

```
type operator symbol (prameters) { /* ... body ... */ }
```

Example:

```cpp
#include <iostream>
using namespace std;

class CVector {
  public:
    int x,y;
    CVector () {};
    CVector (int a,int b) : x(a), y(b) {}
    CVector operator + (const CVector&);
};

// Member function
CVector CVector::operator+ (const CVector& param) {
  CVector temp;
  temp.x = x + param.x;
  temp.y = y + param.y;
  return temp;
}

int main () {
  CVector foo (3,1);
  CVector bar (1,2);
  CVector result;
  result = foo + bar;
  cout << result.x << ',' << result.y << '\n';
  return 0;
}
```

The below two are equivalent

```cpp
c = a + b;
c = a.operator+ (b);
```


Note, some overloaded operators can be defined as non-member function (a regular function that doesn't belong to a class)

```cpp
#include <iostream>
using namespace std;

class CVector {
  public:
    int x,y;
    CVector () {}
    CVector (int a, int b) : x(a), y(b) {}
};

// Non-member function
CVector operator+ (const CVector& lhs, const CVector& rhs) {
  CVector temp;
  temp.x = lhs.x + rhs.x;
  temp.y = lhs.y + rhs.y;
  return temp;
}

int main () {
  CVector foo (3,1);
  CVector bar (1,2);
  CVector result;
  result = foo + bar;
  cout << result.x << ',' << result.y << '\n';
  return 0;
}
```



Parameters for different operators to be overloaded

| Expression  | Operator                                        | Member function         | Non-member function |
| :---------- | :---------------------------------------------- | :---------------------- | :------------------ |
| `@a`        | `+ - * & ! ~ ++ --`                             | `A::operator@()`        | `operator@(A)`      |
| `a@`        | `++ --`                                         | `A::operator@(int)`     | `operator@(A,int)`  |
| `a@b`       | `+ - * / % ^ & | < > == != <= >= << >> && || ,` | `A::operator@(B)`       | `operator@(A,B)`    |
| `a@b`       | `= += -= *= /= %= ^= &= |= <<= >>= []`          | `A::operator@(B)`       | -                   |
| `a(b,c...)` | `()`                                            | `A::operator()(B,C...)` | -                   |
| `a->b`      | `->`                                            | `A::operator->()`       | -                   |
| `(TYPE) a`  | `TYPE`                                          | `A::operator TYPE()`    | -                   |

Some idiosyncracies with operator overload

- Unary operators are simple: `*a` is rewritten to `a.operator*()`
- Most binary operators work in the obvious way: `a+b` is rewritten to `a.operator+(b)`
- `->` overloading works in slightly different way: `a->b` is rewritten to `(a.operator->())->b`. See use in `std::shared_ptr`




### The keyword `this`

The `this` keyword inside the member function returns a reference to the object itself.

One use can be for checking whether a parameter is the object itself

```cpp
class Dummy {
    public:
    	bool isitme (&Dummy param) {
            return (&param == this);
        }
}

bool Dummy::isitme (Dummy& param)
{
    return (&param == this);
};

int main () {
    Dummy a;
    Dummy* b = &a;
    if ( b->isitme(a))
        cout << "yes, &a is b\n";
   	return 0;
}
```

Another use is for a binary operator to return a reference to one of its objects

```cpp
CVector& CVector::operator= (CVector other)
{
   	x = other.x;
    y = other.y;
	return *this;
}
```






### Static members

Static variables are like non-member variables but require qualifying by class (or object)

```cpp
#include <iostream>
using namespace std;

class Dummy {
    public:
    	static int n;
    	Dummy () { n++; }
};

int Dummy::n=0;

int main ()
{
    Dummy a;
    Dummy b[5];
    cout << a.n << '\n';		// 6
    Dummy* c = new Dummy;
    cout << Dummy::n << '\n';	// 7
    delete c;
    return 0;
}
```

Static functions are the same but for functons.

Note, static functions cannot have `const` qualifier for object, as there's no underlying object

Static members have "static storage duration". They are always created before program execution and destroyed after program halts.

Initialisation of static members can be static or dynamic. Static initialisation happens at compile time and doesn't need to be run during runtime. Compiler prefers static initialisation whenever it is possible. Example:

```cpp
//a.h
struct MyStruct
{
	static int a;
};

//a.cpp
int MyStruct::a = 67;
```

Here, the value `67` is a constant expression, so the compiler knows that it can be evaluated and initialised at compile time. At times, you may want to tell the compiler it is a constant expression using `constexpr`

Static members inside functions is a different concept. Semantics ensure it's only initialised once at the first call (lazy initialisation), and thread safe. They live until end of application. So additional protection logic is in-place for the variable, making it slower. In most cases you don't need static, example case where you do

```cpp
// Meyer's Singleton
struct singleton_t
{

static
singleton_t &
get() {
  static singleton_t val;
  return val;
}

// no copy or move
singleton_t(const singleton_t&) = delete;
singleton_t operator=(const singleton_t&) = delete;

private:
  // construct/destruct hidden behind `get()`
  singleton_t() {}
  ~singleton_t() {}
}

singleton_t val1 = singleton_t.get();
singleton_t val2 = singleton_t.get();  // same instance
```

In C++20, we have `constinit`, which acts like `constexpr` (compiler can evaluate its value at compile time) but allows the value to be mutated at runtime.

Sometimes we have to use dynamic initialisation, such as initialising strings (due to how memory is managed for strings)

```cpp
const auto VERSION = "3.4.1";
```

This string will be evaluated during each run of the program.

Try to avoid SIOF (static initialisation order fiasco), where there is dependency between initialisation of static members. Initialisation within the same compilation unit is done in order of definition in the source file. But initialisation across compilation units is random.

```cpp
// a.cpp
int duplicate(int n)
{
	return n * 2;
}
auto A = duplicate(7);

// b.cpp
extern int a;
auto B = A;

int main()
{
	std::cout << B << std::endl;  // print 14 or 0 depends on init order
	return EXIT_SUCCESS;
}
```

One way to avoid SIOF is to have initialisation done when the value is accessed for the first time.

```cpp
// a.cpp
int duplicate(int n)
{
    return n * 2;
}

auto& A()
{
  static auto a = duplicate(7); // Initiliazed first time A() is called
  return a;
}

// b.cpp
#include <iostream>
#include "a.h"

auto B = A();

int main()
{
  std::cout << B << std::endl;
  return EXIT_SUCCESS;
}
```



### Const member functions

Const data members => immutable and read-only variable

Const function members => no modifications to nonstatic data members, or call nonconst member functions (no change in state)

Const return type => function will not modify the returned data

```cpp
int get() const { return x; }	// const member function
const int& get() { return x; }	// member function returning a const&
const int& get() const { return x; }	// const function returning a const&
```

^^ Don't confuse const function with const parameters as introduced earlier. These 2 are independent.



Const objects =>

- Access to data members outside class is read-only
- Access to function members are restricted to const functions only
- So essentially as if all data members are treated as `const` and only function that can be called are one that don't modify the state



One use of const objects is when using an object as a parameter to a function

```cpp
#include <iostream>
using namespace std;

class MyClass {
    	int x;
    public:
    	MyClass(int val) : x(val) { }
    	const int& get() const { return x; }
};

void print (const MyClass& arg)	// Here, all data members as const and only const functions accessible
{
    cout << arg.get() << '\n';
};

int main ()
{
	MyClass foo (10);
    print(foo);
    
    return 0;
}
```

Note, the constructor can still modify `const` data members, and is the only function that can do so.




### mutable specifier

Used for members that can be modified in a const method inside a class. It's used to specify that modifying this member does not affect overall const-ness of the object

`mutable` can only be used on non-static class members of non-reference non-const type (obviously, otherwise these can't be mutated anyway):

```cpp
class X
{
    mutable const int* p;  // OK, the `const` here specifies the underlying data p points to cannot change, but p can change, so can be used together with `mutable`
    mutable int* const q;  // ill-formed, `const` here specifies the pointer q cannot change, so cannot be declared together with `mutable`
    mutable int&       r;  // ill-formed, `mutable` cannot be used with references
}
```

example

```cpp
#include <iostream>
#include <string>

class Logger {
private:
    mutable int access_count; // Mutable allows modification in const member functions
    std::string message;

public:
    Logger(const std::string& msg) : message(msg), access_count(0) {}

    void printMessage() const {
        access_count++; // Allowed because access_count is mutable
        std::cout << message << " (Accessed " << access_count << " times)" << std::endl;
    }
};

int main() {
    const Logger logger("Hello, World!"); // Logger object is const
    logger.printMessage();               // Prints: Hello, World! (Accessed 1 times)
    logger.printMessage();               // Prints: Hello, World! (Accessed 2 times)

    return 0;
}
```





### Special members

| Member function                                              | typical form for class `C`: |
| :----------------------------------------------------------- | :-------------------------- |
| [Default constructor](https://cplusplus.com/doc/tutorial/classes2/#default_constructor) | `C::C();`                   |
| [Destructor](https://cplusplus.com/doc/tutorial/classes2/#destructor) | `C::~C();`                  |
| [Copy constructor](https://cplusplus.com/doc/tutorial/classes2/#copy_constructor) | `C::C (const C&);`          |
| [Copy assignment](https://cplusplus.com/doc/tutorial/classes2/#copy_assignment) | `C& operator= (const C&);`  |
| [Move constructor](https://cplusplus.com/doc/tutorial/classes2/#move) | `C::C (C&&);`               |
| [Move assignment](https://cplusplus.com/doc/tutorial/classes2/#move) | `C& operator= (C&&);`       |



**Default constructor**

A default constructor is a constructor that doesn't take any parameters.

If no constructors are defined, compiler writes the default constructor for you.

If at least 1 constructor is defined, then the default constructor must be defined by the user as well, otherwise default construction (one without any parameters) is not allowed.



**Destructor**

For releasing resources and clean up after the object is destroyed.

```cpp
#include <iostream>
#include <string>
using namespace std;

class StringWrapper {
    	string* ptr;
    public:
		StringWrapper () : ptr(new string) { }
    	StringWrapper (const string& str) : ptr(new string(str)) { }
    	// Destructor
    	~StringWrapper () { delete ptr; }
    
    	const string& content () const { return *ptr; }
};

int main ()
{
	StringWrapper foo;
    StringWrapper bar ("Example");
   
    cout << "bar's content: " << bar.content() << endl;
    return 0;
}

// Destructors are called here, at end of life cycle of objects
```





**Copy constructor**

When an object is instantiated with another object (of same type) as argument, copying is done.

```cpp
MyClass foo ("Example");
MyClass bar = foo;	// Copying `foo` to `bar`, this is same as MyClass bar (foo);
```

The copy constructor is defined with following signature

```cpp
MyClass::MyClass (const MyClass&);
```

If no copy constructor is defined, the compiler creates a default one, which does shallow copying over all the members. This may not be what we want. If a member contains a pointer to a string, then modification of that string on obj1 will reflect on obj2, and vice versa. If we try to destroy both objects, they will try to deallocate the same memory, causing a runtime error.



Instead we can define a copy constructor, perhaps performing deep copy.

```cpp
#include <iostream>
#include <string>
using namespace std;

class StringWrapper {
    	string* ptr;
    public:
    	StringWrapper (const string& str) ptr(new string(str)) { }
    	~StringWrapper () { delete ptr; }
    	// Copy constructor
    	StringWrapper (const StringWrapper& x) : ptr(new string(x.content())) {}
    
		const string& content () const { return *ptr; }
};

int main () 
{
    StringWrapper foo ("Example");
    String bar = foo;
    
    cout << "bar's content: " << bar.content() << '\n';
    return 0;
}
```





**Copy assignment**

When an object is assigned another object, the copy assignment constructor is called

```cpp
MyClass foo ("Example");
MyClass bar;
bar = foo;
```

The copy assignment simply overloads `=` with argment `MyClass&`

```cpp
MyClass& operator= (const MyClass&);
```

The default definition by compiler does shallow copy, but this doesn't always work. Say for the class in the previous example, if we shallow copy the new string address, the old string is not deleted, leading to a memory leak.

```cpp
StringWrapper operator= (const StringWrapper& x)
{
	delete ptr;	// Free memory of previously defined string
    ptr = new string (x.content());
    return *this;
}
```

Or even better, just re-utilize the same string object

```cpp
StringWrapper& operator= (const StringWrapper& x)
{
	*ptr = x.content();
    return *this;
}
```





**Move constructor and assignment**

Move is like a copy, but the original reference is destroyed. So there is rarely need to actually move data around, as the original reference will never be used.

Move happens when data is assigned to a new variable from an unnamed object, examples of unnamed objects include return values of class constructor, return values of functions etc.

```cpp
MyClass (MyClass&&);             // move-constructor
MyClass& operator= (MyClass&&);  // move-assignment
```

As a parameter, an *rvalue reference* matches arguments of temporaries of this type.

Example of use

```cpp
Foo f1 (1);
Foo f2 = std::move(f1); // move construct

Foo get_foo()
{
    ...
}
f2 = get_foo(); // move assign (if not optimised out say with RVO)
```




**Implicit members**

Behaviors of defaults.

| Member function                                              | implicitly defined:                                          | default definition:          |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :--------------------------- |
| [Default constructor](https://cplusplus.com/doc/tutorial/classes2/#default_constructor) | if no other constructors                                     | does nothing                 |
| [Destructor](https://cplusplus.com/doc/tutorial/classes2/#destructor) | if no destructor                                             | does nothing                 |
| [Copy constructor](https://cplusplus.com/doc/tutorial/classes2/#copy_constructor) | if no move constructor and no move assignment                | copies all members shallowly |
| [Copy assignment](https://cplusplus.com/doc/tutorial/classes2/#copy_assignment) | if no move constructor and no move assignment                | copies all members shallowly |
| [Move constructor](https://cplusplus.com/doc/tutorial/classes2/#move) | if no destructor, no copy constructor and no copy nor move assignment | moves all members            |
| [Move assignment](https://cplusplus.com/doc/tutorial/classes2/#move) | if no destructor, no copy constructor and no copy nor move assignment | moves all members            |







### Friend functions

We can declare certain functions to have access to private and protected members of objects of certain classes.

We give this access using the keyword `friend` in the class, preceding the function name

```cpp
#include <iostream>
using namespace std;

class Rectangle {
    	int width, height;
    
    public:
    	Rectangle() {}
    	Rectangle (int x, int y) : width(x), height(y) {}
    	int area() { return width*height; }
    	friend Rectangle duplicate (const Rectangle&);  // can also place as private member, this is purely stylistic and does not change behaviour
};

Rectangle duplicate (const Rectangle& param)
{
	Rectangle res = Rectangle(param.width, param.height);
    return res;
};

int main ()
{
    Rectangle foo;
    Rectangle bar (2,3);
    foo = diuplicate(bar);
    cout << foo.area() << '\n';
    return 0;
}
```

Note, this function `duplicate` is not a member of the class.

Friend functions are commonly used when the function needs access to private and protected members of multiple classes (hence cannot be defined as a member)







### Friend class

A friend class of another class can access its private and protected members.

```cpp
#include <iostream>
using namespace std;

class Square;

class Rectangle {
    	int width, height

	public:
    	int area () { return width*height; }
    	void convert (Square a);
};

class Square {
    friend class Rectangle	// Rectangle can access private and protected members of Square
	private:
    	int side;
    public:
    	Square (int a) : side(a) {}
};

void Rectangle::convert (Square a)
{
    width = a.side;
    height = a.side;
}

int main ()
{
	Rectangle rect;
    Square sqr(4);
    rect.convert(sqr);
    cout << rect.area();
    return 0;
}
```

Note, friend relationship is no symmetric nor transitive.







### Inheritance

```cpp
#include <iostream>
using namespace std;

class Polygon {
    protected:
    	int width, height
	public:
    	void set_values (int a, int b)
        { width=a; height=b; }
};

class Rectangle: public Polygon {
    public:
    	int area ()
        	{ return width*height / 2; }
};

class Triangle: public Polygon {
    public
}

int main () {
    Rectangle rect;
    Triangle trgl;
    rect.
}
```

The access specifier in the inherited class definition means:

- All members with more accessible levels are restricted to this level in the derived class
- Other members (same or more restrictive access) keep their restrictive level in the derived class

So using the `public` access specifier does not change the access levels of members in the base class.

Default access specifier is `private` for classes and `public` for structs.

Variables in `private` access specifier cannot be accessed in derived class. Variables in `protected` access specifier can be accessed in derived class.



What is inherited?

All members of base class apart from:

- Its constructors and destructor
- Its assignment operator members (operator=)
- Its friends
- Its private members

Base class constructors are used by default in derived class unless specified otherwise.

```cpp
derived_constructor_name (parameters) : base_constructor_name (parameters) {...}
```

Example:

```cpp
#include <iostream>
using namespace std;

class Mother {
    public:
    	Mother ()
        	{ cout << "Mother: no parameters\n"; }
    	Mother (int a)
        	{ cout << "Mother: int parameter\n"; }
};

class Daughter : public Mother {
    public:
    	Daughter (int a)	// Base class default constructor called
        	{ cout << "Daughter: int parameter\n"; }
};

class Son : public Mother {
    public:
    	Son (int a) : Mother (a)	// Base class constructor with int param called
        	{ cout << "Son: int parameter\n"; }
};

int main () {
    Daughter kelly(0);
    Son bud(0);
    
    return 0;
};

/*
cout:
Mother: no parameters
Daughter: int parameter

Mother: int parameter
Son: int parameter
*/
```



If the derived class contains members with same name as base class, the member in derived class is used. To use the member in the base class, qualify the variable with `Base::member`

```cpp
class A
{
    public:
    	int x;
};

class B : public A
{
	public:
    	int x;
    	B ()
        {
            x = 0;
            A::x = 1;
		}
    
    	int get_base_x () { return A::x; }
    	int get_derived_x () { return x; }
};

int main ()
{
	B obj;
   	cout << obj.get_base_x() << '\n';		// 1
    cout << obj.get_derived_x() << '\n';	// 0
    return 0;
};
```



Multiple inheritance (just put classes in comma separated list)

```cpp
#include <iostream>
using namespace std;

class Polygon {
    protected:
    	int width, height
	public:
    	Polygon (int a, int b) : width(a), height(b) {}
};

class Output {
    public:
    	static void print (int i);
};

void Output::print (int i) {
    cout << i <<'\n';
};

class Rectangle: public Polygon, public Output {
    public:
    	Rectangle (int a, int b) : Polygon(a,b) {}
    	int area ()
        	{ return width*height; }
};

class Triangle: public Polygon, public Output {
    public:
    	Triangle (int a, int b) : Polygon(a,b) {}
    	int area ()
        	{ return width*height/2; }
};

int main () {
    Rectangle rect (4,5);
    Triangle trgl (4,5);
    rect.print (rect.area());		// 20
    Triangle::print (trgl.area());	// 10
    return 0;
}
```

This kind of works like mixins.

Note on constructor and destructor call order: 
- Constructors for base classes called in order of base-list, before constructor of derived class is called
- Destructors for base classes called in reverse order of base-list, after destructor of derived class is called
- So unless the constructor/destructor order matters, order of base-list is irrelevant

Note on the diamond problem: 
- Consider the following inheritence pattern
```
   A
 /  \
B    C
 \  /
  D
```
- Here, separate object of A is constructed for B and C
- When D calls a data member which appears in many of these base classes, ambiguity occurs
- Ambiguity is resolved if one class dominates all others. class A dominates class B if A is derived from B
- So if A has method `foo()` that B overrides, `D.foo()` isn't ambiguous as `B.foo()` dominates `A.foo()`
- Otherwise, we must qualify the method (as not doing so will cause a compilation error). If `B.foo()` and `C.foo()` both overrides, then inside D to use `foo()` we must call either `B::foo()` or `C::foo()`
- Last problem is calling data members of A in D. It's unclear which instantiation of A that member is called (B's copy or C's copy) (directly calling so will again cause a compilation error due to ambiguity)


Virtual inheritance:
- Avoids duplicated instantiation of common base class
```cpp
class A { };
class B : virtual public A { };
class C : virtual public A { };
class D : public A { };

// 2 instantiations of As here at E's instantiation, one virtual shared between B and C, one for D
class E : public B, public C, public D { };
```
- Virtual inheritence solves the last issue in ambiguity. When all inheritence in base-list are virtual, there's only 1 ancestor base class, so ambiguity is solved. It also arguably has better performance as only 1 object of A is created for D
```cpp
class A
{
    public:
        int a() { return 0; }
};

class B : virtual public A { };

class C : virtual public A { };

class D : public B, public C { };

int main()
{
    D d;
    std::cout << d.a() << std::endl; // 0, no ambiguity
}
```





### Pointers to base class

One key feature of class inheritance is that pointer to the derived class is type compatible to the pointer to the base class.

```cpp
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b; }
};

class Rectangle: public Polygon {
  public:
    int area()
      { return width*height; }
};

class Triangle: public Polygon {
  public:
    int area()
      { return width*height/2; }
};

int main () {
  Rectangle rect;
  Triangle trgl;
  Polygon * ppoly1 = &rect;
  Polygon * ppoly2 = &trgl;
  ppoly1->set_values (4,5);
  ppoly2->set_values (4,5);
  cout << rect.area() << '\n';	// 20
  cout << trgl.area() << '\n';	// 10
  return 0;
}
```

Pointer to class of type `Polygon` can only access members of the base class `Polygon`. (here `set_values`, but not `area`)





### Virtual members

Virtual members allow certain functions in the base class to be overriden in the derived class. Unlike simply defining a function with the same name in the derived class, overriden functions can be accessed in pointer class when type casted to base class.

```cpp
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b; }
    virtual int area ()
      { return 0; }
};

class Rectangle: public Polygon {
  public:
    int area ()
      { return width * height; }
};

class Triangle: public Polygon {
  public:
    int area ()
      { return (width * height / 2); }
};

int main () {
  Rectangle rect;
  Triangle trgl;
  Polygon poly;
  Polygon * ppoly1 = &rect;
  Polygon * ppoly2 = &trgl;
  Polygon * ppoly3 = &poly;
  ppoly1->set_values (4,5);
  ppoly2->set_values (4,5);
  ppoly3->set_values (4,5);
  cout << ppoly1->area() << '\n';	// 20
  cout << ppoly2->area() << '\n';	// 10
  cout << ppoly3->area() << '\n';	// 0
  return 0;
}
```

Note, previously `ppoly1->area()` is not allowed.

A class that declares or inherits a virtual function is called a *polymorphic class*. Here all 3 classes are polymorphic.

The **override** keyword

This keyword is purely for compilation time check, it specifies that this function must override a virtual function. This can help make your code more readable and avoid function signature typos etc.

```cpp
struct A
{
    virtual void foo();
    void bar();
    virtual ~A();
};
 
struct B : A
{
//  void foo() const override; // Error: B::foo does not override A::foo
                               // (signature mismatch)

    void foo() override; // OK: B::foo overrides A::foo

//  void bar() override; // Error: A::bar is not virtual

    ~B() override; // OK: `override` can also be applied to virtual
                   // special member functions, e.g. destructors

    void override(); // OK, member function name, not a reserved keyword
};
```

Note, `override` is not a reserved word in C++, it only has special meaning when appended to member functions. Only specify in `.h` file no need in `.cpp` file

**Default arguments in virtual members**
- Default arguments in base method are not overriden in derived method
- Which default argument is used is decided by the static type of the object, reference or pointer

```cpp
using std::stringstream;
using std::string;
using std::cout;
using std::endl;

struct Base { virtual string Speak(int n = 42); };
struct Der : public Base { string Speak(int n = 84); };

string Base::Speak(int n) 
{ 
    stringstream ss;
    ss << "Base " << n;
    return ss.str();
}

string Der::Speak(int n)
{
    stringstream ss;
    ss << "Der " << n;
    return ss.str();
}

int main()
{
    Base b1;
    Der d1;

    Base *pb1 = &b1, *pb2 = &d1;
    Der *pd1 = &d1;
    cout << pb1->Speak() << "\n"    // Base 42
        << pb2->Speak() << "\n"     // Der 42
        << pd1->Speak() << "\n"     // Der 84
        << endl;
}
```

Here, for `pb2` the derived method is called as expected, because `Speak` is a virtual function in `Base` class. But default argument used that of its static type, `Base`.



**How is virtual functions typically implemented**

Typically each derived class contains a virtual function table (vtbl). This is basically an array of pointers, each pointer points to a function in the derived class.

Then, each object contains an additional pointer to the right vtbl (depends on its dynamic type), and function call is compiled to the index of the function in the vtbl.

Runtime overhead is close to that of a "normal function call" (within 25% as stated in Tour of C++ book).

Space-wise it's 1 additional pointer per object and 1 addtional vtbl per dervied class





### Static vs dynamic type

Static type: known at compile time

Dynamic type: known at runtime

As C++ is a statically typed language, the only ever case for dynamic typing is when doing pointer redirection to base classes with virtual functions. This can happen, say in factory methods

```cpp
struct Animal {...}

struct Dog : Animal {...}

struct Cat: Aniaml {...}

std::unqiue_ptr<Animal> create_animal(string_view kind)
{
	if (kind == "dog") return std::make_unique<Dog>();
    if (kind == "cat") return std::make_unique<Cat>();
    return nullptr;
}

// in client code
pet->speak(); // speak is a pure virtual function in Animal, if factory is called based on string depending on run-time, we cannot know the dynamic type of pet at compile time
```





### Abstract base classes

Abstract base classes contain at least one pure virtual function (a virtual function with no definition).

Abstract base classes can only be used as a base class to inherit from. It cannot be instantiated directly. All derivations must implement all pure virtual functions.

```cpp
#include <iostream>
using namespace std;

// Abstract base class
class Polygon {
    protected:
    	int width, height;
   	public:
    	void set_values (int a, int b)
        	{ width=a; height=b; }
    	virtual int area() =0;	// declaring a pure virtual function with no definition
};

class Rectangle: public Polygon {
  public:
    int area (void)
      { return (width * height); }
};

class Triangle: public Polygon {
  public:
    int area (void)
      { return (width * height / 2); }
};

int main () {
  Rectangle rect;
  Triangle trgl;
  Polygon * ppoly1 = &rect;
  Polygon * ppoly2 = &trgl;
  ppoly1->set_values (4,5);
  ppoly2->set_values (4,5);
  cout << ppoly1->area() << '\n';	// 20
  cout << ppoly2->area() << '\n';	// 10
  return 0;
}
```



Apart from providing polymorphic information in OOP use cases, abstract base classes can also define functions that make use of future derived class implementations, with the `this` keyword.

```cpp
#include <iostream>
using namespace std;

class Polygon {
  protected:
    int width, height;
  public:
    void set_values (int a, int b)
      { width=a; height=b; }
    virtual int area() =0;
    void printarea()
      { cout << this->area() << '\n'; }
};

class Rectangle: public Polygon {
  public:
    int area (void)
      { return (width * height); }
};

class Triangle: public Polygon {
  public:
    int area (void)
      { return (width * height / 2); }
};

int main () {
  Rectangle rect;
  Triangle trgl;
  Polygon * ppoly1 = &rect;
  Polygon * ppoly2 = &trgl;
  ppoly1->set_values (4,5);
  ppoly2->set_values (4,5);
  ppoly1->printarea();
  ppoly2->printarea();
  return 0;
}
```





## Metaprogramming

### Templates

https://blog.feabhas.com/2014/05/an-introduction-to-c-templates/

Often times we wish to write "generic" programs with generic functions and classes.

Spelling them out for every instance type create code bloat, more erros and harder to read (DRY is violated)

The "C" way to make templates is using macros, but downsides are 1) no type safety, 2) no compiler checking (e.g., deduction, syntax check ...)

Templates improves on use of macros by bringing the templating to the compiler (not preprocessor)

Template programming allow compiler to create new functions based on some "scaffold" code the programmer writes

During compilation, each instance of the templated function/class is created as a separate template/class. But all stored inside the template source, so only 1 compilation unit is compiled

Template thus give the following benefits:

- Type and syntax checking over macros
- Type deduction over macros, which may improve run-time performance compared to writing every specialization by hand

```cpp
template<typename T>
T add(T a, T b)
{
    return a + b;
}

...
    
int a = 1;
std::cout << add<int>(a, a);  // using function `int add(int, int)`

...

float b = 2.0;
std::cout << add<float>(b, b); // using function `float add(float, float)`
```

A template plus a set of template arguments is called an instantiation. Each instantiation is generated during instantiation time, this is usually late in the compilation steps



**Generic programming using templated classes with templated member functions**

```cpp
// It's quite common for container classes to be type generic
template<typename T>
class Vector {
private:
    T* elem;
    int sz;
public:
	explicit Vector(int s);
    ~Vector() { delete[] elem; }
    
    // .. copy and move ops
    
    T& operator[](int i);				// for non-const vectors
    const T& operator[](int i) const;	// for const vectors
    int size() const { return sz; }
}

// Implementation
template<typename T>
Vector<T>::Vector(int s)
{
    if (s<0)
        throw Negative_size{};
    
    elem = new T[s];
    sz=s;
}

template<typename T>
const T& Vector<T>::operator[](int i) const
{
    if (i < 0 || size() <= i)
        throw out_of_range{"Vector::operator[]"};
	return elem[i];
}

// Client can use Vector in a generic way
Vector<char> vc(200);
Vector<string> vs(17);
Vector<list<int>> vli(45);

// Client can also write generic functions for Vector
template<typename T>
T* begin(Vector<T>& x)
{
	return x.size() ? &x[0] : nullptr; // pointer to first element or nullptr
}
```

We can think of generic programming just as another form of abstraction

```cpp
// a non-generic accumulator
double sum(const std::vector<int>& v)
{
    double res = 0;
    for (auto x : v) res += x;
    return res;
}

// a generic accumulate function
template<Range R, Number Val> //  Range and Number are concepts that restrict types to be "sensible" for the operations involved
Val accumulate(const R& r, Val res = 0)
{
	for (auto p = begin(r); p != end(r); p++)
        res += p;
	return res;
}

// clearly, abstraction encourages code reuse
```



**Value template arguments**

```cpp
// Template arguments can be a value, not just a typename
template<typename T, int N>
struct Buffer {
    using value_tye = T;
    constexpr int size() { return N; }
    T[N];
    // ...
}

// Client code
Buffer<char, 1024> glob;
```



**Template argument deduction**

C++ compiler can use type deduction to remove the need for verbosely defining template arguments each time

```cpp
std::pair p = {1.5, 2} // p is a std::pair<double, int>

// previously we had to ...
std::pair<double, int> p = {1.5, 2};  // spell out the types manually
auto p = make_pair(1.5, 2) // define make_xyz function that explicitly does type deduction
    
// however, using deduction can sometimes cause surprises (?)
Vector v {"Hello", "World"};  // deduces to Vector<const char*>, because "" literal in C++ typing is `const char*`
Vector v2 {"Hello"s, "World"s}; // deduces to Vector<std::string>
```

Sometimes we need to help compiler deduce the return type

```cpp
template<typname Iter>
	Vector(Iter, Iter) -> Vector<typename Iter::value_type>

// compiler does not know directly type of underlying Vector if constructed using iterators
```

The use of Concepts allow us to give type hints to compilers in a more expressive way



**Type aliases in templates**

```cpp
// The use of Class::value_type to obtain the underlying type of a container class is useful for writing generic functions
template<typename T>
class Vector
{
public:
	using value_type = T;
    // ...
}

// util
template<typename C>
using Value_type = typename C::value_type;

// example generic function
template<typename Container>
void algo(Container& c)
{
    Vector<Value_type<Container>> vec;  // keep results here
    // ...
}
```



**Compile-time if => performance gains**

```cpp
template<typename T>
void update(T& target)
{
    // ...
    if constexpr(is_pod<T>::value) // for plain-old-data
        simple_and_fast(target);
    else
        slow_and_safe(target);
    // ...
}
```



**decltype returns the type of an expression via type deduction**

```cpp
template<typename T1, typename T2>
decltype(a < b ? a : b) min(T1 a, T2 b) // ERROR, a and b used before declaration
{
    return a < b ? a : b;
}

template<typename T1, typename T2>
auto min(T1 a, T2 b) -> decltype(a < b ? a : b)
{
    return a < b ? a : b;
}
```



**Template specialization**

If we want to define additional function members when certain types are used, we can specialize a template

```cpp
#include <iostream>
using namespace std;

template <class T>
class MyContainer {
    	T myitem;
   	public:
 		MyContainer (T item) : myitem(item) { }
    	T increase () { return ++myitem; }
};

// template specialization
template <>	// No additional type templates to declare
class MyContainer <char> {
    	char myitem;
   	public:
    	MyContainer (char item) : myitem(item) { }
    	char uppercase () 
        {
            if ((myitem >= 'a') & (myitem <= 'z'))
                myitem += 'A' - 'a';
           	return myitem;
        }
};

int main () {
    MyContainer<int> myint (7);
    MyContainer<char> mychar ('j');
    cout << myint.increase() << endl;
    cout << mychar.uppercase() << endl;
    return 0;
}
```

Again, compare the class signature syntax between template class and template specialization

```cpp
template <class T> class MyContainer { ... };
template <> class MyContainer <char> { ... };
```



**Variadic templates**

Templates with an arbitrary argument size, these are very expressive and is used extensively in STL

```cpp
template<typename T, typename.... Tail>
void print(T head, Tail... tail)
{
	std::cout << head;
    if constexpr(sizeof...(tail) > 0) // avoid last un-used call
        print(tail...);
}

print("Hello"s, 1, "World", 3.14);
```



**Fold expression**

```cpp
template<typename ... T>
void print(T&& ... args)
{
	(std::cout << ... << args) << std::endl;
}
```

Folds simplify writing recursive functions involving variadic templates

1) Unary right fold `(E` *op* `...)` becomes `(E1` *op* `(`... *op* `(EN-1` *op* `EN)))`
2) Unary left fold `(...` *op* `E)` becomes `(((E1` *op* `E2)` *op* ...`)` *op* `EN)`
3) Binary right fold `(E` *op* `...` *op* `I)` becomes `(E1` *op* `(`... *op* `(EN−1` *op* `(EN` *op* `I))))`
4) Binary left fold `(I` *op* `...` *op* `E)` becomes `((((I` *op* `E1)` *op* `E2)` *op* ...`)` *op* `EN)`

Below is foldr and foldl in Haskell as reminder. These are mirrors of the binary case. For the unary case we have restriction `a -> a -> a` for the operator

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr c n [] = n
foldr c n (x:xs) = c x (foldr c n xs)

foldr (:) [] = id

foldl :: (a -> b -> a) -> a -> [b] -> a
foldl s n [] 	 = n
foldl s n (x:xs) = foldl s (s n x) xs

foldl (\xs x -> xs ++ [x]) [] = id
```



Examples

```cpp
template<typename... Args>
bool all(Args... args) { return (... && args); }

template<typename ... T>
void print(T&& ... args) { (std::cout << ... << args) << std::endl; }
```









**Forwarding arguments**

It's common to pass argument through an interface unchanged

```cpp
template<typename Transpor t>
requires concepts::InputTranspor t<Transpor t>
class InputChannel {
	public:
	// ...
	InputChannel(Transpor tArgs&&... transportArgs)
		: _transpor t(std::forward<Transpor tArgs>(transpor tArgs)...)
	{}
	// ...
	Transpor t _transpor t;
};
```









### Concepts

Concepts Terminology

- Requirements
- Concepts = one or more requirements
- Constraints



$$ page 158 for concepts defined in the standard



Overloading templated functions

```cpp
template<typename CollT>
concept HasPushBack = requires (CollT c, CollT::value_type v) {
    c.push_back(v);  // requires this to be valid code
} // this is checked at compile time

template<HasPushBack CollT, typename T>
void add(CollT& coll, const T& val)
{
    coll.push_back(val);
}

template<typename CollT, typename T>
void add(CollT& coll, const T& val)
{
    coll.insert(val);
}

std::vector<int> coll1;
std::set<int> coll2;

add(coll1, 42); // more specified function is used
add(coll2, 42); // only second definition is valid, OK
```



You can also use `auto` types in arguments, 

```cpp
// syntactic sugar to templated version
void add(HasPushBack auto& coll, const auto& val)
{
    coll.push_back(val);
}

void add(auto& coll, const auto& val)
{
    coll.insert(val);
}

std::vector<int> coll1;
std::set<int> coll2;

add(coll1, 42); // OK
add(coll2, 42); // OK
```



We can also constraint for multiple params

```cpp
template<typename CollT, typename T>
concept HasPushBack = requires (CollT c, T v) {
    c.push_back(v);
}

void add(auto& coll, const auto& val)
requires CanPushBack<decltype(coll), decltype(val)>
{
    coll.push_back(val);
}

void add(auto& coll, const auto& val)
{
    coll.insert(val);
}

std::vector<int> coll1;
std::set<int> coll2;

add(coll1, 42); // OK
add(coll2, 42); // OK
```



Generally concepts are coarse-grained

```cpp
template<typename CollT>
concept SequenceCont = std::ranges::range<CollT> &&
					   requires (std::remove_cvref_t<CollT> c, std::ranges::range_value_t<CollT> v) {
    c.push_back(v);
    c.pop_back();
    c.insert(c.begin(), v);
    c.erase(c.begin());
    c.clear();
    std::remove_cvref_t<CollT>(v, v, v); // init-list support
    c = {v, v, v};
    {c < c} -> std::convertible_to<bool>;
    ...
};

void add(SequenceCont auto& coll, const auto& val)
{
    coll.push_back(val);
}
```

coarse-gained = we pack lots of requirements into a single concept, instead of packing lots of `requires` at the function signature



Not all requirements can be checked at compile time. Sometimes we use concepts for documentation purposes (by putting comments), e.g. `std::ranges::range` runtime requirement and non-modifying at runtime requirements



```cpp
void add(auto& coll, const auto& val)
{
    if constexpr (requires { coll.push_back(val); }) { // inline concept for compile-time branching
        coll.push_back(val);
    }
    else{
       	coll.insert(val);
    }
}
```



Different constraints can cause ambiguities (when there's no clear hierarchy)

```cpp
template<typename CollT>
concept HasSize = requires (CollT c) {
    { c.size() } -> std::convertible_to<int>;
};

template<typename CollT>
concept HasIndexOp = requires (CollT c) { c[0]; };

template<typename CollT>
requires HasSize<CollT>
void foo(CollT& coll) {
    std::cout << "foo() for container with size()\n";
}

template<typename CollT>
requires HasIndexOp<CollT>
void foo(CollT& coll) {
    std::cout << "foo() for container []\n";
}

std::vector<int> vec{0, 8, 15};
foo(vec); // ambiguous
```

Note, hierarchy must be defined explicitly, not automatically

```cpp
template<typename T>
concept GeoObject = requires(T obj) { obj.draw(); };

template<typename T>
concept Cowboy = requires(T obj) { obj.draw(); obj = obj; }; // Cowboy implicitly is more specific than GeoObject, but compiler does not check for this

class Circle
{
public:
	void draw() const;
    ...
};

Circle(c);
print(c); // ambiguous, compiler only looks at explicit subsumption
```

```cpp
template<typename T>
concept BIgType = sizeof(T) > 8;

template<typename T>
concept ClassType = std::is_class_v<T>;

template<typename T>
concept BigOrClass = BigType<T> || ClassType<T>; // ORs are more expensive for compile time compute

template<typename T>
concept BigAndClass = BigType<T> && ClassType<T>; // more specific than individual type alone
```



Subsumptions of standard concepts

```
movable => copyable => semiregular => regular
```



Where concepts can be used:

- Function templates
- Class templates
- Alias templates
- Variable templates



Constraints for member functions

```cpp
template<typename T>
class MyType {
   	T value;
public:
    ...
    void print() const {
        std::cout << value << '\n';
    }
    
    // This member function is only available for T specialisation that satisfies the concept
    bool is_zero() const requires std::integral<T> || std::floating_point<T> {
        return value == 0;
    }
}
```



Constraints for non-type template parameters

```cpp
constexpr bool isPrime(int val)
{
    for (int i = 2; i <= val/2; i++)
    {
        if (val%i == 0) return false;
    }
    
    return val > 1;
}

template<auto Val>
requires (isPrime(Val))
class C1
{
    ...
}

C1<6> c1;  // Error
C1<7> c2;  // OK
```





#### Using concepts for performance $$

https://www.youtube.com/watch?v=qawSiMIXtE4

$$ Also I still don't understand how the BF ITCH trees work, be good to look into this



Metaprogramming can help us achieve optimal performance

Metaprogramming issues:

1. Hard to write and debug
2. Hard to read and reason about
3. Hard to compile

Concept make these easier



Example tree structure

```
	 tick_tock
		 |
	   Idle
	 /		\
    /		 \
Responder   Idle
			 |
		  Responder
```

We want to write a program where `tick_tock` sends `Tick` messages down the tree, Responders send up `Tock` messages on receiving `Tick`, which ultimately propagates back to `Tock`



```cpp
struct component_base {
    virtual void handle(const message_base &m) = 0;
    
    vector<unique_ptr<component_base>> children;
    component_base* parent;
    
    void sendDown(message_base &message) {
        for (unique_ptr<component_base> &c : children) {
            c->handle(message);
            c->sendDown(message);
        }
    }
    
    void sendUp(message_base &message) {
        if (!parent) return;
        parent->handle(message);
        parent->sendUp(message);
    }
}

struct component // ...

struct start{}; struct tick{}; struct tock{};

struct tick_tock: component<start, tock> {
    void handle(const start &message) override {
        puts("tick");
        sendDown(tick{});
    }
    
    void handle(const tock &message) override{
        puts("tock");
    }   
}

struct responder: component<tick> {
    void handle(const tick &message) override {
        sendUp(tock{});
    }
}
```



The compiled assembly code will at runtime iterate through the vector of children. This is a shame for cases when the structure of the tree is known at compile time. The compiled code should be able to figure out the destination at compile time and just send to that



```cpp
template<typename ... Children_> // specify 
struct component_base {
    virtual void handle(const message_base &m) = 0;
    
    tuple<Children_ ...> children; // use tuple so we know size at compile time
    
    // we run into issue here, parent component needs to know type of its children, 
    // but children needs to know type of parent. Previously using pointer to resolve at runtime
    component_base* parent; 
    
    void sendDown(message_base &message) {
        for (auto &c : children) {
            c->handle(message);
            c->sendDown(message);
        }
    }
    
    void sendUp(message_base &message) {
        if (!parent) return;
        parent->handle(message);
        parent->sendUp(message);
    }
}
```



Idea: have the entire tree as data structure at compile time





https://github.com/saarraz/slides/blob/master/cppcon2019-concepts-a-day-in-the-life/code.cpp



```cpp
#include <cstdio>
#include <type_traits>
#include <tuple>
#include <concepts>

#include <boost/hana.hpp>
using namespace boost::hana::literals;
namespace hana = boost::hana;

template<typename T>
concept SizeConstant = std::convertible_to<T, std::size_t> && requires (T t) {
    { T::value } -> std::convertible_to<std::size_t>;
    std::integral_constant<std::size_t, (std::size_t)T{}>{};
};

template<typename T>
concept Node = std::is_object_v<T>;

template<typename T>
concept TreeLocation = requires (T t, const T ct) {
    { t.isRoot } -> std::convertible_to<bool>;
    t.indices;
    ct.ofChild(0_c);
    requires !T::isRoot || requires {
        { ct.head() } -> std::convertible_to<std::size_t>;
        ct.tail();
        ct.ofParent();
    };
};

template<std::size_t... indices_>
struct tree_location {
    static constexpr const bool
        isRoot = sizeof...(indices_) == 0;

    std::tuple<std::integral_constant<std::size_t, indices_>...>
        indices;

    constexpr tree_location() { }

    constexpr tree_location(hana::tuple<hana::size_t<indices_>...>) { }

    auto ofParent() const {
        return ::tree_location{hana::drop_back(hana::tuple<hana::size_t<indices_>...>{}, 1_c)};
    }

    auto tail() const {
        return ::tree_location{hana::drop_front(hana::tuple<hana::size_t<indices_>...>{}, 1_c)};
    }

    constexpr std::size_t head() const {
        return std::get<0>(indices);
    }

    auto ofChild(SizeConstant auto index) const {
        return tree_location<indices_..., index>{};
    }
};

template<typename T>
concept Tree = requires (T t, tree_location<> location) {
    { t.root } -> Node;
    { T::childCount } -> std::convertible_to<std::size_t>;
    t.subtree(location);
    requires T::childCount == 0ull || requires {
        t.template child<0>();
        t.subtree(tree_location<0>{});
    };
};

template<typename T>
concept TreeRef = std::is_reference_v<T> && Tree<std::remove_reference_t<T>>;

template<Node Root_, Tree... Children_>
struct tree {
    Root_ root;
    std::tuple<Children_...> children;
    static constexpr const SizeConstant auto childCount = hana::size_c<sizeof...(Children_)>;

    Tree auto& subtree(TreeLocation auto location) {
        if constexpr (location.isRoot) {
            return *this;
        } else {
            return child<location.head()>().subtree(location.tail());
        }
    }

    tree() = default;

    tree(std::convertible_to<Root_> auto&& root)
      : root(std::forward<decltype(root)>(root)) {
        static_assert(Tree<tree>);
    }

    template<std::size_t index_>
        requires (index_ < sizeof...(Children_))
    Tree auto &child() {
        return std::get<index_>(children);
    }
};

template<typename T>
concept Message = std::is_object_v<T>;

template<typename T>
concept Context = requires (T t) {
    { t.tree } -> TreeRef;
    { t.location } -> TreeLocation;
};

template<Tree Tree_, TreeLocation TreeLocation_ = tree_location<>>
struct context {
    Tree_& tree;
    static constexpr const TreeLocation_ location{};

    // what is location arg doing here?
    context(Tree_ &tree, TreeLocation_ location = TreeLocation_{}): tree{ tree } {
        static_assert(Context<context>);
    }

    void sendDown(Message auto message) {
        Tree auto &subtree = tree.subtree(location);
        subtree.childCount.times.with_index(
            [&] (SizeConstant auto index) {
                Node auto &child = subtree.template child<index>().root;
                Context auto childContext = ::context(tree, location.ofChild(index));
                if constexpr (requires { child.handle(message, childContext); }) {
                    child.handle(message, childContext);
                } else if constexpr (requires { child.handle(message); }) {
                    child.handle(message);
                    childContext.sendDown(message);
                } else {
                    childContext.sendDown(message);
                }
            }
        );
    }

    void sendUp(Message auto message) {
        if constexpr (!location.isRoot) {
            Node auto &parent = tree.subtree(location.ofParent()).root;
            Context auto parentContext = ::context(tree, location.ofParent());
            if constexpr (requires { parent.handle(message, parentContext); }) {
                parent.handle(message, parentContext);
            } else if constexpr (requires { parent.handle(message); }) {
                parent.handle(message);
                parentContext.sendUp(message);
            } else {
                parentContext.sendUp(message);
            }
        }
    }
};

struct start { };

struct tick { };

struct tock { int data; };

struct idle {
    void handle(Message auto &message) {
        puts(".");
    }

    void handle(Message auto &message)
        requires (sizeof(message) > 1) {
        puts("!");
    }
};

struct tick_tock {
    void handle(const start& message, Context auto context) {
        puts("tick: ");
        context.sendDown(tick{});
    }

    void handle(const tock& message) {
        puts("tock!");
    }
};

struct responder {
    void handle(const tick& message, Context auto context) {
        context.sendUp(tock{});
    }
};

int main() {
    // tree<idle,
    //      tree<tick_tock,
    //           tree<idle,
    //                tree<responder>,
    //                tree<idle,
    //                     tree<responder>>>>>
    //     tr;

    tree<idle, tree<tick_tock>> tr;


    context(tr).sendDown(start{});
}
```





concept as code means you can test it

```cpp
// tests
static_assert(Tree<tree<int>>);
static_assert(Tree<)
```



Final result should compile just to calls of messaging sending, no calls to finding out children etc.





## Type Casting

https://dl.acm.org/doi/fullHtml/10.1145/332148.332155#:~:text=Casts%20are%20used%20to%20convert,conversions%20are%20called%20implicit%20conversions.



**Implicit conversions** $$

https://en.cppreference.com/w/cpp/language/implicit_conversion

Read more also on static_cast etc. from standard



Standard conversion (conversion between compatible types without explicit operator)

```cpp
short a=2000;
int b;
b=a;
```



Some conversion rules of fundamental types

- Smaller to larger types (strictly more representable values) is know as *promotion*. The exact value is retained (e.g., short => int, int => float, float => double)

- Negative integer to unsigned type is the same bits from 2's compliment representation (e.g., -1 becomes the largest value of the unsigned type, -2 second largest)
- `false` => zero in numeric types, `true` => one in numeric types
- Floats => integer type, decimal part is removed. If the result is outside the range of the integer type, the conversion causes *undefined behavior*
- Conversions between numeric types of the same kind (floating to floating, integer to integer), the conversion is implementation specific



Some conversion rules for other types

- Arrays and functions implicitly convert to pointers
- Null pointers can be converted to pointers of any type
- Pointers of any type can be converted to void pointers





**Implicit conversions with classes**

- Single-argument constructors: allow implicit conversion from a particular type to initialize an object.
- Assignment operator: allow implicit conversion from a particular type on assignments.
- Type-cast operator: allow implicit conversion to a particular type.



```cpp
// implicit conversion of classes:
#include <iostream>
using namespace std;

class A {};

class B {
public:
  // conversion from A (constructor):
  B (const A& x) {}
  // conversion from A (assignment):
  B& operator= (const A& x) {return *this;}
  // conversion to A (type-cast operator)
  operator A() {return A();}
};

int main ()
{
  A foo;
  B bar = foo;    // calls constructor
  bar = foo;      // calls assignment
  foo = bar;      // calls type-cast operator
  return 0;
}
```

Notice the form of the `type-cast` operator. It's the `operator` keyword followed by destination type and empty parenthesis. No return type is stated as it is the destination type.



"Usual arithmetic conversions" (https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions)

Integer rank: long, int, short, signed char

Floating rank: long double, double, float

Arithematic operator conversion rule:

- If either is float
  - If both operand same type, no conversion
  - If other is non-floating, convert it to the same type as the floating operand
  - If bith floating but different rank, convert lower rank operand to the higher rank
- If both integer (otherwise case)
  - If both operand same type, no conversion
  - If both (un)signed, convert to the higher rank type of the two
  - Mixed signed and unsigned is complex, look up when needed





**Keyword explicit**

Normally, when a variable of type `A` is used as the argument for a function that takes a type `B`, implicit conversion is done between the types before the function is called. This may not always be what we want. Say in the case of implicit single-argument constructors in classes.



We use the `explicit` keyword to make implicit conversion of argument parameters invalid.

```cpp
#include <iostream>
using namespace std;

class A {};

class B {
public:
  explicit B (const A& x) {}	// Adding the `explicit` keyword
  B& operator= (const A& x) {return *this;}
  operator A() {return A();}
};

void fn (B x) {}

int main ()
{
  A foo;
  B bar (foo);
  bar = foo;
  foo = bar;
  
//  fn (foo);  // not allowed for explicit ctor.
  fn (bar);  

  return 0;
}
```

Additionally, constructors marked with `explicit` cannot be called with assignment-like syntax. (`B bar = foo`)

`explicit` keyword before type-cast operators presents implicit conversions.



Basically, `explicit` keyword makes sure the arguments need to be explicitly converted before being passed into the function.





**Type casting**

*Explicit* type conversion (as alluded earlier) have 2 syntaxes that can be used:

```cpp
double x = 10.3;
int y;
y = int (x);    // functional notation
y = (int) x;    // c-like cast notation
```



Note, the default behavior for explicit conversion between pointer types is simply swapping the pointer. 

```cpp
// class type-casting
#include <iostream>
using namespace std;

class Dummy {
    double i,j;
};

class Addition {
    int x,y;
  public:
    Addition (int a, int b) { x=a; y=b; }
    int result() { return x+y;}
};

int main () {
  Dummy d;
  Addition * padd;
  padd = (Addition*) &d;
  cout << padd->result();
  return 0;
}
```

In this case, the variable `padd` of type `Addition *` simply holds the pointer to a `Dummy` type. This will cause runtime errors (e.g., `d` does not have members `x` or `y`)

The following four specific casting operators control this behaviour.



$$ Better understand these casting types

**dynamic_cast**

`dynamic_cast` always include pointer **upcast** (converting from pointer-to-derived to pointer-to-base), in the same way as allowed as an **implicit conversion**.

But `dynamic_cast` only allows pointer **downcast** (convert from pointer-to-base to pointer-to-derived) iff the pointed object is a valid, complete object of the target type. If the object is not a valid, complete object of the target type, a **null-pointer** is returned instead.

```cpp
#include <iostream>
#include <exception>
using namespace std;

class Base { virtual void dummy() {} };
class Derived: public Base { int a; };

int main () {
  try {
    Base * pba = new Derived;
    Base * pbb = new Base;
    Derived * pd;

    // Valid, as pba has underlying complete object of `Derived`
    pd = dynamic_cast<Derived*>(pba);
    if (pd==0) cout << "Null pointer on first type-cast.\n";

    // Invalid, as pbb is not a complete object of `Derived`
    pd = dynamic_cast<Derived*>(pbb);
    if (pd==0) cout << "Null pointer on second type-cast.\n";

  } catch (exception& e) {cout << "Exception: " << e.what();}
  return 0;
}
```

Note here, `pba` has more information than `pbb` due to the type initialisation.





**static_cast**

Basically `dynamic_cast` but **downcasting** is not checked that the object is a valid, complete object of the target type. (up to programmer to check).

The flip size is that there is now no overhead of checking this.





**reinterpret_cast**

Simply copies the exact pointer to the new class.

For casting pointers to or from integer types, this is platform specific (not portable)



```cpp
class A { /* ... */ };
class B { /* ... */ };
A * a = new A;
B * b = reinterpret_cast<B*>(a)
```

This code compiles, although it does not make much sense, since now `b` points to an object of a totally unrelated and likely incompatible class. Dereferencing `b` is unsafe.





**const_cast**

Manipulate const-ness of the object to the other status (ie. either to be set, or to be removed). 

Example, passing const object to function that doesn't expect a const argument

```cpp
#include <iostream>
using namespace std;

void print (char * str)
{
  cout << str << '\n';
}

int main () {
  const char * c = "sample text";
  print ( const_cast<char *> (c) );
  return 0;
}
```

The example above is guaranteed to work because function `print` does not write to the pointed object. Note though, that removing the constness of a pointed object to actually write to it causes **undefined behavior**.





**typeid**

Return the type of an expression

```cpp
typeid (expression)
```



You can compare the result with `==`



```cpp
#include <iostream>
#include <typeinfo>
using namespace std;

int main () {
  int * a,b;
  a=0; b=0;
  if (typeid(a) != typeid(b))
  {
    cout << "a and b are of different types:\n";
    cout << "a is: " << typeid(a).name() << '\n';
    cout << "b is: " << typeid(b).name() << '\n';
  }
  return 0;
}

/*
a and b are of different types:
a is: int *
b is: int  
*/
```



When `typeid` is applied to an expression whose type is a polymorphic class, the result is the type of the most derived complete object.

```cpp
#include <iostream>
#include <typeinfo>
#include <exception>
using namespace std;

class Base { virtual void f(){} };
class Derived : public Base {};

int main () {
  try {
    Base* a = new Base;
    Base* b = new Derived;
    cout << "a is: " << typeid(a).name() << '\n';
    cout << "b is: " << typeid(b).name() << '\n';
    cout << "*a is: " << typeid(*a).name() << '\n';
    cout << "*b is: " << typeid(*b).name() << '\n';
  } catch (exception& e) { cout << "Exception: " << e.what() << '\n'; }
  return 0;
}

/*
a is: class Base *
b is: class Base *
*a is: class Base
*b is: class Derived
*/
```



## Error handling



### Exceptions

We wrap the code inside a `try` block so catch any exceptions.

We can throw exception ourselves by using the `throw` keyword followed by a single argument.

We can follow the `try` block with `catch` blocks, each taking one argument.

Each `catch` block can take a different argument type, and only if the exception type matches the catch argument type would the statements inside `catch` execute.

We can write `catch (...)` to indicate a catch all.

```cpp
#include <iostream>
using namespace std;

int main () {
  try
  {
    throw 20;
  }
  catch (int e)
  {
    cout << "An exception occurred. Exception Nr. " << e << '\n';
  }
  return 0;
}
```



```cpp
catch (int param) { cout << "int exception"; }
catch (char param) { cout << "char exception"; }
catch (...) { cout << "default exception"; }
```



If we nest `try` blocks, we can actually forward an exception to the outer block's exception handler by using the `throw` keyword without arguments.

```cpp
try {
  try {
	  throw 20;
  }
  catch (int n) {
      throw;
  }
}
catch (int n) {
  cout << "Exception occurred: " << n << '\n';
}

/*
Exception occurred: 20
*/
```





**Standard exceptions**

`std::exception` base class defined in the `<exception>` header. We can inherit from it and define a virtual function `what()` that have some description on the exception

```cpp
#include <iostream>
#include <exception>
using namespace std;

class myexception: public exception
{
  virtual const char* what() const throw()
  {
    return "My exception happened";
  }
} myex;

int main () {
  try
  {
    throw myex;
  }
  catch (exception& e)
  {
    cout << e.what() << '\n';
  }
  return 0;
}
```



Some exceptions thrown by functions in the standard library

| exception           | description                                              |
| :------------------ | :------------------------------------------------------- |
| `bad_alloc`         | thrown by `new` on allocation failure                    |
| `bad_cast`          | thrown by `dynamic_cast` when it fails in a dynamic cast |
| `bad_exception`     | thrown by certain dynamic exception specifiers           |
| `bad_typeid`        | thrown by `typeid`                                       |
| `bad_function_call` | thrown by empty `function` objects                       |
| `bad_weak_ptr`      | thrown by `shared_ptr` when passed a bad `weak_ptr`      |

Some other exceptions defined in the `<exception>` header

| exception       | description                                        |
| :-------------- | :------------------------------------------------- |
| `logic_error`   | error related to the internal logic of the program |
| `runtime_error` | error detected during runtime                      |



A typical example of checking for successful memory allocation.

```cpp
#include <iostream>
#include <exception>
using namespace std;

int main () {
  try
  {
    int* myarray= new int[1000];
  }
  catch (exception& e)
  {
    cout << "Standard exception: " << e.what() << endl;
  }
  return 0;
}
```





### Other ways

**Invariants**

It's common for classes to establish some invariant at construction and maintained at each method call.



**Error code**

This can be returning a `bool` and False on failure. Or an enum value if the system can fail in more than 1 way. Or a `nullptr` is the function returns a ptr. Or perhaps `-1` for integers, `nan` for floats etc.

Error code can be used when it's expected the operation may fail (e.g., opening a file) and the client code can easily handle such error.



**std::abort**

The error is a kind which we cannot recover so we just die.

Typically do a LOG::CRITICAL() before aborting so user can see the abort reason



**Assertions**

Useful to check "obvious" behaviours of code. 

`static_assert(cond)` is used for asserting stuff at compile time

There are libraries you can use to do assertions (and perhaps turn off in prod)



**Alerting**

Useful alongside error code where you need human to know what happened, or need their opinion on how to proceed, while code itself immediately recovers

Have a look at bf::alert and see how it is implemented





## File I/O



C++ directives for file i/o

- `ofstream`: Stream class to write on files
- `ifstream`: Stream class to read from files
- `fstream`: Stream class to both read and write from/to files.

These classes are all derived from `istream` and `ostream`.





**Opening a file**

A opened file is represented within a program by a *stream*. Then all operations will be done on the physical file via the stream.

```cpp
open (filename, mode);
```

Modes:

| `ios::in`     | Open for input operations.                                   |
| ------------- | ------------------------------------------------------------ |
| `ios::out`    | Open for output operations.                                  |
| `ios::binary` | Open in binary mode.                                         |
| `ios::ate`    | Set the initial position at the end of the file. If this flag is not set, the initial position is the beginning of the file. |
| `ios::app`    | All output operations are performed at the end of the file, appending the content to the current content of the file. |
| `ios::trunc`  | If the file is opened for output operations and it already existed, its previous content is deleted and replaced by the new one. |

You can merge modes together with bitwise OR `|`

`ofstream` always have `ios::out` enabled, same with `ifstream` for `ios::in`.

`fstream` has default mode `ios::in | ios::out`, but will not include them automatically when a mode is provided.



`binary` mode means operations are performed without consideration for file format.



```cpp
if (file.is_open()) { /* ok, proceed with output */ }
```





**Closing a file**

```cpp
file.close();
```

Close the stream object (flushes to associate buffers).

Once this member function is called, the stream object can be re-used to open another file.





**Text files**

Text file streams are when `ios::binary` flag is not included. Values of I/O go through some formatting transformations before going to the binary raw file.

```cpp
// writing on a text file
#include <iostream>
#include <fstream>
using namespace std;

int main () {
  ofstream myfile ("example.txt");
  if (myfile.is_open())
  {
    myfile << "This is a line.\n";
    myfile << "This is another line.\n";
    myfile.close();
  }
  else cout << "Unable to open file";
  return 0;
}
```

```cpp
// reading a text file
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main () {
  string line;
  ifstream myfile ("example.txt");
  if (myfile.is_open())
  {
    while ( getline (myfile,line) )
    {
      cout << line << '\n';
    }
    myfile.close();
  }

  else cout << "Unable to open file"; 

  return 0;
}
```





**Checking state flags**



`bad()`: `true` if R/W failes

`fail()`: `true` when `bad` returns `true`, but also when there are format errors

`eof()`: `true` if a file opens for reading has reached the end

`good()`: `false` only if any of the previous functions return `true`



These state flags are set after each operations done on the stream. `clear()` can be used to reset the state flags.





**get and put stream positioning**

`ifstream` keeps an internal *get position*

`ofstream` keeps an internal *put position*

`fstream` keeps both *get position* and *put position*



`tellg()` and `tellp()` gives the get and put position

`seekg()` and `seekp()` sets the get and put position. The functions are overloaded:

```cpp
// Absolute position (# of bytes from beginning of file)
seekg ( position );
seekp ( position );

// Relative position
seekg ( offset, direction );
seekp ( offset, direction );
```

direction is an enumerated type of the following possible values

| `ios::beg` | offset counted from the beginning of the stream |
| ---------- | ----------------------------------------------- |
| `ios::cur` | offset counted from the current position        |
| `ios::end` | offset counted from the end of the stream       |

offset is # of bytes.



Example

```cpp
// obtaining file size
#include <iostream>
#include <fstream>
using namespace std;

int main () {
  streampos begin,end;
  ifstream myfile ("example.bin", ios::binary);
  begin = myfile.tellg();
  myfile.seekg (0, ios::end);
  end = myfile.tellg();
  myfile.close();
  cout << "size is: " << (end-begin) << " bytes.\n";
  return 0;
}
```





**Binary files**

When doing I/O on binary files, we don't need `<<`, `>>`, or `getline`, as they are not as efficient. We use `write` and `read` instead

```cpp
write ( memory_block, size );
read ( memory_block, size );
```

`memory_block` is of type `char *`, representing the start of the buffer to read from, or copy from (for write). `size` is # of characters to be read or written from/to the memory block.



```cpp
// reading an entire binary file
#include <iostream>
#include <fstream>
using namespace std;

int main () {
  streampos size;
  char * memblock;

  ifstream file ("example.bin", ios::in|ios::binary|ios::ate);
  if (file.is_open())
  {
    size = file.tellg();
    memblock = new char [size];
    file.seekg (0, ios::beg);
    file.read (memblock, size);
    file.close();f

    cout << "the entire file content is in memory";

    delete[] memblock;
  }
  else cout << "Unable to open file";
  return 0;
}
```





**Buffers and Synchronization**





## STL Standard Library

Standard library is over 60% of ISO C++ standard



Parts of STL library that's just not great:

- `<chrono>`: we usually use BOOST's time library

- I/O is pretty horrible, too much inheritence, hard to follow and interface complex for simple operations

- `unorderd_map`: uses chaining instead of probing (we use boost's alternatives usually)







### Containers

| STL                | Underlying                                   |
| ------------------ | -------------------------------------------- |
| vector             | Variable-size array                          |
| array              | Fixed-size array                             |
| set                | Set (map with key and no value) using RBTree |
| multiset           | Bag                                          |
| queue              | deque, with FIFO access restriction          |
| list               | doubly-linked list                           |
| forward_list       | singly-linked list                           |
| tuple              | lightweight heterogeneous collection         |
| pair               | ^^                                           |
| span               | non-owning view of contiguous memory         |
| map                | key-value pair using RBTree                  |
| multimap           | ^^ key can appear many times                 |
| unordered_map      | key-value pair using hash map                |
| unordered_multimap | ^^ key can appear many times                 |
| unordered_set      | Set using hash map                           |
| unordered_multiset | Bag using hash map                           |



Standard container operations 

These are common interfaces across containers. Uniformity makes the library easier to use and understand. Obviously complexity of these methods are not the same across data structures

| Operation         | Meaning                                                      |
| ----------------- | ------------------------------------------------------------ |
| p=c.begin()       | p points to first element of c, algo .cbegin() for an interator to const |
| p=c.end()         | p points to one-past-the-last elment of c, also cend() for an interator to const |
| k=c.size()        | k is the number of elements in c                             |
| c.empty()         | is c empty                                                   |
| k=c.capacity()    | k is the number of elements that c can hold without a new allocation |
| c.reserve(k)      | Make the capacity k                                          |
| c.resize(k)       | Make the number of elements k                                |
| c[k]              | The kth element of c, no range checking                      |
| c.at(k)           | The kth element of c, if out of range throw `out_of_range`   |
| c.push_back(x)    | Add x at the end of c, increasing size of c by 1             |
| c.emplace_back(a) | Add value_type{a} at the end of c, increase size of c by 1   |
| q=c.insert(x)     | Add x before p in c                                          |
| q=c.erase(p)      | Remove element at p from c, returns iterator to the next element (could be the (updated) end() iterator) |
| c==c2             | Assignment                                                   |
| b=(c==c2)         | Equality of all elements                                     |
| x=(c<c2)          | Lexicographic order of c and c2<br />x<0 if less than, x==0 if equal, x>0 if greater than |
|                   |                                                              |



#### std::vector

Like a resizable array. Elements stored contiguously. Expands automatically as needed. Because of this extra space is allocated for future expansion (without needing to allocate memory and copy every time).

Expansion implementation depends on the compiler used. For GNU, we do geometric expansion (each time we reallocate, we double in size, so amortized O(1)). Alas, reallocation is expensive, so use `reserve()` if you know the size beforehand.

Total amount of allocated memory queried using `capacity()` function. Extra memory can be freed using `shrink_to_fit()` function.

The vector object always placed on stack. The elements are always allocated in free store (heap)



Key complexities

- Random access O(1)
- Insertion and removal from end, amortized O(1)
- Insertion and removal from anywhere, linear in distance to end of vector O(n)



Arrays vs Vector:

- Arrays can be statically allocated on the stack (size known at compile time) or dynamically allocated on the heap. Vectors are always allocated on the heap
- Vectors can be returned from functions, arrays can only be returned by downgrading to pointers (`T*`)
- Vectors have automatic memory management, dynamically allocated arrays need manual freeing (`delete[] a;`)
- Vectors have richer features than arrays
- Vectors can be resized whereas arrays can't

For these reasons, vectors are almost always preferred. Times when arrays are preferred include knowing the size of the array at compile time, coding on constrained devices, and C compatibility.



**Caveat**: For static constexpr arrays you need `std::array`, as `std::vector` allocates to heap and C arrays can't be declared in-class, which constexpr requires.



Constructors:

- `std::vector<int> vec;` or `std::vector<int> vec{};` to declare an empty vector
- If using brackets, initialisation list is preferred `std::vector<int> vec {N, 1};  // initialises vector of 2 elements, N and 1`
- If want to initialise with size and default value, use brackets `std::vector<int> vec (N, 1);  // initialises vector of size N and default value i`



Call by reference vs call by value

```cpp
void foo(vector<int>& vec) { ... }  // By reference, modifies the same values in heap

void bar(vector<int> vec) { ... }  // By value, copies the object and copies values in heap, so modification not reflected in caller's vector object
```



Methods

- `front()`: First element, will run into errors if vector is empty (if uncaught most likely segmentation fault at runtime)
- `back()`: Last element
- `data()`: Return underlying array
- `reserve(new_cap)`: Reserve additional memory to such that capacity allows for up to `new_cap` elements. if `new_cap` < `.capacity()`, the function does nothing. If `new_cap` > `.max_size()`, throws `std::length_error`
- `shrink_to_fit()`: Frees unused memory
- `clear()`: Erases all elements. `size()` returns to zero. `capacity()` is unchanged.
- `insert()`: 
  - `insert(pos, count, val)`: Inserts count # of val at index pos, returns iterator pointing to first element inserted or pos if count == 0, O(count + N) where N is the # of elements between pos and end of container
  - `insert(pos, first, last)`: Inserts from range [first, last) at index pos, returns iterator pointing to first element inserted or pos if first == last, O((last-first) + N) where N is the # of elements between pos and end of container
  - `insert(pos, ilist)`: Inserts elements from initializer list `ilist` before pos, returns iterator pointing to the first element inserted or pos if ilist is empty, O(ilist.size + N) where N is the # of elements between pos and end of container
- `insert_range(pos, rg)`: Inserts range `rg` at index pos
- `pop_back()`: Removes last element, returns nothing, undefined behavior if vector is empty
- `append_range(rg)`: Inserts range `rg` to the end of the vector, reallocation can happen. Complexity is O(|rg|) or O(|new_size|) if reallocation needed



Looping through. Using iterators givees you more flexibility, but nothing wrong with using indices.

```cpp
for (size_t i = 0; i < vec.size(); i++)
{
    vec[i].doStuff();
}

for (auto it = vec.begin(); it != vec.end(); it++)
{
    it->doStuff();
}

for (auto& element : vec) {
    element.doStuff();
}
```





#### std::array

Interface comparison to std::vector

- No resizing (no .reserve(), .capacity(), .shrink_to_fit())
- No appending (no .push_back(), .pop_back())



Other comparison with std::vector

- Size known at compile time and cannot be changed after creation
- Memory allocated on stack always, providing less overhead, and more optimisation possible



Initialisation:

```cpp
std::array<int, 5> = {1,2,3};  // last 2 elements are zero-initiated
```



Comparison with C arrays[]

- Size information isn't stored in C arrays data structures, functions on them must also get size argument
- No bound checking for C arrays while std::array throws std::out_of_range exception
- C arrays can be allocated on heap using `int* heap_arr = new int[5]` but heap allocation no possible with std::array
- C arrays have no built-in helper functions unlike std::array
- C arrays aren't objects so don't have copy assignment or comparison, while you can do `int arr2[5]; arr2 = arr; cout << arr == arr2 << endl; // true`
- C arrays decay to pointers when passed as arguments, losing size information; not for std::array
- C arrays compatible with C code, std::array is so with `.data()`





#### std::set

The set requires the template type to contain `<` comparison (as the underlying impl can use a binary search tree). The guarantee uniqueness, the `==` operation is just taking the function `(!(a < b) && (!(b < a))`.

```cpp
struct Point
{
    int x;
    int y;

    bool operator< (const Point& other) const
    {
	return x < other.x || (x == other.x && y < other.y);
    }
}

std::set<Point> s {{0,1}, {1,0}};
```

- 

- 

Modifiers (complexity is log to the size of the set)

- `iterator emplace_hint( const_iterator hint, Args&&... args )`: insert (if correct) element to position right after `hint`

Lookup (complexity is log to the size of the set)

- `size_type count( const Key& key ) const`: returns # of elements equal to `key` (0 or 1)
- `iterator find( const Key& key )`: finds `key` in the set, returns the iterator, or `set.end()` otherwise. So you check for non-existance using `s.find(elem) == s.end()`
- `.contains()`: new in C++20



#### std::queue

This is a "container adaptor", it uses `std::deque` under the hood but exposes a subset of operations.

- `.front()`: Returns reference to first element
- `.back()`: Returns reference to last element
- `.push(val)`: Inserts element at the end
- `.emplace( Args&& args )`: Inserts element by constructing in-place
- `.pop()`: Removes element from front of queue, returns nothing





#### std::list

Doubly linked list

Element access: `front`, `back`

Modifiers: , `erase`, `push_back`, `pop_back`, `push_front`, `pop_front`, `append_range`, `prepend_range`

- `merge(list& other)`: Assume both lists sorted, merges both lists (stable) with no elements copied. The container `other` becomes empty after the operation
  Does nothing if `other` points to the same list
  Returns nothing
  Complexity O(N+M)

- `splice`: Transferring elements, does not modify the elements themselves just change the pointers

  - `splice(iterator pos, list& other)`: Transfers all elements from other into *this. The elements are inserted before the element pointed to by pos. The container other becomes empty after the operation.
  - `splice(iterator pos, list& other, iterator it)`: Transfers the element pointed to by it from other into *this. The element is inserted before the element pointed to by pos.
  - `splice(iterator pos, list& other, iterator first, iterator last)`: Transfers the elements in the range `[`first`, `last`)` from other into *this. The elements are inserted before the element pointed to by pos.

- `reverse()`: Reverses order of elements

- `unique()`: Removes all *consecutive* duplicate elements from the container. Only the first element in each group of equal elements is left.

- `sort([Compare comp])`: Sort elements, O(NlogN) e.g. via adapting mergesort

  - Comparison function takes signature: `bool cmp(const Type1& a, const Type2& b);` which returns true if the first argument is *less* than (i.e. is ordered *before*) the second.

  - ```cpp
    list.sort(std::greater<int>());
    ```



#### std::forward_list

Singly linked list

Less storage than `std::list`, but doesn't support bidirectional move







#### std::pair

making pairs. This is done in legacy code (before uniform init), benefit is type deduction from arguments, but may be more verbose than uniform init in some cases.

```cpp
template<class T1, class T2>
std::pair<T1, T2> make_pair( T1 t, T2 u);

auto p1 = std::make_pair(1, 3.14);
```

If your function returns a pair you can do structural binding

```cpp
auto [a, b] = foo();

// if you want to document return type explicitly, do this
std::pair<int, double> p = foo();
auto [a, b] = p;

// DO NOT DO THIS, this isn't allowed
std::pair<int, double> [a, b] = foo();
```



#### std::tuple

Class template std::tuple is a fixed-size collection of heterogeneous values.

Tuples are more lightweight than structs, mainly useful for returning multiple values in functions

Methods

- `std::make_tuple(... values)`
- `std::tie(... references)`: used mostly for structural assignment
- `std::get<i>(val)` or `std::get<T>(val)` though type T must be unambiguous 



```cpp
std::tuple<int, float> get_tup()
{
    return {5, 6};
}

int main()
{
    auto tup = std::make_tuple(1, "Hi", false);
    std::cout << std::get<0>(tup) << std::endl;
    std::cout << std::get<bool>(tup) << std::endl;
    
    // using std::tie
    int a = 1;
    float b = 2.0;
    auto t = std::tie(a, b);
    std::get<0>(t) = 3;
    std::cout << a << std::endl; // 3, tie creates tuple of references
    
    std::cout << std::tie(a, b) < get_tup() << std::endl; // 1
    
    std::tie(a, b) = get_tup(); // structured assignment, note here references are of a and b, not of return value of `get_tup`
    std::cout << a << ", " << b << std::endl;  // 5, 6
}
```



#### std::span

A view of a contiguous memory, useful when you want to pass some contiguous sequence but not owning the memory.

It only supports contiguous memory because internals do pointer arithmetic. For general iterators (e.g., for `std::list`), use `std::ranges::subrange`

Type signature
```cpp
template<
  class T,
  std::size_t Extent = std::dynamic_extent
> class span;
```

`Extent` is default equal to `std::dynamic_extent`. Extent is just the size of the span. If given as integer that size has static extent

Object size is very small so just copy it when passing through functions. Typically a pointer and a size. If extent is static, just pointer (size is taken care of at compile time)

Constructors:
- `span( R&& range );`
- `span( It first, size_type count );`
- `span( It first, End last );`
- etc.

```cpp
void print_span(const std::span<int> span)
{
  if (span.extent == std::dynamic_extent)
    std::cout << "dynamic: " << std::endl;
  else
    std::cout << "static: " << std::endl;

  for (auto& elem : span)
    std::cout << elem << std::endl;
}

int main()
{
  std::vector<int> vec1 = {1,2,3,4,5};

  std::span<int> span1 (vec1); 
  std::span<int, 4> span2 (vec1, 4);

  print_span(span1);  // dynamic: 1,2,3,4,5
  print_span(span2);  // static: 1,2,3,4
}  $$ Run this
```









#### std::map

Sorted key-value pair container. Logarithmic complexity for search, insert, and delete. Typically implemented as a Red-Black tree.

```cpp
m.insert({'a', 1});
```

Lookup: `count(key)`, `find(key)`, `contains(key)`, 

- `lower_bound(key)`: Return an iterator to the first element >= key
- `upper_bound(key)`: Return an iterator to the first element <= key

Note: `operator[]` insertion will overwrite if key exists. `insert` will do no-op if key exists.
	=> use `.at(i)` instead if your map is const

`for (auto val : map)` here `val` has type `std::pair<key_type, value_type>`





#### std::unordered_map

Like map but uses hash, because bucket_size needs to be O(1) uses chaining for collision



#### std::unordered_set

Interface very similar to `std::set` but data structure implemented as a hash table using chaining collision detection (because standard requires calculation of bucket size (bucket = elements with same hash value) to be constant time).

`std::unordered_set` iterators `.begin()` and `.end()` does not traverse in any sorted order.

`std::set` has range queries but `std::unordered_set` has bucket operations



### Special containers

#### std::bitset

Fixed size sequence of N bits. Very memory efficient, good for fixed-sized bitmapping, easy to do bit-wise operations, useful for permission masks or other bitmasks

Constructor

- `std::bitset<8> b;`: 8 bits all to 0
- `std::bitset<10> b(16);`: 10 bits with right bits set to the bit representation of the number
- `std::bitset<10> b("ABBABAB", 2, 3, /*0*/'A', /*0*/'B');`: 10 bits with right bits equal to string[2, 2+3) mapped with A->0, B->1. Here it's 0000000101

Element access:

- `.test(pos)`: return whether bit at `pos` is true. `std::bitset<3> b ("100", 0, 3, '0', '1'); b.test(0) // true`
- `.all()`
- `.any()`
- `.none()` => !any()
- `.count()`: # of bits set to true

Capacity:

- `.size()` Return # of bits the set holds

Modifiers:

- Bitwise: `&=`, `|=`, `^=`, `>>`, `<<`, `>>=`, `<<=`
- `~` -> returns copy of bitset with bits flipped, e.g., `cout << ~b << " (not b_" << endl;`
- `.set()`: Set all bits to true. `.set(pos, val)`: set bit at `pos` to `val`
- `.reset()`: Set all bi to false. `.reset(pos)`: set bit at `pos` to `false`
- `.flip()`: Flip all bits in-place
- `.flip(pos)`: Flip bit at `pos`



#### std::optional

`std::optional` is used for return values of function when the function can fail.

Benefits

- Unified way to represent if value exist or not
- Safe access, won't dereference a pointer
- No runtime overhead when value is not present
- Elegant error handling and functional programming support

Semantics

- Any instance of std::optional<T> at any given time either contains a value or does not contain a value
- If std::optional<T> contains a value, the value is guaranteed to be nested within the optional object, no dynamic allocation takes place
- The optional object contains a value if
  - The object is initialised with/assigned from a value of type T or another optional that contains a value
- The optional object does not contain a value if
  - The (std::optional) object is default-initialised
  - The object is initialised with/assigned from a value of type std::nullopt_t or another optional that contains a value
  - The member function `reset()` is called

Member functions

- `->`, `*`: Access contained value (even though not stored as pointer internally), undefined behaviour if `*this` does not contain a value
- `has_value`: Checks whether *this contains value
- `value`: Return value if *this contains value, otherwise throw exception
- `value_or(default)`: Returns *this if have value, otherwise returns default

Object structure



```cpp
template <typename T>
class optional
{
public:
    // blah

private:
    bool _has_value;
    std::aligned_storage_t<sizeof(T), alignof(T)> _storage;
};
```

Effectively `std::optional` is a storage container reservered for the object with a boolean.


Performance

- Checking if there's value will take 1 branch. This is unavoidable. Unless in extreme case this usually doesn't matter much
- May be space inefficient if object size small. E.g., for `int` will take 8 bytes because of alignment. May benefit from custom structs that can pack multiple bools together

You cannot do `std::optional<T&>`, you must copy the object.

**Ways of returning optional values**

```cpp
// Returning an nullptr. Issue: possible mishandling of nullptr, e.g. trying to dereference it
T* foo();

// Returning an optional
std::optional<T> foo();

// Returning a boolean, mutating the argument. Issue: require object to be in argument
bool foo(T& t);

// Returning agreed invalid value if fails, e.g., NaN here. Issue: overhead of rememebering the failure value
double foo();

// Returning a pair, the value and whether it's valid. Better as this can be standardized, but 1) syntax is cumbersome, 2) still have danger of accessing first value when second value is False, and 3) overhead of default constructing T when second value is False, esp when object is expensive to construct
std::pair<T, bool> foo();
```

$$ implement the internals



#### std::variant

std::variant is the standard perferred way to use unions in modern C++, it provides type safety and automatic memory management. Examples

```cpp
union U {
    int i;
    float f;
}

int main()
{
	U u;
	u.f = 3.14f  // note `u = 3.14f` is not allowed as C++ doesn't know which type you are initialising
	std::cout << u.i << std::endl;
}
```

The above code will compile, but behavior is undefined. It may work for your compiled code because how the memory and bit layout lines up to get a valid int back (probably a large integer that is reading from float representation of 3.14), but this is not guaranteed, might break with different compilers, with optimisations, or different architectures.

A union only holds the latest set value. You are not supposed to access it via a different type to the underlying, even if the code compiled the behavior is undefined.

With `std::variant` this is enforced at compile time

```cpp
int main()
{
    std::variant<int, float> u;
    u = 3.14f;  // assigns as float
    
    if (std::holds_alternative<int>(u))
        std::cout << std::get<int>(u) << std::endl;
   	else
        std::cout << std::get<float>(u) << std::endl; // std::get<int>(u) here will throw std::variant_bad_access error
}
```

Below is an example of automatic memory management

```cpp
union U {
    int i;
    float f;
    std::string s;
}

int main()
{
    U u;
    new (&u.s) std::string("Hello World");
    std::cout << u.s << std::endl;
    u.s.~basic_string(); // must manually destroy s and free memory
}
```

First note as `U` have some type variant that's not a trivial type (it contains std::string variant), we cannot default construct it like `U u{}`. Unions doesn't know the current underlying variant, so does not know what destructor to call. When it goes out of scope, only the stack is cleared. If destructor not manually called, we have a memory leak (the string stays in the heap)

In `std::variant` we know the current underlying type, so the right destructor is called

```cpp
int main()
{
    std::variant<int, float, std::string> u = "Hello World";
    std::cout << std::get<std::string>(u) << std::endl;
}

// destructor for u is called for the contained std::string object when u goes out of scope
```



Constructors

- std::variant< ...T> u {}  => default construction, constructs as the variant's first alternative (first type in template)
- std::variant< ...T> u = v   => assignment, assigns to the unique type that is valid candidate, or the "best" type candidate if multiple are available based on some ranking rules

Note, std::variant<int, int> etc. where same type is repeated is not valid and will not compile



Members

- `std::monostate`: unit type intended as an empty alternative in `std::variant`, useful as first type alternative in `std::variant` to make it default constructable
- `std::holds_alternative<T>(u)`: returns if `u` holds the alternative `T`
- `std::get<T/index>(u)`: return the underlying of `u`, throws error if the type `T` or type index `index` does not match the current type of variant
- `std::get_if<T/index>(u)`: same as `get` but returns pointer to value, nullptr instead of error-ing
- `std::index`: Returns the zero-based index of the alternative that is currently held by the variant.






#### std::ranges $$

https://ericniebler.github.io/std/wg21/D4128.html#motivation-and-scope

Motivation:
- Eliminate the need to provide iterator and sentinel pair for common case (ie. `std::sort(v.begin(), v.end())` -> `std::sort(v)`). This makes code cleaner and avoids issues with specified iterator
- Range adaptors to transform ranges lazily and allow chaining, probably more powerful

```cpp
// Old way. Intermediate results must be stored somehow
std::vector<int> input = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
std::vector<int> intermediate, output;

std::copy_if(input.begin(), input.end(), std::back_inserter(intermediate), [](const int i) { return i%3 == 0; });
std::transform(intermediate.begin(), intermediate.end(), std::back_inserter(output), [](const int i) {return i*i; });

// New way. With ranges the function is triggered per element when needed. Intermediate result not stored first, final elements are moved to the destination
// requires /std:c++20
std::vector<int> input = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

auto output = input
    | std::views::filter([](const int n) {return n % 3 == 0; })
    | std::views::transform([](const int n) {return n * n; })
```

https://learn.microsoft.com/en-us/cpp/standard-library/range-adaptors?view=msvc-170
Range adaptors (`std::ranges::drop`, `std::ranges::filter` ...) takes a range and produces a View object.
View objects are lightweight ranges:
- `std::ranges::drop` produces `std::ranges::drop_view` object etc.
- Views can be composed, as discussed before
- Views represent future computation
- View object itself can be moved, copied etc. in O(1) time, regardless of size of container it points to
- Views don't own the underlying container, so if container changes so does the view
```cpp
#include <algorithm>
#include <iostream>
#include <ranges>

int main()
{
    int input[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    auto even = [](const int n) { return n % 2 == 0; };
    auto x = input | std::views::filter(even); // create a view of the even elements from input

    for (int &i : x)
    {
        std::cout << i << ' '; // 0 2 4 6 8 10
    }
    std::cout << '\n'; 

    std::ranges::fill(x, 42); // changes the evens from input[] to 42
    for (int &i : input) // demonstrates that the even elements in the range are modified
    {
        std::cout << i << ' '; // // 42 1 42 3 42 5 42 7 42 9 42
    }
}
```

Range algorithms take range object as input and return iterators, otherwise work similarly to algos in `<algorithm>`. You can't chain return type of range algorithms as they return iterators. But you can chain range adaptors as they return views.







### Iterators

Iterators act as generic access patterns that allow STL algorithms to operate across STL containers



https://cplusplus.com/reference/iterator/

An iterator is an object that points to some element and ability to iterate through the container of elements.

There are 5 types of iterators: input, output, forward, bidirectional, and random access. Each supporting an additional set of methods.

All categories:

- `b = a`: Assignment
- `++a`, `a++`: Increment

Input:

- `a == b`, `a != b`: Equality comparisons
- `*a`, `a->m`: Dereferencing

Output:

- `*a = t`, `*a++ = t`: Assignable

Forward:

- `{ b=a; *a++; *b; }`: Multi-pass, neither dereferencing nor incrementing affects dereferenceability

Bidirectional:

- `--a`, `a--`, `*a--`: Can decrement

Random access:

- `a+n`, `a-n`: Support arthimetic operators
- `a<b`, `a>=b`: Support inequality
- `a += n`: Support compound assignment
- `a[n]`: Supports offset dereference operator







### Algorithm

The algorithms library defines functions for a variety of purposes (e.g. searching, sorting, counting, manipulating) that operate on ranges of elements. 



| Syntax | Description |
| --- | --- |
| `f=for_each(b,e,f)` | For each element `x` in `[b:e)` do `f(x)` |
| `p=find(b,e,x)` | `p` is the first `p` in `[b:e)` so that `*p == x` |
| `p=find_if(b,e,f)` | `p` is the first `p` in `[b:e)` so that `f(*p)` |
| `n=count(b,e,x)` | `n` is the number of elements `*q` in `[b:e)` so that `*q == x` |
| `n=count_if(b,e,f)` | `n` is the number of elements `*q` in `[b:e)` so that `f(*q)` |
| `replace(b,e,v,v2)` | Replace elements `*q` in `[b:e)` so that `*q == v` with `v2` |
| `replace_if(b,e,f,v2)` | Replace elements `*q` in `[b:e)` so that `f(*q)` with `v2` |
| `p=copy(b,e,out)` | Copy `[b:e)` to `[out:p)` |
| `p=copy_if(b,e,out,f)` | Copy elements `*q` from `[b:e)` so that `f(*q)` to `[out:p)` |
| `p=move(b,e,out)` | Move `[b:e)` to `[out:p)` |
| `p=unique_copy(b,e,out)` | Copy `[b:e)` to `[out:p)`, don't copy adjacent duplicates |
| `sort(b,e)` | Sort elements of `[b:e)` using `<` as the sorting criterion |
| `sort(b,e,f)` | Sort elements of `[b:e)` using `f` as the sorting criterion |
| `(p1,p2)=equal_range(b,e,v)` | `[p1:p2)` is the subsequence of the sorted sequence `[b:e)` with value `v` |
| `p=merge(b,e,b2,e2,out)` | Merge two sorted sequences `[b:e)` and `[b2:e2)` into `[out:p)` |
| `p=merge(b,e,b2,e2,out,f)` | Merge two sorted sequences `[b:e)` and `[b2:e2)` into `[out:p)` using `f` |




### Utility

#### std::shared_ptr

A smart pointer introduced since C++11 that gives a pointer many owners. A reference count is kept track of by `shared_ptr`, incremented when new `shared_ptr` points to the object, decremented the other way around (a `shared_ptr` goes out of scope or is reset).

When reference count reaches 0, memory for that object is freed (or when last owning object resets the pointer)

`shared_ptr` instances can point to the same object.

`shared_ptr` helps prevent memory leaks, safely copy without worrying about double deletion.

Though watch out for more overhead and potential for cycles (in this case, the reference count will never reach 0 even though the object is out of scope)

```cpp
struct Knot {
    int val = 0;
    std::shared_ptr<Knot> next;
}

int main() {
    auto k1 = std::make_shared<Knot>();
    auto k2 = std::make_shared<Knot>();

    k1->next = k2;
    k2->next = k1;
} // Here the shared_ptr both still have count 1 and so do not destroy the objects, the destructor is never called.
// At end of function, both share_ptr goes out of scope, but since they reference each other the reference count are both 1.
```

Whether or not a function should return `shared_ptr` or the underlying pointer depends on ownership semantics. If the function share ownership to caller, then `shared_ptr` is returned. If caller doesn't need ownership, return the underlying object, and callee must keep object alive. Returning underlying object also reduces overhead of pointer unpacking and not needing to change the reference count.

```cpp
int main()
{
    std::shared_ptr<Base> p = std::make_shared<Derived>();
 
    print("Created a shared Derived (as a pointer to Base)", p);
 
    std::thread t1{thr, p}, t2{thr, p}, t3{thr, p};
    p.reset(); // release ownership from main
 
    print("Shared ownership between 3 threads and released ownership from main:", p);
 
    t1.join();
    t2.join();
    t3.join();
 
    std::cout << "All threads completed, the last one deleted Derived.\n";
}
```

Interface for `make_shared`

```cpp
template <class T, class... Args>
shared_ptr<T> make_shared (Args&&... args);
```

- `.reset()`: Replaces the pointed object to point to no object
- `.reset( Y* ptr )`: Replaces the pointed object to `ptr`, throws `std::bad_alloc` if memory allocation fails
- `.get()`: Get the underlying object pointer, usually just use `->` or `*` to access methods of the underlying object



#### std::unique_ptr

Like `shared_ptr` but only one object can claim ownership to it. When the `unique_ptr` object goes out of scope, the underlying object is destroyed and memory freed using `delete`. Object also deleted if `reset` is called or managing object is assigned another pointer with `=`

```cpp
// Creating a unique ptr
std::unique_ptr<T> ptr = std::make_unique<T>(obj);
```

Modifiers:

- `.release()`: releases ownership of object and returns a pointer to object
- `.reset(pointer)`: sets the unique_ptr to manager the new object pointed by `pointer` and deletes old object

Observers:

- `.get()`: returns pointer to object or `nullptr` if no object is owned
- `.get_deleter()`: returns custom deleter if it's used for destruction of object
- `*`, `->`: Dereferences pointer to the managed object. `*` is equivalent to `*get()`, and `->` is equivalent to `get()`



#### std::weak_ptr $$





#### std::move

std::move is used to indicate that an object `t` may be "moved from".

The most basic use case is passing an object to a function. Normally copying will take place. But if we're passing ownership to the function, we can just move the object (imagine it's a large object on the heap).

The functions that accept rvalue reference parameters (including move constructors, move assignment operators, and regular member functions such as std::vector::push_back) are selected, by overload resolution, when called with rvalue arguments.

```cpp
// Simple move constructor
A(A&& arg) : member(std::move(arg.member)) // the expression "arg.member" is lvalue even if arg itself is an rvalue, here will then call the move constructor on member
{}
 
// Simple move assignment operator
A& operator=(A&& other)
{
    member = std::move(other.member);  // again "other.member" is lvalue here, need to use std::move to call the move assignment on member
    return *this;
}
```



#### std::forward

When t is a forwarding reference (a function argument that is declared as an rvalue reference to a cv-unqualified function template parameter), this overload forwards the argument to another function with the value category it had when passed to the calling function.

```cpp
void print_name(const std::string& name)
{
    std::cout << "[lvalue]" <<  name << std::endl;
}

void print_name(std::string&& name)
{
    std::cout << "[rvalue]" <<  name << std::endl;
}

template<class T>
void wrapper(T&& arg)
{
    // arg is always lvalue, because any named variable is an lvalue, regardless of whether it was initialized from an rvalue or not
    print_name(arg);  // uses lvalue
    print_name(std::move(arg));  // always converts to rvalue
    print_name(std::forward<T>(arg));  // uses value category of T
}

int main()
{
    std::string name = "Yuming";
    wrapper(name);      // lvalue, rvalue, lvalue
    wrapper("Yuming");  // lvalue, rvalue, rvalue
}
```

value categories: https://en.cppreference.com/w/cpp/language/value_category




#### std::swap $$





#### std::exchange

As part of `<utility>` header.

Assigns object to new value and returns old object.

```cpp
template<class T, class U = T>
T exchange(T& obj, U&& new_value);

// old code
auto temp = foo;
foo = bar;
bar = foo;

// new code
foo = std::exchange(bar, foo);
```

Possible implementation $$ understand this

```cpp
template<class T, class U = T>
constexpr // Since C++20
T exchange(T& obj, U&& new_value)
    noexcept( // Since C++23
        std::is_nothrow_move_constructible<T>::value &&
        std::is_nothrow_assignable<T&, U>::value
    )
{
    T old_value = std::move(obj);
    obj = std::forward<U>(new_value);
    return old_value;
}
```





## IO libraries

https://en.cppreference.com/w/cpp/io

Very old library, poeple often criticise the difficulty in using (e.g., confusing overloading, stateful formatting, verbose interface).

There are more modern alternatives around (e.g., `std::format`)

Also this: https://github.com/fmtlib/fmt





## Absl


### Absl::Time

```cpp
absl::Time t = absl::FromUnixNanos(time_uint);
std::cout << absl::FormatTime(t, absl::UTCTimeZone());
```



### Abseil Containers

https://abseil.io/docs/cpp/guides/container



Interface designed to be very similar to STL containers. Though there are small differences so should not be blindly swapped.

But otherwise generally more efficient than STL container for most use case





## Testing libraries




### GoogleTest

Terms:

- Assertions: success, nonfatal failure, fatal failure
  - fatal failure => function aborts, otherwise it continues to run
- If an assertion trips, the test fails
- Test suite: many related tests grouped together
- Test fixture: common objects and functions shared between tests
- Test program: contains multiple test suites



Assertions:

- `ASSERT_*` for fatal failure version, `EXPECT_*` for nonfatal failure version
  - As `ASSERT_*` breaks from function execution, clean up code is usually skipped. This can cause a memory leak
- When assertion trips, GoogleTest prints  source file, line number location, and failure message
- Custom failure message

```cpp
ASSERT_EQ(x.size(), y.size()) << "Vectors x and y are of unequal length.";

for (int i=0; i<x.size(); ++i) 
    EXPECT_EQ(x[i], y[i]) << "Vectors x and y differ at index " << i;
```

Common assertions: https://google.github.io/googletest/reference/assertions.html

- `SUCCEED()`: Assertion that always passes
- `FAIL()`: Assertion that always fails fatally
- `ADD_FAILURE()`: Assertion that always fails nonfatally
- `ASSERT_THAT(value, matcher)`: Assert value matching to matcher
  - E.g., `ASSERT_THAT(value, StartsWith("Hello"))` (using ::testing::StartsWith)
- `ASSERT_TRUE(condition)`, `ASSERT_FALSE(condition)`
- `ASSERT_EQ(val1, val2)`: Does pointer equality on pointers. Compare memory location for C strings, use `ASSERT_STREQ` if you want to check content
- `ASSERT_NE`, `ASSERT_LT` ...
- `ASSERT_STREQ`, `ASSERT_STRNE`: String content comparison for C strings
- `ASSERT_STRCASEEQ`, `ASSERT_STRCASENE`: ^^ ignoring case
- `ASSERT_FLOAT_EQ(val1, val2)`: abs(val1 - val2) <= 4 ULP (least significant places)
- `ASSERT_DOUBLE_EQ(val1, val2)`: ^^ for doubles
- `ASSERT_NEAR(val1, val2, abs_error)`: abs(val1 - val2) <= abs_error
- `ASSERT_THROW(statement, exception_type)`: `statement` to throw an exception of type `exception_type`
- `ASSERT_ANY_THROW(statement)`, `ASSERT_NO_THROW(statement)`
- `ASSERT_PRED2(pred, val1, val2)`: pred(val1, val2) to be true. This gives better error messages than having the function inside `ASSERT_TRUE`
  - E.g., `ASSERT_PRED2(MutuallyPrime, a, b);`
  - Function works as expected for `ASSERT_PRED1`, `ASSERT_PRED3` ...



Simple tests:

```cpp
TEST(TestSuiteName, TestName) {
    // Test body
}
```

Note, `TestSuiteName` and `TestName` cannot contains underscores.

The test body is just the body of an ordinary C++ function, returning no value.

Example

```cpp
// Tests factorial of 0.
TEST(FactorialTest, HandlesZeroInput) {
  EXPECT_EQ(Factorial(0), 1);
}

// Tests factorial of positive numbers.
TEST(FactorialTest, HandlesPositiveInput) {
  EXPECT_EQ(Factorial(1), 1);
  EXPECT_EQ(Factorial(2), 2);
  EXPECT_EQ(Factorial(3), 6);
  EXPECT_EQ(Factorial(8), 40320);
}
```



Test fixtures

Test fixtures allow the same configuration to be used across tests (note, the objects are created before each test and destroyed after each test)

```cpp
// Inherit from testing::Test 
class QueueTest : public testing::Test {
 // Use protected so fields available to subclasses
 protected:
  void SetUp() override {
     // q0_ remains empty
     q1_.Enqueue(1);
     q2_.Enqueue(2);
     q2_.Enqueue(3);
  }

  // void TearDown() override {}

  // Objects and functions to share
  Queue<int> q0_;
  Queue<int> q1_;
  Queue<int> q2_;
};
```

1. GoogleTest constructs a `QueueTest` object (let’s call it `t1`).
2. `t1.SetUp()` initializes `t1`.
3. The first test (`IsEmptyInitially`) runs on `t1`.
4. `t1.TearDown()` cleans up after the test finishes.
5. `t1` is destructed.
6. The above steps are repeated on another `QueueTest` object, this time running the `DequeueWorks` test.

To use the fixture, use the `TEST_F` function and pass in the fixture class name

```cpp
TEST_F(TestFixtureClassName, TestName) {
  ... test body ...
}
```



main() function

```cpp
#include "this/package/foo.h"

#include <gtest/gtest.h>

namespace my {
namespace project {
namespace {

// The fixture for testing class Foo.
class FooTest : public testing::Test {
 protected:
  // You can remove any or all of the following functions if their bodies would
  // be empty.

  FooTest() {
     // You can do set-up work for each test here.
  }

  ~FooTest() override {
     // You can do clean-up work that doesn't throw exceptions here.
  }

  // If the constructor and destructor are not enough for setting up
  // and cleaning up each test, you can define the following methods:

  void SetUp() override {
     // Code here will be called immediately after the constructor (right
     // before each test).
  }

  void TearDown() override {
     // Code here will be called immediately after each test (right
     // before the destructor).
  }

  // Class members declared here can be used by all tests in the test suite
  // for Foo.
};

// Tests that the Foo::Bar() method does Abc.
TEST_F(FooTest, MethodBarDoesAbc) {
  const std::string input_filepath = "this/package/testdata/myinputfile.dat";
  const std::string output_filepath = "this/package/testdata/myoutputfile.dat";
  Foo f;
  EXPECT_EQ(f.Bar(input_filepath, output_filepath), 0);
}

// Tests that Foo does Xyz.
TEST_F(FooTest, DoesXyz) {
  // Exercises the Xyz feature of Foo.
}

}  // namespace
}  // namespace project
}  // namespace my

int main(int argc, char **argv) {
  testing::InitGoogleTest(&argc, argv);
  // Runs all tests
  // main function must return value of `RUN_ALL_TESTS()`, otherwise compilation fails
  return RUN_ALL_TESTS(); // 0 if all tests successful, 1 otherwise
}
```



### BOOST Test

(https://www.boost.org/doc/libs/1_85_0/libs/test/doc/html/index.html)

`BOOST_AUTO_TEST_SUITE(TestSuiteName)`

`BOOST_FIXTURE_TEST_CASE(testCaseName, fixtureName)`

`BOOST_AUTO_TEST_CASE(testCaseName)`

For floating pointer comparison
```cpp
double TOL = 0.000'1; // Relative error
BOOST_CHECK_CLOSE(actual, expected, TOL);
```

To add information on which loop failed.
```cpp
for (int i = 0; i < size; i++)
{
    BOOST_CHECK_EQUAL(actual, expected);
}

// Better to write this
for (int i = 0; i < size; i++)
{
    BOOST_TEST_CONTEXT("i = " << i)
    {
        BOOST_CHECK_EQUAL(actual, expected);
    }
}
```


## Miscellaneous

#### std::nullptr_t

This is the type of the null pointer literal `nullptr`. A simple use case is to state `nullptr` in types (e.g., `std::variant<int, std::nullptr> foo = nullptr;`.  The most common usecase is for function overload resolution

```cpp
template <typename T>
class Foo
{
    Foo() { ... }
    Foo(std::nullptr_t) { ... } // Constructor taking a nullptr
    Foo(T* t) { ... }           // Constructor taking vald pointers

    ...
}
```

Consider the following illustrative example:

```cpp
#include <cstddef>
#include <iostream>
 
void f(int*) { ... }
 
void f(double*) { ... }
 
void f(std::nullptr_t) { ... }
 
int main()
{
    int* pi{};
    double* pd{};
 
    f(pi);
    f(pd);
    f(nullptr); // would be ambiguous without void f(nullptr_t)
    // f(0);    // ambiguous call: all three functions are candidates
    // f(NULL); // ambiguous if NULL is an integral null pointer constant 
                // (as is the case in most implementations)
}
```

A word about `NULL`, this is a legacy construct from C, used as canonical way to represent nullptr. In C++ it is defined in header `<cstddef>` as

```cpp
#define NULL 0
```














