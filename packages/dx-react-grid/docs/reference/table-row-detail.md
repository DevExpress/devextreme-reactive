# TableRowDetail Plugin Reference

A plugin that renders a table detail row.

## User Reference

### Dependencies

- [RowDetailState](row-detail-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
template | (args: [DetailContentArgs](#detail-content-args)) => ReactElement | | A component that renders row details.
detailCellTemplate | (args: [DetailCellArgs](#detail-cell-args)) => ReactElement | | A component that renders a detail cell.
detailToggleCellTemplate | (args: [DetailToggleArgs](#detail-toggle-args)) => ReactElement | | A component that renders the detail toggle control.
detailRowTemplate | (args: [DetailRowArgs](#detail-row-args)) => ReactElement | | A component that renders a detail row.
detailToggleCellWidth | number | | Specifies the detail toggle cell width.
rowHeight | number &#124; string | 'auto' | Specifies the detail row height.

## Interfaces

### <a name="detail-content-args"></a>DetailContentArgs

Describes properties passed to the template that renders row details

A value with the following shape:

Field | Type | Description
------|------|------------
row | any | A row.

### <a name="detail-cell-args"></a>DetailCellArgs

Describes properties passed to the template that renders a detail cell for a row

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.
template | () => ReactElement | A component that renders row details.

### <a name="detail-row-args"></a>DetailRowArgs

Describes properties passed to the template that renders a detail row

A value with the [TableRowProps](table.md#tablerowprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.

### <a name="detail-toggle-args"></a>DetailToggleArgs

Describes properties passed to the template that renders the detail toggle control

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.
expanded | boolean | Specifies if row details are displayed.
toggleExpanded | () => void | Toggles a row's expanded state.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered.
expandedRows | Getter | Array&lt;number &#124; string&gt; | Expanded rows.
setDetailRowExpanded | Action | ({ rowId }) => void | Expands the specified row.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the detail cell.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered, including detailed rows.
