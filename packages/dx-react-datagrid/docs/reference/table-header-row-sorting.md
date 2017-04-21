# TableHeaderRowSorting Plugin Reference

A plugin that extends the table view header row with the sort order indicator and allows an end-user to change sorting by a column.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)
- [TableView](table-view.md)
- [TableHeaderRow](table-header-row.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sortableCellTemplate | Component&lt;[SortableCellProps](#sortable-cell-props)&gt; | | A component that renders a cell with the current sort order indicator

## Interfaces

### <a name="sortable-cell-props"></a>SortableCellProps

Describes properties used to render a cell with a sort indicator.

A value with the following shape:

Field | Type | Description
------|------|------------
direction? | 'asc' &#124; 'desc' | Specifies the column sort order if applied

## Plugin Developer Reference

To be described...
