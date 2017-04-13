# TableHeaderRowGrouping Plugin Reference

Plugin that extends table header row. Renders component that toggles grouping state for column.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [TableView](table-view.md)
- [TableHeaderRow](table-header-row.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupableCellTemplate | Component&lt;[GroupableCellProps](#groupable-cell-props)&gt; | | Component that renders cell with ability to group data by column

## Interfaces

### <a name="groupable-cell-props"></a>GroupableCellProps

Describes properties used to render cell with sort indicator.

Field | Type | Description
------|------|------------
groupByColumn | () => void | Toggles grouping for column.

## Plugin Developer Reference

To be described...
