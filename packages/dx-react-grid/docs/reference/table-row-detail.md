# TableRowDetail Plugin Reference

A plugin that renders a table detail row.

## User Reference

### Dependencies

- [RowDetailState](row-detail-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
template | (args: [DetailContentArgs](#detail-content-args)) => ReactElement | | A component that renders row details
detailCellTemplate | (args: [DetailCellArgs](#detail-cell-args)) => ReactElement | | A component that renders a detail cell
detailToggleCellTemplate | (args: [DetailToggleArgs](#detail-toggle-args)) => ReactElement | | A component that renders the detail toggle control
detailToggleCellWidth | number | | Specifies the detail toggle cell width
rowHeight | number &#124; string | 'auto' | Specifies the detail row height

## Interfaces

### <a name="detail-content-args"></a>DetailContentArgs

Describes properties passed to the template that renders row details

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md#table-row) | A row object for showing row details

### <a name="detail-cell-args"></a>DetailCellArgs

Describes properties passed to the template that renders a detail cell for a row

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md#table-row) | A row object
template | () => ReactElement | A component that renders row details

### <a name="detail-toggle-args"></a>DetailToggleArgs

Describes properties passed to the template that renders the detail toggle control

A value with the following shape:

Field | Type | Description
------|------|------------
expanded | boolean | Specifies whether row details are displayed
toggleExpanded | () => void | Toggles a row's expanded state

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns
tableBodyRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Body rows to be rendered
expandedRows | Getter | Array&lt;number &#124; string&gt; | Expanded rows
getRowId | Getter | (row: [Row](grid.md#row)) => number &#124; string | The function used to get a unique row identifier
setDetailRowExpanded | Action | ({ rowId }) => void | Expands the specified row
tableViewCell | Template | { row: [TableRow](table-view.md#table-row), column: [TableColumn](table-view.md#table-column), style?: Object, colspan?: number } | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns including the detail cell
tableBodyRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Body rows to be rendered, including detailed rows
