# React Grid - Fundamentals

The Grid component displays data specified via the `rows` property. You should also specify the `columns` property to define for which row fields the grid creates columns.

The Grid requires the following plugins for basic data visualization:

- [Table](../reference/table.md)
  Renders a data table.

- [TableHeaderRow](../reference/table-header-row.md)
  Renders the table's header row.

The `TableHeaderRow` plugin should follow the `Table` plugin. See the [Plugin Order](plugin-overview.md#plugin-order) article for more details.

.embedded-demo({ "path": "grid-basic/basic", "showThemeSelector": true })

## Appearance Customization

The Grid's visualization plugins provide a rich API to customize grid elements' appearance. Examples of the most popular customization tasks are described below.

The `Table` plugin allows you to customize the appearance of the table, table head and table body using the plugin's `tableComponent`, `headComponent`, `bodyComponent` and `containerComponent` [properties](../reference/table.md/#properties). The following example demonstrated how to use the `tableComponent` and create a 'striped' table:

.embedded-demo({ "path": "grid-basic/table-template", "showThemeSelector": true })

### Cells

The `Table` plugin also allows you to customize table cell appearance using the `cellComponent` property. For instance, you can implement conditional cell formatting as demonstrated in the following example:

.embedded-demo({ "path": "grid-basic/table-cell-template", "showThemeSelector": true })

### Rows

The `Table` plugin's `rowComponent` property enables you to handle row events like `onClick`, `onContextMenu`, etc., as demonstrated in the following demo:

.embedded-demo({ "path": "grid-basic/table-row-template", "showThemeSelector": true })

You can create a custom appearance from scratch or modify the default appearance settings the grid's `Table.Row` component provides. Read [Plugin Components](../reference/table.md#plugin-components) for details.

### Column width

Static widths for specific columns can be defined via the `columnExtensions` property of the `Table` plugin like it is shown in the demo below:

.embedded-demo({ "path": "grid-basic/static-column-width", "showThemeSelector": true })

### Other plugins

Other plugins ([TableHeaderRow](../reference/table-header-row.md), [TableEditRow](../reference/table-edit-row.md), [TableFilterRow](../reference/table-filter-row.md), [TableGroupRow](../reference/table-group-row.md) and [TableRowDetail](../reference/table-row-detail.md)) have a similar APIs for appearance customization.
