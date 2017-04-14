# GroupingPanel Plugin Reference

Plugin that renders group panel.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupPanelTemplate | Component&lt;[GroupPanelProps](#group-panel-props)&gt; | Renders group panel

## Interfaces

### <a name="group-panel-props"></a>GroupPanelProps

Describes properties passed to group panel template when rendered

A value with the following shape:

Field | Type | Description
------|------|------------
groupedColumns | Array&lt;[Column](datagrid.md#column)&gt; | Columns on that grouping was applied
groupByColumn | ({ columnName: string }) | Changes grouping state for column
cellContentTemplate | Component&lt;[CellContentProps](#cell-content-props)&gt; | Cell content template provided by plugin that should be rendered inside group panel

### <a name="cell-content-props"></a>CellContentProps

Describes properties passed to cell content template when rendered

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](datagrid.md#column) | Specifies column

## Plugin Developer Reference

To be described...
