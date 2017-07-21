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

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Header rows to be rendered
filters | Getter | Array&lt;[Filter](filtering-state.md#filter)&gt; | Applied column filters
setColumnFilter | Action | ({ columnName: string, config: Object }) => void | Changes a column filter. Removes the filter if config is `null`
tableViewCell | Template | { row: [TableRow](table-view.md#table-row), column: [TableColumn](table-view.md#table-column) } | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Header rows with filters to be rendered
