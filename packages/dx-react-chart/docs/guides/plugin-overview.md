# React Chart - Plugin Overview

The Chart component uses plugin components to visualizes data specified via the `data` property. These components implement particular features and should be defined within the Chart component.

The React Chart supports the following plugin types:

- **UI plugins**
 Use the provided data to render UI elements.

- **Data processing plugins**
 Transform data passed to the Chart component.

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
- `Tooltip` - renders a tooltip

The following plugins implement additional features:

- `Animation` - animates all chart series when they first appear on-screen
- `EventTracker` - allows you to handle a click on a point or series
- `HoverState` - implements the *hovered* state for points and series
- `SelectionState` -  implements the *selected* state for points and series

## Data Processing Plugins

- `ArgumentScale` - allows you to customize the argument scale
- `ValueScale` - allows you to customize the value scale and display multiple value scales
- `Stack` - transforms user data to display series points side-by-side or one under another other

## Plugin Order

The plugin order is important. UI plugins are rendered in the same order as they are defined in the Chart component. For example, if the `BarSeries` plugin precedes the `LineSeries`, the line series overlays the bar series.

.embedded-demo({ "path": "chart-basic/combination-series", "showThemeSelector": true })

Note that the data processing plugin `Scale` should be defined after series and axes plugins because it requires options defined in these plugins for correct work.

The Chart's plugins use special components to render the UI. You can implement your component suite or use a predefined suite:

- [DevExtreme React Chart for Material-UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-material-ui) - renders the Chart's UI elements based on [Material-UI](https://material-ui.com/) components.
- [DevExtreme React Chart for Bootstrap 4](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-bootstrap4) - renders the Chart's UI elements based on [Bootstrap 4](http://getbootstrap.com/) components.
