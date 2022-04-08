# TableBandHeader Plugin Reference

A plugin that renders the banded cells.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableBandHeader } from '@devexpress/dx-react-grid-material-ui';
// import { TableBandHeader } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableBandHeader } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableBandHeader } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [Table](table.md)
- [TableHeaderRow](table-header-row.md)
- [TableEditColumn](table-edit-column.md) [Optional]
- [TableSelection](table-selection.md) [Optional]
- [TableColumnVisibility](table-column-visibility.md) [Optional]
- [TableGroupRow](table-group-row.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ComponentType&lt;[TableBandHeader.CellProps](#tablebandheadercellprops)&gt; | | A component that renders a band cell.
rowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders a band cells' row.
columnBands | Array&lt;[TableBandHeader.ColumnBands](#tablebandheadercolumnbands)&gt; | | Specifies column bands for multi-level table header.

## Interfaces

### TableBandHeader.CellProps

Describes properties passed to a component that renders a table band cell.

Extends [Table.CellProps](table.md#tablecellprops)

Name | Type | Description
-----|------------|------------
children? | ReactNode | A React node used to render band cell content.
beforeBorder? | boolean | Specifies whether to show the left border.

### TableBandHeader.ColumnBands

Describes properties of column bands that the TableBandHeader plugin renders.

Name | Type | Description
-----|------------|------------
columnName? | string | A column name that is used to identify a column in the bands tree.
title? | string | The band's title. Used only for bands and ignored for columns.
children? | Array&lt;[TableBandHeader.ColumnBands](#tablebandheadercolumnbands)&gt; | Nested bands and columns.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableBandHeader.Cell | [Table.CellProps](table.md#tablecellprops) | A component that renders a band cell.
TableBandHeader.Row | [Table.RowProps](table.md#tablerowprops) | A component that renders a band cells' row.

Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
ROW&lowbar;TYPE | symbol | The band row type's identifier.

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
