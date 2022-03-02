# TableSelection Plugin Reference

A plugin that visualizes table rows' selection state by rendering selection checkboxes and highlighting the selected rows.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableSelection } from '@devexpress/dx-react-grid-material-ui';
// import { TableSelection } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableSelection } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableSelection } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [IntegratedSelection](integrated-selection.md) [Optional]
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightRow? | boolean | false | Specifies whether to highlight the selected rows. Note that `Table` plugin's `rowComponent` is ignored in this case.
selectByRowClick? | boolean | false | Specifies whether a user can select/deselect a row by clicking it. Note that `Table` plugin's `rowComponent` is ignored in this case.
showSelectAll? | boolean | true | Specifies whether to render the Select All checkbox in the header row.
showSelectionColumn? | boolean | true | Specifies whether to render the selection column that displays selection checkboxes.
cellComponent | ComponentType&lt;[TableSelection.CellProps](#tableselectioncellprops)&gt; | | A component that renders a selection cell (a cell containing a selection checkbox).
headerCellComponent | ComponentType&lt;[TableSelection.HeaderCellProps](#tableselectioncellprops)&gt; | | A component that renders a cell containing the Select All checkbox.
rowComponent | ComponentType&lt;[TableSelection.RowProps](#tableselectionrowprops)&gt; | | A component that renders a selected row. It is used instead of [Table.Row](table.md#tablerowprops) when `highlightRow` or `selectByRowClick` is enabled.
selectionColumnWidth | number | | The selection column's width.

## Interfaces

### TableSelection.HeaderCellProps

Describes properties passed to a component that renders a cell containing the Select All checkbox.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
disabled | boolean | Indicates if there are no rows that can be selected.
allSelected | boolean | Indicates whether all the rows available for selection are selected.
someSelected | boolean | Indicates whether at least one but not all rows available for selection are selected.
onToggle | (select?: boolean) => void | Toggles the Select All checkbox state.

### TableSelection.CellProps

Describes properties passed to a component that renders a cell containing a selection checkbox.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | any | A row.
selected | boolean | Indicates whether a row is selected.
onToggle | () => void | An event that initiates row selecting or deselecting.

### TableSelection.RowProps

Properties passed to the `rowComponent`.

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
selectByRowClick | boolean | Indicates if users can click the row to select it.
highlighted | boolean | Indicates whether the row is highlighted. `true` when `highlightRow` is enabled and the row is selected.
onToggle | () => void | A function that is executed when users select the row or cancel the selection.


## Plugin Components

Name | Properties | Description
-----|------------|------------
TableSelection.HeaderCell | [TableSelection.HeaderCellProps](#tableselectionheadercellprops) | A component that renders a cell with the selection control inside the heading row.
TableSelection.Cell | [TableSelection.CellProps](#tableselectioncellprops) | A component that renders a cell with selection control.

Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
COLUMN&lowbar;TYPE | symbol | The selection column type's indentifier.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
selection | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | The selected row's IDs.
toggleSelection | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowIds: Array&lt;number &#124; string&gt;, state?: boolean  }) => void | A function that selects/deselects rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects unselected rows and deselects selected ones. To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
toggleSelectAll | [Action](../../../dx-react-core/docs/reference/action.md) | (state?: boolean) => void | A function that selects/deselects all rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). In the last case, the function selects all rows or deselects all selected ones.
selectAllAvailable | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether there are rows that are available for selection.
allSelected | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether all the rows available for selection are selected.
someSelected | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether some rows are selected. False if all/none rows are selected.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns including the selection column.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered including the selected rows.
