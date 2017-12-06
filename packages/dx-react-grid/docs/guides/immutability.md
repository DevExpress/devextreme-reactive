# Using Immutable Data

DevExpress Data Grid for React conforms to the React [optimization principles](https://reactjs.org/docs/optimizing-performance.html). According to these principles, the Grid does not mutate data passed through a state and uses memoization and [React.PureComponents](https://reactjs.org/docs/react-api.html#reactpurecomponent). A `React.PureComponent` compares old and new state values using a simple comparison. In this case, if you update a state object field, React does not update the component because it compares two references to the same object. Immutable data structures [help](https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data) to solve this problem.

You can use the [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) library to make a React Grid state immutable.

Now we show how to use this library with our Grid.

To update a Grid state correctly it's helpful to use a state management library like [Redux](https://redux.js.org/).

What does "update a Grid state correctly" mean? It means a user will be able to change only required state field, not a full state object. In this case, React Grid rerenders only related UI elements. Let's say we change a Grid selection by clicking on a checkbox. Well, I'd expect the Grid updates a selection column only. Let's look how to achieve the described behavior.

The idea is keeping the Grid's state management plugins as separate components and update their properties independently.

As you know, to use React and Redux together you need to install the [react-redux](https://www.npmjs.com/package/react-redux) library.

In term of this, we have to implement [presentation and container components](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components), then [use they together](https://redux.js.org/docs/basics/UsageWithReact.html#tying-the-containers-together-within-a-component).

This small piece of code shows how it can look like:

```js
const initialState = {
  // Note, that the state is a plain JavaScript object that contains immutable fields.
  data: Immutable([]),
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ACTION_TYPE) {
    // Use the seamless-immutable library to create a new state.
    return { data: Immutable(payload) };
  }
  return state;
};

const SelectionStateComponent = (props) => (
  <SelectionState {...props} />
);

const Grid = () => (
  <Grid
    /* Grid's props */
  >
    {/* Grid's plugins */}
    <SelectionStateContainer />
  </Grid>
);

const mapStateToProps = (state) => state;

const mapDispatchToProps = dispatch => ({
  onSelectionChange: selection => dispatch({
    type: ACTION_TYPE,
    payload: selection,
  }),
});

const SelectionStateContainer =
  connect(mapStateToProps, mapDispatchToProps)(SelectionStateComponent);

const store = createStore(reducer);

render (
  <Provider store={store}>
    <Grid />
  </Provider>
)
```

Of cource, in real cases you will use more than one Grid's state management plugin: `SortingState`, `SelectionState` etc. You can combine them using the [combineReducers](https://redux.js.org/docs/recipes/reducers/UsingCombineReducers.html) function.

The following demo show how to do it:

.embedded-demo(immutability/seamless-immutable)
