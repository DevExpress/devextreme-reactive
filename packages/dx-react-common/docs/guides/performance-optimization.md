# React Components - Performance Optimization

Internally, Reactive Components use React [guidelines](https://reactjs.org/docs/optimizing-performance.html) for optimizing performance. However, a customer component configuration is just as important as internal configuration for performance optimization. You can avoid big performance issues if you follow some easy rules.

## Use Immutable Data Structures

React Controls do not change data passed through a state and use memoization and [React.PureComponents](https://reactjs.org/docs/react-api.html#reactpurecomponent). A `React.PureComponent` shallowly compares old and new state values. In this case, if you update a state object field, React does not update the component because it compares two references to the same object. Immutable data structures help to solve this problem.

Keep the Control’s state management plugins as separate components and update their properties independently to optimize performance. This allows the Control to avoid rendering unchanged UI elements.

In this case, you can use a state management library like [Redux](https://redux.js.org/) to work with independent components’ states.

The following demo shows how to work with immutable data using Redux, [react-redux](https://github.com/reduxjs/react-redux) and [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) libraries:

.embedded-demo({ "path": "grid-immutability/seamless-immutable", "showThemeSelector": true })

## Avoid Constantly Code Inside Render Methods

It is known that all code inside render methods will be called after each component update. We do not recommend creating new functions and variables in this place. To override default templates, you should create your own templates outside render methods. The following example demonstrates the right way to override default cell templates in the [React Scheduler](https://devexpress.github.io/devextreme-reactive/react/scheduler) control:

.embedded-demo({ "path": "scheduler-basic/custom-template", "showThemeSelector": true })

In some cases, we want to get access to the parent component’s state. In these scenarios, we recommend using one of the methods below for avoiding performance problems. The first one is using state management libraries like the Redux. However, if your application doesn’t include any state management libraries, we suggest using the [connectProps](../../../dx-react-core/docs/reference/connect-props.md) function from the `@devexpress/dx-react-core` package. The following example shows how to configure this function:

.embedded-demo({ "path": "chart-basic/chart-connect-props", "showThemeSelector": true })

In the sample above the legend labels of the [React Chart](https://devexpress.github.io/devextreme-reactive/react/chart) depend of the series selection state. The selection state changes will change the legend labels styles because of the [connectProps](../../../dx-react-core/docs/reference/connect-props.md) function's `update` method.
