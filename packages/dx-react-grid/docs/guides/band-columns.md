# React Grid - Band Columns

The Grid component supports band columns. You can add this feature by specifying banded columns for a band column.

## Related Plugins

The following plugins implement the Band Columns feature:

- [TableHeaderRow](../reference/table-header-row.md) - renders the banded cells
- [TableBandHeader](../reference/table-band-header.md) - renders the band cells

## Basic Setup

Import the plugins listed above and specify the TableBandHeader plugin's `columnBands` property to set up a Grid with band columns. The nesting level depth is unlimited.

.embedded-demo({ "path": "grid-band-columns/basic", "showThemeSelector": true })

## Appearance Customization

The TableBandHeader plugin allows you to customize the appearance of the header with bands. The following example demonstrates how to use the cellComponent and add icons to band cells:

.embedded-demo({ "path": "grid-band-columns/customization", "showThemeSelector": true })
