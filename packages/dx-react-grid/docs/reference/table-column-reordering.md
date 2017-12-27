# TableColumnReordering Plugin Reference

A plugin that manages the displayed columns' order.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
order | Array&lt;string&gt; | | The column order.
defaultOrder | Array&lt;string&gt; | | The initial column order in the uncontrolled mode.
onOrderChange | (nextOrder: Array&lt;string&gt;) => void | | Handles changes to the column order.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
table | Template | Object? | A template that renders the table.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Ordered table columns.
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered including the service reordering row.
