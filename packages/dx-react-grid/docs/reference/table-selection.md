# TableSelection Plugin Reference

A plugin that visualizes table rows' selection state by rendering selection checkboxes and highlighting the selected rows.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightRow | boolean | false | If true, selected rows are highlighted. Note that `Table` plugin's `rowComponent` is ignored in this case.
selectByRowClick | boolean | false | If true, the row's selection state is toggled when a user clicks the row. Note that `Table` plugin's `rowComponent` is ignored in this case.
showSelectAll | boolean | true | If true, the 'select all' checkbox is rendered in the header row.
showSelectionColumn | boolean | true | If true, the selection column (that displays a selection checkbox) is rendered.
cellComponent | ElementType&lt;[TableSelectCellProps](#tableselectcellprops)&gt; | | A component that renders a selection cell (a cell containing a selection checkbox).
headerCellComponent | ElementType&lt;[TableSelectHeaderCellProps](#tableselectcellprops)&gt; | | A component that renders a cell containing the 'Select All' checkbox.
selectionColumnWidth | number | | The selection column's width.

## Interfaces

### TableSelectHeaderCellProps

Describes properties passed to a component that renders a cell containing the Select All checkbox.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
disabled | boolean | Indicates if there are no rows that can be selected.
allSelected | boolean | Indicates if all the rows available for selection are selected.
someSelected | boolean | Indicates if one or more but not all rows available for selection are selected.
onToggle | () => void | An event that initiates selecting or deselecting of all rows.

### TableSelectCellProps

Describes properties passed to a component that renders a cell containing a selection checkbox.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.
selected | boolean | Indicates if a row is selected.
onToggle | () => void | An event that initiates row selecting or deselecting.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered.
selection | Getter | Array&lt;number &#124; string&gt; | Selected rows.
availableToSelect | Getter | Array&lt;number &#124; string&gt; | Rows to be rendered, which are available for selection.
setRowsSelection | Action | ({ rowIds: Array&lt;number &#124; string&gt;, selected?: boolean }) => void | Selects/deselects rows. The `selected` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the selection column.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows (including selected) to be rendered.
