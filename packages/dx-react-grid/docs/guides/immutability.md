# Using Immutable Data

DevExpress Data Grid for React conforms to the React [optimization principles](https://facebook.github.io/react/docs/optimizing-performance.html). According to these principles, the Grid does not mutate data passed through a state and uses memoization and [React.PureComponents](https://facebook.github.io/react/docs/react-api.html#react.purecomponent). A `React.PureComponent` compares old and new state values using a simple comparison. In this case, if you update a state object field, React does not update the component because it compares two references to the same object. Immutable data structures [help](https://facebook.github.io/react/docs/optimizing-performance.html#the-power-of-not-mutating-data) to solve this problem.

You can use the [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) library to make a React Grid state immutable.
The following example demonstrates how to initialize an immutable state:

```js
this.state = {
  data: Immutable({
    // the state fields
  })
};
```

Then you can use the state in a usual way because `seamless-immutable` keeps backwards-compatibility with normal Arrays and Objects.

The following demo demonstrates the React Grid with `seamless-immutable` in action:

.embedded-demo(immutability/seamless-immutable)
