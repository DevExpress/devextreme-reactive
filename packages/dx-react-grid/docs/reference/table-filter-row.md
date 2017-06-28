# TableFilterRow Plugin Reference

A plugin that renders a filter row.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rowHeight | number | | Specifies the filter row's height
filterCellTemplate | (args: [FilterCellArgs](#filter-cell-args)) => ReactElement | | A component that renders a filter cell

## Interfaces

### <a name="filter-cell-args"></a>FilterCellArgs

Describes properties passed to the filter row cell template.

A value with the following shape:

Field | Type | Description
------|------|------------
filter | [Filter](filtering-state.md#filter) | A filter applied to a column
setFilter | (filter: [Filter](filtering-state.md#filter)) => void | Apply a new filter to a column
column | [TableColumn](table-view.md#table-column) | Specifies a table column
style? | Object | Specifies filter cell styles

## Plugin Developer Reference

To be described...
