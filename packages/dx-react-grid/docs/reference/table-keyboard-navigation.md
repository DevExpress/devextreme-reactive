# TableKeyboardNavigation Plugin Reference

A plugin that visualizes a focused table cell.

## Import

Use the following statement to import the plugin with embedded theme components:

```js
import { TableKeyboardNavigation } from '@devexpress/dx-react-grid-material-ui';
// import { TableKeyboardNavigation } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableKeyboardNavigation } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableKeyboardNavigation } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
defaultFocusedCell | { rowKey: string, columnKey: string } | | Defines a cell that should be initially focused in uncontrolled mode.
focusedCell | { rowKey: string, columnKey: string } | | Defines a cell that should be focused.
onFocusedCellChange | (focusedCell: { rowKey: string, columnKey: string }) => void | | A function that is executed when a cell gets focus.
cellComponent | ComponentType&lt;[TableKeyboardNavigation.CellProps](#tablekeyboardnavigationcellprops)&gt; | | A component that renders the focused cell.
rowComponent | ComponentType&lt;[TableKeyboardNavigation.RowProps](#tablekeyboardnavigationrowprops)&gt; | | A component that renders the row that contains the focused cell.
focusedRowEnabled | boolean | false | Specifies whether a row should be focused when one of its cells is focused.

## Interfaces

### TableKeyboardNavigation.CellProps

Properties passed to the `cellComponent`.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
focused | boolean | Indicates whether the cell is focused.
component | ComponentType&lt;[Table.CellProps](table.md#tablecellprops)&gt; | A component that renders the focused cell.

### TableKeyboardNavigation.RowProps

Properties passed to the `rowComponent`

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
focused | boolean | `true` if `focusedRowEnabled` is enabled and the row contains a focused cell.
component | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | A component that renders the row.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableKeyboardNavigation.Cell | [TableKeyboardNavigation.CellProps](#tablekeyboardnavigationcellprops) | A component that renders the focused cell.
TableKeyboardNavigation.Row | [TableKeyboardNavigation.RowProps](#tablekeyboardnavigationrowprops) | A component that renders the focused row.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
expandedRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Currently expanded rows.

### Exports

none
