# TableFilterRow Plugin Reference

A plugin that renders a row with filtering controls right under the Grid heading row.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rowHeight | number | | Specifies the height for the filter row
filterCellTemplate | (args: [FilterCellArgs](#filter-cell-args)) => ReactElement | | A component that renders a cell with the capability to change a column filter

## Interfaces

### <a name="filter-cell-args"></a>FilterCellArgs

Describes properties passed to the filter row cell template.

A value with the following shape:

Field | Type | Description
------|------|------------
filter | string | A filter applied to a column
setFilter | (filter: string) => void | Set a new filter value for a column

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | () => Array&lt;[TableRow](table-view.md#table-row)&gt; | Rows to be rendered inside the table header
filters | Getter | () => Array&lt;[Filter](filtering-state.md#filter)&gt; | Applied column filters
setColumnFilter | Action | ({ columnName: string, config: object }) => void | Changes a column filter. Removes the filter if config is `null`
tableViewCell | Template | { row: [TableRow](table-view.md#table-row), column: [TableColumn](table-view.md#table-column) } | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | () => Array&lt;[TableRow](table-view.md#table-row)&gt; | Rows with filters to be rendered inside the table header
