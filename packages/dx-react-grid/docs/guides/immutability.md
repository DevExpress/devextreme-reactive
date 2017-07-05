# Usage with Immutable Data

## Overview

Under the hood, the Grid uses React [optimization principles](https://facebook.github.io/react/docs/optimizing-performance.html). In order, to keep these optimizations the Grid doesn't mutate data passed through a state, uses memoization and [React.PureComponents](https://facebook.github.io/react/docs/react-api.html#react.purecomponent). The possible problem is that [React.PureComponent](https://facebook.github.io/react/docs/react-api.html#react.purecomponent) matches the old and new state values using a simple comparison. Let's say, you have an object within the state and would like to update some of its field. In this case, you have to create the copy of this object and put it back to the state. Otherwise, React won't update a component. Immutable data structures [help](https://facebook.github.io/react/docs/optimizing-performance.html#the-power-of-not-mutating-data) to solve this problem.

To make the state of React Grid immutable you can use the [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) library.
Initialize the state like below:

    this.state = {
      data: Immutable({
        // the state fields
      })
    };

Next, use the state as usually. It's possible because `seamless-immutable` keeps backwards-compatibility with normal Arrays and Objects.

The following demo demonstrates how to use React Grid with `seamless-immutable` in action.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/immutability/seamless-immutable)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/immutability/seamless-immutable.jsx)
