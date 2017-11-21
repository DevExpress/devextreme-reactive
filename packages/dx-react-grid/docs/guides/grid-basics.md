# Grid Basics

The Grid component displays data specified via the `rows` property. You should also specify the `columns` property to define for which row fields the grid creates columns.

```js
<Grid
  rows={[
    { region: 'South America', sector: 'Banking' },
    { region: 'Africa', sector: 'Manufacturing' },
    /* ... */
  ]}
  columns={[
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    /* ... */
  ]}
>
</Grid>
```

The grid requires the following plugins for basic data visualization:

- [Table](../reference/table.md)
 Renders a data table.

- [TableHeaderRow](../reference/table-header-row.md)
 Renders the table's header row.

```js
<Grid
  rows={rows}
  columns={columns}
>
  <Table />
  <TableHeaderRow />
</Grid>
```

The `TableHeaderRow` plugin should follow the `Table` plugin. See the [Plugin Order](plugin-overview.md#plugin-order) article for more details.

.embedded-demo(basic/basic)

## Appearance Customization

The Grid's visualization plugins provide a rich API to customize grid elements' appearance. Examples of the most popular customization tasks are described below.

The `Table` plugin allows you to customize table cell appearance using the `tableCellTemplate` property. For instance, you can implement conditional cell formatting as demonstrated in the following example:

Note that you can pass **undefined** to the `tableCellTemplate` property to restore the default template.

.embedded-demo(basic/table-cell-template)

The `Table` plugin's `tableRowTemplate` property enables you to handle row events like `onClick`, `onContextMenu` etc. as demonstrated in the following demo:

Note that the `children` argument field is used to render row cells in a default way.

.embedded-demo(basic/table-row-template)

Other plugins ([TableHeaderRow](../reference/table-header-row.md), [TableEditRow](../reference/table-edit-row.md), [TableFilterRow](../reference/table-filter-row.md), [TableGroupRow](../reference/table-group-row.md) and [TableRowDetail](../reference/table-row-detail.md)) have a similar API for appearance customization.
