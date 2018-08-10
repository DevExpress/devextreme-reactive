# React Chart - Plugin Overview

The Chart component visualizes data specified via the `data` property using plugins. These components implement particular features and should be defined within the Chart component.

The React Chart includes:

- UI plugins that render specific UI elements using the provided data.
- Data processing plugins transform data passed to the Chart component.

## UI Plugins

The following plugins render a corresponding series:

- `LineSeries`
- `ScatterSeries`
- `AreaSeries`
- `SplineSeries`
- `BarSeries`
- `PieSeries`

The plugins below render extra elements like a grid, legend, axes, etc.

- `ArgumentAxis` - renders an argument axis
- `ValueAxis` - renders a value axis
- `Grid` - renders a grid
- `Legend` - renders a legend
- `Title` - renders a title

## Data Processing Plugins

- `Scale` - process data for futher rendering axes and series.

## Plugin Order

The plugin order is important. UI plugins are rendered in the same order they are defined in the Chart component. For example, if the `BarSeries` plugin precedes the `LineSeries`, the line series overlays the bar series.

.embedded-demo({ "path": "chart-basic/combination-series", "showThemeSelector": true })

Also the data processing plugin `Scale` should be after series and axes plugins because it is use their options for correct processing data.

The Chart's plugins use special components to render the UI. You can implement your component suite or use a predefined one:

- [DevExtreme React Chart for Material UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-material-ui) - renders the Chart's UI elements based on [Material UI](http://www.material-ui.com) components.
- [DevExtreme React Chart for Bootstrap 4](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-bootstrap4) - renders the Chart's UI elements based on [Bootstrap 4](http://getbootstrap.com/) components.
