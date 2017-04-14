# TableSelection Plugin Reference

This plugin visualizes selection state within a table by rendering selection checkboxes and highlighting the selected rows.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightSelected | boolean | false | If true, selected rows are highlighted
selectByRowClick | boolean | false | If true, a row selected is toggled by click
showSelectAll | boolean | true | If true, the 'select all' checkbox is rendered inside the heading row
showCheckboxes | boolean | false | If ture, selection checkboxes are rendered inside each data row
selectCellTemplate | Component&lt;[SelectCellProps](#select-cell-props)&gt; | | A component that renders a data row selection checkbox
selectAllCellTemplate | Component&lt;[SelectAllCellProps](#select-all-cell-props)&gt; | | A component that renders the 'select all' checkbox

## Interfaces

### <a name="select-all-cell-props"></a>SelectAllCellProps

Describes the properties passed to the template that renders a cell with a selection control.

A value with the following shape:

Field | Type | Description
------|------|------------
allSelected | boolean | True if all the rows available to select are selected
someSelected | boolean | True if at least one but not all rows available to select are selected
toggleAll | () => void | Selects or deselects all rows

### <a name="select-cell-props"></a>SelectCellProps

Describes properties passed to template that renders cell with selection control inside the heading row.

A value with the following shape:

Field | Type | Description
------|------|------------
selected | boolean | Specifies whether or not row is selected
changeSelected | () => void | Selects or deselects a row

## Plugin Developer Reference

To be described...
