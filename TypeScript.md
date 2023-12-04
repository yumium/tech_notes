# TypeScript

TypeScript offers all of JavaScripts features but with an additional layer of type checking to reduce the chance of bugs.

JavaScript files compile with TypeScript, because all basic types are implicitly typed.



Typing implicitly

```javascript
const user = {
    name = "Hayes",
    id: 0,
};
```

Typing explicitly

```typescript
interface User {
    name: string,
    id: number,
};

const user: User = {
    name: "Hayes",
    id: 0,
};
```



Typing classes

```typescript
interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Murphy", 1);
```



There is already a small set of primitive types available in JavaScript: `boolean`, `bigint`, `null`, `number`, `string`, `symbol`, and `undefined`, which you can use in an interface.

TypeScript extends this list with a few more, such as `any` (allow anything), [`unknown`](https://www.typescriptlang.org/play#example/unknown-and-never) (ensure someone using this type declares what the type is), [`never`](https://www.typescriptlang.org/play#example/unknown-and-never) (it’s not possible that this type could happen), and `void` (a function which returns `undefined` or has no return value).



You can also compose simple types to create complex types:

```typescript
type MyBool = true | false
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```



You can use and define generic types

```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
 
// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;
 
// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();
 
// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add(23);
```



TypeScript uses structural typing to infer types for complex types. In essence, if an object's type has the same shape as a custom type, it is given that type.

```typescript
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

// Note, structural typing requires only a subset of the object's fields to match
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

// This won't match though
const color = { hex: "#187ABF" };
logPoint(color);
```







### The Basics

Types give information that restrict the space of possible interactions with the underlying subjects. Code that violates this restriction will be caught before running.

Example:

```javascript
message.toLowerCase();
message();
```

These are natural questions when reading this code:

- Is `message` callable?
- Does it have a property called `toLowerCase` on it?
- If it does, is `toLowerCase` even callable?
- If both of these values are callable, what do they return?

Types will be able to answer all of these questions



```
npm install -g typescript

tsc hello.ts
```

`tsc` is the TypeScript compiler, which will then compile `hello.ts` and spits out the compiled, clean JavaScript file `hello.js`.

During compilation, all type errors are reported. Note, the js file will still be compiled even if there are errors reported, because having some type errors doesn't mean the code won't work. Say, if you are transporting working JS code to TS, there will be errors but you could still run the JS code. Do the following if you don't want to emit the JS file if there are errors:

```
tsc --noEmitOnError hello.ts
```

Note, by default `tsc` compiles to a very old version of JavaScript (ES3) which doesn't have modern features.  To compile to a more modern version, use:

```
tsc --target es2015 hello.ts
```



Explicit typing:

```typescript
function gree(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDate()}!`);
}

greet("Maddison", new Date());
```



TypeScript offers 2 modes of checking:

- Non-strict mode: types are optional, inference takes care of lenient types, no checking for potential null/undefined values
- Strict mode: can add a mixture of additional checks like `noImplicitAny` (doesn't allow TypeScript to infer to default `any` type), and `strictNullChecks` (makes sure you always narrow `null` or `undefined` values in your checks before you can call methods on these variables, as `null` and `undefined` can take any type, making them easy to write but can potentially introduce more bugs)
  - Turn on with `"strict": true` in `tsconfig.json`





### Everyday Types

- `string`
- `number`
- `boolean`
- `string[]`
- `any`: don't want an object to cause type checking errors



Explicit type declaration for functions

```typescript
function addTwo(a: number, b: number): number {
    return a + b;
}
```



Anonymous function have types inferred based on the context which they are called

```typescript
const names = ["Alice", "Bob", "Eve"];

names.forEach(function (s) {
    console.log(s.toUpperCase());
})
```

Here the function type is inferred from the context `forEach` (e.g., what type the variable `s` takes)



Explicitly typing an object as input to function

```typescript
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```



Optional properties

```typescript
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

Remember to do `undefined` check in the function body if the parameter can be undefined.



Union types

Declaring them is easy:

```typescript
function printId(id: number | string) {
	// function body
}
```

When using a variable of a union type, all methods that belong to all types in the union will type check

