# React Grid - Plugin Overview

Plugins are components which should be placed inside Grid and responsible for enabling particular Grid features. The core principle used for supplying plugins with data is piping. This means that data flows consequently from the first plugin to the next one and so on. And this is where [plugin order](#pluginorder) comes to a scene.

## Plugin Order

Because of the piping principal the plugin order is very important. Plugins implementing an interface should be linked before the plugin that uses it. For example, a data processing plugin is based on some state, and should follow the appropriate state plugin. Some visualization plugins extend the `Table`'s functionality and should follow it in the code.

NOTE: Refer to the plugin's reference for information on its dependencies.

### Data Processing Plugins

The data processing plugins' order is also important because they transform data in the same order they appear. For example, if the `IntegratedPaging` plugin precedes the `IntegratedSelection`, Select All checkbox selects only the current page's rows. Swap the plugins to allow selecting rows on all pages. See this rule in action in the following demo:

.embedded-demo(grid-selection/select-all-by-page)

## Plugin Types

All the plugins can be divided into four groups:

- **State Management plugins** control a part of the Grid's state internally or provide properties for external state management (see [controlled and uncontrolled modes](controlled-and-uncontrolled-modes.md)).
- **Data Processing plugins** transform data passed to the Grid component before rendering.
- **UI plugins** render the transformed data using the current state and configuration. UI plugins can also invoke actions that state management plugins provide to change the Grid's state. In some cases, UI plugins can control a part of the Grid state by themselves (instead of State Management plugins).
- **Core plugins** are the base building blocks for the first three groups. These plugins can also be used separately in certain scenarios.

Note that the plugins are composable and can be nested into each other.

Refer to the [Reference](../reference/grid.md) to see the complete plugin list.

## UI Plugins

The Grid's UI plugins use special components to render the UI. You can implement your own suite of components or chose between the predefined ones:

- [DevExtreme React Grid for Bootstrap 3](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-bootstrap3/) - renders the Grid's UI elements based on the [Bootstrap 3](http://getbootstrap.com/) components
- [DevExtreme React Grid for Material UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-material-ui) - renders the Grid's UI elements based on the [Material UI](http://www.material-ui.com) components
