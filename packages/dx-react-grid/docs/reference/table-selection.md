# TableSelection Plugin Reference

A plugin that visualizes table rows' selection state by rendering selection checkboxes and highlighting the selected rows.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [IntegratedSelection](integrated-selection.md) [Optional]
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightRow | boolean | false | Specifies whether to highlight the selected rows. Note that `Table` plugin's `rowComponent` is ignored in this case.
selectByRowClick | boolean | false | Specifies whether a user can select/deselect a row by clicking it. Note that `Table` plugin's `rowComponent` is ignored in this case.
showSelectAll | boolean | true | Specifies whether to render the 'select all' checkbox in the header row.
showSelectionColumn | boolean | true | Specifies whether to render the selection column that displays selection checkboxes.
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
allSelected | boolean | Indicates whether all the rows available for selection are selected.
someSelected | boolean | Indicates whether at least one but not all rows available for selection are selected.
onToggle | (select?: boolean) => void | Toggles the "Select All" checkbox state.

### TableSelectCellProps

Describes properties passed to a component that renders a cell containing a selection checkbox.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.
selected | boolean | Indicates whether a row is selected.
onToggle | () => void | An event that initiates row selecting or deselecting.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableSelection.HeaderCell | [TableSelectHeaderCellProps](#tableselectheadercellprops) | A component that renders a cell with the selection control inside the heading row.
TableSelection.Cell | [TableSelectCellProps](#tableselectcellprops) | A component that renders a cell with selection control.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
selection | Getter | Set&lt;number &#124; string&gt; | Selected rows.
toggleSelection | Action | ({ rowIds: Array&lt;number &#124; string&gt;, selected?: boolean  }) => void | A function that selects/deselects rows. The `selected` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
toggleSelectAll | Action | (select?: boolean, selection: Getter, toggleSelection: Action) => void | A function that selects/deselects all rows. The `select` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects all rows or deselects all selected ones.
selectAllAvailable | Getter | boolean | Indicates whether there are rows that are available for selection.
allSelected | Getter | boolean | Indicates whether all the rows available for selection are selected.
someSelected | Getter | boolean | Indicates whether some rows are selected. False if all/none rows are selected.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the selection column.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered including the selected rows.
