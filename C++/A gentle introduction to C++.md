# A gentle introduction to C++

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


**Compilation process**

Preprocessing: handles preprocessor directives like `#include` and `#define`, `#if`, `#ifdef` etc.

Compilation: the "pure" C++ files are then parsed, converted to assembly, and optimised. Here the compiler targets a specific instruction set architecture (ISA) like x86-64, ARM, RISC-V. Then the hardware specific backend (assembly tool-chain) converts the assembly into machine code (binary). Most compiler errors are generated by this point. The files are usually kept so if the source file isn't change, no recompilation is needed.

Linking: Linking binary files together so the symbols (aka. variables) can link each other via addresses.

Example C++ compilers: GCC, Clang, MSVC





C++ standards:

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



Pointers and references

```cpp
// Pointer stores address of a value
int* pointer = &gum;
int* numPointer = new int(1000);

// Reference is an alias for another object (they point to same address), modifying one shows same modification in the other
int &sonny = songqiao;

// Memory address
// Use & operator to get the address of a variabel
std:cout << &porcupine_count << "\n";

// Dereference
// Fetches value of a pointer
int dereference = *pointer;

// Pass by reference
void swap_num(int &num1, int &num2) {
    int temp;
    // Store num1 in temp variable
    temp = num1;
    // Write value of num2 to num1
    num1 = num2;
    // Write temp variable to num2
    num2 = temp;
}
// Here if we're passing by value, then the changes stay in the function stack and will not have side effect of swapping these two values
```







**Parking:**

- Explore more about the compiler. What is linking? etc.







## Basics of C++



### Program structure

```c++
#include <iostream>	// instructors preprocessor to include a section of standard C++ code, known as `header iostream`

/* This functions prints `Hello World` to the standard output */
int main()
{
	std::cout << "Hello World!";	// C++ statement
}
```

- `main` is the entry point of the program

C++ does not care about indentation or new lines (apart from preprocessor directives which must be in their own lines). The above program could have equally been written as

```c++
#include <iostream>

int main() { std::cout << "Hello World!"; }
```



You can also use the namespace `std`

```c++
// My first program in C++
#include <iostream>
using namespace std;

int main()
{
	cout << "Hello World!";
}
```

- `cout` is the unqualified name
- `std::cout` is the qualified name (`cout` is a function inside the standard library `std`)




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

A C++ program does not need to know where the data is stored, it can reference the data using the variable name. It does, however, need to know the underlying type of variables.

Note, for type names the italic parts can be omitted. (`signed long int` can be abbreviated as `long`)

Note, for different types within the same group, only the size is different, the other properties are the same. And for size, only the minimum size is given. The compiler is freely able to choose the actual size based on the target machine.

`size_t`: Type to store the maximum size of a theoretically possible object of any type in C++. Think of this as `uint64_t` but can store numbers larger than max unsigned 64-bit int. Often used in for loops


```c++
for (size_t i = 0; i < N; i++) {
    // blah
}

// Downloop
for (size_t i = vec.size(); i--; ) {
    // blah
}

// Infinite loop as size_t is non-negative
//for (size_t i = vec.size(); i >= 0; i--) {
    // blah
//}
```

If you don't care much about precision or memory usage, then `char`, `int` and `double` is all you need.

Note, in parctice we use more defined types such as `uint32_t` in `<stdint.h>`. These types are standardized by C++ 11 standard.

These types are more readable (know exact size allocated, not just minimum size and have it implementation dependent) and more portable. Modern code we use this.








**Variable declarations**

```c++
int a;
float mynumber;
```

C++ is strongly typed, every variable must have its type explicitly defined before first use. This tells the compiler the memory needed to be reserved for the variable and how to interpret its value.

If variables have the same type, they can be declared on the same line

```c++
int a, b, c;
```

Note the below common mistake

```c++
int* a, b;  // `a` is of type int*, `b` is of type int
b = 0;
a = &b;
*a += 1;
std::cout << *a << std::endl;  // 1

int *a, *b; // Both are of type int*
```

We can initialize variables in several (equivalent) ways

```c++
int a = 3;  // c-like, assignment initialisation
int a (3);  // constructor initialisation
int a {3};  // uniform initialisation
```

After C++11, we always prefer uniform initialisation, as it'll work for almost all types. We can also omit `{}` where the default constructor will be called.

You can let the compiler deduce the type for you using `auto` and `decltype` keywords (use the same type as something else), though this probably reduces readability and hence should not be used extensively.

```c++
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






### Constants

**Literals**

```c++
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



**Escapes for special characters**

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



**Typed constant expressions**

Sometimes it's convenient to give a constant a name, instead of writing out that constant everywhere

```c++
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



**Preprocessor definitions**

Preprocessor definitions are similar to typed constants, but the replacement is done in preprocessing stage. The identifier is replaced by the constant in a "blind" way, without type or syntax checking.

```c++
#define PI 3.14159
...

circle = 2 * PI * r;
```







### Operators

Assignment `=`

```c++
int a = 10;
int y = 2 + (x = 5); // Assignment is an expression that returns the value assigned. Here we assign 5 to x, then 2+5=7 to y
x = y = z = 5;  // Multiple assignment
```



Arithmetic operators: +, -, *, /, %

/ returns integer if both arguments are integers (floor division), otherwise returns float



Compound assignment: +=, -=, *=, /=, %=, and more ...



Increment and decrement: ++, --

```c++
x = 3;
y = ++x; // Incremented before evaluation, y is set to 4

x2 = 3;
y = x++; // Evaluated before incremented, y is set to 3
```



Relational: ==, !=, >, <, >=, <=



Logical: !, &&, ||

C++ logical operator short-circuits



Ternary

```c++
string s = 7 > 5 ? "larger" : "smaller";
```



Comma operator

Expressions are evaluated from left to right, but only right most is considered for output

```c++
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



Explicit casting

```c++
int i;
float f = 3.14;
i = (int) f; // takes floor of value, so i is assigned 3
```



Return size in bytes of variable or type

```c++
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

```c++
cout << 120;  // Implicit conversation is done
cout << "Hello" << " World!"; // Chaining allowed
cout << "The number is " << x << ".";  // This can be used like Python's f-string
```



`endl`

```c++
cout << "First sentence." << endl;
cout << "Second sentence." << endl;
```

`endl` will produce a newline character, but also instructs the stream's buffer to be flushed. So use `\n` when just needing the newline character.



**cin**

```c++
int age;
cout << "What is your age?" << endl;
cin >> age;
```

cin is rarely used as we usually need some good parsing of input data.

If user inputs something that cannot be parsed as an `int` in this case, the extraction fails, and program will continue to run without setting `age`. This is generally not what we want.

cin also checks for whitespace, new-line ... so it usually doesn't take in entire string but just first word. (use `getline` for this)



**stringstream**

Converts a string into a stream, which exposes the data to be used using stream operators.

```c++
#include <sstream>
using namespace std;

