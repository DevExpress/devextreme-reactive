# TableHeaderRowGrouping Plugin Reference

A plugin that extends a table view with a heading row and renders a component that togles a column's grouping state.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [TableView](table-view.md)
- [TableHeaderRow](table-header-row.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupableCellTemplate | Component&lt;[GroupableCellProps](#groupable-cell-props)&gt; | | A component that renders a cell with the capability to group data by a column

## Interfaces

### <a name="groupable-cell-props"></a>GroupableCellProps

Describes properties that are used to render a groupable header cell.

A value with the following shape:

Field | Type | Description
------|------|------------
groupByColumn | () => void | Toggles grouping for a column

## Plugin Developer Reference

To be described...
