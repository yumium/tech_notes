# React

**Resources**:

Main concepts: https://reactjs.org/docs/hello-world.html

Overview of React: https://www.taniarascia.com/getting-started-with-react/



**Other useful resources**:

Intro to DOM: https://www.taniarascia.com/introduction-to-the-dom/

REST APIs: https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697

React and its relation to Functional Programming: https://medium.com/@andrea.chiarelli/the-functional-side-of-react-229bdb26d9a6

ESLint: for static code analysis https://en.wikipedia.org/wiki/ESLint

Babel: JavaScript transpiler https://en.wikipedia.org/wiki/Babel_(transcompiler)



React CORE:

- Breaking UI into a component hierarchy
- Rendering is a pure function that maps states to UI
- Rerendering is automatic upon change of state, either from user action or JS logic written in lifecycle methods





### 1. Hello World

```react
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```





### 2. Introducing JSX

JSX = JavaScript + XML



Simple JSX expression:

```react
const element = <h1>Hello, world!</h1>;
```



Complex JSX expression (with many children)

```react
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```



Empty JSX expression

```react
const element = <img src={user.avatarUrl} />;
```



JSX with imbedded JS expressions

```react
const element = <img src={user.avatarUrl}></img>;
```



- JSX is more JavaScript than HTML -> all attributes in camelCase (eg. onClick)
- You can put any valid JS expression inside `{}` in JSX
- JSX are expressions too, they evaluate to JS objects. So they can be returned in functions
- Wrap large JSX expressions in `()`



Under the hood, source code that likes this:

```react
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

is compiled down to code like this by Babel:

```react
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

where `React.createElement()` creates an object like this

```react
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```





### 3. Rendering Elements

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object). Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

When you change the UI by creating a new element and rerender, React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.



We render by using the `ReactDOM`, providing with 2 arguments, one for the element to render and the other the root element

```react
// In HTML
<div id="root"></div>

// In JS
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```





### 4. Components and Props

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.





**Function Components**

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```



**Class Components**

```react
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

The above 2 components are equivalent from React's POV



**Rendering components**

To render we simply "instantiate" the component and put it inside the `ReactDOM.render` function

```react
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```



Under the hood, what happens is:

1. We call `ReactDOM.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.



**Composing Components**

We can of course compose components like this, as after all, components are just functions that return a piece of UI

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

(De)composition is good for:

- Code reuse - decompose reusable smaller pieces
- Reducing complexity of code



**Props are immutable**

All React components must act like pure functions with respect to their props. UI can be changed by changing state, but components must be pure functions



<u>ASIDE</u>:

> In [computer programming](https://en.wikipedia.org/wiki/Computer_programming), a **pure function** is a [function](https://en.wikipedia.org/wiki/Subroutine) that has the following properties:[[1\]](https://en.wikipedia.org/wiki/Pure_function#cite_note-1)[[2\]](https://en.wikipedia.org/wiki/Pure_function#cite_note-2)
>
> 1. The function [return values](https://en.wikipedia.org/wiki/Return_statement) are [identical](https://en.wikipedia.org/wiki/Relational_operator#Location_equality_vs._content_equality) for identical [arguments](https://en.wikipedia.org/wiki/Argument_of_a_function) (no variation with local [static variables](https://en.wikipedia.org/wiki/Static_variable), [non-local variables](https://en.wikipedia.org/wiki/Non-local_variable), mutable [reference arguments](https://en.wikipedia.org/wiki/Value_type_and_reference_type) or [input streams](https://en.wikipedia.org/wiki/Input/output)).
> 2. The function [application](https://en.wikipedia.org/wiki/Function_application) has no [side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) (no mutation of local static variables, non-local variables, mutable reference arguments or input/output streams).

React components actually fulfil both requirements





### 5. State and Lifecycle

To change the UI we need to implement states. States are only available in classes (see `Hooks` for an equivalent feature for functions), fortunately changing a function to a class isn't hard, just wrap the function inside the `render` function in the class.



```react
class Clock extends React.Component {
  constructor(props) {
    super(props); // Always call this
    this.state = {date: new Date()}; // Set the initial state, `state` is a keyword in React.Component
  }

