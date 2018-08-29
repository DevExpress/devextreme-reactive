# TableTreeColumn Plugin Reference

A plugin that renders a table column with a toggle button and sorting indicators.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
// import { TableTreeColumn } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableTreeColumn } from '@devexpress/dx-react-grid-bootstrap3';
```

You can import the themeless plugin to use custom components:

```js
import { TableTreeColumn } from '@devexpress/dx-react-grid';
```

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
for | string | | The name of a column that should be represented as a tree.
cellComponent | ComponentType&lt;[TableTreeColumn.CellProps](#tabletreecolumncellprops)&gt; | | A component that renders a cell within a data row.
contentComponent | ComponentType&lt;[TableTreeColumn.ContentProps](#tabletreecolumncontentprops)&gt; | | A component that renders a cell's content.
indentComponent | ComponentType&lt;[TableTreeColumn.IndentProps](#tabletreecolumnindentprops)&gt; | | A component that renders an indent used to identify a row level.
expandButtonComponent | ComponentType&lt;[TableTreeColumn.ExpandButtonProps](#tabletreecolumnexpandbuttonprops)&gt; | | A component that renders a button that controls the row's expanded state.
checkboxComponent | ComponentType&lt;[TableTreeColumn.CheckboxProps](#tabletreecolumncheckboxprops)&gt; | | A component that renders a checkbox used to control selection.
showSelectionControls? | boolean | false | Specifies whether to render selection controls. Requires the [SelectionState](selection-state.md) plugin.
showSelectAll? | boolean | false | Specifies whether to render Select All checkbox. Requires the [IntegratedSelection](integrated-selection.md) plugin.

## Interfaces

### TableTreeColumn.CellProps

Describes properties passed to a component that renders a cell within a data row.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
value | any | Specifies a value to be rendered within the cell.
row | any | Specifies the cell's row.
column | [Column](grid.md#column) | Specifies the cell's column.
children? | ReactNode | A React node to be rendered within the cell.

### TableTreeColumn.ContentProps

Describes properties passed to a component that renders a cell's content.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be rendered within the cell's content.

### TableTreeColumn.IndentProps

Describes properties passed to a component that renders an indent used to identify a row level.

Field | Type | Description
------|------|------------
level | number | Specifies the row level.

### TableTreeColumn.ExpandButtonProps

Describes properties passed to a component that renders a button used to controls a row's expanded state.

Field | Type | Description
------|------|------------
visible | boolean | Specifies whether to show the button.
expanded | boolean | Specifies whether a row is expanded.
onToggle | () => void | An event that initiates row expanding or collapsing.

### TableTreeColumn.CheckboxProps

Describes properties passed to a component that renders a checkbox used to control selection.

Field | Type | Description
------|------|------------
disabled | boolean | Specifies whether a row is unavailable for selection.
checked | boolean | Specifies whether a row is selected.
indeterminate | boolean | Specifies whether a row's children are partially selected.
onChange | () => void | An event that initiates row selecting or deselecting.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableTreeColumn.Cell | [TableTreeColumn.CellProps](#tabletreecolumncellprops) | A component that renders a cell within a data row.
TableTreeColumn.Content | [TableTreeColumn.ContentProps](#tabletreecolumncontentprops) | A component that renders a cell's content.
TableTreeColumn.Indent | [TableTreeColumn.IndentProps](#tabletreecolumnindentprops) | A component that renders an indent used to identify a row level.
TableTreeColumn.ExpandButton | [TableTreeColumn.ExpandButtonProps](#tabletreecolumnexpandbuttonprops) | A component that renders a button used to controls a row's expanded state.
TableTreeColumn.Checkbox | [TableTreeColumn.CheckboxProps](#tabletreecolumncheckboxprops) | A component that renders a checkbox used to control selection.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
getRowLevelKey | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function used to get a group row level key.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function used to get a given row's column value.
getCollapsedRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => Array&lt;any&gt;? | A function used to get collapsed child rows of a given row.
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
tableHeaderCellBefore | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template used to prepend additional components to a header cell.
valueFormatter | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueFormatterProps](data-type-provider.md#datatypeprovidervalueformatterprops) | A template that renders the formatted value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows with modified tree rows.
tableTreeColumnName | [Getter](../../../dx-react-core/docs/reference/getter.md) | string | The name of a column displayed as a tree.
