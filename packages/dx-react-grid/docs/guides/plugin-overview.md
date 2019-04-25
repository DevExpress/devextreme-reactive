# React Grid - Plugin Overview

Plugins are components that implement particular Grid features. They should be defined within the Grid component.

## Plugin Types

Plugins can be divided into four groups:

- **State Management plugins** control a part of the Grid's state internally or provide properties for external state management (see [controlled and uncontrolled modes](controlled-and-uncontrolled-modes.md)).
- **Data Processing plugins** transform data passed to the Grid component before rendering.
- **UI plugins** render the transformed data using the current state and configuration. UI plugins can also invoke actions that state management plugins provide to change the Grid's state. In some cases, UI plugins can control a part of the Grid state (instead of State Management plugins).
- **Core plugins** are the base building blocks for the first three groups. These plugins can also be used separately in certain scenarios.

Note that the plugins are composable and can be nested into each other.

Refer to the [Reference](../reference/grid.md) to see the complete plugin list.

## UI Plugins

The Grid's UI plugins use special components to render the UI. You can implement your component suite or use a predefined one:

- [DevExtreme React Grid for Material-UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-material-ui) - renders the Grid's UI elements based on [Material-UI](https://material-ui.com/) components
- [DevExtreme React Grid for Bootstrap 4](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-bootstrap4/) - renders the Grid's UI elements based on [Bootstrap 4](http://getbootstrap.com/) components
- [DevExtreme React Grid for Bootstrap 3](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-bootstrap3/) - renders the Grid's UI elements based on [Bootstrap 3](https://getbootstrap.com/docs/3.3/) components

## Plugin Order

The Grid plugins adhere to the data [piping](https://en.wikipedia.org/wiki/Pipeline_(computing)) principle. That is, plugins process Grid data in the same order they are defined in the Grid.

Plugins implementing an interface should be linked before plugins that use it. For example, a data processing plugin is based on some state and should follow the appropriate state plugin. Some visualization plugins extend the `Table`'s functionality and should follow it in the code.

NOTE: Refer to the plugin's reference for information on its dependencies.

### Data Processing Plugins

The data processing plugins' order is also important because they transform data in the same order they appear. For example, if the `IntegratedPaging` plugin precedes the `IntegratedSelection`, the 'Select All' checkbox selects only the current page's rows and swapping them around allow selecting rows on all pages. See this rule in action in the following demo:

.embedded-demo({ "path": "grid-selection/select-all-by-page", "showThemeSelector": true })