  // Lifecycle method
  // `Mount` means the initial insertion of the element into the DOM
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID); // Stops the background timer
  }

  // Use the setState function to update state, just mutating the state will not cause rerendering. Inside the function, input the entire new state
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

1. When `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
2. React then calls the `Clock` component’s `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock`’s render output.
3. When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` lifecycle method. Inside it, the `Clock` component asks the browser to set up a timer to call the component’s `tick()` method once a second.
4. Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.
5. If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stopped.



**Using state correctly (design principles)**

1. Use `setState` instead of mutating states directly
2. State updates may be asynchronous

This is for performance considerations. `this.props` and `this.state` may be updated asynchronously, so code like this can lead to race conditions

```react
// Unsafe
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Instead, use a overloaded variant of `setState` that accepts a function

```react
// Safe
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

3. State updates are merged

The object argument in `setState` is merged with the current state object. Eg.

```react
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Both `posts` and `comments` can be updated independently

```react
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```



**The data flows down**

From a component's point of view, all it can see are the props.

A component's state is local to itself. It can choose to share its state as props to children component, but the children cannot modify the state.

This is commonly called a “top-down” or “unidirectional” data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components “below” them in the tree.

>  If you imagine a component tree as a waterfall of props, each component’s state is like an additional water source that joins it at an arbitrary point but also flows down.





### 6. Handling Events

Event handling in React is similar in HTML with 2 difference:

- React events are named using camelCase, rather than lowercase.
- With JSX you pass a function as the event handler, rather than a string.



So the HTML:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

is written in React like this:

```react
<button onClick={activateLasers}>
  Activate Lasers
</button>
```



An annoying thing with event handler functions is that we have to explicitly bind the object

```react
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

The `bind` method takes the `this` object and returns another function that, when called, has `this` binded to it.

```
bind :: Func -> Obj -> Func
```



There are 2 ways to get around this:



1. Use public class fields syntax

```react
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```



2. Use an arrow function (eta-expansion)

```react
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```



**Passing arguments to event handlers**

Event handlers might take extra arguments. The below 2 are equivalent

```react
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

This looks exactly like eta-reduction, so better understanding could be gained from JavaScript itself.



Note, in the `react-tutorial` example, handlers are binded using public class fields syntax with eta-reducted form





### 7. Conditional Rendering

In React, you can create distinct components that encapsulate behaviour you need. Then, you can render only some of them, depending on the state of your application.

Conditional rendering is simple. JSX objects are just ordinary JS expressions so can be returned using regular JS conditionals. React will be clever and if the change of state can affect the conditional outcome, it'll rerender.



Example:

```react
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {isLoggedIn
        	? <LogoutButton onClick={this.handleLogoutClick} />
			: <LoginButton onClick={this.handleLoginClick} />}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```



We can also use `&&` to shorten conditional rendering. Consider the code below:

```react
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```

The `<h2>` element will only be rendered if the condition is true. This works because in JS, `true && expr` evaluates ot `expr`. `false && expr` evaluates to `false` and is ignored by React.

However, make sure the condition evaluates to a `boolean`. As if the value is falsy, react will render the falsy value!

```react
render () {
    const count = 0
    return (
        <div>
            { count && <h1>Message: {count}</h1> }
        </div>
    )
}
```

The code above will display `0`.



**Preventing rendering of a component**

If a component is called but you don't want to render it, you can render it  to `null`.

```react
function WarningBanner(props) {
    if (!props.warn) {
        return null
    } else {
        return <div> Warning! </div>
    }
}

class Page extends React.Component {
    // ...
    
    render () {
        return (
          <div>
            <WarningBanner warn={this.state.showWarning} />
            <button onClick={this.handleToggleClick}>
              {this.state.showWarning ? 'Hide' : 'Show'}
            </button>
          </div>
        )
    }
}
```

Though I think it's just clearer to write:

```react
render () {
    return (
    	<div>
            {this.state.showWarning && <WarningBanner />}
            <button onClick={this.handleToggleClick}>
              {this.state.showWarning ? 'Hide' : 'Show'}
            </button>
        </div>
    )
}
```





### 8. Lists and Keys

To create a list of JSX objects or components, the higher-order function `map` is the easiest way to do this:

```react
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Of course, we can put the list directly inside a JSX tag. But this might decrease readability