string mystr = "1204";
int myint;
stringstream(mystr) >> myint;  // myint = 1204
```











## Program structure

### Statements and flow control



**if and else**

```c++
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

```c++
while (true) {
    if (x < 10)
        x++
    else
        break
}
```





**do-while**

```c++
do {
    x++
} while (x < 10);
```

Statement is executed before first evaluation of guard. Useful when statement needs to execute at least once.





**for**

```c++
// initiaited, then repeat (check, execute body, execute increment)
for (int i = 0; i < N; i++)
{
    cout << a[i] << ", ";
}
```

Note, the 3 parts (initialization, condition, statement) are all optional

- No initialization and no increase acts like a while loop

```c++
for (;n<10;)
```

- No initialization only can be used when initialization is taken care of elsewhere

```c++
for (;n<10;n++)
```

- No condition is equivalent to `while (true) {}`

```c++
for (n=0;;n++)
```

You may want to execute multiple statements in each part. We can separate out the expressions with `,` to make up the simple expression 

```c++
for ( n=0, i=100 ; n!=i; n++, i-- )
{
    // blah (this is executed 50 times, if values of n and i are not altered in the loop)
}
```



Range

```c++
// for ( declaration : range) statement;
for (char c : str)
```

Range commonly use the `auto` type declaration to declare the type

```c++
for (auto c : str)
```





**Jump statements**

break: break out of enclosing loop

continue: skip to next iteration

```c++
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

```c++
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

```c++\
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







### Functions

```c++
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
void say (const string% s)
{
    std::cout << s << end;
}

/*
Pass by reference is considerably faster for larger data types, as it only copies the reference to the subroutine stack, not the entire value.
Though pass by reference introduces the possibility of side effects, so we can use the `const` qualifier as displayed earlier.
Pass by reference for smaller datatypes like `int` can actually worsen performance, as each access needs 2 cycles (fetch address, then fetch value) instead of 1 cycle (fetch value from stack)
*/

// Inline functions (insert code in function instead of doing calling by adding new stackframe)
inline string concat (const string& a, const string& b)
{
    return a+b;
}
// Most compilers will inline functions where it sees a performance improvement. So the `inline` keyword simply indicates to the compiler that inserting this function as inline is preferred. Though the compiler change choose not to inline it.

