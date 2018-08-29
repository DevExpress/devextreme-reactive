# DxTableTreeColumn Plugin Reference

A plugin that renders a table column with a toggle button and sort indicators.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableTreeColumn } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableTreeColumn } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxTreeDataState](tree-data-state.md)
- [DxTable](table.md)
- [DxDataTypeProvider](data-type-provider.md) [Optional]
- [DxSelectionState](selection-state.md) [Optional]
- [DxIntegratedSelection](integrated-selection.md) [Optional]
- [DxTableHeaderRow](table-header-row.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
for | string | | The name of a column that should be represented as a tree.
cellComponent | [DxTableTreeColumn.DxCell](#dxtabletreecolumndxcell) | | A component that renders a cell within a data row.
contentComponent | [DxTableTreeColumn.DxContent](#dxtabletreecolumndxcontent) | | A component that renders a cell's content.
indentComponent | [DxTableTreeColumn.DxIndent](#dxtabletreecolumndxindent) | | A component that renders an indent used to identify a row's level.
expandButtonComponent | [DxTableTreeColumn.DxExpandButton](#dxtabletreecolumndxexpandbutton) | | A component that renders a button that controls the row's expanded state.
checkboxComponent | [DxTableTreeColumn.DxCheckbox](#dxtabletreecolumndxcheckbox) | | A component that renders a checkbox used to control selection.
showSelectionControls? | boolean | false | Specifies whether to render selection controls. Requires [SelectionState](selection-state.md).
showSelectAll? | boolean | false | Specifies whether to render Select All checkbox. Requires [IntegratedSelection](integrated-selection.md).

## Component Types

### DxTableTreeColumn.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | A table row.
tableColumn | [TableColumn](table.md#tablecolumn) | A table column.
colSpan? | number | The number of columns that the root cell element spans.
rowSpan? | number | The number of rows that the root cell element spans.
value | any | A value to be rendered within the cell.
row | any | The cell's row.
column | [Column](grid.md#column) | Specifies the cell's column.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTableTreeColumn.DxContent

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTableTreeColumn.DxIndent

#### Props

Field | Type | Description
------|------|------------
level | number | The row's level.

### DxTableTreeColumn.DxExpandButton

#### Props

Field | Type | Description
------|------|------------
visible | boolean | Specifies whether to show the button.
expanded | boolean | Specifies whether a row is expanded.

#### Events

Field | Type | Description
------|------|------------
toggle | () => void | An event that initiates row expanding or collapsing.

### DxTableTreeColumn.DxCheckbox

#### Props

Field | Type | Description
------|------|------------
disabled | boolean | Specifies whether a row is unavailable for selection.
checked | boolean | Specifies whether a row is selected.
indeterminate | boolean | Specifies whether row's children are partially selected.

#### Events

Field | Type | Description
------|------|------------
change | () => void | An event that initiates row selecting or deselecting.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DxTableTreeColumn.components.DxCell | [DxTableTreeColumn.DxCell](#dxtabletreecolumndxcell) | A component that renders a cell within a data row.
DxTableTreeColumn.components.DxContent | [DxTableTreeColumn.DxContent](#dxtabletreecolumndxcontent) | A component that renders a cell's content.
DxTableTreeColumn.components.DxIndent | [DxTableTreeColumn.DxIndent](#dxtabletreecolumndxindent) | A component that renders an indent used to identify a row's level.
DxTableTreeColumn.components.DxExpandButton | [DxTableTreeColumn.DxExpandButton](#dxtabletreecolumndxexpandbutton) | A component that renders a button used to controls a row's expanded state.
DxTableTreeColumn.components.DxCheckbox | [DxTableTreeColumn.DxCheckbox](#dxtabletreecolumndxcheckbox) | A component that renders a checkbox used to control selection.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
getRowLevelKey | Getter | (row: any) => string? | A function used to get a group row level key.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get a given row's column value.
getCollapsedRows | Getter | (row: any) => Array&lt;any&gt;? | A function used to get collapsed a row's child rows.
isTreeRowLeaf | Getter | (row: any) => boolean | A function used to identify a leaf node in tree data structure.
getTreeRowLevel | Getter | (row: any) => number | A function used to identify a node level in tree data structure.
expandedRowIds | Getter | Array&lt;number &#124; string&gt; | Currently expanded rows.
toggleRowExpanded | Action | ({ rowId }) => void | Expands/collapses the specified row.
selection | Getter | Array&lt;number &#124; string&gt; | The selected row's IDs.
toggleSelection | Action | ({ rowIds: Array&lt;number &#124; string&gt;, state?: boolean }) => void | A function that selects/deselects rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
toggleSelectAll | Action | (state?: boolean) => void | A function that selects/deselects all rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects all rows or deselects all selected ones.
selectAllAvailable | Getter | boolean | Indicates whether there are rows that are available for selection.
allSelected | Getter | boolean | Indicates whether all the rows available for selection are selected.
someSelected | Getter | boolean | Indicates whether some rows are selected. False if all/none rows are selected.
tableCell | Template | object?  | A template that renders a table cell.
tableHeaderCellBefore | Template | object? | A template used to prepend additional components to a header cell.
valueFormatter | Template | [DxDataTypeProvider.DxValueFormatter](data-type-provider.md#dxdatatypeproviderdxvalueformatter) | A template that renders the formatted value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows with modified tree rows.
