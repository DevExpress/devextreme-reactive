# React Chart - Series

A series is a collection of related data points. The Chart provides an individual plugin for each series type. All the plugins have the `pointComponent` that renders the series points; the `LineSeries`, `SplineSeries`, and `AreaSeries` plugins also have the `seriesComponent` that renders the path (line or area) connecting the series points.

## Line and Spline Series

The `LineSeries` plugin visualizes data as a collection of points connected by a broken line.

The `SplineSeries` plugin connects the points by a line as well, but that line is smooth.

.embedded-demo({ "path": "chart-basic/line-spline", "showThemeSelector": true })

## Area Series

The `AreaSeries` plugin draws an area filled with a color. This area is limited on top by a broken line.

.embedded-demo({ "path": "chart-basic/area", "showThemeSelector": true })

## Scatter Series

The `ScatterSeries` plugin draws a collection of scattered points.

.embedded-demo({ "path": "chart-basic/scatter", "showThemeSelector": true })

## Bar Series

The `BarSeries` plugin vizualizes data as a collection of bars.

.embedded-demo({ "path": "chart-basic/bar", "showThemeSelector": true })

## Pie Series

The `PieSeries` plugin visualizes data as a circle divided into sectors that each represents a portion of the whole.

.embedded-demo({ "path": "chart-basic/pie", "showThemeSelector": true })

## Customize Point Appearance

The `pointComponent` property allows you to customize the points' appearance. The following example shows how to change the points' shape. [`d3-shape`](https://github.com/d3/d3-shape/blob/master/README.md) (a 3rd-party plugin) provides the shapes.

.embedded-demo({ "path": "chart-basic/point-customization", "showThemeSelector": true })
