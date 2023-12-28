# A gentle introduction to C++

https://www.cplusplus.com/info/description/

C++ is...

- Compiled
- Strong-typed unsafe (no type enforcing)
- Both manifest and inferred typing
- Many paradigms (OOP, procedural ...)
- Upwards compatible with C



Stack vs. Heap memory:

- Stack memory is used to store local variables in a function. Stack size is determined at compiled time. Deallocation is automatic
- Heap memory is used to store variables at runtime. Deallocation is done manually (can lead to memory leak if not done properly). Not thread safe like stack memory.



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

- If you use the namespace `std` with the `using` keyword, you can call names inside `std` in an unqualified manner
- Note, using qualified name is the easiest way to avoid introducing name collisions







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



If you don't care much about precision or memory usage, then `char`, `int` and `double` is all you need.





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

We can initialize variables in several (equivalent) ways

```c++
int a = 3;  // c-like initialisation
int a (3);  // constructor initialisation
int a {3};  // uniform initialisation
```

You can let the compiler deduce the type for you using `auto` and `decltype` keywords (use the same type as something else), though this probably reduces readability and hence should not be used extensively.

```c++
int foo = 0;
auto bar = foo;  // the same as: int bar = foo;
deltype(foo) baz;  // the same as: int baz;
```







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
// single statement in `if`
if (x == 100)
    cout << "x correct";

// multiple statements in `if`
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



while

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

Statement is executed before first evaluation of guard



**for**

```c++
// initiaited, then repeat (check, execute body, execute increment)
for (int i = 0; i < N; i++)
{
    cout << a[i] << ", ";
}
```

Range for strings

```c++
for (char c : str)
```



**Jump statements**

break: break out of enclosing loop

continue: skip to next iteration

goto: jumps to label. Used only is very low programming, not in high-level



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

Evaluates head and compare with constants top-down. It "falls through" with break statements.



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
void incr (int% a)
{
    a++;
}

// Add `const` keyword to forbit value change
void say (const string% s)
{
    std::cout << s << end;
}

// Inline functions (insert code in function instead of doing calling by adding new stackframe)
inline string concat (const string& a, const string& b)
{
    return a+b;
}

// Default values
int divide (int a, int b=2)
{
    return a/b;
}
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



### *Overloads and templates



### *Name visibility



## Compound data types



### Strings!!!!



### Arrays

```c++
// Declaring an array
int foo [5];

// Initializing arrays
int foo [5] = { 1, 2, 3, 4, 5 };

// Can also omit size when initializing
int foo [] = { 1, 2, 3, 4, 5 };

// Accessing
x = foo[2];

// Multidimensional arrays
int mat [5][5];

// Multidimentional arrays is an abstraction for the programmer, as same index can be achieved by multiplying the indices
cout << mat[3][5] == mat[15] << endl;

// Arrays can only be passed by reference in C++
int sum (int a[])
{
   	// ...
}
```



### Character sequences

```c++
// A string can also just be presented explicitly as an array of characters. Don't forget the null character at the end
char myword [] = { 'H', 'e', 'l', 'l', 'o', '\0' };

// We can also initialize with a string literal, which appends the null character automatically
char yourword [] = "Hello";

// In C++, people use both the C-strings (the char array representation) and string types. Methods on strings are usually overloaded to deal with both. 
```





### Pointers

```c++
// Address-of operator
foo = &myvar;
// Mnemonic: And is the Address

// Dereference operator, this operator unpacks the address to *dereference* the reference
baz = *myvar;

// Declaring pointers
int * number;  // A pointer `number` pointing to a (usually 32-bit) integer
// Types are needed to know what kind of data the uniform size addresses are storing


// Becareful in multiple declaration
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









### *Dynamic memory



### *Data structures



### *Other data types



## Classes



### Class (1/2)

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

Access specifier:

- private: accessible only from within class or other members of same class (called "friends")
- protected: accessible to same class or derived class
- public: accessible from anywhere

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







To be continued ...











### Classes (2/2)

