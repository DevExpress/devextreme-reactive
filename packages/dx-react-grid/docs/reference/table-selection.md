# TableSelection Plugin Reference

This plugin visualizes the selection state within a table by rendering selection checkboxes and highlighting the selected rows.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightSelected | boolean | false | If true, selected rows are highlighted. Note that the `Table` plugin's `tableRowTemplate` is ignored in this case.
selectByRowClick | boolean | false | If true, a selected row is toggled by click. Note that the `Table` plugin's `tableRowTemplate` is ignored in this case.
showSelectAll | boolean | true | If true, the 'select all' checkbox is rendered inside the heading row.
showSelectionColumn | boolean | false | If true, selection checkboxes are rendered inside each data row.
selectCellComponent | ElementType&lt;[SelectCellProps](#selectcellprops)&gt; | | A component that renders a cell with data row selection checkbox.
selectAllCellComponent | ElementType&lt;[SelectAllCellProps](#selectallcellprops)&gt; | | A component that renders a cell with the Select All checkbox.
selectionColumnWidth | number | | The selection column's width.

## Interfaces

### SelectAllCellProps

Describes properties passed to a component that renders a cell with data row selection checkbox.

A value with the [TableCellArgs](table.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
disabled | boolean | True if there are no rows that can be selected.
selected | boolean | True if all the rows available for selection are selected.
partiallySelected | boolean | True if at least one but not all rows available for selection are selected.
onToggle | () => void | An event that initiates selecting or deselecting of all rows.

### SelectCellProps

Describes properties passed to a component that renders a cell with the Select All checkbox.

A value with the [TableCellArgs](table.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.
selected | boolean | Specifies whether a row is selected.
onToggle | () => void | An event that initiates selecting or deselecting of a row.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#table-row)&gt; | Body rows to be rendered.
selection | Getter | Array&lt;number &#124; string&gt; | Selected rows.
availableToSelect | Getter | Array&lt;number &#124; string&gt; | Rows to be rendered, which are available for selection.
setRowsSelection | Action | ({ rowIds: Array&lt;number &#124; string&gt;, selected?: boolean }) => void | Selects/deselects rows. The `selected` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
tableCell | Template | [TableCellArgs](table.md#table-cell-args) | A template that renders a table cell.
tableRow | Template | [TableRowArgs](table.md#table-row-args) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns including the selection column.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#table-row)&gt; | Body rows to be rendered including the selected ones.
