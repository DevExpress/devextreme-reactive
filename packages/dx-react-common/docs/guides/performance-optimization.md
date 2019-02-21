# React Components - Optimize Performance

This article describes how to provide high performance for your application. Refer to the [React guidelines](https://reactjs.org/docs/optimizing-performance.html) for more information on performance optimization.

## Use Immutable Data Structures

React Controls do not change data passed through a state and use memoization and [React.PureComponents](https://reactjs.org/docs/react-api.html#reactpurecomponent). A `React.PureComponent` performs a shallow equality check to compare old and new state values. In this case, if you update a state object field, React does not update the component because it compares two references to the same object. Use immutable data structures to create a new state instance each time a state changes.

Implement Control’s state management plugins as separate components and update their properties independently to optimize performance. This allows the Control to avoid rendering unchanged UI elements.

In this case, you can use a state management library like [Redux](https://redux.js.org/) to work with independent components’ states.

The following demo shows how the [React Grid](https://devexpress.github.io/devextreme-reactive/react/grid) works with immutable data using Redux, [react-redux](https://github.com/reduxjs/react-redux) and [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) libraries:

.embedded-demo({ "path": "grid-immutability/seamless-immutable", "showThemeSelector": true })

## Avoid Declaring Statements Inside Render Methods

Do not declare functions and variables inside render methods. Otherwise, these functions and variables are declared each time a component is updated. The following example demonstrates how to override a default appointment template in the [React Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler) control:

.embedded-demo({ "path": "scheduler-basic/simple-template", "showThemeSelector": true })

## Access the Parent Component's State Correctly

Use a management library like [Redux](https://redux.js.org/) to access the parent component's state. If you do not use such libraries in your application, we recommend that you use the [connectProps](../../../dx-react-core/docs/reference/connect-props.md) function available in the `@devexpress/dx-react-core` package.

In the following example, [React Chart](https://devexpress.github.io/devextreme-reactive/react/chart) uses the `connectionProps`'s `update` method to update a legend label's style when the parent serie's hover state changes.

.embedded-demo({ "path": "chart-basic/chart-connect-props", "showThemeSelector": true })