```typescript
function printId(id: number | string) {
    console.log("Your ID is: " + id);
}
```

Otherwise, you will have to *narrow* you type using `if` statements before applying methods that are valid only on some of the types in the union

```typescript
function printId(id: number | string) {
    if (typeof id === "string") {
        console.log(id.toUpperCase())
    } else {
        console.log(id);
    }
}

// Another example
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```



Type Aliases

Type aliases creates new names for underlying types. These are useful as shorthands so you don't need to spell out the underlying types entirely

Using `type` literal

```typescript
type Point = {
    x: number,
    y: number
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

Using `interface` literal

```typescript
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```



Interface adds a few more subtle features over types

- Extending an interface

```typescript
interface Animal {
    name: string;
}

interface Bear extends Animal {
    honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

- Adding new fields to an existing interface

```typescript
interface Window {
    title: string;
}

interface Window {
    ts: TypeScriptAPI;
}
```



Type assertions

Sometimes you can assert types to give more information that the type system doesn't know about. E.g.:

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

Note, type assertions only allow asserting to a more specific or more general type from the inferred type.

```typescript
// Not allowed, neither type overlaps the other
const x = "hello" as number; 
```



Literal types

You can create types from literals (strings, numbers)

They are automatically declared when using `const`

```typescript
const x = "hello"  // `x` will have literal type "hello"
```

Literal types are not very useful on their own as it will only accept one value, the literal itself.

But they are very powerful when combined together

```typescript
function printText(s: string, alignment: "left" | "right") {
	// ...
}

function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}
```



Literal inference

There may be issues with literal inference, example:

```typescript
declare function handleRequest(url: string, method: "GET" | "POST"): void;
 
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
```









### Narrowing

Most of narrowing on simple objects are done in a straight-forward fashion, using if/else statements with `typeof` etc.

Sometimes you may want to create function like `typeof` for your own functions, we can do this in TypeScript by declaring a type predicate. Example:

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
```

Then you can use this in an `if` statement like how you would with `typeof`:

```typescript
let pet = getSmallPet();

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}
```



Discriminated unions

Sometimes the simple type checking doesn't work well on complex JS objects. For example, consider the object below:

```typescript
interface Shape {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
}
```

Let's say we create a DTI that if the `kind` is "circle", then `radius` is non null, and vice versa for "square". Now, consider the following function:

```typescript
function getArea(shape: Shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2
    }
}
```

Here the compiler will give an error for possible null as it doesn't know the DTI. We can of course fix this error using a non-null assertion:

```typescript
function getArea(shape: Shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius! ** 2
    }
}
```

But this is error prone if we move code around.



We can actually tell the compiler about this DTI by splitting the object this way:

```typescript
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square
```

Now, we can do type narrowing with the following:

```typescript
function getArea(shape: Shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
}
```

This will pass type check! This is because the types `Circle` and `Square` share field that is non-overlapping. In TS, we call this discriminated unions. And checking this field can narrow the type in the type checker.







### More on Functions

<u>Function type expressions</u> => used when the argument is a function

```typescript
function greet(fn: (a: string) => void) {
    fn("Hi there");
}
```



<u>Call signatures</u> => but sometimes you want to add properties to these function types as well. To do this, we add a call signature as part of the type:

```typescript
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
}

function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}
```



<u>Construct Signatures</u> => type for things you can instantiate

```typescript
type SomeConstructor => {
	new (s: string): SomeObject;
}

function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}
```



<u>Generic types</u> => When a function can take many types and we want to capture the relationship between the input and output type, we can use type variables

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func)
}
```

Sometimes you want to add constraints to the types the type variables can take:

```typescript
// We constraint that the input type must have numeric field `length`
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}
```

Just remember the return type must be the same kind of object (???)

We can use union in type parameter if the type of different arguments can be different

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
	return arr1.concat(arr2)
}

