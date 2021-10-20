# TableKeyboardNavigation Plugin Reference

A plugin that visualizes table focused cell.

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
defaultFocusedCell | { rowKey: string, columnKey: string } | | Object with unique keys of a row and column that defines cell should be initially focused in uncontrolled mode.
focusedCell | { rowKey: string, columnKey: string } | | Object with unique keys of a row and column that defines cell should be focused.
onFocusedCellChange | (focusedCell: { rowKey: string, columnKey: string }) => void | | Handles when the cell gets focus.
cellComponent | ComponentType&lt;[TableKeyboardNavigation.CellProps](#tablekeyboardnavigationcellprops)&gt; | | A component renders focused cell.
rowComponent | ComponentType&lt;[TableKeyboardNavigation.RowProps](#tablekeyboardnavigationrowprops)&gt; | | Acomponent renders row that contains the focused cell.
focusedRowEnabled | boolean | false | Specifies whether row should be focused when the cell in this row focused.

## Interfaces

### TableKeyboardNavigation.CellProps

Describes properties passed to a component that renders a focused cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
focused | boolean | Indicates whether the cell is focused.
component | ComponentType&lt;[Table.CellProps](table.md#tablecellprops)&gt; | A component that should be rendered as a focused cell.

### TableKeyboardNavigation.RowProps

Describes properties passed to a component that renders a row that containes focused cell.

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
focused | boolean | Indicates whether the row containes focused cell. `true` when `focusedRowEnabled` is enabled and the cell in this row is focused.
component | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | A component that should be rendered as a focused row.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableKeyboardNavigation.Cell | [TableKeyboardNavigation.CellProps](#tablekeyboardnavigationcellprops) | A component that renders a focused cell
TableKeyboardNavigation.Row | [TableKeyboardNavigation.RowProps](#tablekeyboardnavigationrowprops) | A component that renders a focused row.

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