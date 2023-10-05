# A gentle guide to Java (SE 8)

To install for Ubuntu:

```
sudo apt-get install openjdk-8-jdk
```

Save source file with `.java`. Compile with `javac` to get `.class` file. Run with `java`



1. Every java program must contain 1 main, which specifies which function to execute first

```
public static void main(String[] args)
```

2. Always put `;`
3. Use `.equals()` method to equate strings
4. Use `System.out.println()` to print



## Language basics

### Variables

an object stores its state in fields/variables

**4 types of variables**

1. Instance Variables (Non-static field): values are unique to each *instance* of a class (eg. the `int` class), can change in run time
2. Class Variables (Static Fields): there is exactly one copy of this variable in existence, cannot change in run time
3. Local variables: same syntax as fields, but declared locally (in brackets)
4. Parameters



**Naming**

Camel case as convention. Use all caps with `_` if it is static (eg. `MAX_SIZE`)



**Types**

| Type    | Description                       |
| ------- | --------------------------------- |
| byte    | 8-bit signed int, -128 ~ 127      |
| short   | 16-bit signed int                 |
| int     | 32-bit signed int: -2^31 ~ 2^31-1 |
| long    | 64-bit signed int                 |
| float   | 32-bit IEEE standard              |
| double  | 64-bit IEEE  standard             |
| boolean | `true` or `false`                 |
| char    | 16-bit Unicode character          |

Also a useful type String: `java.lang.String`, declare with `String s = "Hello"` (no need to import, as java.lang is like the standard library)

**Java is statically typed, so all variables need to have their typed declared on instantiation**

`int num = 5`

You can also omit the value, then java will assign it a value. This is not good practice.

**multiple declaration:**

```java
int x, y = 5, z;
```





| **Data Type**          | **Default Value (for fields)** |
| ---------------------- | ------------------------------ |
| byte                   | 0                              |
| short                  | 0                              |
| int                    | 0                              |
| long                   | 0L                             |
| float                  | 0.0f                           |
| double                 | 0.0d                           |
| char                   | '\u0000'                       |
| String (or any object) | null                           |
| boolean                | false                          |



**Literals**

````
// The number 26, in decimal
int decVal = 26;
//  The number 26, in hexadecimal
int hexVal = 0x1a;
// The number 26, in binary
int binVal = 0b11010;

// ends with f/F -> float, end with nothing or d/D -> double
double d1 = 123.4;
// same value as d1, but in scientific notation
double d2 = 1.234e2;
float f1  = 123.4f;
````



### **Array**

First declare the array variable

```
int[] arr;	//do *type*[] name to get an array of that type
```

Then assign that variable to an array of fixed length

```java
arr = new int[10]	// this will instantiate an array of size 10 and fill it with int of value 0, as that is the default value of int
```

You can also do this all in one go

```
int[] arr = new int[10]
```

The `new` operator **instantiate an object** from the class.

java arrays are 0-based



shortcuts

```
int[] arr = {1, 2, 3}		//declare the length automatically
```



multidimensional arrays (they do not need to have "rectangle" length)

```java
class MultiDimArrayDemo {
    public static void main(String[] args) {
        String[][] names = {
            {"Mr. ", "Mrs. ", "Ms. "},
            {"Smith", "Jones"}
        };
        // Mr. Smith
        System.out.println(names[0][0] + names[1][0]);
        // Ms. Jones
        System.out.println(names[0][2] + names[1][1]);
    }
}
```

you can also do this by hand

```java
class HelloWorldApp {
    public static void main(String[] args) {
        //System.out.println("Hello World!"); // Display the string.
        String[][] test = new String[2][2];
        test[0][0] = "Mr. ";
        test[0][1] = "Ms. ";
        test[1][0] = "Cooper";
        test[1][1] = "Musk";
        System.out.println(test[0][0] + test[1][1] + " and " + test[0][1] + test[1][1]);
    }
}
```



array stuff

1. Arrays are mutable

```java
int[] arr = {1, 2, 3};
arr[1] = 5;
System.out.println(arr[1])	//5
```

