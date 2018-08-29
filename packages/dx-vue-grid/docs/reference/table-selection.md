# DxTableSelection Plugin Reference

A plugin that visualizes table rows' selection state by rendering selection checkboxes and highlighting the selected rows.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableSelection } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableSelection } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxSelectionState](selection-state.md)
- [DxIntegratedSelection](integrated-selection.md) [Optional]
- [DxTable](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightRow? | boolean | false | Specifies whether to highlight the selected rows. Note that `Table` plugin's `rowComponent` is ignored in this case.
selectByRowClick? | boolean | false | Specifies whether a user can select/deselect a row by clicking it. Note that `Table` plugin's `rowComponent` is ignored in this case.
showSelectAll? | boolean | true | Specifies whether to render the Select All checkbox in the header row.
showSelectionColumn? | boolean | true | Specifies whether to render the selection column that displays selection checkboxes.
cellComponent | [DxTableSelection.DxCell](#dxtableselectiondxcell) | | A component that renders a selection cell (a cell containing a selection checkbox).
headerCellComponent | [DxTableSelection.DxHeaderCell](#dxtableselectiondxheadercell) | | A component that renders a cell containing the Select All checkbox.
selectionColumnWidth | number | | The selection column's width.

## Component Types

### DxTableSelection.DxHeaderCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
disabled | boolean | Indicates if there are no rows that can be selected.
allSelected | boolean | Indicates whether all the rows available for selection are selected.
someSelected | boolean | Indicates whether at least one but not all rows available for selection are selected.

#### Events

Field | Type | Description
------|------|------------
toggle | (select?: boolean) => void | Toggles the Select All checkbox state.

### DxTableSelection.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
row | any | A row.
selected | boolean | Indicates whether a row is selected.
onToggle | () => void | An event that initiates row selecting or deselecting.

#### Events

Field | Type | Description
------|------|------------
toggle | () => void | An event that initiates row selecting or deselecting.

## Plugin Components

Name | Type | Description
-----|------|------------
DxTableSelection.components.DxCell | [DxTableSelection.DxCell](#dxtableselectiondxcell) | A component that renders a selection cell (a cell containing a selection checkbox).
DxTableSelection.components.DxHeaderCell | [DxTableSelection.DxHeaderCell](#dxtableselectiondxheadercell) | A component that renders a cell containing the Select All checkbox.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
selection | Getter | Array&lt;number &#124; string&gt; | The selected row's IDs.
toggleSelection | Action | ({ rowIds: Array&lt;number &#124; string&gt;, state?: boolean  }) => void | A function that selects/deselects rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
toggleSelectAll | Action | (state?: boolean) => void | A function that selects/deselects all rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects all rows or deselects all selected ones.
selectAllAvailable | Getter | boolean | Indicates whether there are rows that are available for selection.
allSelected | Getter | boolean | Indicates whether all the rows available for selection are selected.
someSelected | Getter | boolean | Indicates whether some rows are selected. False if all/none rows are selected.
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the selection column.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered including the selected rows.
