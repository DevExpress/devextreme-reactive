# React Grid - Column Groups

The Grid component supports the Column Groups. You can specify the nested columns to implement multiple levels of columns in your table header.

## Related Plugins

The following plugins implement the Column Groups feature:

- [TableHeaderRow](../reference/table-header-row.md) - renders the header cells
- [TableGroupHeader](../reference/table-group-header.md) - renders the nested header cells

## Basic Setup

Import the plugins listed above and specify a required the TableGroupHeader's property `columnGroups` to set up a Grid with the Column Groups feature. Column groups are provide the columns in a tree hierarchy to the Data Grid. Levels of nested columns are unlimited.

.embedded-demo({ "path": "grid-column-groups/basic", "showThemeSelector": true })
