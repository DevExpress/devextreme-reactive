# React Grid - Band Columns

The Grid component supports the Band Columns feature. You can specify the children columns to implement multiple levels of columns in your table header.

## Related Plugins

The following plugins implement the Band Columns feature:

- [TableHeaderRow](../reference/table-header-row.md) - renders the header cells
- [TableBandHeader](../reference/table-band-header.md) - renders the nested header cells

## Basic Setup

Import the plugins listed above and specify a required the TableBandHeader's property `columnBands` to set up a Grid with the Band Columns feature. The Band Columns are provide the columns in a tree hierarchy to the Data Grid. Levels of nested columns are unlimited.

.embedded-demo({ "path": "grid-column-groups/basic", "showThemeSelector": true })