// Default values
int divide (int a, int b=2)
{
    return a/b;
}
```


Note, for default values can only be in .h files (not .cpp source files). So you want to do this:

`MyClass.h` file

```c++
std::string to_string(bool compact=false) const;
```

`MyClass.cpp` file

```c++
std::string to_string(bool compact) const
{
    // Your code
}
```

In addition, you can only define arguments with default values from left to right. You cannot skip like you do in Python. This makes default values in C++ rather limited.

```c++
void do_stuff(int a = 1; int b = 2; int c = 3) { //blah }

do_stuff(4, 5);  // this specifies a and b. There's no way in the language to specify only a and c
```



Declaring functions

Functions must be declared textually before they are used. However, it's possible to declare a protofunction (its signature), use it, then define it later further down in the code

```c++
int odd (int x);
int even (int); // protofunction can omit variable names

int main ()
{
    int i;
    cin >> i;
    if (odd(i))
        cout << "It's odd" << endl;
    else
        cout << "It's even" << endl;
}

int odd (int x)
{
    return x%2 == 1;
}

int even (int x)
{
    return x%2 == 0;
}
```



Protofunctions are necessary for functions which are mutually exclusive, as you cannot define one without the other

```c++
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







### Overloads and templates

```c++
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



Function templates => polymorphic functions

```c++
template <typename T>	// Can also write `template <class T>`, there is no difference
T sum (T a, T b)
{
    return a+b;
}
```

The generic typename can be used anywhere in the function (return type, declaring new variables with that type)

You can call polymorphic functions by supplying it with the actual type

```c++
x = sum<int>(10,20);
```

When the type is defined, the function is equivalent to:

```c++
int sum (int a, int b)
{
	return a+b;
}
```

Syntax for multiple `typename`s

```c++
// function templates
#include <iostream>
using namespace std;

template <class T, class U>
bool are_equal (T a, U b)
{
  return (a==b);
}

int main ()
{
  if (are_equal<int,double>(10,10.0))
    cout << "x and y are equal\n";
  else
    cout << "x and y are not equal\n";
  return 0;
}
```





```C++
// template arguments
#include <iostream>
using namespace std;

template <class T, int N>
T fixed_multiply (T val)
{
  return val * N;
}

int main() {
  std::cout << fixed_multiply<int,2>(10) << '\n';
  std::cout << fixed_multiply<int,3>(10) << '\n';
}
```

The types of call to `fixed_multiply` is determined at compile time.







### Name visibility

- Global scope: Variables accessible everywhere in code. Global scope has empty prefix namespaces (`f` in global scope has namespace `::f`)
- Block scope: Variables inside blocks (called local variables), accessible inside the block (included blocks nested inside it)

Same name can exist across namespaces. Names within a namespace cannot conflict.

You can define namespaces

```c++
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

```c++
int main()
{
    cout << foo::value() << "\n";  // 5
    cout << bar::value() << "\n";  // 6.2832
    cout << bar::pi << "\n";       // 3.1416
    return 0;
}
```

You can define the same namespace in different parts of the code

```c++
namespace foo { int a; }
namespace bar { int b; }
namespace foo { int c; }
```

You can have nested namespaces. The child namespace can refer to parent without qualifiers. Parent namespace can refer to child with qualifiers. When C++ searches in nested namespaces, it does backward search. Say if the current namespace is `foo::bar`, and C++ cannot find the variable `baz` inside `foo::bar`, it'll try to find `baz` in namespace `foo`

```c++
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

```c++
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

```c++
namespace {
    int i = 1;
}
```

With `using` keyword, all names inside the namespace can be used in current scope without qualifiers. If there is name ambiguity on used names, a compilation error will fire.

```c++
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

```c++
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

$$ Namespace hiding => this is unclear to me
$$ Inline namespaces




Namespace aliasing

```c++
namespace new_name = current_name;
```





Storage and namespaces

- Global and namespace variables are allocated static storage. They are initialized to zeroes
- Variables inside blocks (local variables) are allocated automated storage. They are not initialized.

```c++
// static vs automatic storage
#include <iostream>
using namespace std;

int x;

int main ()
{
  int y;
  cout << x << '\n';
  cout << y << '\n';
  return 0;
}
```















## Compound data types



### Strings!!!!


`std::string` is a small struct with 

```c++
// string
struct {
    int len;
    int capacity;
    char* data;
};
```

Under the hood it calls `malloc` and `free`. 

Strings cannot be `constexpr` as it cannot be constructed during compile time. For this we need to use `string_view`.

`string_view` is like strings but does not own the underlying object. If the string_view is deleted, the underlying data is kept in place. It's basically a pointer with length information

```c++
// string_view
struct {
    int len;
    char* data;
};
```

Because of this, `string_view` can be a constexpr, as the compiler just needs to store the data in `.rodata` vector at compile time and make the pointer point to it.

```c++
constexpr std::string_view my_string = "Hello World";
```

For C-strings, the below are equivalent

```c++
char *myString = "Hello";
char myString[6] = {'H', 'e', 'l', 'l', 'o', 0}
```




### Arrays

```c++
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



Library arrays

An alternative array type as a standard container. Some improvements over standard arrays inherited from C is that library arrays can be copied, and only decay into pointers when explicitly told to do so.

```c++
#include <array>
int main()
{
    array<int,3> myarray { 10, 20, 30 };
    
    for (int i=0, i=myarray.size(); i++)
        myarray[i]++;
    
    for (int elem : myarray)
        cout << elem << '\n';
    
    return 0;
}
```









### Character sequences

```c++
// A string can also just be presented explicitly as an array of characters. Don't forget the null character at the end. Null charcter indicates end of a string, by convention.
char myword [] = { 'H', 'e', 'l', 'l', 'o', '\0' };

// We can also initialize with a string literal, which appends the null character automatically
char yourword [] = "Hello";

// Reassigning to `yourword` will no be valid
yourword = "World";	// Invalid

// `yourword` is an array, assignment must be made cell by cell
myword[0] = 'W';
myword[1] = 'o';
myword[2] = 'r';
myword[3] = 'l';
myword[4] = 'd';

// In C++, people use both the C-strings (the char array representation) and string types. 
// C-strings are created when using character arrays explicitly or using the string literal `""`
// Methods on strings are usually overloaded to deal with both. 
```





### Pointers & References

```c++
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

```c++
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








### Dynamic memory

Some cases memory cannot be determined before program execution, such as in cases where memory depends on user input.



**New operator: allocate memory**

```c++
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

```c++
delete[] foo;
delete bar;
```

Deallocates memory for the pointer. If `nullptr` is provided, there will be no effects.





### Data structures

A data structure is a group of data element together under one name.

```c++
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



You can create pointer to `struct`

```c++
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

```c++
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

```c++
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

For "keyword" initialisation, the order of arguments must follow that of struct declaration. A good rule of thumb is to declare struct fields to be in alphabetical order, this way the caller will know the order of declaration (without needing to check at the definition each time).

```c++
struct Point
{
    int a;
    int b;
}

Point right{.a=10; .b=20};
Point wrong{.b=20; .a=10};  // Compiler error
```

Structs vs. Class: The two constructs are identical in C++ except that in structs the default accessibility is public, whereas in classes the default is private. If you cast a struct object to identically defined class, the default methods will still be public.





### Other data types



**Type aliases**

```c++
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

```c++
using C = char;
using WORD = unsigned int;
using pChar = char *;
using field = char [50];
```

One use of type aliases is to have a easy way to switch, say between `int` and `long`, by just changing the alias declaration, instead of changing it every in the code.





**Unions**

Syntactically like `struct`, but all members occupy the same space.

```c++
union mytypes_t {
    char c;
    int i;
    float f;
} mytypes;
```

They all occupy the same underlying 4-byte long memory. When you access  `mytypes.char` and `mytypes.f`, they cast the underlying memory to the respective types. Changing one member affects the other members, as the underlying memory changed.



```c++
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





**Anonymous unions**

You can define union inside a `struct` and not giving it a name, which omits the union name during use.

```C++
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





**Enumerated types (enum)**

A list of values what can be passed around and compared. These values are implicitly converted to `int` underlying

```c++
enum colors_t { black, blue, green, cyan, red, purple, yellow, white };

colors_t mycolor = blue;
if (mycolor != green)
    cout << "CORRECT!\n";
```

By default, members are assigned integers from 0, then 1, 2, and so on ... But you can specify the actual value some of the member take. If a member is not specified a value, it's taken as the value of the previous member + 1

```c++
enum months_t { january=1, february, march, april,
                may, june, july, august,
                september, october, november, december} y2k;
```

Conversion to and from int

```c++
colors_t mycolor = blue;
int i = static_cast<int>(mycolor);
colors_t thecolor = static_cast<colors_t>(i);
```


**Enumerated types with enum class**

You can create enum types that have more type safety (you can't compare directly a member with an integer)

```c++
enum class Colors { blue, green }

mycolor = Colors::blue;
if (mycolor != Colors::green)
    cout << "CORRECT!\n";

enum class EyeColor : char { blue, green, brown };	// Specify the underlying representation type
```













## Classes



### Class I

Structure of class

```c++
class class_name {
    access_specifier_1:
    	member1;
    access_specifier_2:
    	member2;
    ...
} object_name;
```

Classes = A collection of members. Like Struct, but also have function members + access specifiers.



Access specifier:

- private: accessible only from within class or other members of same class (called "friends")
- protected: accessible from members of same class or derived class
- public: accessible from anywhere the object is visible.

An example class

```c++
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

```c++
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





Constructor function

```c++
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

```c++
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



Uniform initialisation

These are semantically equivalent ways to instantiate an object

```c++
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

```c++
Rectangle rect;		// default constructor called, but not obvious
Rectangle rectb();	// function declaration (a function that returns a Rectangle)
Rectangle rectc{};	// default constructor called
```

Syntax choice is largely personal preference on style.





Member initialization in constructors

We can abbreviate the member initialization part of the constructor. This effectively calls the constructor with the arguments given (usually we invoke the Copy constructor here).

```c++
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

```c++ 
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

```c++
Rectangle * prect;
```

Then, to access members of that object, use the `->` operator

```c++
cout << prect->area() << '\n';
```













### Class II

**Overloading operators**

Operators can also be overloaded to support, say expressions like `a + b` where a and b are objects of the same type.

The syntax for defining overloading operators as a member function of the class is:

```
type operator symbol (prameters) { /* ... body ... */ }
```

Example:

```c++
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

```c++
c = a + b;
c = a.operator+ (b);
```



Note, some overloaded operators can be defined as non-member function (a regular function that doesn't belong to a class)

```c++
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







**The keyword `this`**

The `this` keyword inside the member function returns a reference to the object itself.

One use can be for checking whether a parameter is the object itself

```c++
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

```c++
CVector& CVector::operator= (CVector other)
{
   	x = other.x;
    y = other.y;
	return *this;
}
```







**Static members**

Static variables are like non-member variables but require qualifying by class (or object)

```c++
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

Static members have "static storage duration". They are always created before program execution and destroyed after program halts.

Initialisation of static members can be static or dynamic. Static initialisation happens at compile time and doesn't need to be run during runtime. Compiler prefers static initialisation whenever it is possible. Example:

```c++
//a.h
struct MyStruct
{
	static int a;
};

//a.cpp
int MyStruct::a = 67;
```

Here, the value `67` is a constant expression, so the compiler knows that it can be evaluated and initialised at compile time. At times, you may want to tell the compiler it is a constant expression using `constexpr`

In C++20, we have `constinit`, which acts like `constexpr` (compiler can evaluate its value at compile time) but allows the value to be mutated at runtime.

Sometimes we have to use dynamic initialisation, such as initialising strings (due to how memory is managed for strings)

```c++
const auto VERSION = "3.4.1";
```

This string will be evaluated during each run of the program.

Try to avoid SIOF (static initialisation order fiasco), where there is dependency between initialisation of static members. Initialisation within the same compilation unit is done in order of definition in the source file. But initialisation across compilation units is random.

```c++
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

```c++
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





**Const member functions**

Const data members => immutable and read-only variable

Const function members => no modifications to nonstatic data members, or call nonconst member functions (no change in state)

Const return type => function will not modify the returned data ??

```c++
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

```c++
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







**Class templates**

Like function templates, class templates allow creation of objects that are polymorphic.

```c++
template <class T>
class myPair {
    	T values [2];
  	public:
    	myPair (T first, T second)
        {
            values[0] = first;
            values[1] = second;
        }
};
```

We use similar syntax to instantiate new objects

```c++
mypair<int> myobject (115, 36);
mypair<double> myobject (3.0, 2.18);
```



If we are defining function members outside the class, we need the template header

```c++
// class definition ...

template <class T>
T mypair<T>::getmax ()
{
    return a >= b ? a : b;
}
```







**Template specialization**

If we want to define additional function members when certain types are used, we can specialize a template

```c++
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

```c++
template <class T> class MyContainer { ... };
template <> class MyContainer <char> { ... };
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

```c++
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

```c++
MyClass foo ("Example");
MyClass bar = foo;	// Copying `foo` to `bar`, this is same as MyClass bar (foo);
```

The copy constructor is defined with following signature

```c++
MyClass::MyClass (const MyClass&);
```

If no copy constructor is defined, the compiler creates a default one, which does shallow copying over all the members. This may not be what we want. If a member contains a pointer to a string, then modification of that string on obj1 will reflect on obj2, and vice versa. If we try to destroy both objects, they will try to deallocate the same memory, causing a runtime error.



Instead we can define a copy constructor, perhaps performing deep copy.

```c++
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

```c++
MyClass foo ("Example");
MyClass bar;
bar = foo;
```

The copy assignment simply overloads `=` with argment `MyClass&`

```c++
MyClass& operator= (const MyClass&);
```

The default definition by compiler does shallow copy, but this doesn't always work. Say for the class in the previous example, if we shallow copy the new string address, the old string is not deleted, leading to a memory leak.

```c++
StringWrapper operator= (const StringWrapper& x)
{
	delete ptr;	// Free memory of previously defined string
    ptr = new string (x.content());
    return *this;
}
```

Or even better, just re-utilize the same string object

```c++
StringWrapper& operator= (const StringWrapper& x)
{
	*ptr = x.content();
    return *this;
}
```





**Move constructor and assignment**

Move is like a copy, but the original reference is destroyed. So there is rarely need to actually move data around, as the original reference will never be used.

Move happens when data is assigned to a new variable from an unnamed object, examples of unnamed objects include return values of class constructor, return values of functions etc.

```c++
MyClass (MyClass&&);             // move-constructor
MyClass& operator= (MyClass&&);  // move-assignment
```

As a parameter, an *rvalue reference* matches arguments of temporaries of this type.





**Implicit members**

Behaviors of defaults.

| Member function                                              | implicitly defined:                                          | default definition: |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :------------------ |
| [Default constructor](https://cplusplus.com/doc/tutorial/classes2/#default_constructor) | if no other constructors                                     | does nothing        |
| [Destructor](https://cplusplus.com/doc/tutorial/classes2/#destructor) | if no destructor                                             | does nothing        |
| [Copy constructor](https://cplusplus.com/doc/tutorial/classes2/#copy_constructor) | if no move constructor and no move assignment                | copies all members  |
| [Copy assignment](https://cplusplus.com/doc/tutorial/classes2/#copy_assignment) | if no move constructor and no move assignment                | copies all members  |
| [Move constructor](https://cplusplus.com/doc/tutorial/classes2/#move) | if no destructor, no copy constructor and no copy nor move assignment | moves all members   |
| [Move assignment](https://cplusplus.com/doc/tutorial/classes2/#move) | if no destructor, no copy constructor and no copy nor move assignment | moves all members   |





## Friendship and inheritance



### Friend functions

We can declare certain functions to have access to private and protected members of objects of certain classes.

We give this access using the keyword `friend` in the class, preceding the function name

```c++
#include <iostream>
using namespace std;

class Rectangle {
    	int width, height;
    
    public:
    	Rectangle() {}
    	Rectangle (int x, int y) : width(x), height(y) {}
    	int area() { return width*height; }
    	friend Rectangle duplicate (const Rectangle&);
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

```c++
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

```c++
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

```c++
derived_constructor_name (parameters) : base_constructor_name (parameters) {...}
```

Example:

```c++
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

```c++
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

```c++
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









## Polymorphism



### Pointers to base class

One key feature of class inheritance is that pointer to the derived class is type compatible to the pointer to the base class.

```c++
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

```c++
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

```c++
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

Note, `override` is not a reserved word in C++, it only has special meaning when appended to member functions





### Abstract base classes

Abstract base classes contain at least one pure virtual function (a virtual function with no definition).

Abstract base classes can only be used as a base class to inherit from. It cannot be instantiated directly.

```c++
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

```c++
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











## Type Conversions

**Implicit conversions**

Standard conversion (conversion between compatible types without explicit operator)

```c++
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



```c++
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





**Keyword explicit**

Normally, when a variable of type `A` is used as the argument for a function that takes a type `B`, implicit conversion is done between the types before the function is called. This may not always be what we want. Say in the case of implicit single-argument constructors in classes.



We use the `explicit` keyword to make implicit conversion of argument parameters invalid.

```c++
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

```c++
double x = 10.3;
int y;
y = int (x);    // functional notation
y = (int) x;    // c-like cast notation
```



Note, the default behavior for explicit conversion between pointer types is simply swapping the pointer. 

```c++
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





**dynamic_cast**

`dynamic_cast` always include pointer **upcast** (converting from pointer-to-derived to pointer-to-base), in the same way as allowed as an **implicit conversion**.

But `dynamic_cast` only allows pointer **downcast** (convert from pointer-to-base to pointer-to-derived) iff the pointed object is a valid, complete object of the target type. If the object is not a valid, complete object of the target type, a **null-pointer** is returned instead.

```C++
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



```c++
class A { /* ... */ };
class B { /* ... */ };
A * a = new A;
B * b = reinterpret_cast<B*>(a)
```

This code compiles, although it does not make much sense, since now `b` points to an object of a totally unrelated and likely incompatible class. Dereferencing `b` is unsafe.





**const_cast**

Manipulate const-ness of the object to the other status (ie. either to be set, or to be removed). 

Example, passing const object to function that doesn't expect a const argument

```c++
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

```c++
typeid (expression)
```



You can compare the result with `==`



```c++
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

```c++
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







## Exceptions

We wrap the code inside a `try` block so catch any exceptions.

We can throw exception ourselves by using the `throw` keyword followed by a single argument.

We can follow the `try` block with `catch` blocks, each taking one argument.

Each `catch` block can take a different argument type, and only if the exception type matches the catch argument type would the statements inside `catch` execute.

We can write `catch (...)` to indicate a catch all.

```c++
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



```c++
catch (int param) { cout << "int exception"; }
catch (char param) { cout << "char exception"; }
catch (...) { cout << "default exception"; }
```



If we nest `try` blocks, we can actually forward an exception to the outer block's exception handler by using the `throw` keyword without arguments.

```c++
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

```c++
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

```c++
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









## Preprocessor directives

These directives starts with `#` and is for the preprocessor.

The preprocessor examines the code and deals with all headers before compilation.

The scope is the file in which it is defined, from the line of definition to end of file (or `#undef`)

**macro definitions (#define, #undef)**

When the preprocessor encounters this directive, it replaces any occurrence of `identifier` in the rest of the code by `replacement`.

```c++
#define TABLE_SIZE 100
int table1[TABLE_SIZE];
int table2[TABLE_SIZE];
```

becomes

```c++
int table1[100];
int table2[100];
```



You can also define functional macros, which replaces function name with expression on the right, alongside the correct arguments

```c++
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

```c++
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

```c++
#define TABLE_SIZE 100
int table1[TABLE_SIZE];
#undef TABLE_SIZE
#define TABLE_SIZE 200
int table2[TABLE_SIZE];
```

becomes

```c++
int table1[100];
int table2[200];
```



`#` in the RHS replaces the argument with a string literal

```c++
#define str(x) #x
cout << str(test);
```

becomes

```c++
cout << "test";
```



`##` on the RHS simply concatenates two arguments

```c++
#define glue(a,b) a ## b
glue(c,out) << "test";
```

becomes

```c++
cout << "test";
```



Because preprocessor replacements happen before C++ syntax check, complex preprocessor replacements can make the code less readable.







**Conditional inclusions (#ifdef, #ifndef, #if, #endif, #else, and #elif)**

These directives allow to include or discard part of the code of a program if a certain condition is met.

```c++
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

```c++
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

```c++
#line number "filename"
```

Example:

```c++
#line 20 "assigning variable"
int a?;
```

Where `number` is the new line number that will be assigned to the next code line. `"filename"` is an optional parameter that allows to redefine the file name that will be shown.

The following lines will increase line number by 1 incrementally.





**Error directive (#error)**

This directive aborts the compilation process when it is found, generating a compilation error that can be specified as its parameter

```c++
#ifndef __cplusplus
#error A C++ compiler is required!
#endif 
```





**Source file inclusion (#include)**

When the preprocessor finds an `#include` directive it replaces it by the entire content of the specified header or file.

```c++
#include <header>
#include "file" 
```





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

```c++
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









## File I/O



C++ directives for file i/o

- `ofstream`: Stream class to write on files
- `ifstream`: Stream class to read from files
- `fstream`: Stream class to both read and write from/to files.

These classes are all derived from `istream` and `ostream`.





**Opening a file**

A opened file is represented within a program by a *stream*. Then all operations will be done on the physical file via the stream.

```c++
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



```c++
if (file.is_open()) { /* ok, proceed with output */ }
```





**Closing a file**

```c++
file.close();
```

Close the stream object (flushes to associate buffers).

Once this member function is called, the stream object can be re-used to open another file.





**Text files**

Text file streams are when `ios::binary` flag is not included. Values of I/O go through some formatting transformations before going to the binary raw file.

```c++
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

```c++
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

```c++
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

```c++
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

```c++
write ( memory_block, size );
read ( memory_block, size );
```

`memory_block` is of type `char *`, representing the start of the buffer to read from, or copy from (for write). `size` is # of characters to be read or written from/to the memory block.



```c++
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





## Standard Library


### std::pair

making pairs. This is done in legacy code (before uniform init), benefit is type deduction from arguments, but may be more verbose than uniform init in some cases.

```c++
template<class T1, class T2>
std::pair<T1, T2> make_pair( T1 t, T2 u);

auto p1 = std::make_pair(1, 3.14);
```










### std::set

The set requires the template type to contain `<` comparison (as the underlying impl can use a binary search tree). The guarantee uniqueness, the `==` operation is just taking the function `(!(a < b) && (!(b < a))`.

```c++
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

Iterators:
- `.begin()` / `.cbegin()`: iterator to beginning `.cbegin()` returns a constant iterator
- `.end()` / `.cend()`: iterator to end (after the last element)
- `.rbegin()` / `.rcbegin()`: iterator from the last element to the first element
- `.rend()` / `.rcend()`: iterator to the reversed end (before the first element)

Capacity:
- `.empty()`: 
- `.size()`: # of elements
- `.max_size()`: max # of elements the container can hold, due to system or library implementation (i.e., `std::distance(begin(), end())`)

Modifiers (complexity is log to the size of the set)
- `.clear()`: clears the elements, `size()` returns 0 after
- `std::pair<iterator, bool> insert( value_type&& value );`: insert element, return reference to the iterator at that element and boolean indicating whether insertion took place
- `iterator insert( iterator pos, const value_type& value )`: insert element to position just prior to `pos`
- `.emplace( Args&& ...args )`: insert element by constructing it in-place using `args`
- `iterator emplace_hint( const_iterator hint, Args&&... args )`: insert (if correct) element to position right after `hint`
- `iterator erase ( iterator pos )`: removes `pos`, returns next iterator from removed element
- `iterator erase ( iterator first, iterator last )`: remove [first, last), returns next iterator from removed element
- `size_type erase( const Key& key )`: remove the element equal to `key`, return # of elements removed (0 or 1)

Lookup (complexity is log to the size of the set)
- `size_type count( const Key& key ) const`: returns # of elements equal to `key` (0 or 1)
- `iterator find( const Key& key )`: finds `key` in the set, returns the iterator, or `set.end()` otherwise. So you check for non-existance using `s.find(elem) == s.end()`
- `.contains()`: new in C++20



### std::vector

Like a resizable array. Elements stored contiguously. Expands automatically as needed. Because of this extra space is allocated for future expansion (without needing to allocate memory and copy every time).

Expansion implementation depends on the compiler used. For GNU, we do geometric expansion (each time we reallocate, we double in size, so amortized O(1)). Alas, reallocation is expensive, so use `reserve()` if you know the size beforehand.

Total amount of allocated memory queried using `capacity()` function. Extra memory can be freed using `shrink_to_fit()` function.

The vector object always placed on stack. The elements are always allocated in free store (heap)

Time complexity

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

Initialisation

- If using brackets, initialisation list is preferred `std::vector<int> vec {N, 1};  // initialises vector of 2 elements, N and 1`
- If want to initialise with size and default value, use brackets `std::vector<int> vec (N, 1);  // initialises vector of size N and default value i`

Call by reference vs call by value

```c++
void foo(vector<int>& vec) { ... }  // By reference, modifies the same values in heap

void bar(vector<int> vec) { ... }  // By value, copies the object and copies values in heap, so modification not reflected in caller's vector object
```

Attributes



Methods

- `front()`: First element, will run into errors if vector is empty (if uncaught most likely segmentation fault at runtime)
- `back()`: Last element
- `data()`: Return underlying array
- `at(idx)`: Return value at `idx`, gives `std::out_of_range` error is idx < 0 or idx >= size
- `[idx]`: Return value at `idx`
- `emtpy()`: If container is empty
- `size()`: # of elements
- `max_size()`: Max # of elements possible due to system or library implementation limitations.
- `reserve(new_cap)`: Reserve additional memory to such that capacity allows for up to `new_cap` elements. if `new_cap` < `.capacity()`, the function does nothing. If `new_cap` > `.max_size()`, throws `std::length_error`
- `capacity()`: # of elements that can be held in currently allocated storage
- `shrink_to_fit()`: Frees unused memory
- `begin()`: Returns iterator to the first element of the vector. Returns `end()` if there are no elements. Return type is `std::vector<T>::iterator` or `std::vector<T>::const_iterator`
- `end()`: Returns iterator to `end()`
- `clear()`: Erases all elements. `size()` returns to zero. `capacity()` is unchanged.
- `insert()`: 
  - `insert(pos, val)`: Inserts val at index pos, returns iterator pointing to the inserted value, O(N) where N is the # of elements between pos and end of container
  - `insert(pos, count, val)`: Inserts count # of val at index pos, returns iterator pointing to first element inserted or pos if count == 0, O(count + N) where N is the # of elements between pos and end of container
  - `insert(pos, first, last)`: Inserts from range [first, last) at index pos, returns iterator pointing to first element inserted or pos if first == last, O((last-first) + N) where N is the # of elements between pos and end of container
  - `insert(pos, ilist)`: Inserts elements from initializer list `ilist` before pos, returns iterator pointing to the first element inserted or pos if ilist is empty, O(ilist.size + N) where N is the # of elements between pos and end of container
- `insert_range(pos, rg)`: Inserts range `rg` at index pos
- `erase()`:
  - `erase(iterator pos)`: Removes the element at pos
  - `erase(iterator first, iterator last)`: Removes elements [first, last)
  - Returns iterator following the last removed element
- `push_back(val)`: Appends val to the back. If new `size()` > `capacity()` then reallocation takes place (so old iterator references are invalidated). O(1) amortized
- `pop_back()`: Removes last element, returns nothing, undefined behavior if vector is empty
- `resize(count, [value])`: Resizes container to remove elements or add `value` or default elements (if `value` not provided). O(|count-size()|) plus time taken for reallocation if needed when adding elements
- `swap(vector& other)`: Exchanges the contents and capacity of the container with those of other. No move or copy invoked.
- `append_range(rg)`: Inserts range `rg` to the end of the vector, reallocation can happen. Complexity is O(|rg|) or O(|new_size|) if reallocation needed

Logical operators (>= etc) compares 2 vectors lexicographically

Looping through. Using iterators givees you more flexibility, but nothing wrong with using indices.

```c++
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




### iterators

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



### std::queue

This is a "container adaptor", it uses `std::deque` under the hood but exposes a subset of operations.

- `.front()`: Returns reference to first element
- `.back()`: Returns reference to last element
- `.empty()`: Returns whether the queue is empty
- `.size()`: Returns the # of elements in the queue
- `.push(val)`: Inserts element at the end
- `.emplace( Args&& args )`: Inserts element by constructing in-place
- `.pop()`: Removes element from front of queue, returns nothing



### std::format

```c++
std::format("{} {}!", "Hello", "world", "something"); // "Hello world!"
```

```c++
char* a = "be";
char* b = "the question"
std::cout << std::format("To {0:} or not to {0:}, that is {1:}.\n", a, b);
// To be or not to be, that is the question.
```

Formatters: https://en.cppreference.com/w/cpp/utility/format/formatter







### `std::greater<T>`

Function for std::greater ~= bool (val1, val2) { return val1 > val2; }







### std::list

Doubly linked list

Element access: `front`, `back`

Iterators: `begin`, `end`, `rbegin`, `rend`

Capacity: `empty`, `size`, `max_size`

Modifiers: `clear`, `insert`, `insert_range`, `erase`, `push_back`, `pop_back`, `push_front`, `pop_front`, `append_range`, `prepend_range`

These functions behave as expected, identical to other containers like `std::vector`

Additional functions:

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

  - ```c++
    list.sort(std::greater<int>());
    ```





### std::forward_list

Singly linked list

Less storage than `std::list`, but doesn't support bidirectional move





### std::map

Sorted key-value pair container. Logarithmic complexity for search, insert, and delete. Typically implemented as a Red-Black tree.

Element access: `at`, `operator[]`

Iterators: `begin`, `end`, `rbegin`, `rend`

Capacity: `empty`, `size`, `max_size`

Modifiers: `clear`, `insert`, `insert_range`, `insert_or_assign`, `erase`, `swap`, `extract`, `merge`

```c++
m.insert({'a', 1});
```

Lookup: `count(key)`, `find(key)`, `contains(key)`, 

- `lower_bound(key)`: Return an iterator to the first element >= key
- `upper_bound(key)`: Return an iterator to the first element <= key

Note: `operator[]` insertion will overwrite if key exists. `insert` will do no-op if key exists.













### std::shared_ptr

A smart pointer introduced since C++11 that gives a pointer many owners. A reference count is kept track of by `shared_ptr`, incremented when new `shared_ptr` points to the object, decremented the other way around (a `shared_ptr` goes out of scope or is reset).

When reference count reaches 0, memory for that object is freed (or when last owning object resets the pointer)

`shared_ptr` instances can point to the same object.

`shared_ptr` helps prevent memory leaks, safely copy without worrying about double deletion.

Though watch out for more overhead and potential for cycles (in this case, the reference count will never reach 0 even though the object is out of scope)

```c++
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

```c++
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

```c++
template <class T, class... Args>
shared_ptr<T> make_shared (Args&&... args);
```

- `.reset()`: Replaces the pointed object to point to no object
- `.reset( Y* ptr )`: Replaces the pointed object to `ptr`, throws `std::bad_alloc` if memory allocation fails
- `.get()`: Get the underlying object pointer, usually just use `->` or `*` to access methods of the underlying object



### std::unique_ptr

Like `shared_ptr` but only one object can claim ownership to it. When the `unique_ptr` object goes out of scope, the underlying object is destroyed and memory freed using `delete`. Object also deleted if `reset` is called or managing object is assigned another pointer with `=`

```c++
// Creating a unique ptr
std::unique_ptr<T> ptr = std::make_unique<T>(obj);
```

Modifiers:

- `.release()`: releases ownership of object and returns a pointer to object
- `.reset(pointer)`: sets the unique_ptr to manager the new object pointed by `pointer` and deletes old object

Observers:

- `.get()`: returns pointer to object or `nullptr` if no object is owned
- `.get_deleter()`: returns custom deleter if it's used for destruction of object
- `*`, `->`: Dereferences pointer to the managed object




### std::unordered_map

https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1456.html


### std::optional

You cannot do `std::optional<T&>`, you must copy the object.

**Ways of returning optional values**

```c++
// Returning an nullptr
T* foo();

// Returning an optional
std::optional<T> foo();

// Returning a pair, the value and whether it's valid
std::pair<T, bool> foo();

// Returning a boolean, mutating the argument
bool foo(T& t);

// Returning agreed invalid value if fails, e.g., NaN here
double foo();
```






## Key language concepts

#### RAII

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

```c++
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






## CPP Core Guidelines

- [X] P: Philosophy






## GoogleTest

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

```c++
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

```c++
TEST(TestSuiteName, TestName) {
    // Test body
}
```

Note, `TestSuiteName` and `TestName` cannot contains underscores.

The test body is just the body of an ordinary C++ function, returning no value.

Example

```c++
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

```c++
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

```c++
TEST_F(TestFixtureClassName, TestName) {
  ... test body ...
}
```



main() function

```c++
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



## BOOST Test

(https://www.boost.org/doc/libs/1_85_0/libs/test/doc/html/index.html)

`BOOST_AUTO_TEST_SUITE(TestSuiteName)`

`BOOST_FIXTURE_TEST_CASE(testCaseName, fixtureName)`

`BOOST_AUTO_TEST_CASE(testCaseName)`

For floating pointer comparison
```c++
double TOL = 0.000'1; // Relative error
BOOST_CHECK_CLOSE(actual, expected, TOL);
```

To add information on which loop failed.
```c++
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


## To learn

- Inline specifier:
- https://ryonaldteofilo.medium.com/inline-and-one-definition-rule-in-c-db760ec81fb2
- https://en.cppreference.com/w/cpp/language/inline
- Different from what you may think, about saying if multiple definitions of the same function appear in the same namespace (e.g., when you import .h in multiple .cpp files), telling compiler they are indeed the same function (no need to raise error).



## Misc

### Lambda Expression

```c++
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
- `[&]`: Capture all by reference
- `[=]`: Capture all by value
- `[&, total]`: Capture all by reference, apart from variable `total`. You can do the same with `=`
- `[&, &total]`: NOT ALLOWED

Caveats:

- Reference can mutate variables outside, by value can't
- Reference introduces lifetime dependency, if lambda running async, it may be gone when lambda executes
- Reference reflects change of variable outside

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

Lambda body, can refer to:

- Captured variables
- Parameters to function
- Locally defined variables
- Class data members, if `this` is captured
- Variable with static storage location, e.g., global vars



### Delete expression

- `delete expr`
- `delete[] arr`

Calls destructor of object and frees memory.

Compare this with objects on the stack. If object goes out of scope, destructor is called and then object is deallocated from the stack. But if the object is allocated on the heap (using `new`), when object goes out of scope destructor is not called and object memory not freed. Must use `delete` in that case.



### Namespaces for test

When write unit tests (e.g., using BOOST) for symbols in namespace `foo::bar`, you can do 

```c++
namespace foo::bar::test {
    // test cases
}
```

This way you don't need to qualify variables with `foo::bar` and also it won't pollute the global namespace. If I used `using namespace foo::bar;` then all test cases are put into the global namespace


### Stack vs. Heap memory

- Stack memory is used to store local variables in a function. Deallocation is automatic and fast as often just need to change sp (so 1 instruction instead of what malloc needs)
- Heap memory is used for large allocations. It needs manual deallocation and generally slower, so more likely to cause memory leaks.
  - Note, `malloc` does not always trigger a sys call. OS typically only give memory to a process in pages, so C++ process will get a page, then slice it up to each time malloc is called.

Stack memory is allocated for local variables, function parameters, RAII etc. Heap allocation only if using `new` or `malloc`. RAII as in putting a resource manager object like `std::vector` on the stack, that manages memory it uses on the heap. 

Arrays (so fixed size) are placed inside the stack (though too large and it can cause stack overflow during runtime).

Exceptions are

- Global and static variables are stored in data segment or BSS (all zeros, used for zero data or uninitialised data)
- rvalues could be stored in registers
- Large return values could be optimised to use return value optimisation to be constructed where it is needed


### new vs. malloc

- `new` returns a typed pointer, `malloc` does not
- `new` throws error by default if no allocation, `malloc` returns nullptr
- `new` have size calculated by compiler based on type, `malloc` you must specify size
- `new` calls constructor and destructor at `delete`, `malloc` doesn't.  So for `malloc` the uninitialised state can be error-prone

```c++
int* a = new int;
int* b = (int*)malloc(sizeof(int));  // As int is a simple type, leaving it uninitialised is OK
```



Technically `new` is allocated to `free-store` and `malloc` to `heap`, but that's conceptual difference. Almost all implementation they're the same region.

Bottomline: Unless you have to use C, use `new` not `malloc`. And since RAII, don't use `new` unless you have to allocate to stack.




### pragma once

A non-standard that is implemented in most compiler. If added to a file, it is only included in the first include, all subsequent include on the same file is ignored.

This simplifies file dependencies (e.g., allow circular dependencies, though it's a bad pattern) and can speed up compilation.

Example
File "grandparent.h"

```c++
#pragma once

struct foo 
{
    int member;
};
```

File "parent.h"

```c++
#include "grandparent.h"
```

File "child.c"
```c++
#include "grandparent.h"   // This inclusion is ignored
#include "parent.h"
```

Main challenge is it's not trivial to know if the file is the same file (e.g., in the presence of symlinks, same file copied many times). One alternative is this

```c++
#ifndef GRANDPARENT_H
#define GRANDPARENT_H
... contents of grandparent.h
#endif /* !GRANDPARENT_H */
```



### lvalue vs rvalue

lvalue: (locator value), which must have address in memory, can appear on LHS
rvalue: (right value), does not have address in memory, cannot appear on LHS

```c++
int y = 10;    // y is an lvalue
int z = y + 5; // y + 5 is an rvalue

int &ref = y;  // ref is an lvalue reference to x
ref = 20;      // x is now 20

int &&rref = 10;  // rref is an rvalue reference to the temporary 10
rref = 20;        // temporary 10 is now modified to 20
```

The introduction of rvalue is to avoid compiler from always allocating memory. So values can, say, be stored in a register.
The introdutcion of rvalue references which allows resources to be moved rather than copied

```c++
std::string s1 = "Hello";
std::string s2 = std::move(s1);  // s1 is an lvalue, but std::move converts it to an rvalue

std::string createString() {
    return "Hello, World!";
}
std::string s = createString(); // s can "steal" the temporary string
```



### Headers vs. Source files

- In general, we will put everything in source (.cpp) file, unless it's impossible (e.g., templates)
- This way, any changes in source file means only that file needs to be recompiled, not all files that depend on the header
- Only exception perhaps is putting code in header to speed up compilation

### Random pieces

- In C++, local definition of a function inside a function is not allowed, only exception is defining lambdas inside another function


### C++ Concepts (metaprogramming)

Metaprogramming helps performance

But:

- Hard to write and debug
- Hard to read and reason about
- Hard to compile (takes a long time)

Concepts make metaprogramming more accessible



Example for concept use:

Imagine you have a tree, where components can send messages to each other.

If you know the structure of the tree at compile time, you should be able to work out where messages will go at compile time, instead of having the compiled code simulating messages going through the tree at runtime.

Concept allows you to define the structure of the tree as a concept, which compiler can use to optimise code at compile time.



```c++
template<typename Context_>
void handle(const tock& message, Context_ context) {
    puts("tock!")
}
```

becomes

```c++
template<typename T>
concept Context = sizeof(T) == 1;
```

and

```c++
void handle(const tock& message, Context auto context) {
    puts("tock!")
}
```



```c++
template<typename T>
concept Node = std::is_object_v<T>;

template<typename T>
concept Tree = requires (T t) {
    { t.root } -> Node;
    { T::childCount } -> std::convertible_to<std::size_t>;
    requires T::childCount == 0 || requires {
        t.template child<0>();
    }
}

template<Node Root_, Tree... Children_>
struct tree {
    Root_ root;
    std::tuple<Children_...> children;
    static constexpr std::size_t childCount = sizeof...(Children)
    
    tree() = default;
    
    tree(std::convertible_to<Root_> auto&& root) 
        : root(std::forward<decltype(root)>(root))
    { }
    
    template<std::size_t index_>
    	requires (index_ < sizeof ...(Children))
    Tree auto& child() {
        return std::get<index_>(children);
    }
}

template<typename T>
concept Context = requires (T t) {
    t.tree;
    requires Tree<std::remove_reference_t<decltype>(t.tree)>>;
    { t.location } -> TreeLocation;
};

template<typename T>
concept Message = std::is_object_v<T>

// Omitting TreeLocation concept implementation for now

template<typename Tree_, TreeLocation TreeLocation_ = tree_location<>>
struct context {
    Tree_& tree;
    static constexpr const TreeLocation_ location;
    
    context(Tree_& tree) : tree{ tree } ( static_assert(Context<context>))
    
    void sendDown(...) {
		Tree auto& current = tree.subtree(location);
        current.childCount.times.with_index(
            [&] (SizeConstant auto childIndex) {
                Node auto& child = tree.subtree(location.ofChild(childIndex)).root;
                Context auto childContext = ::context{tree, location.ofChild()};
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
            Node auto& parent = tree.subtree(location.ofParent()).root;
            Context auto parentContext = ::context{tree, location.ofParent()};
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
}
```

Here we model the `context` function taking the whole tree and location of node in tree. This way we avoid defining tree recursively using nodes, where we run into cyclic dependency in types.

### explicit specifier

A specifier that forbids implicit conversion. Example

```c++
struct A
{
    explicit A(int feed_id = 5) { }
    ...
}

// A a = 6;  // not allowed as it is an implicit conversion. This code is not readable as struct A is not an integer wrapper
A a (6); 
```

A good way to approach this is to use explicit by default, then think about which constructors may have usecases where explicit can be removed (copy constructor usually a good idea here)





