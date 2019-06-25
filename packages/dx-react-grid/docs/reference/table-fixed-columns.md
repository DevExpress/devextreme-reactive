# TableFixedColumns Plugin Reference

A plugin that enables you to fix columns to the left and right sides of the grid.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableFixedColumns } from '@devexpress/dx-react-grid-material-ui';
// import { TableFixedColumns } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableFixedColumns } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableFixedColumns } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [Table](table.md)
- [TableBandHeader](table-band-header.md) [Optional]
- [TableColumnReordering](table-column-reordering.md) [Optional]
- [TableEditColumn](table-edit-column.md) [Optional]
- [TableEditRow](table-edit-row.md) [Optional]
- [TableFilterRow](table-filter-row.md) [Optional]
- [TableGroupRow](table-group-row.md) [Optional]
- [TableHeaderRow](table-header-row.md) [Optional]
- [TableSelection](table-selection.md) [Optional]
- [TableSummaryRow](table-summary-row.md) [Optional]
- [TableTreeColumn](table-tree-column.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
leftColumns? | Array&lt;string &#124; symbol&gt; | [] | Specifies names and types of the columns to be fixed to the left grid's side.
rightColumns? | Array&lt;string &#124; symbol&gt; | [] | Specifies names and types of the columns to be fixed to the right grid's side.
cellComponent | ComponentType&lt;[TableFixedColumns.CellProps](#tablefixedcolumnscellprops)&gt; | | A component that renders a fixed column's cell.

## Interfaces

### TableFixedColumns.CellProps

Describes properties passed to a component that renders a fixed column's cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
side | 'left' &#124; 'right' | Specifies the side of the table to which the cell should be fixed.
component | ComponentType&lt;[Table.CellProps](table.md#tablecellprops)&gt; | A component that should be rendered as a fixed cell.
showLeftDivider | boolean | Specifies whether to render the left divider.
showRightDivider | boolean | Specifies whether to render the right divider.
position | number | Specifies the fixed cell's position.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableFixedColumns.Cell  | [TableFixedColumns.CellProps](#tablefixedcolumnscellprops) | A component that renders a cell related to a fixed column.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns with fixed column flags applied.
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table header rows.
