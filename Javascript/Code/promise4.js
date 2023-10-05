/* This example shows how to write self-recursive Promises */

function fetcher(url) {
	return new Promise(resolve => setTimeout(() => resolve(url), 50))
} 

function isLastPage(x) {return x >= 10}

function nextPage(x) {return x+1}

function getItems(url) {
	return fetcher(url).then(response => {
		let items = []

		return Promise.resolve(response).then(function processResult(res) {
			if (isLastPage(res)) return items

			items.push(res)
			console.log("Chuch received: " + res)
			return fetcher(nextPage(res)).then(processResult)
		})
	})
}

getItems(0)