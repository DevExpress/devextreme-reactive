# React Chart - Plugin Overview

The Chart component uses plugin components to visualizes data specified via the `data` property. These components implement particular features and should be defined within the Chart component.

## Plugin Types

The React Chart supports the following plugin types:

- **Animation plugins**
Animate all chart series.

- **Interactivity plugins**
Provide interaction with user - hover, selection, click.

- **Data processing plugins**
 Transform data passed to the Chart component.

 - **UI plugins**
 Use the provided data to render UI elements.

## Animation Plugins

- `Animation` - animates all chart series when they first appear on-screen

## Interactivity Plugins

- `EventTracker` - allows you to handle a click on a point or series
- `HoverState` - implements the *hovered* state for points and series
- `SelectionState` -  implements the *selected* state for points and series

## Data processing plugins

- `ArgumentScale` - allows you to customize the argument scale
- `ValueScale` - allows you to customize the value scale and display multiple value scales
- `Stack` - transforms user data to display series points side-by-side or one under another other

## UI Plugins

The following plugins render series:

- `LineSeries`
- `ScatterSeries`
- `AreaSeries`
- `SplineSeries`
- `BarSeries`
- `PieSeries`

The following plugins render additional elements:

- `ArgumentAxis` - renders an argument axis and the grid
- `ValueAxis` - renders a value axis and the grid
- `Legend` - renders a legend
- `Title` - renders a title
- `Tooltip` - implements a tooltip for points

The Chart's plugins use special components to render the UI. You can implement your component suite or use a predefined suite:

- [DevExtreme React Chart for Material-UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-material-ui) - renders the Chart's UI elements based on [Material-UI](https://material-ui.com/) components.
- [DevExtreme React Chart for Bootstrap 4](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-bootstrap4) - renders the Chart's UI elements based on [Bootstrap 4](http://getbootstrap.com/) components.

## Plugin Order

The plugin order is important and determines what chart will be. UI series plugins are rendered in the same order as they are defined in the Chart component. Thus if the `BarSeries` plugin precedes the `LineSeries`, the line series overlays the bar series.

.embedded-demo({ "path": "chart-basic/combination-series", "showThemeSelector": true })

Plugins should be linked before plugins that use them. For example, the data processing plugin `Stack` should be defined after series plugins that should be group or displaed one under another other. Some plugins extend the `EventTracker`'s functionality and should follow it in the code.

NOTE: Refer to the plugin’s reference for information on its dependencies.
