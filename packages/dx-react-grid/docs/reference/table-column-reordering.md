# TableColumnReordering Plugin Reference

A plugin that manages the displayed columns' order.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableColumnReordering } from '@devexpress/dx-react-grid-material-ui';
// import { TableColumnReordering } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableColumnReordering } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableColumnReordering } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [Table](table.md)
- [DragDropProvider](drag-drop-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
order? | Array&lt;string&gt; | | The column order.
defaultOrder? | Array&lt;string&gt; | [] | The initial column order in the uncontrolled mode.
onOrderChange? | (nextOrder: Array&lt;string&gt;) => void | | Handles changes to the column order.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
table | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the table.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Ordered table columns.
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered including the service reordering row.
