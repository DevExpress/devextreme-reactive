---
title: React Chart - Series
---

# React Chart - Series

A series is a collection of related data points. The Chart provides 6 plugins for each type of series. All plugins have 'pointComponent' that renders points. LineSeries, SplineSeries and AreaSeries plugins have also 'pathComponent' that renders line or area path connected their points.

## Line and Spline Series

The LineSeries plugin visualize data as a collection of points connected by a line.

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/line.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>

The SplineSeries plugin visualize data the same way as the LineSeries plugin only it draws curved line.

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/spline.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>

## Area Series

The AreaSeries plugin draws an area filled with color.

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/area.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>

## Scatter Series

The ScatterSeries plugin vizualize data the same way as the LineSeries plugin only without line.

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/scatter.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>

## Bar Series

The BarSeries plugin vizualize data as collection of bars.

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/group-bar.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>

## Pie Series

The PieSeries plugin visualizes data as pie slices that each represent a portion of the whole.

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/pie.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>

## Stacked Series

From line, spline, area and bar series you can create stacked series using 'stack' option. For all series in the Chart this option should have the same name.
Example bellow demonstrate this posibility with BarSeries plugin.

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/stacked-bar.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>

## Point Customize

The Chart component allows you customize the appearance of the points, using the 'pointComponent' plugin. The following example demonstrate how create cross, diamond and star points using 'd3-shape' plugin.

<div
    class="embedded-demo"
    data-options='{"path":"/demo/chart-basic/point-customization.skip","showThemeSelector":true,"scriptPath":"{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}"}'
>
</div>
