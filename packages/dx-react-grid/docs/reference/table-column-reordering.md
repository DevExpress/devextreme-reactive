# TableColumnReordering Plugin Reference

A plugin that manages the displayed columns' order.

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
order | Array&lt;string&gt; | | Specifies the column order.
defaultOrder | Array&lt;string&gt; | | Specifies the initial column order in the uncontrolled mode.
onOrderChange | (nextOrder: Array&lt;string&gt;) => void | | Handles column order changes.
tableContainerComponent | ElementType&lt;[TableContainerProps](#tablecontainerprops)&gt; | | A component that renders a table container containing a drop target.
rowComponent | ElementType&lt;[TableRowProps](table.md#tablerowprops)&gt; | | A non-visual component that renders an invisible row required for drag-and-drop reordering.
cellComponent | ElementType&lt;[ReorderingCellProps](#reorderingcellprops)&gt; | | A non-visual component that renders an invisible cell required for drag-and-drop reordering.

## Interfaces

### TableContainerProps

Describes the table container component properties.

A value with the following shape:

Field | Type | Description
------|------|------------
onOver | (args: { payload: Array&lt;{ columnName: string }&gt;, clientOffset: { x: number } }) => void | Handles the column's "drag over" event.
onLeave | (args: { payload: Array&lt;{ columnName: string }&gt;, clientOffset: { x: number } }) => void | Handles the column's "drag leave" event.
onDrop | (args: { payload: Array&lt;{ columnName: string }&gt;, clientOffset: { x: number } }) => void | Handles the column's "drop" event.

### ReorderingCellProps

Describes the reordering row cell component properties.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
getCellDimensions | (dimensionsGetter: () => { left: number, right: number }) => void) | Accepts a function that returns the cell's horizontal boundaries.

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
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows including the service reordering row to be rendered.
