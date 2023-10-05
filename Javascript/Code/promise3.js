/* This example shows the danger of forgetting to return a promise */

function delayedHi(ms,msg) {
	return new Promise(resolve => setTimeout(() => {console.log(msg);resolve(msg)}, ms))
} 

Promise.resolve()
//.then(() => delayedHi(1000,"first"))
.then(function() {delayedHi(1000,"first")})
.then(() => delayedHi(500,"second"))