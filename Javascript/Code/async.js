function delayedHi(ms) {
	return new Promise(resolve => {
		setTimeout(() => {console.log("hi"), resolve("hi")}, ms)
	})
}

async function main() {
	const hiPromise = delayedHi(1000)
	console.log(await hiPromise + " friend")
}

main()