# React Chart - Fundamentals

The Chart component visualizes data specified via the `data` property.

At least one of the following plugins that render series of the specified type (line, area, bar, etc.) is also required:

- `LineSeries`
- `ScatterSeries`
- `AreaSeries`
- `SplineSeries`
- `BarSeries`
- `PieSeries`

Use the following plugins to visualize extra elements such as the axes, grid, and legend:

- `ArgumentAxis` - renders an argument axis
- `ValueAxis` - renders a value axis
- `Grid` - renders a grid
- `Legend` - renders a legend

.embedded-demo({ "path": "chart-basic/combination-series.skip", "showThemeSelector": true })
