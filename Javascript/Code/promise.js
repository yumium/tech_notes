/* This example shows that promises are executed as they are declared, and can be declared across the script */

console.log("start")

const myPromise = new Promise((resolve,reject) => {
	setTimeout(() => {
		resolve("foo")
	}, 300)
})

console.log("end")

myPromise.then(res => console.log(res))