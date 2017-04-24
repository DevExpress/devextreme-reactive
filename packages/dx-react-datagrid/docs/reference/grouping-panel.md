# GroupingPanel Plugin Reference

A plugin that renders a panel in the DataGrid header shows grouped columns. An end-user can change the grouping in real time by interacting with this panel.

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
groupedColumns | Array&lt;[Column](datagrid.md#column)&gt; | Columns by which the DataGrid is currently grouped
groupByColumn | ({ columnName: string }) | Toggles a column's grouping state
cellContentTemplate | Component&lt;[CellContentProps](#cell-content-props)&gt; | A template that should be used to render the content of the group panel cells

### <a name="cell-content-props"></a>CellContentProps

Describes properties passed to the cell content template when rendered

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](datagrid.md#column) | Specifies a column associated with the cell

## Plugin Developer Reference

To be described...
