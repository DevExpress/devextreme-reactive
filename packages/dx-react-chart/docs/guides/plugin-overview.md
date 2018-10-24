# React Chart - Plugin Overview

The Chart component visualizes data specified via the `data` property using plugin components. These components implement particular features and should be defined within the Chart component.

The React Chart supports the following plugin types:

- **UI plugins**
 Render UI elements using the provided data.

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

- `ArgumentAxis` - renders an argument axis
- `ValueAxis` - renders a value axis
- `ArgumentGrid` - renders an argument grid
- `ValueGrid` - renders a value grid
- `Legend` - renders a legend
- `Title` - renders a title

The following plugins implement additional features:

- `Animation` - animates all the chart's series when they first appear on-screen

## Data Processing Plugins

- `Scale` - extends user data with service information that is required to render axes and series
- `Stack` - transforms user data to display series points side-by-side or one under another other

## Plugin Order

The plugin order is important. UI plugins are rendered in the same order as they are defined in the Chart component. For example, if the `BarSeries` plugin precedes the `LineSeries`, the line series overlays the bar series.

.embedded-demo({ "path": "chart-basic/combination-series", "showThemeSelector": true })

Note that the data processing plugin `Scale` should be defined after series and axes plugins because it requires options defined in these plugins for correct work.

The Chart's plugins use special components to render the UI. You can implement your component suite or use a predefined suite:

- [DevExtreme React Chart for Material-UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-material-ui) - renders the Chart's UI elements based on [Material-UI](https://material-ui.com/) components.
- [DevExtreme React Chart for Bootstrap 4](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-bootstrap4) - renders the Chart's UI elements based on [Bootstrap 4](http://getbootstrap.com/) components.
