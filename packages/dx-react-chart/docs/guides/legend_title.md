# React Chart - Legend and Title

The React Chart supports titles and legends. You can use the related plugins to display these chart elements.
The `Title` plugin includes only the `text` property that accepts the chart's title.
The `Legend` plugin contains a list of legend items. Each item specifies a marker and label. The marker has the same color as the corresponding series, and the item label stores the series name.

## Related Plugins

- [Legend](../reference/legend.md) - renders a legend
- [Title](../reference/title.md) - renders a title

## Basic Setup

Import the plugins listed above to set up a Chart with a legend and title.

.embedded-demo({ "path": "chart-basic/basic-legend", "showThemeSelector": true })

## Customize the Appearance

You can customize a legend marker and title as demonstrated in the following example:

.embedded-demo({ "path": "chart-basic/legend-customization", "showThemeSelector": true })

## Customize the Legend Layout


Use CSS styles to rearrange legend items and labels, as shown in the following example:

.embedded-demo({ "path": "layout/legend", "showThemeSelector": true })

## Customize the Title Layout

Like the legend layout, the title layout is customized using CSS styles. The following example shows how to align the title to the left:

.embedded-demo({ "path": "layout/title", "showThemeSelector": true })

