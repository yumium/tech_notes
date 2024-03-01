# JavaScript



**There's many more guides on the website. But I think it's time to learn some HTML, CSS, and general web stuff first.**

[What is JavaScript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript

- JavaScript allows run time class alternation!
- Client side: What js is built for, usually runs in browser
- Server side: Can use Node.js, though Node.js can be used as an environment on a computer as well

[DOM]: https://en.wikipedia.org/wiki/Document_Object_Model

- Tree structure for HTML

[An re-introduction to javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript

- A good guide to js
- It contains different ways to iterate through an array
- Rest parameters in functions `...`, `arguments` object
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments









## JavaScript and Web Dev

### How does HTML, CSS, and JS work together?

HTML - Structure

CSS - Style

JS - Logic/Behavior

It's good practice to use modularization and have html, css, and js in different files and reference each other.



**MDN Front-end developer "course"**

(https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer)



**Getting started with the web**

An overview of front end developing

(https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)

More things I need to install/learn to use:

- A version control system: Git
- An automation system to sort out modularization: Webpack, Grunt, Gulp

- A local web server (python simpleHTTPserver):https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server



**Planning:**

1. **What is your website about?** Do you like dogs, New York, or Pac-Man?
2. **What information are you presenting on the subject?** Write a title and a few paragraphs and think of an image you'd like to show on your page.
3. **What does your website look like,** in simple high-level terms? What's the background color? What kind of font is appropriate: formal, cartoony, bold and loud, subtle?

- Test, Theme color, Images, Fonts



**Dealing with files**

> When you are working on a website locally on your computer, you should keep all the related files in a single folder that mirrors the published website's file structure on the server

Naming:

- Use all lower case letters
- Use `-` as separaters, not `_` or space

Structure of your files:

1. **`index.html`**: This file will generally contain your homepage content, that is, the text and images that people see when they first go to your site. Using your text editor, create a new file called `index.html` and save it just inside your `test-site` folder.
2. **`images` folder**: This folder will contain all the images that you use on your site. Create a folder called `images`, inside your `test-site` folder.
3. **`styles` folder**: This folder will contain the CSS code used to style your content (for example, setting text and background colors). Create a folder called `styles`, inside your `test-site` folder.
4. **`scripts` folder**: This folder will contain all the JavaScript code used to add interactive functionality to your site (e.g. buttons that load data when clicked). Create a folder called `scripts`, inside your `test-site` folder.

File paths:

- To let files talk to each other, you will need to learn file paths. You'll learn this in detail in HTML course



**What is HTML?**

HTML = Hypertext Markup Language

- Opening/Closing tag, content, element

- Attributes

- Nested elements, need to be properly nested

- Empty elements <img>

- ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>My test page</title>
    </head>
    <body>
      <img src="images/firefox-icon.png" alt="My test image">
    </body>
  </html>
  ```

- Headings, Paragraphs, Lists etc. I know this from markdown



**What is CSS?**

- Style sheet language
- Cascading Style Sheets
- ruleset = selector + declarations
  - declaration = property : property-value

```css
p {
    color: red
}
```

`p` is selector, `color` is property, `red` is property-value

- Different selectors...
- Remember to link the CSS file at the header of `index.html`.
- Fonts
- The box model: padding, border, margin etc.



**JavaScript**

- Dynamic programming language
- Compact yet flexible, good for creating games, 2D/3D graphics etc.
- Use <script src=></script> to link it to index.html, to *apply* to it so it can make an effect.
- Most JavaScript language features are found in other languages
- Events (eg. myImage.onclick = <continuation>)



**Publishing a website**

- Need a hosting service (rent space on a web server)
  - Use FTP to transfer files to that server
- Register a domain name

- Can also use online tools like GitHub pages or Google App Engine (heroku app??), AWS
- For quick testing, use:
  - JS Bin
  - JSFiddle



**Overview of how browsing works:**

1. The browser goes to the DNS server, and finds the real address of the server that the website lives on (you find the address of the shop).
2. The browser sends an HTTP request message to the server, asking it to send a copy of the website to the client (you go to the shop and order your goods). This message, and all other data sent between the client and the server, is sent across your internet connection using TCP/IP.
3. If the server approves the client's request, the server sends the client a "200 OK" message, which means "Of course you can look at that website! Here it is", and then starts sending the website's files to the browser as a series of small chunks called data packets (the shop gives you your goods, and you bring them back to your house).
4. The browser assembles the small chunks into a complete web page and displays it to you (the goods arrive at your door — new shiny stuff, awesome!).

Order of parsing when loading a webpage: HTML; CSS; JS





## Language basics

Printing

```javascript
console.log("Hello World!")
```



Comments

```javascript
// Inline comment

/*
Paragraph
Comment
*/
```



Variable declaration

```javascript
var a = 3;
let b = 3;		// mutable variable, preferred from var after ES6
const c = 4;	// immutable variable
```

`var` and `let` can declare variables that are uninitialised

```javascript
let b;
```





Scope

Like Python and most languages, scope defines the textual area in the program that a namespace can be accessed.

- Global scope = Accessible everywhere in the program
- File/Module scope = Accessible within file
- Function scope = Accessible within the function
- Code block scope = Accessible within the `{..}` block









## Native Datatypes

- Numbers (no concept between integer and float)
- Boolean - `true`, `false`
- Strings - literal `'` or`"`
- Null - `null`
- Undefined - `undefined`
- Symbol
- Object



### Strings

`str.length`: Length of string

```javascript
// String interpolation
const message = `Tommy is ${age} years old.`;
```





### Arrays

```javascript
const arr = [100, 200, 300];
arr[0];  // 100

// Arrays can be heterogenous
const mixArray = [1, "Chicken", false];
// Note, the variable is immutable (it cannot point to anything other than the array), but elements within the array can be changed

// Nested arrays
const nested = [[1,2],[3]];
nested[0][0];  // 1

// Initialising array with uninitialised values
const arr = [1,2,,,5];
arr[6]  // undefined, you can access uninitialised values, will not throw index error


```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/

`arr.length`: Length of array

`arr.push`: Append element to array

`arr.pop`: Pops element from end of array

`arr.splice(start, [deleteCount, item1, item2, ... itemN])`: Delete elements from and after `start` index, if `deleteCount` given we delete # of elements based on `deleteCount`, and we can optionally provide items to be added in place of deleted elements

`arr.shift`: Removes first element from array and returns it

`arr.unshift(item1, item2, ..., itemN)`: Adds specified elements to the beginning of array and returns new length of array

`arr.slice(start, [end])`: Returns arr[start..end)

`arr.filter(predicate)`: 

`arr.findIndex(predicate)`: 

`arr.map(func)`

`arr.forEach(func)`

`arr.join(sep)`

`arr.reduce(func, initValue)`: `func` has signature `(accumulator, currentValue) => accumulator + currentValue`

​	If array contains just 1 value and no `initValue` is provided, then that value will be returned















## Control flow

**If**

```javascript
if (isMailSent) {
    console.log("Mail sent to recipient!");
} else if (isMailReady) {
    console.log("Mail ready to be sent!");
} else {
    console.log("Mail not ready to send.");
}
```





**While**

```javascript
while (condition) {
    // code block to be executed
}
```



**For**

```javascript
for (let i = 0; i < items.length; i += 1) {
    console.log(`${i} has value ${items[i]}`)
}
```

1. Check if condition satisfied
2. Yes => run body, run iteration statement, back to 1
3. No => exists loop



Can use `break` keyword to break out of the loop the keyword is in.





**Do..While**

```javascript
do {
    // code block
} while (condition);
```

Executes the code block at least once







**Switch**

```javascript
const food = "salad";

switch (food) {
    case "oyster":
        console.log("The taste of the sea");
        break;
    case "pizza":
        console.log("A delicious pie");
        break;
    default:
        console.log("Enjoy your meal");
}
```

- case matching uses `===`
- If matches, block inside the case is executed
- If no cases match, `default` case is executed
- Without `break` clause, the control flow "falls through", checking the rest of the cases











## Operators

**Arithmetic**

`+`, `-`, `*`, `/`, `%`

Note: `+` casts both operands to a string unless both operands are numbers. `-` always casts both operands to numbers

```javascript
> "123" + 4
"1234"
> "123" - 4
119
```



`+=`, `-=`, `*=`, `/=`



**Logical**

`&&`, `!`, `||`

Logical operator shortcuts



**Ternary**

```javascript
day = "Monday" ? monday_price : normal_price;
```



**Comparison**

`>`, `>=`, `<`, `<=`, `===`, `!==`: 3 equal signs mean strictly equal (same value and type, with `==` JS will do implicit type conversion)



**Other**

`?`: Null chaining, if the value is `undefined` or `null`, evaluates to `undefined` instead of throwing an error

```javascript
// Would evaluate to `undefined` if description is undefined or null, instead of throwing an error
feed.description?.contaions(searchKey)
```







## Functions

```javascript
// Named function
function sum(num1, num2) {
    return num1 + num2;
}

sum(3, 6);  // 9

// Anonymous function
const rocketToMars = function () {
    return "BOOM!";
}

// Arrow function (ES6) - syntactical sugar w/ increased brevity and readability
// No arguments
const printHello = () => {
    consoloe.log("hello");
}

// Single argument
const checkWeight = weight => {
    console.log(`Baggage weight: ${weight} kilograms.`)
}

// Multiple arguments
const sum = (n1, n2) => {
    return n1 + n2;
}

// Concise arrow functions
const multiply = (n1, n2) => n1*n2;


// Function declaration (not variable declaration) can be hoisted
const rocktToMoon = moonFunc();
function moonFunc() {
    return "TO THE MOON!";
}
```











## Built-in library



**Math**

`Math.random()`

`Math.floor()`







## Object

In JS we create objects with object literals `{}` , and we can assign it to a variable. (Alternatively we can use the Object() constructor like `const obj = new Object()` which creates an empty object, but we don't need to use that now.)

We make a key-value pair by writing the key’s name, or *identifier*, followed by a colon and then the value. We separate each key-value pair in an object literal with a comma (`,`). Keys are strings, but when we have a key that does not have any special characters in it, JavaScript allows us to omit the quotation marks:

```javascript
// An object literal with two key-value pairs
let spaceship = {
  'Fuel Type': 'diesel',
  color: 'silver'
};
```

You access *properties* of an object using the dot notation:

```javascript
let theColor = spaceship.color
console.log(theColor)	//silver
```

But if the key needs to be enclosed in "", ie. it contains numbers, symbols, empty spaces, we need the [ ] notation:

```javascript
let fuel = spaceship["Fuel Type"]
console.log(fuel)	//diesel
```

We also need [ ] notation if a variable holds the property name. Because with the dot notation, JS will search for the variable name in the keys of the object

```javascript
let question = "Fuel Type"
console.log(spaceship[question])	//diesel
```



Objects are mutable, meaning we can change its properties

One of two things can happen with property assignment:

- If the property already exists on the object, whatever value it held before will be replaced with the newly assigned value.
- If there was no property with that name, a new property will be added to the object.

Note that even if the object is assigned to a variable `const`, we can still mutate the internal fields of the object.

We can delete key-value pairs using keyword `delete`.

```javascript
spaceship.color = "red"
delete spaceship["Fuel Type"]
```



We create object methods in a similar way.

There are 2 slight different syntax for it. First, method name : anonymous function

```javascript
const alienShip = {
  invade: function () { 
    console.log('Hello! We have come to dominate your planet. Instead of Earth, it shall be called New Xaculon.')
  }
};
```

Then we can also do this thanks to ES6

```javascript
const alienShip = {
  invade () { 
    console.log('Hello! We have come to dominate your planet. Instead of Earth, it shall be called New Xaculon.')
  }
};
```

Make sure you include `,` at the end of each method to separate different methods. (like you do in properties)

In a nutshell, a method is a property that is a function.



Objects can be nested. An object can contain other objects inside of it. We use Bob: {...} to denote an object with name Bob and its fields inside the {}

```javascript
let masterObj = {
    outerObj: {
       property1: value,
       innerObj: {
           method1 () {
               console.log("yay")
           }
       }
    }
}
```



When we pass objects into functions, we pass the reference, ie. the function only knows the location of the object.

Therefore, we can mutate the field of the object passed in.

But we cannot reassign the variable passed in to another object! This is because the function only knows the location of memory, but not the pointer that points to the memory.

```javascript
let spaceship = {
  homePlanet : 'Earth',
  color : 'red'
};
let tryReassignment = obj => {
  obj = {
    identified : false, 
    'transport type' : 'flying'
  }
  console.log(obj) // Prints {'identified': false, 'transport type': 'flying'}
};

tryReassignment(spaceship) // The attempt at reassignment does not work.
spaceship // Still returns {homePlanet : 'Earth', color : 'red'};

spaceship = {
  identified : false, 
  'transport type': 'flying'
}; // Regular reassignment still works.
```

So in the example above, obj is actually a fresh variable pointing at the new object, and the original spaceship variable still points at the old object.





We can iterate through the keys of an object using let .. in .. notation

```javascript
let spaceship = {
    crew: {
    captain: { 
        name: 'Lily', 
        degree: 'Computer Engineering', 
        cheerTeam() { console.log('You got this!') } 
        },
    'chief officer': { 
        name: 'Dan', 
        degree: 'Aerospace Engineering', 
        agree() { console.log('I agree, captain!') } 
        },
    medic: { 
        name: 'Clementine', 
        degree: 'Physics', 
        announce() { console.log(`Jets on!`) } },
    translator: {
        name: 'Shauna', 
        degree: 'Conservation Science', 
        powerFuel() { console.log('The tank is full!') } 
        }
    }
}; 
// for...in
for (let crewMember in spaceship.crew) {
  console.log(`${crewMember}: ${spaceship.crew[crewMember].name}`)
};
```

Here, crewMember is assigned to the keys of spaceship.crew object (which is of type String!). So we need the long-winded `spaceship.crew[crewMember].name`. Notice we use the ${} notation as the input is a variable name that points to a string, not a String directly.





### Conclusion

Objects in JS is super clean because it's just key-value pairs!

This is true partly thanks to functions in JS being first-order object, which means they can be passed around like objects (see Higher-order functions). Though I don't think you can define your own properties and methods for them besides the built-in ones.	=> NOPE, turns out you can!

```javascript
function func() {
  console.log("yay")
}

func.prop = "a"

func()						//yay
console.log(func.prop)		//a
```

But then again, why would you.



A curious thing about functions, here is a function that returns a function (easy case from Haskell)

```javascript
function Accumulator(start) {
  var current = start;
  return function (x) {
    return current += x;
  };
}
```

It's behaviour is this:

```javascript
var a = Accumulator(4);
var x = a(5);   // x has value 9
x = a(2);       // x has value 11

var b = Accumulator(42);
x = b(7);       // x has value 49 (current = 49 in closure b)
x = a(7);       // x has value 18 (current = 18 in closure a)
```



Though we say "functional objects", we don't declare objects with functions. We're not at church numerals yet. Or are we?







### Advanced Objects

Methods that uses internal keys of an object needs to use the "this" keyword to access them. "this" refers to the *calling object*.

An exception is when using arrow functions to define methods in objects. Here, "this" is binded to the function itself. The moral is not to use arrow notation when defining methods!



JS doesn't have `private` built in. A convention to to have `_` before the key of a private field. But you can still set it if you want of course.

You can also use closures to mimic objects with functions, but that's for another day.



Getters:

```javascript
const robot = {
  _model: '1E78V2',
  _energyLevel: 100,
  get energyLevel() {
    if (typeof this._energyLevel == "number") {
      return `My current energy level is ${this._energyLevel}`
    } else {
      return "System malfunction: cannot retrieve energy level"
    }
  }
};

console.log(robot.energyLevel)
```

A getter is just a method really. Its main purpose is to make the code clearer.

When you evoke the getter method, you don't need to put `()` behind it, making it look like a property.

You cannot set the getter method name to the same name as a property. A general strategy is to put _ before the property name you are trying to get. If you set the getter method name to be the same as the key, it'll start an infinite self-calling chain once evoked:

```javascript
const obj = {
  key: null,
  get key() {
    return this.key
  }
}

obj.key 	//Call stack exceeded max limit
```





Setters:

```javascript
const person = {
  _age: 37,
  set age(newAge){
    if (typeof newAge === 'number'){
      this._age = newAge;
    } else {
      console.log('You must assign a number to age');
    }
  }
};

person.age = 40;
console.log(person._age); // Logs: 40
person.age = '40'; // Logs: You must assign a number to age
```

Setters have pretty much the same syntax. You can evoke the setter method without () as if you are setting a real property, which you are not.

**Setter must have exactly one parameter**. This is different from ES5 where setters can have no argument as well. The argument is taken as the value on the RHS of the =, as seen above.



Factories:

A factory function is a function that returns an object and can be reused to make multiple object instances. Factory functions can also have parameters allowing us to customize the object that gets returned (this is like a class! Though you can't inherit factory methods ofc)

```javascript
const monsterFactory = (name, age, energySource, catchPhrase) => {
  return { 
    name: name,
    age: age, 
    energySource: energySource,
    scare() {
      console.log(catchPhrase);
    } 
  }
};

const ghost = monsterFactory('Ghouly', 251, 'ectoplasm', 'BOO!');
ghost.scare(); // 'BOO!'
```

We can use property shorthand avoid saying `name: name, age: age` etc.

```javascript
const monsterFactory = (name, age, energySource, catchPhrase) => {
  return { 
    name,
    age, 
    energySource,
    scare() {
      console.log(catchPhrase);
    } 
  }
};
```

Notice property shorthand is not compatible for Internet Explorer, but so is most other things.



Destructured Assignment is another shorthand for getting values from the object and assigning it to your own variable.

The code:

```javascript
const age = person.age
```

is the same as the following code:

```javascript
const { age } = person
```





All Objects created inherit Object. methods from Object.prototype. Useful methods include Object.assign(target, *source)

See the MDN reference for more info.











## Classes

Classes were added in ES6 due to the popularity of OOP. In fact, Class is entirely a syntactical sugar to the existing prototype object programming.



Classes have constructor functions, which are executed every time an object is instantiated from the class

```javascript
class Dog {
  constructor(name) {
    this._name = name;
    this._behavior = 0;
  }

  get name() {
    return this._name;
  }

  get behavior() {
    return this._behavior;
  }

  incrementBehavior() {
    this._behavior++;
  }
}
```

Here `this` refers the object being instantiated. Also notice class names start with Capital letter by convention. In Classes, `,` is not needed to separate functions

To instantiate an object, we use the `new` keyword which calls the constructor function of the class.

```javascript
const myDog = new Dog("Koira")
```





### Inheritance

```javascript
class Animal {
  constructor(name) {
    this._name = name;
    this._behavior = 0;
  }

  get name() {
    return this._name;
  }

  get behavior() {
    return this._behavior;
  }

  incrementBehavior() {
    this._behavior++;
  }
} 


class Cat extends Animal {
  constructor(name, usesLitter) {
    super(name);
    this._usesLitter = usesLitter;
  }
}

const bryceCat = new Cat('Bryce', false);
```

Inheritance in JS works like other languages. The subclass inherits all the properties and methods of its superclass.

Notice that in the constructor of the subclass, we evoke the constructor of the superclass using `super()` keyword.

It's almost always the case where you first evoke `super()` and then change its field using `this.` Otherwise, JS will throw a reference error.





### Static methods

Static methods are methods that you can call directly from the class, not the objects instantiated from that class. Use the `static` keyword before method.

```javascript
class Animal {
  constructor(name) {
    this._name = name;
    this._behavior = 0;
  }

  static generateName() {
    const names = ['Angel', 'Spike', 'Buffy', 'Willow', 'Tara'];
    const randomNumber = Math.floor(Math.random()*5);
    return names[randomNumber];
  }
} 
```

You can use it like this:

```javascript
console.log(Animal.generateName()); // returns a name
```

Remember Date.now() and Math.floor()? They are static methods.







## Promise

Created to get result from asynchronous operations, so code can run in a non-blocking manner

```javascript
const executorFn = (resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve('Result');
        } else {
            reject(Error('Error!'));
        }
    }, 1000);
}

const promise = new Promise(executorFn);

const handleSuccess = (msg) => console.log(msg);
const handleFailure = _ => console.log("Failed");
promise.then(handleSuccess, handleFailure);

// You can also do
promise.then(handleSuccess).catch(handleFailure);
```

- The promise will run the executor function passed in
- `resolve` and `reject` are functions within JS (we don't write these) that will change the state of the promise when called, taking specific arguments
- `resolve` takes in the resolved value, changing the Promise state from `pending` to `fulfilled`
- `reject` takes an object stating the reason for rejection, changing the Promise state from `pending` to `rejected`



Note, to avoid the chaining of hell (when you have handlers for handlers), ES6 have made it so that `.then` will produce a new promise, so `.then` can be chained. This is an adaption of the continuation monad.

`.then` takes 2 arguments, the success handler followed by the reject handler. The reject handler is optional.

`.catch` just takes the reject handler. You can think of it as `.then` without success handlers.

??: If a handler returns a value, the promise is settled to resolved state. If a handler returns an error, the promise is settled to reject state.



Promise allows writing asynchronous code. After a promise is called, control continues to the rest of the code. Control is transferred back to the Promise when it resolves and the handler is run.

```javascript
const promise = new Promise((resolve) => resolve(777))
promise.then((val) => console.log("asynchronous logging has val:", val))
console.log("immediate logging")

// produces output in this order:
// immediate logging
// asynchronous logging has val: 777
```



During runtime, promises are run upon creation.





### Async functions



Async functions always return a promise. 

If the function returns another value that is not a promise (including `undefined`), it'll be implicitly converted to do so

```javascript
async function foo() {
	return 1
}

// is equivalent to
async function foo() {
	return Promise.resolve(1)
}
```

There can be zero or more `await` calls inside an `async` function. Await acts like a breakpoint for a `.then` clause. It takes in a promise and blocks the control of the function until the promise returns, and returns the resolved result (if it's resolved). If it's not resolved, an error is raised. This allows `try` and `catch` to be used with promises.

Using `await`, we can build the promise chain progressively.



```javascript
async function foo() {
    a = 1
    b = 2
    const result1 = await new Promise((resolve) => {
        setTimeout(() => resolve(a), 1000)
    })
    const result2 = await new Promise((resolve) => {
        setTimeout(() => resolve(b), 1000)
    })
    return result1 + result2
}
foo().then((val) => console.log(val))	// Returns 3 after 2 seconds
```

This function is equivalent to

?? -> how to write this as 

```javascript
function foo() {
	a = 1
    b = 2
    let result1
    let result2
    p = Promise.resolve(true)
    .then(() => {
        setTimeout(() => {
			result1 = a
        }, 1000)
    })
    .then((resolve) => {
        setTimeout(() => {
            result2 = b
        }, 1000)
    })
    .then(() => result1 + result2)
    
    return p
}
foo().then((res) => console.log(res))
```

The issue with this code is that `setTimeout` is non-blocking. Normally we'll have something like this where the return will block on an operation

```javascript
function getUsr(user) {
    return fetch(url).then(profileResponse => {
        return profileResponse.json().then(profileData => {
            return fetch(urlRepo).then(repoResponse) => {
                return repoResponse.json().then(repoData => {
                    return {
                        profile: profileData,
                        repos: repoData
                    }
                })
            }
        })
    })
}
```



Some more examples of concurrency using `async/await` syntax

```javascript
function resolveAfter2Seconds() {
    console.log("starting slow promise")
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("slow")
            console.log("slow promise is done")
        }, 2000)
    })
}

function resolveAfter1Second() {
    console.log("starting fast promise")
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("fast")
            console.log("fast promise is done")
        }, 1000)
    })
}

async function sequentialStart() {
    const slow = resolveAfter2Seconds()
    console.log(await slow)
    
    const fast = resolveAfter1Second()
    console.log(await fast)
}

/*
starting slow promise
slow promise is done
slow
starting fast promise
fast promise is done
fast

Sequential execution, the first promise is triggered, resolved, then logged. Then same with second promise

Total execution time: 3s
*/

async function sequentialWait() {
    const slow = resolveAfter2Seconds()
    const fast = resolveAfter1Second()
    
    console.log(await slow)
    console.log(await fast)    
}

/*
starting slow promise
starting fast promise
fast promise is done
slow promise is done
slow
fast

Both promises are started together. The fast one is resolved before the slow one. But as we are blocked on logging the slow resolved value first, we get `slow` then `fast` in the end.

Total execution time: 2s
*/

async function concurrent1() {
    const results = await Promise.all([
        resolveAfter2Seconds(),
        resolveAfter1Second()
    ])
    
    console.log(results[0])
   	console.log(results[1])
}

/*
starting slow promise
starting fast promise
fast promise is done
slow promise is done
slow
fast

Both promises are started together. Results returns when both promises finish and logged in order given

Total execution time: 2s
*/
```









## Parking

- Async functions





