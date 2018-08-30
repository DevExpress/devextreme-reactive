# DxTableEditRow Plugin Reference

A plugin that renders a row being edited.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableEditRow } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableEditRow } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxEditingState](editing-state.md)
- [DxTable](table.md)
- [DxDataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | [DxTableEditRow.DxCell](#dxtableeditrowdxcell) | | A component that renders an editable cell.
rowComponent | [DxTableEditRow.DxRow](#dxtableeditrowdxrow) | | A component that renders an editable row.
rowHeight? | number | | Specifies the editable row's height.

## Component Types

### DxTableEditRow.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
row | any | A row to be edited.
column | [Column](grid.md#column) | A column.
value | any | A value to be edited.
editingEnabled | boolean | Specifies whether editing a column is enabled.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

#### Events

Field | Type | Description
------|------|------------
valueChange | (newValue: any) => void | Handles value changes.

### DxTableEditRow.DxRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | A table row
row | any | A row to be edited.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

## Plugin Components

Name | Type | Description
-----|------|------------
DxTableEditRow.components.DxCell | [DxTableEditRow.DxCell](#dxtableeditrowdxcell) | A component that renders an editable cell.
DxTableEditRow.components.DxRow | [DxTableEditRow.DxRow](#dxtableeditrowdxrow) | A component that renders an editable row.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
editingRowIds | Getter | Array&lt;number &#124; string&gt; | IDs of the rows that are being edited.
addedRows | Getter | Array&lt;any&gt; | Created but not committed rows.
isColumnEditingEnabled | Getter | (columnName: string) => boolean |  A function that returns a value that specifies if editing by a column is enabled.
changeAddedRow | Action | ({ rowId: number, change: any }) => void | Applies a change to a created but uncommitted row. Note: `rowId` is a row index within the `addedRows` array.
rowChanges | Getter | { [key: string]: any } | An associative array that stores changes made to existing rows. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
changeRow | Action | ({ rowId: number &#124; string, change: object }) => void | Applies a change to an existing row.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get the specified row's column value.
createRowChange | Getter | (row: any, value: any, columnName: string) => any | A function that returns a value that specifies row changes depending on the row's editable cell values. This function is called each time an editor's value changes.
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object? | A template that renders a table row.
valueEditor | Template | [DxDataTypeProvider.DxValueEditor](data-type-provider.md#dxdatatypeproviderdxvalueeditor) | A template that renders the editor.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows including editable rows.
