# React Grid - Fundamentals

The Grid component displays data specified via the `rows` property. You should also specify the `columns` property to define for which row fields the grid creates columns.

The Grid requires the following plugins for basic data visualization:

- [Table](../reference/table.md)
  Renders a data table.

- [TableHeaderRow](../reference/table-header-row.md)
  Renders the table's header row.

The `TableHeaderRow` plugin should follow the `Table` plugin. See the [Plugin Order](plugin-overview.md#plugin-order) article for more details.

.embedded-demo(basic/basic)

## Appearance Customization

The Grid's visualization plugins provide a rich API to customize grid elements' appearance. Examples of the most popular customization tasks are described below.

The `Table` plugin allows you to customize table cell appearance using the `cellComponent` property. For instance, you can implement conditional cell formatting as demonstrated in the following example:

.embedded-demo(basic/table-cell-template)

The `Table` plugin's `rowComponent` property enables you to handle row events like `onClick`, `onContextMenu`, etc., as demonstrated in the following demo:

.embedded-demo(basic/table-row-template)

You can create a custom appearance from scratch or modify the default appearance settings the grid's `Table.Row` component provides. Read [Plugin Components](../reference/table.md#plugin-components) for details.

Other plugins ([TableHeaderRow](../reference/table-header-row.md), [TableEditRow](../reference/table-edit-row.md), [TableFilterRow](../reference/table-filter-row.md), [TableGroupRow](../reference/table-group-row.md) and [TableRowDetail](../reference/table-row-detail.md)) have a similar API for appearance customization.
