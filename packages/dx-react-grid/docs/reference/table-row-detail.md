# TableRowDetail Plugin Reference

A plugin that renders detail rows.

## User Reference

### Dependencies

- [RowDetailState](row-detail-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
contentComponent | ElementType&lt;[DetailContentProps](#detailcontentprops)&gt; | | A component that renders the detail row's content within the detail cell.
cellComponent | ElementType&lt;[TableDetailCellProps](#tabledetailcellprops)&gt; | | A component that renders a detail cell.
rowComponent | ElementType&lt;[TableDetailRowProps](#tabledetailrowprops)&gt; | | A component that renders a detail row.
toggleCellComponent | ElementType&lt;[TableDetailToggleCellProps](#tabledetailtogglecellprops)&gt; | | A component that renders a cell containing the expand/collapse control.
toggleColumnWidth | number | | Specifies the width of the column containing expand/collapse controls.
rowHeight | number | | Specifies the detail row height.

## Interfaces

### DetailContentProps

Describes properties passed to a component that renders a detail row's content.

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
children? | ReactElement | A detail cell's child React element.

### TableDetailRowProps

Describes properties passed to a component that renders a detail row.

A value with the [TableRowProps](table.md#tablerowprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.

### TableDetailToggleCellProps

Describes properties passed to a component that renders a cell containing the expand/collapse control.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.
expanded | boolean | Specifies whether to expand the detail row.
onToggle | () => void | An event that initiates row expanding or collapsing.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableRowDetail.Cell | [TableDetailCellProps](#tabledetailcellprops) | A component that renders a detail cell.
TableRowDetail.Row | [TableDetailRowProps](#tabledetailrowprops) | A component that renders a detail row.
TableRowDetail.ToggleCell | [TableDetailToggleCellProps](#tabledetailtogglecellprops) | A component that renders a cell containing the expand/collaps control.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered.
expandedRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Expanded rows IDs.
toggleDetailRowExpanded | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId }) => void | Expands/collapses the specified row.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns, including the detail cell.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered, including detailed rows.
