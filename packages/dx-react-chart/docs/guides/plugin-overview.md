# React Chart - Plugin Overview

The Chart component visualizes data specified via the `data` property using plugins that implement particular features. These plugins should be defined within the Chart component.

## UI Plugins

UI plugins render their features using data passed to the Chart component.

At least one of the following plugins needs to render series of the specified type (line, area, bar, etc.):

- `LineSeries`
- `ScatterSeries`
- `AreaSeries`
- `SplineSeries`
- `BarSeries`
- `PieSeries`

Use the following plugins to visualize extra elements such as the axes, grid, legend:

- `ArgumentAxis` - renders an argument axis
- `ValueAxis` - renders a value axis
- `Grid` - renders a grid
- `Legend` - renders a legend
- `Title` - renders a title


The UI plugin's order is important because they are rendered in the order they were defined in the Chart. For example, if the `BarSeries` plugin precedes the `LineSeries`, the bar series will be drawn under the line series.

.embedded-demo({ "path": "chart-basic/combination-series.wb3", "showThemeSelector": true })

The Chart's UI plugins use special components to render the UI. You can implement your component suite or use a predefined one:

- [DevExtreme React Chart for Material UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-material-ui) - renders the Chart's UI elements based on [Material UI](http://www.material-ui.com) components.
- [DevExtreme React Chart for Bootstrap 4](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-bootstrap4) - renders the Chart's UI elements based on [Bootstrap 4](http://getbootstrap.com/) components.