const arr = combine<string | number>([1,2,3], ["hello", "world"]);
```



General guidelines to write good generic functions

- Push type parameters down

```typescript
function firstElement<Type>(arr: Type[]) {
    return arr[0];
}
```

not

```typescript
// This is worse than the one above, as we won't know the type of `arr[0]` until it is resolved 
function firstElement<Type extends any[]>(arr: Type) {
    return arr[0];
}
```

- Use fewer type variables, if one variable depends on another, just define them in the arguments not as a separate type variable
- Type variables should appear twice, if a variable does not relate different types then we should omit it

```typescript
// The use of type parameter here is pointless
function greet<Str extends string>(s: Str) {
    console.log("Hello, " + s)
}
```



### Object Types

We can declare object types in 3 ways:

```typescript
function gree(person: {name: string; age: numbeer}) {
    return "Hello" + person.name;
}

interface Person {
    name: string;
    age: number;
}

type Person = {
	name: string;
	age: number;
}

function greet(person: Person) {
    return "Hello " + person.name;
}
```



Optional properties

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
```

Objects that take this type can optionally have fields `xPos` and `yPos`

We can write some code for setting defaults for null checks

```typescript
function paintShape({shape, xPos = 0, yPos = 0}): PaintOptions) {
    console.log("x coordinate at", xPos);
    console.log("y coordinate at", yPos);
}
```



Readonly fields

```typescript
interface Home {
    readonly resident: { name: string; age: number };
}
```

`readonly` prevents straight reassignment, you can of course still mutate the properties inside the object, say



Index signatures

```typescript
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];  // string
```

If you put `readonly` in front of the index item, you prevent reassignment to index



Intersection types

This is a way to combine types without using `extend`

```typescript
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

The key difference between `extend` and intersection types is in the way it handles property conflicts. Not too sure on the details, though.



Generic object types:

```typescript
interface Box<Type> {
    contents: Type
}
```

This offers checking that contents are indeed the correct type whilst not knowing the `Type` would be during type definition.





### More on creating types

You can create a function that takes in optional type arguments for brevity

```typescript
declare function create<T extends HTMLElement = HTMLDivElement, U = T[]>(
  element?: T,
  children?: U
): Container<T, U>;
```



Use `keyof` to type check for index

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");
```

`keyof` always return `string` or `string | number`, as number indices are always coerced into strings



Use `typeof` to get type of variables

```typescript
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
```

`typeof` can only be followed by variable names, not expressions



You can get the value fields of index elements this way:

```typescript
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // type Age = number

type I1 = Person["age" | "name"]; // type I1 = string | number
 
type I2 = Person[keyof Person]; // type I2 = string | number | boolean
 
type AliveOrName = "alive" | "name"; // type I3 = Person[AliveOrName];
```



Sometimes we can loop over fields of a type to avoid code replication:

```typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<Features>;
/*
type FeatureOptions = {
	darkMode: boolean;
	newUserProfile: boolean;
}
*/
```



Mapping modifiers, use -/+ for removing or adding `readonly` and `optional` property of fields. if we don't put a `+` it defaults to add.

```typescript
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]?: Type[Property];
};
 
type LockedAccount = {
  id: string;
  readonly name?: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
/*
type UnlockAccount = {
	id?: string;
	name?: string;
}
*/
```



Template Literal Types

These are useful when new types are string interpolation of existing types

```typescript
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
/*
type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
*/

type Lang = "en" | "ja" | "pt";

// Joining multiple types lead to a cross product
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
/*
type LocaleMessageIDs = 
	"en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | 
	"ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id"
	"pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
*/
```

This can be useful when certain arguments need to take a certain shape of input type:

```typescript
const person = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};

// It may be useful to write a function that hooks a callback whenever an event is observed, like this
person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

// It may be useful for the event name to take the form of `{property}Changed`, as a simple sanity check. We can use type interpolation for this

// First let's define a type with the `on` field with this behaviour
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

// We then define a constructor that decorates the object with this typed `on` method
declare function makeWatchObject<Type>(obj: Type) : Type & PropEventSource<Type>;

// We can then declare the object again with this type
const person = makeWatchObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
```











### Classes & Modules

You can import types using

```typescript
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
export type Dog = { breeds: string[]; yearOfBirth: number };

// @filename: file1.ts
import type { Cat, Dog } from "./animal.ts"

// @filename: file2.ts
// You can also import inline
import { type Cat } from "./animal.ts"
```

















































