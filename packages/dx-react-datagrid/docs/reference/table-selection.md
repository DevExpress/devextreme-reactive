# TableSelection Plugin Reference

Plugin that visualize selection state within table.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightSelected | boolean | false | Specifies whether or not row is highlighted when selected
selectByRowClick | boolean | false | Specifies whether or not row can be selected by click
showSelectAll | boolean | true | Specifies whether or not show checkbox inside header row
showCheckboxes | boolean | false | Specifies whether or not show checkbox inside each data row
selectCellTemplate | Component&lt;[SelectCellProps](#select-cell-props)&gt; | | Component that renders toggle that selects data row
selectAllCellTemplate | Component&lt;[SelectAllCellProps](#select-all-cell-props)&gt; | | Component that renders toggle that selects all rows

## Interfaces

### <a name="select-cell-props"></a>SelectCellProps

Describes properties passed to template that renders cell with selection control.

A value with the following shape:

Field | Type | Description
------|------|------------
allSelected | boolean | Specifies whether or not all possible to select rows is selected
someSelected | boolean | Specifies whether or not at least one row within all possible to select ones is selected
toggleAll | () => void | Selects or deselects all rows

### <a name="select-all-cell-props"></a>SelectCellProps

Describes properties passed to template that renders cell with selection control inside header row.

A value with the following shape:

Field | Type | Description
------|------|------------
selected | boolean | Specifies whether or not row is selected
changeSelected | () => void | Selects or deselects row

## Plugin Developer Reference

To be described...
