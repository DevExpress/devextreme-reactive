# TableSelection Plugin Reference

This plugin visualizes the selection state within a table by rendering selection checkboxes and highlighting selected rows.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightSelected | boolean | false | If true, selected rows are highlighted
selectByRowClick | boolean | false | If true, a selected row is toggled by click
showSelectAll | boolean | true | If true, the 'select all' checkbox is rendered inside the heading row
showSelectionColumn | boolean | false | If true, selection checkboxes are rendered inside each data row
selectCellTemplate | Component&lt;[SelectCellProps](#select-cell-props)&gt; | | A component that renders a data row selection checkbox
selectAllCellTemplate | Component&lt;[SelectAllCellProps](#select-all-cell-props)&gt; | | A component that renders the Select All checkbox

## Interfaces

### <a name="select-all-cell-props"></a>SelectAllCellProps

Describes properties passed to the template that renders a cell with a selection control.

A value with the following shape:

Field | Type | Description
------|------|------------
selectionAvailable | boolean | True if at least one row can be seleced
allSelected | boolean | True if all the rows available to select are selected
someSelected | boolean | True if at least one but not all rows available to select are selected
toggleAll | () => void | Selects or deselects all rows

### <a name="select-cell-props"></a>SelectCellProps

Describes properties passed to a template that renders a cell with the selection control inside the heading row.

A value with the following shape:

Field | Type | Description
------|------|------------
selected | boolean | Specifies whether or not a row is selected
changeSelected | () => void | Selects or deselects a row

## Plugin Developer Reference

To be described...