```react
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
        numbers.map((number) =>
        	<li>{number}</li>
        )                            
	</ul>
  );
}
```



There is one catch, each element in the list needs to have a `key` attribute. This is for React to know what to rerender.

```react
function NumberList(props) {
    // ...
    const listItems = number.map(number => 
    	<li key={number.toString()}>
			{number}
		</li>
	)
	// ...
}
```

Things to make sure:

1. **Keys must be unique amongst siblings**

   Use `toString`, `.id` if id is provided, or `index` ONLY IF LIST DOESN'T CHANGE
   And if you want to pass the `key` as a prop, create a different attribute with the same name to pass that. `key` is used specifically as hints to React

   Keys can be the same in different lists, as long as they are unique in the same list

2. **Key must be given at the top array level, not on individual elements**

Wrong:

```react
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```



Correct:

```react
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```



### 9. Forms

https://reactjs.org/docs/forms.html#controlled-components

HTML Form elements (`<input>`, `<textarea>`, `<select>`) have their own internal state.

There are 2 ways to integrate this with React

1. Make it controlled -> have React track the state as a "single point of truth" (specify 1. value and 2. onChange)
2. Make it uncontrolled -> leave the state to the element entirely (https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)



Controlled elements are hard, because you need to understand the HTML element. 

=> might have to go in a case-by-case basis for each element





eg. <select> tag

```react
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```









### 10. Lifting State Up

In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called “lifting state up”.

Then, in order for lower components to change the common state, we can make the component "controlled" by introducing a pair of props: `value` and `onChange`. One flows the information downwards and another updates the information upwards.

Lifting states up is useful for components that share state. Having a common state might increase the amount of boilerplate code, but can greatly reduce the presence of bugs





```react
export default function Calculator() {
    // Internal temperature is set to Celsius, stored as string
    const [ tempInC, setTempInC ] = useState("0")
    
    function handleCelsiusChange(newTemp) {
        setTempInC(tryConvert(newTemp, x => x))
    }
    
    function handleFahrenheitChange(newTemp) {
        setTempInC(tryConvert(newTemp, FtoC))
    }
    
    return (
   		<div>
        	<TemperatureInput
                scale={"C"}
                temperature={parseFloat(tempInC)}
                onTemperatureChange={handleCelsiusChange} />
        	<TemperatureInput
                scale={"F"}
                temperature={CtoF(parseFloat(tempInC)).toString()}
                onTemperatureChange={handleFahrenheitChange} />
            <BoilingVerdict
                celsius={parseFloat(tempInC)} />
        </div>
    )
}

function TemperatureInput(props) {
    const { scale, temperature, onTemperatureChange } = props
    
		function handleChange(e) {
			onTemperatureChange(e.target.value)
		}

    return (
    	<fieldset>
        	<legend>Enter temperature in {scale}</legend>
					<input
                value={temperature}
                onChange={handleChange} />
        </fieldset>
    )
}

function BoilingVerdict(props) {
    const { celsius } = props
    
    if (celsius >= 100) {
        return <p>The water would boil</p>
    } else {
        return <p>The water would not boil</p>
    }
}

function FtoC(temp) {
    return (temp - 32) / 1.8
}

function CtoF(temp) {
    return temp * 1.8 + 32
}

// 
function tryConvert(temperature, convertFunc) {
	const input = parseFloat(temperature)
	if (Number.isNaN(input)) {
		return '0'
	}

	const output = Math.round(convertFunc(input) * 1000) / 1000
	return output.toString()
}
```









### 11. (Composition vs. Inheritance)



### 12. (Thinking in React)







### 13. Hooks

Added in 2018.

Hooks gives states to functional components.

Hooks are called Hooks because it lets you "hook into" React features.

