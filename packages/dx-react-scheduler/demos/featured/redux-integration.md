# React Scheduler Redux Integration

In this demo, the Scheduler works as a stateless component, with the [Redux store](http://redux.js.org/docs/basics/Store.html) managing its state. All user actions that modify the state produce corresponding [Redux actions](http://redux.js.org/docs/basics/Actions.html) dispatched by the Scheduler's [reducer](http://redux.js.org/docs/basics/Reducers.html). Thanks to the [Redux DevTool Extension](https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension) activated in this demo, you can perform time-traveling and observe how the Scheduler's state was changing.

.embedded-demo({ "path": "scheduler-featured-redux-integration/demo", "showThemeSelector": true, "showThemeVariants": true })
