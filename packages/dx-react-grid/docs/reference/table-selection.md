# TableSelection Plugin Reference

This plugin visualizes the selection state within a table by rendering selection checkboxes and highlighting the selected rows.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightSelected | boolean | false | If true, selected rows are highlighted. Note that the `TableView` plugin's `tableRowTemplate` is ignored in this case.
selectByRowClick | boolean | false | If true, a selected row is toggled by click. Note that the `TableView` plugin's `tableRowTemplate` is ignored in this case.
showSelectAll | boolean | true | If true, the 'select all' checkbox is rendered inside the heading row
showSelectionColumn | boolean | false | If true, selection checkboxes are rendered inside each data row
selectCellTemplate | (args: [SelectCellArgs](#select-cell-args)) => ReactElement | | A component that renders a data row selection checkbox
selectAllCellTemplate | (args: [SelectAllCellArgs](#select-all-cell-args)) => ReactElement | | A component that renders the Select All checkbox
selectionColumnWidth | number | | The selection column's width

## Interfaces

### <a name="table-row"></a>TableRow (Extension)

A value with the [TableRow](table-view.md#table-row) shape extended by the following fields:

Field | Type | Description
------|------|------------
selected? | boolean | Specifies if a row is selected

### <a name="select-all-cell-args"></a>SelectAllCellArgs

Describes properties passed to the template that renders a cell with selection control.

A value with the [TableCellArgs](table-view.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
selectionAvailable | boolean | True if at least one row can be selected
allSelected | boolean | True if all the rows available for selection are selected
someSelected | boolean | True if at least one but not all rows available for selection are selected
toggleAll | () => void | Selects or deselects all rows

### <a name="select-cell-args"></a>SelectCellArgs

Describes properties passed to a template that renders a cell with the selection control inside the heading row.

A value with the [TableCellArgs](table-view.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | [Row](grid.md#row) | A row object
selected | boolean | Specifies whether a row is selected
changeSelected | () => void | Selects or deselects a row

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns
tableBodyRows | Getter | Array&lt;[TableRow](#table-row)&gt; | Body rows to be rendered
selection | Getter | Array&lt;number &#124; string&gt; | Selected rows
availableToSelect | Getter | Array&lt;number &#124; string&gt; | Rows to be rendered, which are available for selection
setRowsSelection | Action | ({ rowIds: Array&lt;number &#124; string&gt;, selected?: boolean }) => void | Selects/deselects rows. The `selected` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
tableViewCell | Template | [TableCellArgs](table-view.md#table-cell-args) | A template that renders a table cell
tableViewRow | Template | [TableRowArgs](table-view.md#table-row-args) | A template that renders a table row

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns including the selection column
tableBodyRows | Getter | Array&lt;[TableRow](#table-row)&gt; | Body rows to be rendered including the selected ones
