# TableGroupRow Plugin Reference

Plugin that renders group rows and allows to expand/collapse it.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupRowCellTemplate | Component&lt;[GroupRowCellProps](#group-row-cell-props)&gt; | | Component that renders detail for row

## Interfaces

### <a name="group-row-cell-props"></a>GroupRowCellProps

Describes properties passed to template that renders group row.

Field | Type | Description
------|------|------------
row | [GroupRow](#group-row) | Row used to display group row
isExpanded | boolean | Specifies whether or not row is expanded
toggleGroupExpanded | () => void | Toggles expanded state for row

### <a name="group-row"></a>GroupRow

Describes group row data structure.

Extends [Row](datagrid.md#row)

Field | Type | Description
------|------|------------
column | string | Column name by that group was formed
value | any | Value that unites all rows inside group

## Plugin Developer Reference

To be described...
