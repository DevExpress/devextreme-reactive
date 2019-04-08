# React Chart - Plugin Overview

The Chart component uses plugin components to visualize data specified via the `data` property. Each plugin component implements a particular feature and should be defined within the Chart component.

## Plugin Types

- **Animation plugins** animate all chart series.
- **Interactivity plugins** provide user interaction: click, hover, selection.
- **Data processing plugins** transform data provided to the Chart component.
- **UI plugins** use the provided data to render UI elements.

## Animation Plugins

- `Animation` - animates all chart series when they first appear on screen.

## Interactivity Plugins

- `EventTracker` - allows you to handle a click on a point or series.
- `HoverState` - implements the *hovered* state for points and series.
- `SelectionState` - implements the *selected* state for points and series.
- `ZoomAndPan` - allows you to set the chart's viewport and change it in response to mouse and touch events.

## Data Processing Plugins

- `ArgumentScale` - allows you to customize the argument scale.
- `ValueScale` - allows you to customize the value scale and display multiple value scales.
- `Stack` - transforms data to display series points side-by-side or one under another.

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

Chart plugins use different components to render the UI. You can implement your component suite or use a predefined suite:

- [DevExtreme React Chart for Material-UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-material-ui) - renders the Chart's UI elements based on [Material-UI](https://material-ui.com/) components.
- [DevExtreme React Chart for Bootstrap 4](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-chart-bootstrap4) - renders the Chart's UI elements based on [Bootstrap 4](http://getbootstrap.com/) components.

## Plugin Order

The plugin order is important. Series plugins are rendered in the same order as they are defined in the Chart component. For example, if the `BarSeries` plugin precedes the `LineSeries`, the line series overlays the bar series.

.embedded-demo({ "path": "chart-basic/combination-series", "showThemeSelector": true })

A plugin's dependencies should be declared before the plugin. For example, the `Stack` plugin depends on series plugins. If several series should be stacked, declare their plugins before `Stack`. This also applies to plugins that extend the functionality of other plugins. For example, a plugin that extends the `EventTracker`'s functionality should be declared after the `EventTracker`.

NOTE: Refer to the plugin's reference for information on its dependencies.
