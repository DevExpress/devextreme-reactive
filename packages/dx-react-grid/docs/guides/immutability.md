# Usage with Immutable Data

## Overview

Under the hood, the Grid uses React [optimization principles](https://facebook.github.io/react/docs/optimizing-performance.html). To avoid unnecessary recalculations the Grid doesn't mutate data passed through a state.

Out of the box React Grid supports the [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) library.
With this library you can make your state immutable like below:

    this.state = Immutable({
      // the state fields
    });

Next, use the state as usually. It's possible because `seamless-immutable` keeps backwards-compatibility with normal Arrays and Objects.

The following demo demonstrates how to use React Grid with `seamless-immutable` in action.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/grid/demos/#/immutability/seamless-immutable)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/immutability/seamless-immutable.jsx)
