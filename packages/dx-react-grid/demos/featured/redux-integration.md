# React Grid Redux Integration

In this demo, the Grid works as a stateless component while the [Redux store](http://redux.js.org/docs/basics/Store.html) manages its state. All end-user actions that modify the component state produce corresponding [Redux actions](http://redux.js.org/docs/basics/Actions.html) the Grid [reducer](http://redux.js.org/docs/basics/Reducers.html) dispatches. The [Redux DevTool Extension](https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension) is activated in this demo, which allows you to perform time-traveling and observe Grid state changes.

.embedded-demo({ "path": "grid-featured-redux-integration/demo", "showThemeSelector": true, "showThemeVariants": true })
