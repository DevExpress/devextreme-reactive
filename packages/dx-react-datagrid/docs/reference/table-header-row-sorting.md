# TableHeaderRowSorting Plugin Reference

Plugin that extends table header row. Adds sort direction indicator and allows to change sort direction for column.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)
- [TableView](table-view.md)
- [TableHeaderRow](table-header-row.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sortableCellTemplate | Component&lt;[SortableCellProps](#sortable-cell-props)&gt; | | Component that renders cell with sort direction indicator

## Interfaces

### <a name="sortable-cell-props"></a>SortableCellProps

Describes properties used to render cell with sort indicator.

A value with the following shape:

Field | Type | Description
------|------|------------
direction? | 'asc' &#124; 'desc' | Specifies sorting direction if applied

## Plugin Developer Reference

To be described...
