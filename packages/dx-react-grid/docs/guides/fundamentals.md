# React Grid - Fundamentals

The Grid component displays data specified via the `rows` property. You should also specify the `columns` property to define for which row fields the grid creates columns.

The Grid requires the following plugins for basic data visualization:

- [Table](../reference/table.md) - renders a data table
- [TableHeaderRow](../reference/table-header-row.md) - renders the table's header row

The `TableHeaderRow` plugin should follow the `Table` plugin. See the [Plugin Order](plugin-overview.md#plugin-order) article for more information.

.embedded-demo({ "path": "grid-basic/basic", "showThemeSelector": true })

## Customize the Appearance

The Grid's visualization plugins provide a rich API to customize grid elements' appearance. Examples of the most popular customization tasks are described below.

The `Table` plugin allows you to customize the appearance of the table, table head and table body using the plugin's `tableComponent`, `headComponent`, `bodyComponent` and `containerComponent` [properties](../reference/table.md/#properties). The following example demonstrated how to use the `tableComponent` and create a 'striped' table:

.embedded-demo({ "path": "grid-basic/table-template", "showThemeSelector": true })

*Note: Other plugins ([TableHeaderRow](../reference/table-header-row.md), [TableEditRow](../reference/table-edit-row.md), [TableFilterRow](../reference/table-filter-row.md), [TableGroupRow](../reference/table-group-row.md) and [TableRowDetail](../reference/table-row-detail.md)) use the same API to customize UI elements' appearance.*

### Cells

The `Table` plugin also allows you to customize table cell appearance using the `cellComponent` property. For instance, you can implement conditional cell formatting as demonstrated in the following example:

.embedded-demo({ "path": "grid-basic/table-cell-template", "showThemeSelector": true })

### Rows

The `Table` plugin's `rowComponent` property enables you to handle row events like `onClick`, `onContextMenu`, etc., as demonstrated in the following demo:

.embedded-demo({ "path": "grid-basic/table-row-template", "showThemeSelector": true })

You can create a custom appearance from scratch or modify the default appearance settings the grid's `Table.Row` component provides. Read [Plugin Components](../reference/table.md#plugin-components) for more information.

### Column Alignment

The `Table` plugin's `columnExtensions` allows you to specify the column alignment.

.embedded-demo({ "path": "grid-basic/column-alignment", "showThemeSelector": true })

### Column Width

To specify static widths for specific columns, use the `Table` plugin's [`columnExtensions`](../reference/table.md/#tablecolumnextension) property. You can define the widths in pixels or CSS-accepted units:

.embedded-demo({ "path": "grid-basic/static-column-width", "showThemeSelector": true })

### Multiline Cells

The Grid cuts off values that do not fit in a cell. Set the [column extension](../reference/table.md/#tablecolumnextension)s' `wordWrapEnabled` property to true to enable word wrap for these columns.

.embedded-demo({ "path": "grid-basic/cell-wordwrap", "showThemeSelector": true })

### Custom Content in Header Cells

You can pass a custom component to the TableHeaderRow plugin's `contentComponent` property to display additional elements in the Grid's header.

.embedded-demo({ "path": "grid-basic/table-header-content-template", "showThemeSelector": true })




