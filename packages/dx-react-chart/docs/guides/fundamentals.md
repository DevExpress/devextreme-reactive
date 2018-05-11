# React Chart - Fundamentals

The Chart component visualizes data from the 'data' property. For basic visualization in the Chart must be at least one of the following plugins, that each renders its type of series using data (line, spline, bar and etc):

- LineSeries
- ScatterSeries
- AreaSeries
- SplineSeries
- BarSeries
- PieSeries

To visualize extra elements such as axes, grids and legend use following plugins:
- ArgumentAxis - renders argumment axis
- ValueAxis - renders value axis
- Grid - renders grids for axis
- Legend - renders legend

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/combination-series.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>
