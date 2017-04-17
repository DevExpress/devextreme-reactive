# TableHeaderRowGrouping Plugin Reference

Plugin that extends the table view heading row. Renders component that toggles grouping state for a column.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [TableView](table-view.md)
- [TableHeaderRow](table-header-row.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupableCellTemplate | Component&lt;[GroupableCellProps](#groupable-cell-props)&gt; | | A component that renders a cell with a capability to group data by a column

## Interfaces

### <a name="groupable-cell-props"></a>GroupableCellProps

Describes the properties that are used to render a groupable header cell.

A value with the following shape:

Field | Type | Description
------|------|------------
groupByColumn | () => void | Toggles grouping for a column

## Plugin Developer Reference

To be described...
