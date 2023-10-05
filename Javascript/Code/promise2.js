/* This example shows the beauty of using .reduce to fire all promises at once */

function fetcher(url) {
	return new Promise(resolve => setTimeout(() => resolve({text: url}), 500))
} 

function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetcher(url).then(response => response.text);
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}

logInOrder([1,2,3,4,5])