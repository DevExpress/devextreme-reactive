# TableEditRow Plugin Reference

A plugin that renders a row being edited.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableEditRow } from '@devexpress/dx-react-grid-material-ui';
// import { TableEditRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableEditRow } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableEditRow } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [EditingState](editing-state.md)
- [Table](table.md)
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ComponentType&lt;[TableEditRow.CellProps](#tableeditrowcellprops)&gt; | | A component that renders an editable cell.
rowComponent | ComponentType&lt;[TableEditRow.RowProps](#tableeditrowrowprops)&gt; | | A component that renders an editable row.
rowHeight? | number | | Specifies the editable row's height.

## Interfaces

### TableEditRow.CellProps

Describes properties passed to a component that renders an editable cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | any | A row to be edited.
column | [Column](grid.md#column) | A column.
value | any | A value to be edited.
editingEnabled | boolean | Specifies whether editing a column is enabled.
onValueChange | (newValue: any) => void | Handles value changes.

### TableEditRow.RowProps

Describes properties passed to a component that renders an editable row.

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
row | any | A row to be edited.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableEditRow.Cell | [TableEditRow.CellProps](#tableeditrowcellprops) | A component that renders an editable cell.
TableEditRow.Row | [TableEditRow.RowProps](#tableeditrowrowprops) | A component that renders an editable row.

Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
ADDED&lowbar;ROW&lowbar;TYPE | symbol | The added row type's identifier.
EDIT&lowbar;ROW&lowbar;TYPE | symbol | The edit row type's identifier.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
editingRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | IDs of the rows that are being edited.
addedRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Created but not committed rows.
isColumnEditingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean |  A function that returns a value that specifies if editing by a column is enabled.
changeAddedRow | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId: number, change: any }) => void | Applies a change to a created but uncommitted row. Note: `rowId` is a row index within the `addedRows` array.
rowChanges | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: string]: any } | An associative array that stores changes made to existing rows. Each array item specifies changes made to a row. The item's key specifies the associated row's ID.
changeRow | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId: number &#124; string, change: object }) => void | Applies a change to an existing row.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function used to get the specified row's column value.
createRowChange | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, value: any, columnName: string) => any | A function that returns a value that specifies row changes depending on the row's editable cell values. This function is called each time an editor's value changes.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.
valueEditor | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueEditorProps](data-type-provider.md#datatypeprovidervalueeditorprops) | A template that renders the editor.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows including editable rows.
