# TableGroupRow Plugin Reference

A plugin that renders group rows with the capability to expand and collapse them.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupRowCellTemplate | (args: [GroupRowCellArgs](#group-row-cell-args)) => ReactElement | | A component that renders a group row
groupIndentCellTemplate | (args: [GroupIndentCellArgs](#group-indent-cell-args)) => ReactElement | | A component that renders a group indent cell
groupIndentColumnWidth | number | | Width of the group indent columns

## Interfaces

### <a name="group-row-cell-args"></a>GroupRowCellArgs

Describes properties passed to the template that renders a group row.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [GroupRow](#group-row) | A group row data object
isExpanded | boolean | Specifies whether or not a row is expanded
toggleGroupExpanded | () => void | Toggles the expanded state of a group row

### <a name="group-indent-cell-args"></a>GroupIndentCellArgs

Describes properties passed to the template that renders a group indent cell.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [Row](grid.md#row) | A row object
column | [Column](grid.md#column) | A group indent column

### <a name="group-row"></a>GroupRow

Describes a group row data structure.

Extends [Row](grid.md#row)

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The column associated with the group
value | any | A value that unites all the rows inside a group

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | () => Array&lt;[TableColumn](table-view.md#table-column)&gt; | Columns of the table
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Columns to group by
expandedGroups | Getter | () => Set&lt;[GroupKey](grouping-state.md#group-key)&gt; | Expanded groups
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](grouping-state.md#group-key) }) => void | Toggles the expanded group state
tableViewCell | Template | { row: [TableRow](table-view.md#table-row), column: [TableColumn](table-view.md#table-column) } | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | () => Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns with groups
