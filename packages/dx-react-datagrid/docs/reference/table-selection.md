# TableSelection Plugin Reference

Plugin that visualize selection state inside table.

## User Reference

### Dependencies

- [SelectionState](./selection-state.md)
- [TableView](./table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
selectByRowClick | boolean | false | Specifies whether or not row can be selected by click
showSelectAll | boolean | true | Specifies whether or not show checkbox inside header row
showCheckboxes | boolean | false | Specifies whether or not show checkbox inside each data row
selectCellTemplate | Component&lt;SelectCellProps&gt; | | Component that renders toggle that selects data row
selectAllCellTemplate | Component&lt;SelectAllCellProps&gt; | | Component that renders toggle that selects all rows
