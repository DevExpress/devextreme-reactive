# Using Immutable Data

DevExpress Data Grid for React conforms to the React [optimization principles](https://reactjs.org/docs/optimizing-performance.html). According to these principles, the Grid does not mutate data passed through a state and uses memoization and [React.PureComponents](https://reactjs.org/docs/react-api.html#reactpurecomponent). A `React.PureComponent` compares old and new state values using a simple comparison. In this case, if you update a state object field, React does not update the component because it compares two references to the same object. Immutable data structures [help](https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data) to solve this problem.

Let's see how to use our Grid and reach the best performance.

The idea is keeping the Grid's state management plugins as separate components and update their properties independently. This approach allows Grid rerenders only related UI elements.

In this case, the state management library like [Redux](https://redux.js.org/) can help us working with indepent componets state easily.

The following demo shows how to implement the described approach using Redux, [react-redux](https://github.com/reactjs/react-redux) and [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) libraries.

.embedded-demo(immutability/seamless-immutable)