2. Array class have attribute `length`. so `arr.length` will return 3. **NOTE:** length might be a method for other types, eg. String, as Strings' length is not declared during instantiation
3. Looping

```java
// by index
String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
for (int i = 0; i < cars.length; i++) {
  System.out.println(cars[i]);
}

// by element
String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
for (String i : cars) {
  System.out.println(i);
}
```

4. Extra: for an array of `char`s, you can do `new String(arr)` and use the String constructor to make it into a string, like "".join(arr)

5. Equality:

`==` compares for reference quality (finds the address of both fields), `.equals()` is a string method that gives content equality. Always use `.equals()`. 

Note that `==` will work if the String is`null`.

```java
class Test {
    public static void main(String[] args) {
        String s1 = new String("12");
        String s2 = new String("12");
        String n1 = null;
        String n2 = null;

        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
        System.out.println(n1 == n2);
        System.out.println(n1.equals(n2));
    }
}
```

result:

```
false
true
true
Exception in thread "main" java.lang.NullPointerException
        at Test.main(test.java:16)
```



Array methods (in collection **Arrays**, with the s!)

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Arrays.binarySearch(arr, key) / Arrays.binarySearch(arr, i, j, key) | Return 1st index of key in arr or arr[i..j)                  |
| .copyOf(arr, len)                                            | Give a copy of arr with new length len, either truncating or padding with default val of type |
| .copyOfRange(arr, i, j)                                      | Give a copy of arr[i..j)                                     |
| .equals(arr1, arr2)                                          | Return if arr1 and arr2 are equal in content                 |
| .fill(arr, val) / .fill(arr, i, j, val)                      | Fill arr or arr[i..j) with val                               |
| .sort(arr) / .sort(arr, i, j)                                | Sorts arr or arr[i..j)                                       |
| .toString(arr)                                               | Turns an array into a string for printing                    |



### Strings

Strings are not primitive but are built-in

Declaration:

```java
String greeting = "Hello"
```

or

```java
String greeting = new String("Hello")
```



