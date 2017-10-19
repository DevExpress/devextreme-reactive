# TableColumnReordering Plugin Reference

A plugin that manages the displayed columns' order.

## User Reference

### Dependencies

- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
order | Array&lt;string&gt; | | Specifies the column order.
defaultOrder | Array&lt;string&gt; | | Specifies the initial column order in the uncontrolled mode.
onOrderChange | (nextOrder: Array&lt;string&gt;) => void | | Handles column order changes.
tableViewTemplate | (args: [TableViewArgs](#table-view-args)) => ReactElement | | A component that renders a wrapper, which is responsible for column dropping, around the table.
reorderingRowTemplate | (args: [TableRowArgs](table-view.md#table-row-args)) => ReactElement | | A component that renders a reordering row.
reorderingCellTemplate | (args: [ReorderingCellArgs](#reordering-cell-args)) => ReactElement | | A component that renders a reordering cell.

## Interfaces

### <a name="table-view-args"></a>TableViewArgs

Describes properties passed to the table view template.

A value with the following shape:

Field | Type | Description
------|------|------------
onOver | (args: { payload: Array&lt;{ columnName: string }&gt;], clientOffset: { x: number } }) => void | Handles column drag over.
onLeave | (args: { payload: Array&lt;{ columnName: string }&gt;], clientOffset: { x: number } }) => void | Handles column drag leave.
onDrop | (args: { payload: Array&lt;{ columnName: string }&gt;], clientOffset: { x: number } }) => void | Handles column drop.

### <a name="reordering-cell-args"></a>ReorderingCellArgs

Describes properties passed to the reordering row cell template.

A value with the [TableCellArgs](table-view.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
getCellDimension | (fn: () => { left: number, right: number }) => void) | A function that accepts another function responsible for getting the cell's horizontal bounds.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns.
tableHeaderRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Header rows to be rendered.
tableView | Template | Object? | A template that renders the table.
tableViewRow | Template | [TableRowArgs](table-view.md#table-row-args) | A template that renders a table row.
tableViewCell | Template | [TableCellArgs](table-view.md#table-cell-args) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Ordered table columns.
tableHeaderRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Header rows including the service reordering row to be rendered.