Hooks doesn't give anything new regarding core React concepts, but simply allow you to use them more easily

Hooks solves a collection of seemingly unrelated problems in React:

- Provides a way to extract stateful logic while keeping component hierarchy the same
  - Currently stateful logic is tightly coupled with the UI itself
- Provide a way to better decompose classes
  - Classes tend to grow in complexity
  - Currently state logic is grouped based on lifecycle times (componentDidMount/Unmount etc.) This makes state logic spread out in the code and group seemingly unrelated parts together
  - Hooks help you extract those
- Classes are clumpsy
  - The `this` binding is annoy, which is just unfortunate as it's unrelated to React at all
  - In comparison, there is no `this` in functional components
  - Hooks with functions essentially allow you never use classes again





#### State Hook

The state hook essentially allows you to use `state` in functional components.

- Take 1 argument, which is the initial state. Doesn't need to be an object -> in turn, setting the state doesn't merge objects
- Returns an array of 2 things, the current state and a function to set the state
- We use JS "array destructuring" to capture the returned results. The variable that holds the current state persists (normally local variables are "lost" after the function returns)



```react
import React, { useState } from 'react'

function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0)
    
    return (
    	<div>
        	<p>You clicked {count} times</p>
            <button onClick={() => setCount(count+1)}>
            	Increment
            </button>    
        </div>
    )
}
```



You can also declare multiple states for a single functional component (if you prefer that over putting all together in an object)

```react
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```



**setState is async!!!**

The React community did this due to considerations for efficiency.

Think of a `setState` as  request for a change rather than a demand for it.

We need to use other construct to take care of race conditions. Example:

```react
// Use a functional setState to use the newest version of the current state, instead of a potential stale value
setPageNum(pageNum => pageNum + 1)
```

```react
// If we need to retrieve entries every time the range changes, put it as a dependency for useEffect
useEffect(() => {
    retrieveEntries(entryRange)
}, [entryRange])

// The below construct can lead to race conditions, it's very possible that `entryRange` isn't updated before `retrieveEntries` is called
const handleClick = (newRange) => {setEntryRange(newRange); retrieveEntries(entryRange)}
```





#### Effect Hook

useEffect allows you to perform side effects in your functional components, like you would normally in `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` etc.

Example:

```react
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- useEffect takes a continuation
- It executes that continuation after every (re)render (including first one)
- The function is actually created freshly upon every execution. This is useful to prevent stale variables
- useEffect runs the side-effect without blocking the rendering. If this causes race conditions, use `useLayoutEffect`





**Effects with cleanup**

useEffect can optionally return a continuation that represents the cleanup

```react
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

- This provides stronger coupling, as clean up is logically related to creation, and so shouldn't be physically separated like in `componentDidUpdate` and `componentWillUnmount`
- Clean-up continuation is run right before the effect continuation every time. This is a good practice that prevents bugs
- But useEffect can also skip running side-effect (and clean-up before it if provided) after rerender:

```react
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

We do this by providing an optional array of variables. After a rerender, React compares this variable value with the previous one. If there are no changes, the continuation(s) will not be run.

CAUTION: provide all values that can change! Otherwise the continuation will use stale values that are saved





**Multiple `useEffect`**

We can also use multiple `useEffect` to separate concerns.

Each will be run after every rerender in the order they appear in the code.









#### Rule of Hooks

**Only Call Hooks at the Top Level**

never inside loops, conditions, or nested functions



**Only Call Hooks from React Funtions (or Customer Hooks)**

never inside regular JS functions







#### Building your own Hook

Building your own Hooks lets you extract component logic into reusable functions.

A react hook is just a regular function. It can take 0 or more arguments, and return 0 or 1 value.

A few tips:

- Always start your own hook with `use...`
- Every call to a custom hook creates a new internal state, and state is not shared across  them
- You can pass information between hooks by, say, setting an argument to a hook as the thing returned from another hook









## Managing State



### Sharing State Between Components

To share/sync state between components, you lift the state to the lowest common ancestor, then pass it down to them via props.

To pass information from child to parent components, you pass down an event handler to the child that defines the logic. This way, we can keep the state information strictly in the parent.

Example => have two panels where only one is extended at once

```xml
<>
   <Panel
		isActive={activeIndex === 0}
		onShow = {() => setActiveIndex(0)}
   >
       ...
   </Panel>
   <Panel
		isActive={activeIndex === 1}
		onShow={() => setActiveIndex(1)}
   >
       ...
   </Panel>