| Method              | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| .length()           | Return length of string (# of chars)                         |
| .toUpperCase()      | Return a shadow coppy of new string where all chars into upper case |
| .toLowerCase()      | -> lower case                                                |
| .indexOf(substr)    | Return index of 1st char in substr in 1st occurence of substr in str |
| +, or s1.concat(s2) | String concatenation                                         |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |

Escape characters:

```java
String txt = "We are the so-called \"Vikings\" from the north.";
```





### Math

.max(), .min(), .abs(), .sqrt(), .random()







### Casting and conversion

In Java there are 2 types of casting

- **Widening Casting** (automatically) - converting a smaller type to a larger type size
  `byte` -> `short` -> `char` -> `int` -> `long` -> `float` -> `double`
- **Narrowing Casting** (manually) - converting a larger type to a smaller size type
  `double` -> `float` -> `long` -> `int` -> `char` -> `short` -> `byte`

Widening:

```java
public class MyClass {
  public static void main(String[] args) {
    int myInt = 9;
    double myDouble = myInt; // Automatic casting: int to double

    System.out.println(myInt);      // Outputs 9
    System.out.println(myDouble);   // Outputs 9.0
  }
}
```

Narrowing:

```java
public class MyClass {
  public static void main(String[] args) {
    double myDouble = 9.78;
    int myInt = (int) myDouble; // Manual casting: double to int

    System.out.println(myDouble);   // Outputs 9.78
    System.out.println(myInt);      // Outputs 9
  }
}
```





**Int to string:**

`"" + i`, `String.valueOf(i)` or `Integer.toString(i)`



**String to Int:**

`Integer.parseInt(s)`





### Operators

**Simple Assignment Operator**

```
=       Simple assignment operator
```

**Arithmetic Operators**

```
+       Additive operator (also used
        for String concatenation)
-       Subtraction operator
*       Multiplication operator
/       Division operator => if both numbers are int, does floor division and give int. If one of the nums is float/double, does 
		floating point division and give float/double
%       Remainder operator
```

**Unary Operators**

```
+       Unary plus operator; indicates
        positive value (numbers are 
        positive without this, however)
-       Unary minus operator; negates
        an expression
++      Increment operator; increments a value by 1
		Same as _ += 1, which is same as _ = _ + 1
		++x vs. x++
			++x first increments x, then evaluates x
			x++ first evaluates x, then increments x
            same with --
--      Decrement operator; decrements
        a value by 1
!       Logical complement operator;
        inverts the value of a boolean
```

**Equality and Relational Operators**

```
==      Equal to
!=      Not equal to
>       Greater than
>=      Greater than or equal to
<       Less than
<=      Less than or equal to
```

**Conditional Operators**

```
&&      Conditional-AND SHORT-CIRCUITS!
||      Conditional-OR
?:      Ternary (shorthand for 
        if-then-else statement)
        condition ? val1 : val2
```

**Type Comparison Operator**

```
instanceof      Compares an object to 
                a specified type (a class or an interface). Returns true if the object is an instance of that class, a subclass of that class, a class that implements the interface, or a subclass of a class that implements the interface
                eg.
                String s = new String("s");
                System.out.println(s instanceof String)		//true
```

**Bitwise and Bit Shift Operators**

```
~       Unary bitwise complement
<<      Signed left shift (eg. b = b << 1)
>>      Signed right shift
>>>     Unsigned right shift
&       Bitwise AND
^       Bitwise exclusive OR
|       Bitwise inclusive OR
```

bitwise masks

Makes a specific bit true while keeping the rest the same

```
Mask:   10000000b
Value:  00000101b
---- OR ---------
Result: 10000101b
```

Select a specific bit and make everything else 0

```
Mask:   00000100b
Value:  00000101b
---- AND ---------
Result: 00000100b
```







**Precedence**

| Operators            | Precedence                               |
| -------------------- | ---------------------------------------- |
| postfix              | `*expr*++ *expr*--`                      |
| unary                | `++*expr* --*expr* +*expr* -*expr* ~ !`  |
| multiplicative       | `* / %`                                  |
| additive             | `+ -`                                    |
| shift                | `<< >> >>>`                              |
| relational           | `< > <= >= instanceof`                   |
| equality             | `== !=`                                  |
| bitwise AND          | `&`                                      |
| bitwise exclusive OR | `^`                                      |
| bitwise inclusive OR | `|`                                      |
| logical AND          | `&&`                                     |
| logical OR           | `||`                                     |
| ternary              | `? :`                                    |
| assignment           | `= += -= *= /= %= &= ^= |= <<= >>= >>>=` |

**For guards, note that `!` then relational operators then `&&` then `||`**



### Expressions, Statements, and Blocks

**Expression**:

not well defined



**Statements**:

Basically put a `;` after every statement

1. Expression statements

```java
// assignment statement
aValue = 8933.234;
// increment statement
aValue++;
// method invocation statement
System.out.println("Hello World!");
// object creation statement
Bicycle myBike = new Bicycle();
```

2. Declaration statement

```java
// declaration statement
double aValue = 8933.234;
```

3. Control flow statements



**Blocks**

Each code block is indicated by a pair of `{}`



### Control flow statements

**If-then-else**

```java
class IfElseDemo {
    public static void main(String[] args) {

        int testscore = 76;
        char grade;

        if (testscore >= 90) {
            grade = 'A';
        } else if (testscore >= 80) {
            grade = 'B';
        } else if (testscore >= 70) {
            grade = 'C';
        } else if (testscore >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        System.out.println("Grade = " + grade);
    }
}
```



**Switch**

Switch statements can only match integers (byte`, `short`, `char`, and `int), enumerated types, and String class (since SE 7, which ofc uses the .equals() method and not ==)

Use >= 1 case statements and optional default statement.

Switch goes the first case that matches, use `break;` to prevent fall through.

There can be many cases that map to the same block.

Always check that the input is not `null` to avoid the null pointer exception

```java
class SwitchDemo2 {
    public static void main(String[] args) {

        int month = 2;
        int year = 2000;
        int numDays = 0;

        switch (month) {
            case 1: case 3: case 5:
            case 7: case 8: case 10:
            case 12:
                numDays = 31;
                break;
            case 4: case 6:
            case 9: case 11:
                numDays = 30;
                break;
            case 2:
                if (((year % 4 == 0) && 
                     !(year % 100 == 0))
                     || (year % 400 == 0))
                    numDays = 29;
                else
                    numDays = 28;
                break;
            default:
                System.out.println("Invalid month.");
                break;
        }
        System.out.println("Number of Days = "
                           + numDays);
    }
}
```



**while and do while**

```java
while (curDays < isolationDays) {
    curDays++;
}
System.out.println("FREEDOM")
```

do while just executes the main body once

```java
do {
    bob.eatSnacc();
} while (bob.isHungry())
```



**for loop**

```java
for (initialization; termination; increment) {
    statement(s)
}
```

- Initialisation executed first
- Then we check termination. If true, execute body and increment, and check again. If false, leave loop

Note that all the variables declared in the `initialization` is local to the for loop block. So you can access it and change it

```java
class Simple {
    public static void main (String[] args){
        for (int i = 1; i < 2; i++) {
            i = -2;
            System.out.println("yay");
        }
    }
}
```

The above code will never terminate

```java
for (int i = a; i < b; i++)
```

is equal to 

```python
range(a,b)
```

It's a nice way to think about it.





**break**

Unlabelled break (just `break;`) will break out of the current loop

```java
class Simple {
    public static void main (String[] args){
        for (int i = 1; i < 3; i++) {
            System.out.println("Outer call: i = " + String.valueOf(i));
            for (int j = 1; j < 3; j++) {
                System.out.println("Inner call: j = " + String.valueOf(j));
                if (j == 1) {
                    break;
                }
            }
        }
    }
}
```

return

```
Outer call: i = 1
Inner call: j = 1
Outer call: i = 2
Inner call: j = 1
```



Labelled break will break out of the loop labelled by the label

```java
class Simple {
    public static void main (String[] args){
        outer:
            for (int i = 1; i < 3; i++) {
                System.out.println("Outer call: i = " + String.valueOf(i));
                for (int j = 1; j < 3; j++) {
                    System.out.println("Inner call: j = " + String.valueOf(j));
                    if (j == 1) {
                        break outer;
                    }
                }
            }
    }
}
```

return

```
Outer call: i = 1
Inner call: j = 1
```



**continue**

There is also labelled and unlabelled version of continue, which is the same logic as break but only continues to the next iteration



**return**

See more in `methods`

`return;` or `return value;`





## Classes and objects

### Classes

```java
public class Bicycle {
        
    // the Bicycle class has
    // three fields
    private int cadence;
    private int gear;
    private int speed;
        
    // the Bicycle class has
    // one constructor
    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;
    }
        
    // the Bicycle class has
    // four methods
    public void setCadence(int newValue) {
        cadence = newValue;
    }
        
    public void setGear(int newValue) {
        gear = newValue;
    }
        
    public void applyBrake(int decrement) {
        speed -= decrement;
    }
        
    public void speedUp(int increment) {
        speed += increment;
    }
        
}
```

subclass

```java
public class MountainBike extends Bicycle {
        
    // the MountainBike subclass has
    // one field
    public int seatHeight;

    // the MountainBike subclass has
    // one constructor
    public MountainBike(int startHeight, int startCadence,
                        int startSpeed, int startGear) {
        super(startCadence, startSpeed, startGear);
        seatHeight = startHeight;
    }   
        
    // the MountainBike subclass has
    // one method
    public void setHeight(int newValue) {
        seatHeight = newValue;
    }   

}
```



**Modifiers:**

1. **Access modifiers**

For a class

| Modifier  | Description                                                  | Try it                                                       |
| :-------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `public`  | The class is accessible by any other class                   | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_mod_public) |
| *default* | The class is only accessible by classes in the same package. This is used when you don't specify a modifier. You will learn more about packages in the [Packages chapter](https://www.w3schools.com/java/java_packages.asp) |                                                              |

