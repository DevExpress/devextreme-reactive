# TableGroupRow Plugin Reference

A plugin that renders group rows with the capability to expand and collapse them.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupRowCellTemplate | Component&lt;[GroupRowCellProps](#group-row-cell-props)&gt; | | A component that renders the content of a group row

## Interfaces

### <a name="group-row-cell-props"></a>GroupRowCellProps

Describes properties passed to the template that renders the group row content.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [GroupRow](#group-row) | A group row data object
isExpanded | boolean | Specifies whether or not a row is expanded
toggleGroupExpanded | () => void | Toggles the expanded state of a group row

### <a name="group-row"></a>GroupRow

Describes a group row data structure.

Extends [Row](datagrid.md#row)

A value with the following shape:

Field | Type | Description
------|------|------------
column | string | The name of the column associated with the group
value | any | A value that unites all the rows inside a group

## Plugin Developer Reference

To be described...
