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
tableContainerTemplate | (args: [TableContainerArgs](#table-container-args)) => ReactElement | | A component that renders a table wrapper containing a drop target.
reorderingRowTemplate | (args: [TableRowArgs](table.md#table-row-args)) => ReactElement | | A non-visual component that renders an invisible row required for drag-and-drop reordering.
reorderingCellTemplate | (args: [ReorderingCellArgs](#reordering-cell-args)) => ReactElement | | A non-visual component that renders an invisible cell required for drag-and-drop reordering.

## Interfaces

### <a name="table-container-args"></a>TableContainerArgs

Describes properties passed to the table container template.

A value with the following shape:

Field | Type | Description
------|------|------------
onOver | (args: { payload: Array&lt;{ columnName: string }&gt;, clientOffset: { x: number } }) => void | Handles the column's "drag over" event.
onLeave | (args: { payload: Array&lt;{ columnName: string }&gt;, clientOffset: { x: number } }) => void | Handles the column's "drag leave" event.
onDrop | (args: { payload: Array&lt;{ columnName: string }&gt;, clientOffset: { x: number } }) => void | Handles the column's "drop" event.

### <a name="reordering-cell-args"></a>ReorderingCellArgs

Describes properties passed to the reordering row cell template.

A value with the [TableCellArgs](table.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
getCellDimensions | (dimensionsGetter: () => { left: number, right: number }) => void) | Accepts a function that returns the cell's horizontal boundaries.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns.
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#table-row)&gt; | Header rows to be rendered.
table | Template | Object? | A template that renders the table.
tableRow | Template | [TableRowArgs](table.md#table-row-args) | A template that renders a table row.
tableCell | Template | [TableCellArgs](table.md#table-cell-args) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Ordered table columns.
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#table-row)&gt; | Header rows including the service reordering row to be rendered.