</>
```







## React Router

The `react-router` library implements client-side routing for React.

The idea is that when routes change, instead of request an entire new page from the server, we can make local changes to the UI, perhaps additionally fetch some data. This makes the user experience a lot smoother.



It does this by creating primitives that allow the triple sync between the data model, the UI, and the URL.

It also contains new components that mimic other components (such as <form>) but instead of doing a GET/POST request to the server, it gives the request to the router instead.



Main features:

- Nested routing: couple with nested layouts
- Dynamic segments: segment of URL parsed and consumed by APIs
- Ranked route matching: ranking to pick the most specific match
- Relative links
- Data loading: data for multiple layouts of a specific URL are loaded in parallel
  - For example, when navigating to `https://exampe.com/real-salt-late/45face3`, the root component (example.com), the team component (real-salt-lake), and the game component (45face3) are loaded in parallel
- Redirects: redirect user to a different route when loading data
- and many more ...







### Main concepts

`src/main.jsx`

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, { 
    loader as rootLoader,
	action as rootAction
} from "./routes/root"
import ErrorPage from "./error-page"
import Contact, {
    loader as contactLoader
} from "./routes/contact"
import Index from "./routes/index"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />  // Displays this page if there's an error
    loader: rootLoader, // Loads data into element (here it's <Root />)
    action: rootAction, // Uses this handler on GET/POST request on this element
    children: [	// children pages will be displayed within the parent page
  	  { index: true, element: <Index /> },  // Displayed when child route is empty
      {
      	path: "contacts/:contactId", // Dynamic url is passed into the loader of this element (as `params.contactID`)
      	loader: contactLoader,
      	element: <Contact />,
      	errorElement: <div>Oops!</div> // Display error page in child Outlet only if error is caught at this level
  	  }
	]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```



Define `<Outlet>` in parent page to specify where to render the children page

```jsx
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
```



Define `<Link>` in place of `<a>` for routing to happen on client side with the router, instead of requesting from the server.

```jsx
import Link from "react-router-dom"

export default function Root(){
    {/*other elements */}
    <Link to={`contacts/1`}>Your name</Link>
}
```



Define `loader` and `useLoaderData` function in the element you need to load data from and display loaded data

```jsx
import useLoaderData from "react-router-dom";
import { getContacts } from "../contacts"; 	// Backend service

// Define the loader for loading from backend service
export async function loader() {
    const contacts = await getContacts()
    return { contacts }
}

