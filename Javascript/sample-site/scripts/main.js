/*
const myHeading = document.querySelector("h1")
myHeading.textContent = "Hello World!"
*/
//document.querySelector("html").onclick = () => alert("Ouch! Stop clicking me!")

let myImage = document.querySelector("img")

myImage.onclick = function() {
    let mySrc = myImage.getAttribute("src")
    if (mySrc === "images/fox1.jpg") {
        myImage.setAttribute("src","images/fox2.png")
    } else {
        myImage.setAttribute("src","images/fox1.jpg")
    }
}

let myButton = document.querySelector("button")
let myHeading = document.querySelector("h1")

function setUserName() {
    let myName;
    do {
        myName = prompt("Please enter your name: ")
    } while (!myName)

    localStorage.setItem("name", myName)
    myHeading.textContent = "Mozilla is cool, " + myName
}


if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla is cool, ' + storedName;
}

myButton.onclick = () => setUserName()



const myText = document.querySelector("h2")

/*
const promise = new Promise((resolve, reject) => {
    setTimeout( () => {
        const out = 1
        resolve(out)
    }, 2000)
})
*/

const promise = new Promise((resolve, reject) => resolve(1))

promise
.then(x => 1*x)
.then(x => 2*x)
.then(x => 3*x)
.then(x => myText.textContent = x)

/*
(result 1 $> (\y -> result (1*y)) $> (\y -> result (2*y)) $> (\y -> result (3*y))) id


/*


callback of hell
promise, callbacks out of the arguments, put failure callbacks together
guarantee: 
- Callbacks added with then() will never be invoked before the completion of the current run of the JavaScript event loop.
- Multiple callbacks may be added by calling then() several times. They will be invoked one after another, in the order in which they were inserted.

=> promise = continue from... (M a)
=> already looks a lot like a chain of continuations

each .then create new promise object
=> really like CPS monad bind


Promise is a lot like a monad, tho not exactly because other features (don't follow monadic laws)
But it can be useful to think about it this way

async-await -> syntactic sugar -> good understanding of promises and continuation will help understand this
*/


/*
doSomething(function(result) {
    doSomethingElse(result, function(newResult) {
      doThirdThing(newResult, function(finalResult) {
        console.log('Got the final result: ' + finalResult);
      }, failureCallback);
    }, failureCallback);
  }, failureCallback);
*/

/*
if sucess then 
  if success then
    if success then 
        stuff
    else fail
  else fail
else fail
*/


