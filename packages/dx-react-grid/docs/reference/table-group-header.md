# TableGroupHeader Plugin Reference

A plugin that renders the nested header cells.

## User Reference

### Dependencies

- [Table](table.md)
- [TableHeaderRow](table-header-row.md)
- [TableEditColumn](table-edit-column.md) [Optional]
- [TableSelection](table-selection.md) [Optional]
- [DragDropProvider](drag-drop-provider.md) [Optional]
- [TableColumnResizing](table-column-resizing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ComponentType&lt;[Table.CellProps](table.md#tablecellprops)&gt; | | A component that renders a parent cell.
rowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders row for parent cells.
headerCellComponent | ComponentType&lt;[TableHeaderRow.CellProps](table-header-row.md#tableheaderrowcellprops)&gt; | | A component that renders a header cell.
columnGroups | Array&lt;[TableGroupHeader.ColumnGroups](#tablegroupheadercolumngroups)&gt; | | Specifies the nested columns for implement multiple levels of columns in your table header.

## Interfaces

### TableGroupHeader.ColumnGroups

Name | Properties | Description
-----|------------|------------
columnName? | string | The name of the column.
title? | string | The title of the parent column.
nested? | Array&lt;[TableGroupHeader.ColumnGroups](#tablegroupheadercolumngroups)&gt; | The nested columns of current title.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableGroupHeader.Cell | ComponentType&lt;[Table.CellProps](table.md#tablecellprops)&gt; | | A component that renders a parent cell.
TableGroupHeader.Row | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders row for parent cells.
TableGroupHeader.HeaderCell | ComponentType&lt;[TableHeaderRow.CellProps](table-header-row.md#tableheaderrowcellprops)&gt; | | A component that renders a header cell.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table header rows.
