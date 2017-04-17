# GroupingPanel Plugin Reference

Plugin that renders a panel in the DataGrid header indicating the current column grouping. Interacting with this panel an end-user can also change the grouping configuration in real-time.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupPanelTemplate | Component&lt;[GroupPanelProps](#group-panel-props)&gt; | Renders a group panel

## Interfaces

### <a name="group-panel-props"></a>GroupPanelProps

Describes properties passed to the group panel template when rendered

A value with the following shape:

Field | Type | Description
------|------|------------
groupedColumns | Array&lt;[Column](datagrid.md#column)&gt; | Columns that the DataGrid is currently grouped by
groupByColumn | ({ columnName: string }) | Toggles grouping state of a column
cellContentTemplate | Component&lt;[CellContentProps](#cell-content-props)&gt; | A template that should be used to render content of the group panel cells

### <a name="cell-content-props"></a>CellContentProps

Describes properties passed to the cell content template when rendered

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](datagrid.md#column) | Specifies a column associated with the cell

## Plugin Developer Reference

To be described...