export default function Root() {
  const { contacts } = useLoaderData();	// Get loaded data
    
  return (
    <>
      <div id="sidebar">
        {/* other code */}

        <nav>
          {contacts.length ? (	// Display loaded data
            {/*UI component for a contact */}
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

        {/* other code */}
      </div>
    </>
  );
}
```

React Router will handle the synchronization between backend service and UI. (??)



Define `action` and add it to the router for how you want `GET` and `POST` request handled on client side.

```jsx
import Form from "react-router-dom"
import { getContacts, createContact } from "../contacts"

export async function action() {
    const contact = await createContact()
    return { contact }
}

export default function Root() {
	return (
    	<Form method="post">
        	<button type="submit">New</button>
        </Form>
    )
}
```

Note, after an action (POST request), React Router will update the hook `useLoaderData` etc. to refresh the UI automatically.

Note we use the `Form` element here that will send the `GET/POST` request. The difference between form elements and normal links is that normal links change the URL, but forms can change the request method (`GET` or `POST`). The serialised form data is put in the request body for `POST`, and as URLSearchParams for `GET`

Note, with `<Form action="edit">`, after clicking the URL will automatically be appended with `/edit`. So add a route in the router to handle this.





Redirecting

`src/routes/root.jsx`

```jsx
import redirect from "react-router-dom"

export async function action() {
    const contact = await createContact()
    return redirect(`/contacts/${contact.id}/edit`)	// Redirect to edit page for that contact
}
```



`<NavLink/>` element to replace `<Link/>` element for additional styling based on the state of that link.

```jsx
  <NavLink
    to={`contacts/${contact.id}`}
    className={({ isActive, isPending }) =>
      isActive
        ? "active"
        : isPending
        ? "pending"
        : ""
    }
  >
    {/* other code */}
  </NavLink>
```

When the user is at the URL in the `NavLink`, then `isActive` will be true. When it's *about* to be active (the data is still loading) then `isPending` will be true. 



`useNavigation` hook lets your element know about the navigation state, so can display loading screen etc. as we wait for the backend API to return.

```jsx
import useNavigation from "react-router-dom"

export default function Root() {
    const navigation = useNavigation()
    
   	return (
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    )
}
```

[`useNavigation`](https://reactrouter.com/en/main/hooks/use-navigation) returns the current navigation state: it can be one of `"idle" | "submitting" | "loading"`.

Other functions:

- Navigate back once step

```jsx
<button type="button" onClick={() => { navigate(-1) }}
```







Creating a search bar

```jsx
import useSubmit from "react-router-dom"

// Amend the loader function to only load what is inbound of the search value
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
    const { contacts, q } = useLoaderData()

	/*
    The navigation.location will show up when the app is navigating to a new URL and loading the data for it. It then goes away when there is no pending navigation anymore.
    */
    const searching =
		navigation.location &&
        new URLSearchParams(navigation.location.search).has("q")

    // Display the correct search value on the search bar when going back
    useEffect(() => {
        document.getElementById("q").value = q
    }, [q])
    
    return (
        {/* other code */}
        
        // Search bar
        <Form id="search-form" role="search">
          <input
            id="q"
			className={searching ? "loading" : ""}  // Searching graphic
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q} // Search bar still contains search value upon refreshing
            onChange={(event) => {
				const isFirstSearch = q == null
				submit(event.currentTarget.form, {
                    replace: !isFirstSearch	// Replace previous search history, so you don't get a train of search history
                })
			}} // Submit new search on each keystroke
          />
          <div
          	id="search-spinner"  
            aria-hidden
            hidden={!searching}	// Search spinner
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </Form>
    )
}

// After submitting, the URL becomes: previous/url/?q=searchWords
```



`useFetcher` for mutating the data model without navigation

```jsx
import useFetcher from "react-router-dom"

function Favorite({ contact }) {
    const fetcher = useFetcher()
    
    return (
    	<fetcher.Form method="post"
          <button
            name="favorite"
            value={favorite ? "false" : "true"}
            aria-label={
              favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {favorite ? "★" : "☆"}
          </button>
        </fetcher.Form>    
    )
}
```

This will trigger a POST request and hit the action handler, but no causing of navigation.



Throwing responses

```jsx
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}
```

You can throw response to get this error message caught and displayed on the error element. Instead of allowing the error to propagate in uncontrolled fashion.



JSX routes

Some people prefer creating routes in JSX. It's a purely syntactical choice, not on functionality

```jsx
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);
```









## Miscellaneous

**Object reference**

Because React promotes immutability, if a state is holding an object (by reference of course), then mutating the object and reassigning won't change the state. 

React will look at the object, realize it's the same reference, and not change anything...

```react
const [startDate, setStartDate] = useState({
    year: 2021,
    month: 1,
    day: 1
})

const ch = { year: 2019 }

setStartDate(Object.assign(startDate,ch)) // This will not change the state
```

Instead, we need to do a deep copy of the object first to obtain a new reference, then mutate that object, like so

```react
// ... same code

setStartDate(Object.assign(Object.assign({},startDate),ch))
```



**Fragments**

https://reactjs.org/docs/fragments.html



**State persisting**

If a component has its props changed, its internal state will persist.

Watch out for that.





