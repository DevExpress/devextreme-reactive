# React Scheduler Redux Integration

In this demo, the Scheduler is used as a stateless component, and the [Redux store](http://redux.js.org/docs/basics/Store.html) manages its state. User actions that modify the state have corresponding [Redux actions](http://redux.js.org/docs/basics/Actions.html) dispatched by the Scheduler's [reducer](http://redux.js.org/docs/basics/Reducers.html). If the [Redux DevTool Extension](https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension) is installed in your browser, you can view how the Scheduler's state changes.

.embedded-demo({ "path": "scheduler-featured-redux-integration/demo", "showThemeSelector": true, "showThemeVariants": true })
