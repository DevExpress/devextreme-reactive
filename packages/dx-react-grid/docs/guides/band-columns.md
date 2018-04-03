# React Grid - Band Columns

The Grid component supports Band Columns. You can this feature by specifying child columns for a column in the table header.

## Related Plugins

The following plugins implement the Band Columns feature:

- [TableHeaderRow](../reference/table-header-row.md) - renders the header cells
- [TableBandHeader](../reference/table-band-header.md) - renders the nested header cells

## Basic Setup

Import the plugins listed above and specify the TableBandHeader plugin's `columnBands` property to set up a Grid with Band Columns. The nesting level depth is unlimited.

.embedded-demo({ "path": "grid-band-columns/basic", "showThemeSelector": true })
