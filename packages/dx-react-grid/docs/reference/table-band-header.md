# TableBandHeader Plugin Reference

A plugin that renders the nested header cells.

## User Reference

### Dependencies

- [Table](table.md)
- [TableHeaderRow](table-header-row.md)
- [TableEditColumn](table-edit-column.md) [Optional]
- [TableSelection](table-selection.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ComponentType&lt;[Table.CellProps](table.md#tablecellprops)&gt; | | A component that renders a parent cell.
rowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders a parent cells' row.
bandedHeaderCellComponent | ComponentType&lt;[TableBandHeader.BandedHeaderCellComponentProps](#tablebandheaderbandedheadercellcomponentprops)&gt; | | A component that renders a header cell.
columnBands | Array&lt;[TableBandHeader.ColumnBands](#tablebandheadercolumnbands)&gt; | | Specifies the nested columns for multi-level table header.

## Interfaces

### TableBandHeader.BandedHeaderCellComponentProps

Describes properties passed to a component that renders the banded header cell.

Name | Type | Description
-----|------------|------------
component? | ComponentType&lt;object&gt; | A header cell to be rendered with nested cells.

### TableBandHeader.ColumnBands

Describes properties of column bands that the TableBandHeader plugin renders.

Name | Type | Description
-----|------------|------------
columnName? | string | A column name.
title? | string | The parent column's title.
children? | Array&lt;[TableBandHeader.ColumnBands](#tablebandheadercolumnbands)&gt; | Nested columns.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableBandHeader.Cell | ComponentType&lt;[Table.CellProps](table.md#tablecellprops)&gt; | | A component that renders a parent cell.
TableBandHeader.Row | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders a parent cells' row.
TableBandHeader.BandedHeaderCell | object | | A component that renders a header cell.

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
