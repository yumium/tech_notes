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









## Thinking in React

1. Break the UI into a component hierarchy

The size of components depend on context. You can think of each component as following the single responsibility principle, or how the page is broken down.



2. Build a static version

This allows you to write out the components and data model. We only need to use props, no need for states (they are for interactivity)



3. Find the minimal but complete representation of UI state

State allows interactivity (the page isn't static). Values that can be computed or doesn't change are not states.

Raise state usually to the components' lowest common parent.

And add inverse data flow (pass mutators of state to children).







## Describing the UI



Component = reuseable piece of UI

```jsx
function Profile() {
  return (
    // JSX syntax is compiled to JS objects
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}

export default function
```



Using components

```jsx
import Profile from "./components/profile"

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```



Components must start with capital letter (so when using other components as children, we know it's a component not regular HTML element).



| Syntax  | Export statement                      | Import statement                        |
| ------- | ------------------------------------- | --------------------------------------- |
| Default | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named   | `export function Button() {}`         | `import { Button } from './Button.js';` |

Each file can contain at most one default export. When importing the default, you can change the name like so

```jsx
import Banana from "./Button.js"
```

Likewise, for named export, you can change the name like so

```jsx
import { Button as Banana } from "./Button.js"
```

When a file contain just 1 component, we tend to make it default. Otherwise we make every component in that file a named export.



JSX is HTML but a bit more strict:

- A component have to return 1 root element
  - Can use fragment `<> ... </>`
- Attributes are almost always in camelCase => because JSX turns into JavaScript objects and attribute becomes keys



In JSX, logic and UI live together. You can add JavaScript to your JSX objects using curly brackets

```jsx
<img
    className="avatar"
    src={avatar}		// JavaScript variables
    alt={description}
/>

<p>The date is {Date.date}</p>

// Double curly is passing objects
<ul style={{backgroundColor: "black"}}> ... </ul>
```



You pass information from parent to children using props. Props allow components to work like functions, so decomposition can be done. The parents don't need to know the inner working of the children. The children take the props, without knowing where it came from.

Parent passing props to children

```jsx
export default function Profile() {
  return (
    <Avatar
      // Props
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

Children using props

```jsx
// We often use destructure, and default values for if the prop isn't passed
function Avatar({ person, size = 100 }) {
  // ...
}
```

We can also use JS spread syntax when passing props straight down

```jsx
function Profile(props) {
  return (
    <div className="card">
      // Expands to key-value pairs 
      <Avatar {...props} />
    </div>
  );
}
```



When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`. 

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```



Props are immutable. Your component is a pure function that maps your data model to UI.

1. No side effects
2. Same set of inputs guarantee same set of outputs

React offers a "Strict Mode" that renders each component twice. This helps detect impurity.

The only part that can contain mutation is event handlers (they are the part that makes you interact with a single page!). This is fine as this modifies the data model, and hence changes the UI. The component is still pure.

You can introduce impurity with `useEffect`, but use this as absolute last resort.



Conditional rendering

- In JSX, `{cond ? <A /> : <B />}` means *“if `cond`, render `<A />`, otherwise `<B />`”*.
- In JSX, `{cond && <A />}` means *“if `cond`, render `<A />`, otherwise nothing”*.



For loop in components

Store objects as an array and generated UI using a `.map` function

```jsx
const listItems = people.map(person => <li>{person}</li>);
```

Use keys that are unique per element and immutable. Keys are helpful for the browser to locate each element (order can change etc.)

If no good keys, just don't provide a key















## Adding Interactivity



We use state to track memory of the webpage. 

Having event handlers of components to update a locally variable won't work because:

- Local variables don't persist between renders (your changes are wiped if you refresh)
- A change in local variable does not trigger a re-render, so your changes aren't reflected in the UI

The `useState` hook solves this problem by

- Having the state variable persist the state across renders
- Having the state setter function to trigger a re-render



```javascript
const [index, setIndex] = useState(0)
```

After calling `setIndex`, say

```javascript
setIndex(index + 1)
```

The component rerenders. The state hook remembers the new value and assigned `1` to variable `index`.



Rule of Hook

- Use hooks only at top level of functions (not in conditions, loops, event handlers ...)

This way ever render will call the same hooks at the same order. This way, React knows what variable to return without needing you to provider a unique identifier => the UID is the index of the order, so states can be stored in an array like data structure.



Each component have their states isolated from other components and private (cannot modify or access by default). For various components to access the same state, we lift state up to the lowest common ancestor.



What happens when state changes?

- Triggering a render
- Rendering the right component => the component with state changed (and their children) will rerender
- Committing to the DOM => only the delta of the DOM is inserted/updated. React calculates what needs to be changed

Note, the initial render is done via

```jsx
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```



State acts like a snapshot. When you call the state setter function, it updates the state and schedules a rerender. The rerender happens after the event handler returns.

```jsx
return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
)
```

The above button will only increase the state `number` by 1 after each click. This is because after each `setNumber` call, the next `setNumber` call is still using the old value of `number`, and so will be `setNumber(0 + 1)`. This sets the state to 1 again and schedules the rerender.

```jsx
return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
)
```

The alert will return `0` the first time, `5` the second time etc.

The state variable's value never changes within a render.



State hook are batched between renders. If the same state setter function is called, then

- If the state setter function is called of the form `setVariable(newValue)`, then it replaces all previous calls in the queue of this setter function
- If the state setter function is called of the form `setVariable(oldValue => newValue)`, then it is added to the queue

Batching is used to improve efficiency by reducing the number of state calculations between renders.

```jsx
// Sets to number + 6
<button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
    }}>Increase the number</button>

