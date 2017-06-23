# TableGroupRow Plugin Reference

A plugin that renders group rows with the capability to expand and collapse them.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupCellTemplate | (args: [GroupCellArgs](#group-cell-args)) => ReactElement | | A component that renders a group row
groupIndentCellTemplate | (args: [GroupIndentCellArgs](#group-indent-cell-args)) => ReactElement | null | A component that renders a group indent cell
groupIndentColumnWidth | number | | Width of the group indent columns

## Interfaces

### <a name="group-cell-args"></a>GroupCellArgs

Describes the properties passed to the template that renders a group row.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [GroupRow](#group-row) | A group row data object
isExpanded | boolean | Specifies if a row is expanded
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

To be described...
