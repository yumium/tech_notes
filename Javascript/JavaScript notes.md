# JavaScript notes

Here I'll record some particularly interesting/weird things about JavaScript, as well as some interesting code



### 14.7: Flattening an array

```javascript
const a = [1,2,[3,[4,[5,6],7],[8]],[9,10,11]]

//Pre: An array, empty or non-empty
//Post: Non-destructively returns the flattened array
function flat(a) {
  let out = []

  a.forEach(val => {
    if (Array.isArray(val)) {
      const fval = flat(val)
      fval.forEach(elem => out.push(elem))
    } else {
      out.push(val)
    }
  })

  return out
}

const newa = flat(a)

console.log(newa)
```

returns:

```javascript
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
```

Brilliant!

Apparently you can also do this with .reduce(), but I couldn't really figure out how. I think the issue is more to do with reduce() than with the logic.





### 18.7 Refactoring `else if` code using `switch`

The following code:

```javascript
if (cond1) {
    ...
} else if (cond2) {
	...
} else if (cond3) {
	...
} else {
    ...
}
```

can be refactored as :

```javascript
switch (true) {
    case (cond1):
        ...
        break;
    case (cond2):
        ...
        break;
    case (cond3):
        ...
        break;
    default:
        ...
        break;
}
```

Notice that we can only match using the switch statement. But if we match on `true`, the cases essentially becomes `if` and `else if` statements!





### 18.7 Static methods

Static methods are good utility methods, that can usually be used to generate objects. For example, in the "find the hat" example:

```javascript
const myField = new Field(Field.generateField(10,10,0.5))
```

However, static methods cannot use `this` keyword to use keys in the class, as the class isn't an object. However, it can call other static methods inside the class using `this.staticMethodName()`.