// Sets to 42
<button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42); 
    }}>Increase the number</button>
```

For passing a function into the setter, we have convention of naming the parameter as first letters of the state variable name.



Updating objects in state needs to use the setter function (not mutating the local state variable). So state variables are immutable. We tend to use the spread syntax for this.

Changing the state variable changes the variable locally, but React does not trigger a rerender. So the change is never reflected.

Because this copying is shallow, the implementation is fast.

Note, with nested objects the spread syntax can get messy, perhaps consider flattening your objects

```jsx
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

We can use a small framework like `Immer` to simplify the syntax

```jsx
// Using Immer
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

The `Immer` framework creates a "draft" that records the changes to the object, before committing it in the shallow copy. It essentially let you omit specifying copying the same elements.

https://github.com/immerjs/use-immer?tab=readme-ov-file



When the state is an array, we follow the same functional paradigm by using functional methods on arrays.

- `...`, `filter`, `map`, `slice`, `concat`

```jsx
setArtists( // Replace the state
  [ // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name } // and one new item at the end
  ]
);
```

There is nothing wrong with mutating the local array variable and calling the setter on the variable. But the code is ugly and harder to debug.

Again, Immer can potentially simplify your code.



A quick note about event handlers. By default, an event propagates from the child component in the DOM up through all the parents. The event handler of the component with the event is triggered first, followed by all the ancestors upwards to the root where a handler is defined.

To stop the propagation, take the event and call `stopPropagation`

```jsx
return (
    <form onSubmit={e => {
      e.stopPropagation();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
);
```

If you want to have your parents see all events (e.g, for logging), then instead of `onClick` use `onClickCapture`. This handler is called first for all parents after an event.





## Managing State



Think UI declaratively.

Your component is a function that maps state to UI.

Interactions (from user, from computer) change state with defined logic, which in turn change the UI.

The framework takes care of updating the UI. As the programmer, you don't worry about this.



Tips for modelling states

1. **Group related state.** Merge related states into a single state variable (usually an object).
2. **Avoid contradictions in state.** When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
3. **Avoid redundant state.** Information that can be calculated on the fly should not be as a state.
4. **Avoid duplication in state.** When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.

```jsx
// If you want store which item is selected, store the ID instead of copying the name. This way, when I modify the name of the time, the state will not be out of sync
items = [{ id: 0, title: 'pretzels'}, ...]
selectedId = 0
```

5. **Avoid deeply nested state.** Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.



To share states between components, lift state up to the lowest common parent, then pass both the state and state setter as props to children (latter allow children to change the state)



State resets when component is removed and re-added (this prevents memory leaks). State only preserves if it's the same component at same position.

```jsx
// State persists across components
return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
```

To force a reset of state, you can render components at different positions of the render tree or pass a key to the component that changes

```jsx
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
	) 
```

```jsx
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
          
<Chat key={to.id} contact={to} />
```



How to preserve states for removed components?

- Lift the state up to parent, which persists. This is most common option
- Use `localStorage`
- Render all components and do the hide with CSS, this can be slow



When the state update logic is too complicated, it might be worth it to put it inside a reducer function

```jsx
const [tasks, setTasks] = useState(initialTasks)
```

becomes

```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
```

We specify the reducer function, and it returns instead a dispatch function that we can call whenever an action is performed.

We pass in an object that specifies the action that just took place and some additional information

```jsx
function handleAddTask(text) {
    dispatch({
        // We typically have the `type` member with a string that uniquely identifies a type of action
        type: 'added',
        id: nextId++,
        text: text
    })
}
```

We then write the reducer function that takes in the current state and dispatched action, and returns the new state

```jsx
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

We call it the reducer because it acts like the `reduce` function in arrays. We essentially describe state changes using a state machine.

`useState` vs `useReducer`:

- `useReducer` generally needs more code, but makes logic easier to understand for complex interactions
- `useState` is more readable for simple logic, `useReducer` more readable for complex logic
- Reducer function is pure and can be tested on its own
- Reducer is easier to debug, just log every state change



To pass props deeply down the component tree, we can use contexts

```jsx
// LevelContext.js
import { createContext } from 'react'

export const LevelContext = createContext(1)
```

```jsx
// Heading.js
export default function Heading({ children }) {
    const level = useContext(LevelContext)
    // ...
}
```

```jsx
// Section.js
import { useContext } from 'react'
import { LevelContext } from './LevelContext.js'

export default function Section({ level, children }) {
    const level = useContext(LevelContext)
    
    return (
    	<section className="section">
        	<LevelContext.Provider value={level + 1}>
            	{children}
            </LevelContext.Provider>
        </section>
    )
}
```

`<LevelContext.Provider>` means if a child asks for `LevelContext` context, give the value.

Contexts can be nested, and the lowest level in scope is returned. So the case above will automatically track the depth of the nesting

```jsx
export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

When not to use context:

- When passing through props works well enough
- When you can pass a grandchild down as a prop to the children (this way you avoid passing the prop)

When to use context:

- Theming
- Current user account
- Routing



For more complicated UI, we can combine reducer with context, by adding the state and dispatch function to the context. This way, all children can access the state, and also dispatch actions to it.

```jsx
import { createContext } from 'react'

export const TasksContext = createContext(null)
export const TasksDispatchContext = createContext(null)

// Custom hooks
export function useTasks() {
    return useContext(TasksContext)
}

export function useTasksDispatch() {
    return useContext(TasksDispatchContext)
}

const initialTasks = {
    // ...
}

function tasksReducer(state, action) {
    // ...
}

export function TasksProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
    
    return (
    	<TasksContext.Provider value={tasks}>
        	<TasksDispatchContext.Provider value={dispatch}>
            	{children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}
```

Then, on top level

```jsx
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

And for a child

```jsx
import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;

```













## Escape Hatches



refs are used when you want to track a value between renders but don't want it changing to trigger a rerender

```jsx
import { useRef } from 'react'

/*
returns object
{
	current: 0
}
*/
const ref = useRef(0)

// Access value
console.log(ref.current)

// Mutate value
ref.current = ref.current + 1
console.log(ref.current)  // 1
```

Example use case can be tracking the `setInterval` ID needed to stop a stop watch.

Note, it is not safe to read/write to refs during rendering. It's best to leave using refs in event handlers and `useEffects`

When to use refs:

- Storing timeout IDs
- Storing and manipulating DOM elements
- Storing objects that are not used to calculate JSX

Generally avoid manipulating DOM that is managed by React



Pass the ref to the `ref` attribute of a DOM element to set the element as the `current` value of the ref

```jsx
import { useRef } from 'react'

const myRef = useRef(null)

//...
<div ref={myRef}>
```

Once the DOM node loads, React will put the node as a reference to `myRef.current`. You can then manipulate it, perhaps in an event handler

```jsx
function handleClick() {
	myRef.currrent.scrollIntoView()
}
```

Sometimes you want refs to work on elements that can be arbitrarily many. We do this by passing a function into the `ref` attribute. React will call this function with the node when the DOM node is created, and with `null` when it's destroyed. 

```jsx
function scrollToId(itemId) {
    const map = getMap()
    const node = map.get(itemId)
    node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    })
}

function getMap() {
    if (!itemsRef.current) {
        // Initialize the Map on first usage
        itemsRef.current = new Map()
    }
    return itemsRef.current()
}

//...
<li
    key={cat.id}
    ref={(node) => {
        const map = getMap()
        if (node) {
            map.set(cat.id, node)
        } else {
            // node is null => DOM node is getting destroyed
            map.delete(cat.id)
        }
    }}
```

Here we have the ref store a mapping that maps cat ID to the DOM node.

Access another React component's ref is forbidden unless the component specifically allows it with `forwardRef`

```jsx
const MyInput = forwardRef((props, ref) => {
    return <input { ...props } ref={ref} />
})
```

Sometimes we want the state change to update the DOM immediately instead of being queued. We can use the `flushSync` construct.

```jsx
flushSync(() => {
    setTodos([ ...todos, newTodo])
})

// Scrolling no longer lags by 1 item
listRef.current.lastChild.scrollIntoView()
```



Effects are useful for creating side effects that doesn't happen on events (using rendering needs the function to be pure). This is most often used when synchronizing React with an external service.

```jsx
function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null)
    
    useEffect(() => {
        if (isPlaying) {
            ref.current.play()
        } else {
            ref.current.pause()
        }    
    })
    
    return <video ref={ref} src={src} loop playsInline />
}
```

1. State/Props changes
2. Component rerenders
3. Effects are run

If we don't leave the code block inside a `useEffect`, the `ref` component will be `null` (because the DOM node is not rendered yet)

```jsx
// Run at every render
useEffect(() => { 
    // do stuff
})

// Run at mount (when component is first rendered)
useEffect(() => {
    // do stuff
}, [])

// Run at mount and subsequent rerender if dependency change
useEffect(() => {
    // do stuff
}, [state])

// Causes infinite loop
const [count, setCount] = useState(0)
useEffect(() => {
    setCount(count + 1)
})

// Adding clean up
useEffect(() => {
	const connection = createConnection()
    connection.connect()
    return () => connection.disconnect()	// Run before Effect run again, and once more before component unmount (delete from DOM)
})
```



Use memorisation when a calculation is expensive

```jsx
// Only recalculated on rerenders where the dependency changes
const calculatedVar = useMemo(() => expensiveOp(state), [state])

// Instead of this
const calculatedVar = expensiveOp(state)
```



**Custom hooks**

Custom hooks = resharable logic. Uses React hooks in the function to give React functionality to code.

Hook names must start with `use`.

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
```

then use the same hook in many places in your code

```jsx
function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}
```

Note, each use of custom hook creates their own state. States are not shared across each instance of the hook; rather, the stateful logic is shared.

Your custom hook is called whenever the props are changed

```jsx
// Custom hook that takes care of chatroom connection
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```

and

```jsx
// Code that uses the custom hook
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
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





### **Object reference**

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



### **Fragments**

https://reactjs.org/docs/fragments.html



### **State persisting**

If a component has its props changed, its internal state will persist.

Watch out for that.



### **Testing**

There are a few ways to test React components. Broadly, they divide into two categories:

- Rendering component trees in a simplified test environment and asserting on their output.
- Running a complete app in a realistic browser environment (also known as “end-to-end” tests).

Trade offs

- Iteration speed vs Realistic environment: Loose modelling give faster iteration speed. More realistic modelling give slower iteration speed.
- How much to mock: With components, "unit" is hard to define.

Read more here: https://legacy.reactjs.org/docs/testing.html



### **Styling with CSS**

Import the CSS file and pass the class as string to the `className` prop:

```react
render() {
  let className = 'menu';
  if (this.props.isActive) {
    className += ' menu-active';
  }
  return <span className={className}>Menu</span>
}
```



### **File structure**

Group by roots or features:

```
common/
  Avatar.js
  Avatar.css
  APIUtils.js
  APIUtils.test.js
feed/
  index.js
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  FeedAPI.js
profile/
  index.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
  ProfileAPI.js
```


Group by file type:

```
api/
  APIUtils.js
  APIUtils.test.js
  ProfileAPI.js
  UserAPI.js
components/
  Avatar.js
  Avatar.css
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
```

Avoid too much nesting and don't overthink it (5 minutes is fine).

When using `create-react-app`, there is a `public` folder that contains the `index.html`. You can modify this to change the page title etc.


### Performance tuning

https://legacy.reactjs.org/docs/optimizing-performance.html

Don't optimize prematurely