For methods and attributes

| Modifier    | Description                                                  | Try it                                                       |
| :---------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `public`    | The code is accessible for all classes                       | [Try it »](https://www.w3schools.com/java/showjava_classes.asp?filename=demo_mod_public2) |
| `private`   | The code is only accessible within the declared class<br />good for private states or use getter and setter method | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_access_mod) |
| *default*   | The code is only accessible in the same package. This is used when you don't specify a modifier. You will learn more about packages in the [Packages chapter](https://www.w3schools.com/java/java_packages.asp) | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_mod_default2) |
| `protected` | The code is accessible in the same package and **subclasses**. You will learn more about subclasses and superclasses in the [Inheritance chapter](https://www.w3schools.com/java/java_inheritance.asp) |                                                              |



2. **Non-Access modifiers**

For a class

| Modifier   | Description                                                  | Try it                                                       |
| :--------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `final`    | The class cannot be inherited by other classes (You will learn more about inheritance in the [Inheritance chapter](https://www.w3schools.com/java/java_inheritance.asp)) | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_inherit_final) |
| `abstract` | The class cannot be used to create objects (To access an abstract class, it must be inherited from another class. You will learn more about inheritance and abstraction in the [Inheritance](https://www.w3schools.com/java/java_inheritance.asp) and [Abstraction](https://www.w3schools.com/java/java_abstract.asp) chapters) |                                                              |

For methods and attributes

| Modifier       | Description                                                  |
| :------------- | :----------------------------------------------------------- |
| `final`        | Attributes and methods cannot be overridden/modified         |
| `static`       | Attributes and methods belongs to the class, rather than an object |
| `abstract`     | Can only be used in an abstract class, and can only be used on methods. The method does not have a body, for example **abstract void run();**. The body is provided by the subclass (inherited from). You will learn more about inheritance and abstraction in the [Inheritance](https://www.w3schools.com/java/java_inheritance.asp) and [Abstraction](https://www.w3schools.com/java/java_abstract.asp) chapters |
| `transient`    | Attributes and methods are skipped when serializing the object containing them |
| `synchronized` | Methods can only be accessed by one thread at a time         |
| `volatile`     | The value of an attribute is not cached thread-locally, and is always read from the "main memory" |





**class definition**

A class has 3 things

- constructors for initializing new objects
- declarations for the fields that provide the state of the class and its objects
- methods to implement the behavior of the class and its objects.

```java
class MyClass extends MySuperClass implements YourInterface {
    // field, constructor, and
    // method declarations
}
```

We capitalize first letter as convention



**1. Declaring fields**

1. Zero or more modifiers
   1. Access modifers: public (available for all classes), private (available only to this class)
2. The field's type.
3. The field's name.



**2. Declaring methods**

1. Modifiers—such as `public`, `private` etc.
   1. Use `static` to mean the method belongs to class and not each individual object
2. The return type, `void` if returns nothing
3. The method name
4. The parameter list in parenthesis, if no args use `()`
5. An exception list
6. The method body, enclosed between braces



**Arbitrary number of arguments**

```java
public static String listBasket(String... fruits) {
    String res = "";
    boolean first = true;
    for (String fruit: fruits) {
        if (first) {
            res += fruit;
            first = false;
        } else {
            res += ", " + fruit;
        }
    }
    return res;
}
```

Use syntax `Type... name` so that user can add arbitrary # of arguments and they will all be added to a array called `name`. Note all arguments must be of that type. You can also just pass in an array of `type`. Both works and will give the same result.



remarks:

1. method name + its args is its signature

```
setHeigh(int newValue)
```

2. naming convention: start with verb, then camel case words

3. **Overloading**: we can overload a method by changing its parameter. Compiler can tell this apart. Compiler will complain if you have 2 methods in same class with same name and parameter list

```java
public class DataArtist {
    ...
    public void draw(String s) {
        ...
    }
    public void draw(int i) {
        ...
    }
    public void draw(double f) {
        ...
    }
    public void draw(int i, double f) {
        ...
    }
}
```



**3. Providing constructors**

- Constructor is the function executed when an object is instantiated
- Constructor = method but same name as Class + no return type (void)
- There can be many constructors for same class, differentiated by the signature (parameter list)



**Small conclusion:**

- When a class is instantiated, the constructor function is called which usually sets the values of the attributes. Then you get an object of type ClassName which contain the fields/attributes and the methods



**Attributes**

You can access attributes using `obj.attributeName`

You can modify it (`obj.x = 5`)

**Methods**

To call a method, do `obj.methodName();`

If the method is `static`  (class method), you can call it without instantiating object, so do `Class.methodName()`





### Scope

Java uses block scoping (`{}`). So code can access variable in the scope it is located in and outer scopes. No 2 variable in the same block can have the same name.



## Collections

Java's collection come with interfaces and implementations (both in collection), so user can freely choose an interface and its implementation according to their needs

| Interfaces | Hash table Implementations | Resizable array Implementations | Tree Implementations | Linked list Implementations | Hash table + Linked list Implementations |
| ---------- | -------------------------- | ------------------------------- | -------------------- | --------------------------- | ---------------------------------------- |
| `Set`      | `HashSet`                  |                                 | `TreeSet`            |                             | `LinkedHashSet`                          |
| `List`     |                            | `ArrayList`                     |                      | `LinkedList`                |                                          |
| `Queue`    |                            |                                 |                      |                             |                                          |
| `Deque`    |                            | `ArrayDeque`                    |                      | `LinkedList`                |                                          |
| `Map`      | `HashMap`                  |                                 | `TreeMap`            |                             | `LinkedHashMap`                          |

In practice, you use this:

```java
List<String> list = new ArrayList<String>();
```

List interface, ArrayList implementation, assign that to variable `list`.



We can just talk about the interface as we talk about implementation

NOTE: Except HashMap, these are all already collection types, so we can easily loop through them via `for (Type val : collection)`

### ArrayList

A resizable array.

| Method                    | Description                                    |
| ------------------------- | ---------------------------------------------- |
| .add(val)                 | add element to end of arrayList                |
| .get(i)                   | get element at index i                         |
| .set(i, newVal)           | set element at i to newVal                     |
| .remove(i)                | remove element at index i (arrayList shortens) |
| .clear()                  | take a guess?                                  |
| Collections.sort(arrList) | sort the arrayList                             |
| .size()                   | return size of the arrayList                   |



### LinkedList

A standard linked list

LinkedList has the same methods, with the ones below that are quick

| Method           | Description                                    |                                                              |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| addFirst(val)    | Adds an item to the beginning of the list.     | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_linkedlist_addfirst) |
| addLast(val)     | Add an item to the end of the list             | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_linkedlist_addlast) |
| removeFirst(val) | Remove an item from the beginning of the list. | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_linkedlist_removefirst) |
| removeLast(val)  | Remove an item from the end of the list        | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_linkedlist_removelast) |
| getFirst()       | Get the item at the beginning of the list      | [Try it »](https://www.w3schools.com/java/showjava.asp?filename=demo_linkedlist_getfirst) |
| getLast()        | Get the item at the end of the list            |                                                              |



### HashMap

A hash table

A mapping from Strings to int:

```java
Map<String, int> grades = new HashMap<String, int>();
```

| Method     | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| .put(k,v)  | Add key-value pair to map                                    |
| .get(k)    | Return the value associated with key                         |
| .remove(k) | Remove key-value pair of *key*                               |
| .clear()   | ...                                                          |
| .size()    | ...                                                          |
| .keySet()  | Return a set of all keys, the use `for (Type i : map.keySet())` |
| .values()  | Returns a collection of values                               |



### HashSet

A hash table again

```java
HashSet<String> cars = new HashSet<String>();
```

| Method       | Description           |
| ------------ | --------------------- |
| .add(v)      | Adds v to the set     |
| .contains(v) | See if set contains v |
| .remove(v)   | Remove v from the set |
| .clear()     |                       |
| .size()      |                       |





## Miscellaneous

**Documentation:**

```
/* text */
/** documentation */
// text
```



Importing

```java
import package.name.Class;   // Import a single class
import package.name.*;   // Import the whole package
```

eg.

```java
import java.util.Arrays
import java.util.List
```

