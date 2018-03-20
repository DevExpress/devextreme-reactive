# TableTreeColumn Plugin Reference

A plugin that renders a table column with toggle button and sorting indicators.

## User Reference

### Dependencies

- [TreeDataState](tree-data-state.md)
- [Table](table.md)
- [DataTypeProvider](data-type-provider.md) [Optional]
- [SelectionState](selection-state.md) [Optional]
- [IntegratedSelection](integrated-selection.md) [Optional]
- [TableHeaderRow](table-header-row.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
for | string | | A column name used to identify a column that will be represented as a tree.
cellComponent | ComponentType&lt;[TableTreeColumn.CellProps](#tabletreecolumncellprops)&gt; | | A component that renders a cell within a data row.
indentComponent | ComponentType&lt;[TableTreeColumn.IndentProps](#tabletreecolumnindentprops)&gt; | | A component that renders an indent used to identify row level.
toggleButtonComponent | ComponentType&lt;[TableTreeColumn.ToggleButtonProps](#tabletreecolumntogglebuttonprops)&gt; | | A component that renders a button that controls row's expanded state.
checkboxComponent | ComponentType&lt;[TableTreeColumn.CheckboxProps](#tabletreecolumncheckboxprops)&gt; | | A component that renders a checkbox used to control selection.
showSelectionControls? | boolean | false | Specifies whether to render selection controls. Requires the [SelectionState](selection-state.md) dependency.
showSelectAll? | boolean | false | Specifies whether to render Select All checkbox. Requires the [IntegratedSelection](integrated-selection.md) dependency.

## Interfaces

### TableTreeColumn.CellProps

Describes properties passed to a component that renders a cell within a data row.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
value | any | Specifies a value to be rendered within the cell.
row | any | Specifies the cell's row.
column | [Column](grid.md#column) | Specifies the cell's column.
controls? | ReactNode | A React node to be placed in the cell part that display controls.
children? | ReactNode | A React node to be placed in the cell part that display cell value.

### TableTreeColumn.IndentProps

Describes properties passed to a component that renders an indent used to identify row level.

Field | Type | Description
------|------|------------
level | number | Specifies a row level.

### TableTreeColumn.ToggleButtonProps

Describes properties passed to a component that renders a button that controls row's expanded state.

Field | Type | Description
------|------|------------
visible | boolean | Specifies whether to show button.
expanded | boolean | Specifies whether a row is expanded.
onToggle | () => void | An event that initiates row expanding or collapsing.

### TableTreeColumn.CheckboxProps

Describes properties passed to a component that renders a checkbox used to control selection.

Field | Type | Description
------|------|------------
disabled | boolean | Specifies whether a row is disallowed to select.
checked | boolean | Specifies whether a row is selected.
indeterminate | boolean | Specifies whether a row is partially selected.
onChange | () => void | An event that initiates row selecting or deselecting.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableTreeColumn.Cell | [TableTreeColumn.CellProps](#tabletreecolumncellprops) | A component that renders a cell within a data row.
TableTreeColumn.Indent | [TableTreeColumn.IndentProps](#tabletreecolumnindentprops) | A component that renders an indent used to identify row level.
TableTreeColumn.ToggleButton | [TableTreeColumn.ToggleButtonProps](#tabletreecolumntogglebuttonprops) | A component that renders a button that controls row's expanded state.
TableTreeColumn.Checkbox | [TableTreeColumn.CheckboxProps](#tabletreecolumncheckboxprops) | A component that renders a checkbox used to control selection.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablecolumn)&gt; | Table body rows.
getRowLevelKey | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function used to get a group row level key.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function used to get a given row's column value.
getCollapsedRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => Array&lt;any&gt;? | A function used to get a given row's collapsed rows.
isTreeRowLeaf | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => boolean | A function used to identify a leaf node in tree data structure.
getTreeRowLevel | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number | A function used to identify a node level in tree data structure.
expandedRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Currently expanded rows.
toggleRowExpanded | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId }) => void | Expands/collapses the specified row.
selection | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | The selected row's IDs.
toggleSelection | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt;, state?: boolean }) => void | A function that selects/deselects rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
toggleSelectAll | [Action](../../../dx-react-core/docs/reference/action.md) | (state?: boolean) => void | A function that selects/deselects all rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects all rows or deselects all selected ones.
selectAllAvailable | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether there are rows that are available for selection.
allSelected | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether all the rows available for selection are selected.
someSelected | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether some rows are selected. False if all/none rows are selected.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableHeaderCellBefore | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template used to prepend additional components to the header table cell.
valueFormatter | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueFormatterProps](data-type-provider.md#datatypeprovidervalueformatterprops) | A template that renders the formatted value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablecolumn)&gt; | Table body rows with modified tree rows.
