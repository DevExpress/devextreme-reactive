# TableSelection Plugin Reference

A plugin that visualizes table rows' selection state by rendering selection checkboxes and highlighting the selected rows.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [LocalSelection](local-selection.md) [Optional]
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
allSelected | boolean | True if all the rows available for selection are selected.
someSelected | boolean | True if at least one but not all rows available for selection are selected.
onToggle | (select?: boolean) => void | Toggle rows selection.

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
tableBodyRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
selection | Getter | Set&lt;number &#124; string&gt; | Selected rows.
toggleSelection | Action | ({ rowIds: Array&lt;number &#124; string&gt;, selected?: boolean  }) => void | A function that selects/deselects rows. The `selected` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
toggleSelectAll | Action | (select?: boolean, selection: Getter, toggleSelection: Action) => void | A function that selects/deselects all rows. The `select` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects all rows or deselects all selected ones.
selectAllAvailable | Getter | boolean | Return `true` if any select boxes are available.
allSelected | Getter | boolean | True if all the rows available for selection are selected.
someSelected | Getter | boolean | True if some rows are selected. False if all/zero rows are selected.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the selection column.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows (including selected) to be rendered.
