# C#





### Introduction



Why C# / Main language features:

- Object-oriented, component-oriented
- Type safety
- Garbage collection (automatic reclaiming of memory on unreachable objects)
- Nullable types (for static null check)
- Exception handling
- Lambda expressions
- Language Integrated Query (LINQ)
- Asynchronous operations



C# and .NET

- C# is compiled into an intermediate language that conforms to the Common Language Interface (CLI) specification
- The Microsoft implemented Common Language Runtime (CLR) then performs JIT compilation and executes code on machine.
- CLR has services like automatic garbage collection, exception handling, and resource management. Code compiled by CLR is called "managed code"



```c#
using System;

/* A Hello World program to introduce the C# language */
class Hello
{
    static void Main()
    {
		// This line prints "Hello, World"
        Console.Writeline("Hello, World");
    }
}
```









### Types

C# has an extensive type system that defines the structure and behaviour of the underlying data.



There are 2 kinds of types in C#:

- Value types: Variable stores underlying value. Multiple variables store different copies of their own value.
- Reference types: Variable stores reference to data in memory



- Value types
  - Simple types
    - [Signed integral](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types): `sbyte`, `short`, `int`, `long`
    - [Unsigned integral](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types): `byte`, `ushort`, `uint`, `ulong`
    - [Unicode characters](https://learn.microsoft.com/en-us/dotnet/standard/base-types/character-encoding-introduction): `char`, which represents a UTF-16 code unit
    - [IEEE binary floating-point](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types): `float`, `double`
    - [High-precision decimal floating-point](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types): `decimal`
    - Boolean: `bool`, which represents Boolean values—values that are either `true` or `false`
  - Enum types
    - User-defined types of the form `enum E {...}`. An `enum` type is a distinct type with named constants. Every `enum` type has an underlying type, which must be one of the eight integral types. The set of values of an `enum` type is the same as the set of values of the underlying type.
  - Struct types => like classes but are value types (no heap allocation) and no inheritance
    - User-defined types of the form `struct S {...}`
  - Nullable value types => Represented by `<type>?`, e.g,, `int?`, `string?`
    - Extensions of all other value types with a `null` value
  - Tuple value types
    - User-defined types of the form `(T1, T2, ...)`
- Reference types
  - Class types => contains data members and methods
    - Ultimate base class of all other types: `object`
    - [Unicode strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/character-encoding-introduction): `string`, which represents a sequence of UTF-16 code units
    - User-defined types of the form `class C {...}`
  - Interface types => implemented by `class` or `struct` types. A `class` or `struct` type may implement multiple interfaces
    - User-defined types of the form `interface I {...}`
  - Array types
    - Single-dimensional, multi-dimensional, and jagged. For example: `int[]`, `int[,]`, and `int[][]`
  - Delegate types => reference to methods so they are first class citizens (e.g., can be passed in as variables to functions)
    - User-defined types of the form `delegate int D(...)`



All types in C# inherit from `Object` based type. For a value type to become inherited from `Object`, we "box" them (the reverse is called "unbox"). Boxing simply means creating an instance of a reference type and putting the value into the box.

```C#
int i = 123;.
object o = i;    // Boxing
int j = (int)o;  // Unboxing
```





### Program Structure

- Programs: 
- Namespaces: Types and members
- Types: Classes, structs, interfaces ...
- Members: Fields, methods, properties, events ...
- Assemblies: Compiled C# code, `.exe` for application implementation, `.dll` for library implementation



```C#
namespace Acme.Collections;

// Fully qualifieid name of this class is `Acme.Collections.Stack`
public class Stack<T>
{
    // 4 members, a field, 2 methods, and a nested class
    Entry _top;	// A field

    public void Push(T data)	// A method
    {
        _top = new Entry(_top, data);
    }

    public T Pop()	// A method
    {
        if (_top == null)
        {
            throw new InvalidOperationException();
        }
        T result = _top.Data;
        _top = _top.Next;

        return result;
    }

    class Entry	// A nested class
    {
        public Entry Next { get; set; }	// Property
        public T Data { get; set; }		// Property

        public Entry(Entry next, T data)	// Constructor
        {
            Next = next;
            Data = data;
        }
    }
}
```



And another program that makes use of that class

```C#
class Example
{
    public static void Main()
    {
        var s = new Acme.Collections.Stack<int>();
        s.Push(1);
        s.Push(10);
        s.Push(100);
        Console.WriteLine(s.Pop());	// 100
        Console.WriteLine(s.Pop());	// 10
        Console.WriteLine(s.Pop());	// 1
    }
}
```



When you compile this program, the needed libraries are linked together, and are free to reference each other. Because of this, there is no need for forward referencing. Conceptually it's as if all code is added to the same large file.















### Variables and Types

```C#
int myNum = 5;
double myDoubleNum = 5.99D;
char myLetter = 'D';
bool myBool = true;
string myText = "Hello";
```



Multiple declaration

```c#
int x = 5, y = 6, z = 50;
Console.WriteLine(x + y + z);

int x, y, z;
x = y = z = 50;
Console.WriteLine(x + y + z);
```



Type casting

In C#, there are two types of casting:

- **Implicit Casting** (automatically) - converting a smaller type to a larger type size
  `char` -> `int` -> `long` -> `float` -> `double`
- **Explicit Casting** (manually) - converting a larger type to a smaller size type
  `double` -> `float` -> `long` -> `int` -> `char`

```c#
int myInt = 9;
double myDouble = myInt;       // Automatic casting: int to double

double myDouble = 9.78;
int myInt = (int) myDouble;    // Manual casting: double to int
```







#### Strings

Concatenation

```c#
string firstName = "John ";
string lastName = "Doe";
string name = firstName + lastName;

string firstName = "John ";
string lastName = "Doe";
string name = string.Concat(firstName, lastName);
Console.WriteLine(name);
```



Interpolation

```c#
string firstName = "John";
string lastName = "Doe";
string name = $"My full name is: {firstName} {lastName}";
Console.WriteLine(name);
```









#### Arrays

```c#
string[] cars;
string[] cars = {"Volvo", "BMW", "Ford", "Mazda"};

for (int i = 0; i < cars.Length; i++) 
{
  Console.WriteLine(cars[i]);
}

// Multi-dimensional
int[,] numbers = { {1, 4, 2}, {3, 6, 8} };
numbers[0, 0] = 5;  // Change value to 5
Console.WriteLine(numbers[0, 0]); // Outputs 5 instead of 1
```











### Conditionals and Branching

if ... else

```c#
int time = 22;
if (time < 10) 
{
  Console.WriteLine("Good morning.");
} 
else if (time < 20) 
{
  Console.WriteLine("Good day.");
} 
else 
{
  Console.WriteLine("Good evening.");
}
```



switch

```c#
int day = 4;
switch (day) 
{
  case 6:
    Console.WriteLine("Today is Saturday.");
    break;
  case 7:
    Console.WriteLine("Today is Sunday.");
    break;
  default:
    Console.WriteLine("Looking forward to the Weekend.");
    break;
}
```



while

```c#
int i = 0;
while (i < 5) 
{
  Console.WriteLine(i);
  i++;
}
```



for

```c#
for (int i = 0; i < 5; i++) 
{
  Console.WriteLine(i);
}
```



foreach

```c#
string[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
foreach (string i in cars) 
{
  Console.WriteLine(i);
}
```







### Methods

```c#
static void MyMethod() 
{
  Console.WriteLine("I just got executed!");
}

static void Main(string[] args)
{
  MyMethod();
  MyMethod();
  MyMethod();
}

// Default parameters
static void MyMethod(string country = "Norway") 
{
  Console.WriteLine(country);
}
```



Overloading

```c#
static int PlusMethod(int x, int y)
{
  return x + y;
}

static double PlusMethod(double x, double y)
{
  return x + y;
}
```







### Classes and Objects

```c#
class Car 
{
  string color = "red";

  static void Main(string[] args)
  {
    Car myObj = new Car();
    Console.WriteLine(myObj.color);
  }
}
```



Creating a class

```c#
// Create a Car class
class Car
{
  public string model;  // Create a field, with access modifier

  // Create a class constructor for the Car class
  public Car()
  {
    model = "Mustang"; // Set the initial value for model
  }

  static void Main(string[] args)
  {
    Car Ford = new Car();  // Create an object of the Car Class (this will call the constructor)
    Console.WriteLine(Ford.model);  // Print the value of model
  }
}
```



Inheritance

```c#
class Animal  // Base class (parent) 
{
  public void animalSound() 
  {
    Console.WriteLine("The animal makes a sound");
  }
}

class Pig : Animal  // Derived class (child) 
{
  public void animalSound() 
  {
    Console.WriteLine("The pig says: wee wee");
  }
}

class Dog : Animal  // Derived class (child) 
{
  public void animalSound() 
  {
    Console.WriteLine("The dog says: bow wow");
  }
}
```



Via abstract class

```c#
// Abstract class
abstract class Animal
{
  // Abstract method (does not have a body)
  public abstract void animalSound();
  // Regular method
  public void sleep()
  {
    Console.WriteLine("Zzz");
  }
}

// Derived class (inherit from Animal)
class Pig : Animal
{
  public override void animalSound()
  {
    // The body of animalSound() is provided here
    Console.WriteLine("The pig says: wee wee");
  }
}

class Program
{
  static void Main(string[] args)
  {
    Pig myPig = new Pig(); // Create a Pig object
    myPig.animalSound();  // Call the abstract method
    myPig.sleep();  // Call the regular method
  }
}
```



Via interface

```c#
// Interface
interface IAnimal 
{
  void animalSound(); // interface method (does not have a body)
}

// Pig "implements" the IAnimal interface
class Pig : IAnimal 
{
  public void animalSound() 
  {
    // The body of animalSound() is provided here
    Console.WriteLine("The pig says: wee wee");
  }
}

class Program 
{
  static void Main(string[] args) 
  {
    Pig myPig = new Pig();  // Create a Pig object
    myPig.animalSound();
  }
}
```





### Exceptions

```c#
try
{
  int[] myNumbers = {1, 2, 3};
  Console.WriteLine(myNumbers[10]);
}
catch (Exception e)
{
  Console.WriteLine("Something went wrong.");
}
finally
{
  Console.WriteLine("The 'try catch' is finished.");
}
```



