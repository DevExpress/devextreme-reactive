# TableRowDetail Plugin Reference

A plugin that renders a table detail row.

## User Reference

### Dependencies

- [RowDetailState](row-detail-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
contentComponent | ElementType&lt;[DetailContentProps](#detailcontentprops)&gt; | | A component that renders row details.
cellComponent | ElementType&lt;[TableDetailCellProps](#tabledetailcellprops)&gt; | | A component that renders a detail cell.
rowComponent | ElementType&lt;[TableDetailRowProps](#tabledetailrowprops)&gt; | | A component that renders a detail row.
toggleCellComponent | ElementType&lt;[TableDetailToggleCellProps](#tabledetailtogglecellprops)&gt; | | A component that renders a cell with the detail toggle control.
toggleColumnWidth | number | | Specifies the detail toggle column width.
rowHeight | number | | Specifies the detail row height.

## Interfaces

### DetailContentProps

Describes properties passed to component that renders row details.

A value with the following shape:

Field | Type | Description
------|------|------------
row | any | A row.

### TableDetailCellProps

Describes properties passed to a component that renders a detail cell.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.
children? | ReactElement | A React element to be placed in a detail cell.

### TableDetailRowProps

Describes properties passed to a component that renders a detail row.

A value with the [TableRowProps](table.md#tablerowprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.

### TableDetailToggleCellProps

Describes properties passed to a component that renders a cell with the detail toggle control.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.
expanded | boolean | Specifies if row details are displayed.
onToggle | () => void | An event that initiates toggling a row's expanded state.

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
