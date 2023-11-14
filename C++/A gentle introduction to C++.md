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





## Basics of C++



### Program structure

```c++
// My first program in C++
#include <iostream>

int main()
{
	std::cout << "Hello World!";
    std::cout << "Welcome to C++!"
}
```

- `main` is the entry point of the program

To compile, go to VSCode and press Ctrl+Shift+B to execute builder, and choose our compiler G++. A corresponding `.exe` file representing the binary code will be shown.

The `lst..` part links the compiler to the standard library

You can also use the namespace `std`

```c++
// My first program in C++
#include <iostream>
using namespace std;

int main()
{
	cout << "Hello World!";
    cout << "Welcome to C++!";
}
```



### Variables and types

Identifiers: sequence of letters, digits and _. Must begin with letter

Reserved keywords: bool, break, delete, do ...

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
| Void type                | **void**                     | no storage                                         |
| Null pointer             | **decltype(nullptr)**        |                                                    |

Sizes of these types may change across machines.

Type declarations

```c++
int a;
float mynumber;
```

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

You can let the compiler deduce the type for you using `auto` and `decltype` keywords, though this probably reduces readability and hence should not be used extensively.



### Constants

Literals

```c++
// Integer
a = 5;
a = -273
    
// Other base
a = 0113; // octal
a = 0x46; // hexadecimal

// Adding type information
75         // int
75u        // unsigned int
75l        // long
75ul       // unsigned long 
75lu       // unsigned long 
    
// Floats
f = 3.14159;
f = 6.02e23;

// Adding type information
3.14159L;  // long double
6.02e23f;  // float

// Character and string literals
s = 'z';
s = "Hello World!";

// boolean
bool foo = true;
bool bar = false;

// pointer
int* p = nullptr;
```



**Escapes**

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



Line-continuation

```c++
string s = "String expressed in "\
"two lines";
```



Raw string

```c++
string s = R"(string with \backslash)"
```



Strings

```c++
#include <string>

string myString;
myString = "Hello World!";
cout << myString << endl;  // END Line character
```



Preprocessor definitions

```c++
#define PI 3.14159
...
    
circle = 2 * PI * r;
```

The replacement is done by the preprocessor before compilation starts, causing a "blind" replacement.





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
int res = (b = 3, b -= 1, ++b); // res = 3
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



Check the precise precedence and associativity here: https://www.cplusplus.com/doc/tutorial/operators/





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



**cin**

```c++
int age;
cout << "What is your age?" << endl;
cin >> age;
```

cin is rarely used as we usually need some good parsing of input data.

cin also checks for whitespace, new-line ... so it usually doesn't take in entire string but just first word. (use `getline` for this)



**stringstream**

(Read more on this)





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

