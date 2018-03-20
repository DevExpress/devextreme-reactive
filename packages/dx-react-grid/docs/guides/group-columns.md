# React Grid - Column Groups

The Grid component supports the Column Groups. You can specify the nested columns for implement multiple levels of columns in your table header.

## Related Plugins

The following plugins implement the Column Groups feature:

- [TableHeaderRow](../reference/table-header-row.md) - renders the header cells
- [TableGroupHeader](../reference/table-header-row.md) - renders the nested header cells

## Basic Setup

Import the plugins listed above and specify a required TableGroupHeader's property `columnGroups` to set up a Grid with the Column Groups feature. Column groups are provide the columns in a tree hierarchy to the Data Grid. Levels of nested columns are unlimited.

.embedded-demo({ "path": "grid-column-groups/basic", "showThemeSelector": true })

## Column Groups With Other Features

The following demo demonstrated how to configure the DevExpress Data Grid with column groups.

.embedded-demo({ "path": "grid-column-groups/featured", "showThemeSelector": true })
