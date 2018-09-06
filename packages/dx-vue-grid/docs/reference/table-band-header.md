# DxTableBandHeader Plugin Reference

A plugin that renders the banded cells.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableBandHeader } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableBandHeader } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxTable](table.md)
- [DxTableHeaderRow](table-header-row.md)
- [DxTableEditColumn](table-edit-column.md) [Optional]
- [DxTableSelection](table-selection.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | [DxTableBandHeader.DxCell](#dxtablebandheaderdxcell) | | A component that renders a band cell.
rowComponent | [DxTable.DxRow](table.md#dxtabledxrow) | | A component that renders a band cells' row.
columnBands | Array&lt;[DxTableBandHeader.ColumnBands](#dxtablebandheadercolumnbands)&gt; | | Column bands for multi-level table header.

## Interfaces

### DxTableBandHeader.ColumnBands

Describes properties of column bands that the `DxTableBandHeader` plugin renders.

Name | Type | Description
-----|------------|------------
columnName? | string | A column name that is used to identify a column in the bands tree.
title? | string | The band's title. Used only for bands and ignored for columns.
children? | Array&lt;[DxTableBandHeader.ColumnBands](#dxtablebandheadercolumnbands)&gt; | Nested bands and columns.

## Component Types

### DxTableBandHeader.DxCell

#### Slots

Field | Description
------|------------
default | The default Vue slot.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DxTableBandHeader.components.DxCell | [DxTable.DxCell](table.md#dxtabledxcell) | A component that renders a band cell.
DxTableBandHeader.components.DxRow | [DxTable.DxRow](table.md#dxtabledxrow) | A component that renders a band cells' row.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableCell | Template | [DxTable.DxCell](table.md#dxtabledxcell) | A template that renders a table cell.
tableRow | Template | [DxTable.DxRow](table.md#dxtabledxrow) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table header rows.
