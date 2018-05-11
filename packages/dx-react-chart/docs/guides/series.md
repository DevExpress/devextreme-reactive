# React Chart - Series

A series is a collection of related data points. The Chart provides 6 plugins for each type of series. All plugins have 'pointComponent' that renders points. LineSeries, SplineSeries and AreaSeries plugins have also 'pathComponent' that renders line or area path connected their points.

## Line and Spline Series

The `LineSeries` plugin visualize data as a collection of points connected by a line.

.embedded-demo({ "path": "chart-basic/line.skip", "showThemeSelector": true })

The `SplineSeries` plugin visualize data the same way as the `LineSeries` plugin only it draws curved line.

.embedded-demo({ "path": "chart-basic/spline.skip", "showThemeSelector": true })

## Area Series

The `AreaSeries` plugin draws an area filled with color.

.embedded-demo({ "path": "chart-basic/area.skip", "showThemeSelector": true })

## Scatter Series

The `ScatterSeries` plugin vizualize data the same way as the `LineSeries` plugin only without line.

.embedded-demo({ "path": "chart-basic/scatter.skip", "showThemeSelector": true })

## Bar Series

The `BarSeries` plugin vizualize data as collection of bars.

.embedded-demo({ "path": "chart-basic/group-bar.skip", "showThemeSelector": true })

## Pie Series

The `PieSeries` plugin visualizes data as pie slices that each represent a portion of the whole.

.embedded-demo({ "path": "chart-basic/pie.skip", "showThemeSelector": true })

## Stacked Series

From line, spline, area and bar series you can create stacked series using 'stack' option. For all series in the Chart this option should have the same name.
Example bellow demonstrate this posibility with `BarSeries` plugin.

.embedded-demo({ "path": "chart-basic/stacked-bar.skip", "showThemeSelector": true })

## Point Customize

The Chart component allows you customize the appearance of the points, using the `pointComponent` property. The following example demonstrate how create cross, diamond and star points using 'd3-shape' plugin.

.embedded-demo({ "path": "chart-basic/point-customization.skip", "showThemeSelector": true })
