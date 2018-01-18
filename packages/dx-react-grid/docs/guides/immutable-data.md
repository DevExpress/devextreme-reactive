# React Grid - Immutable Data

DevExpress Data Grid for React conforms to the React [optimization principles](https://reactjs.org/docs/optimizing-performance.html). According to these principles, the Grid does not change data passed through a state and uses memoization and [React.PureComponents](https://reactjs.org/docs/react-api.html#reactpurecomponent). A `React.PureComponent` compares old and new state values using a simple comparison. In this case, if you update a state object field, React does not update the component because it compares two references to the same object. Immutable data structures [help](https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data) to solve this problem.

Keep the Grid's state management plugins as separate components and update their properties independently to optimize performance. This allows the Grid to avoid rendering unchanged UI elements.

In this case, you can use a state management library like [Redux](https://redux.js.org/) to work with independent components' states.

The following demo shows how to work with immutable data using Redux, [react-redux](https://github.com/reactjs/react-redux) and [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) libraries:

.embedded-demo(immutability/seamless-immutable)
