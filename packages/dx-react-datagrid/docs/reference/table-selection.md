# TableSelection Plugin Reference

Plugin that manages selection state.

Dependencies:
- [SelectionState](#selectionstate-reference)
- [TableView](#tableview-reference)

Properties:

Property              | Type                                | Default Value | Description
----------------------|-------------------------------------|---------------|------------------------------------------------------------
selectByRowClick      | boolean                             | false         | Specifies whether or not row can be selected by click
showSelectAll         | boolean                             | true          | Specifies whether or not show checkbox inside header row
showCheckboxes        | boolean                             | false         | Specifies whether or not show checkbox inside each data row
selectCellTemplate    | Component&lt;SelectCellProps&gt;    | undefined     | Component that renders toggle that selects data row
selectAllCellTemplate | Component&lt;SelectAllCellProps&gt; | undefined     | Component that renders toggle that selects all rows
