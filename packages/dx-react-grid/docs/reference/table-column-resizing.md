# TableColumnResizing Plugin Reference

A plugin that manages table column widths.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableColumnResizing } from '@devexpress/dx-react-grid-material-ui';
// import { TableColumnResizing } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableColumnResizing } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableColumnResizing } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnWidths? | Array&lt;[TableColumnWidthInfo](#tablecolumnwidthinfo)&gt; | | Specifies column widths.
minColumnWidth? | number | `45` for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3); `55` for [Bootstrap4](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap4); `40` for [Material-UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui); | Specifies a column's minimum width.
maxColumnWidth? | number | `Infinity` | Specifies a column's maximum width.
defaultColumnWidths? | Array&lt;[TableColumnWidthInfo](#tablecolumnwidthinfo)&gt; | [] | Specifies initial column widths in uncontrolled mode.
onColumnWidthsChange? | (nextColumnWidths: Array&lt;[TableColumnWidthInfo](#tablecolumnwidthinfo)&gt;) => void | | Handles column width changes.
columnExtensions? | Array&lt;[TableColumnResizing.ColumnExtension](#tablecolumnresizingcolumnextension)&gt; | [] | Additional column properties that the plugin can handle.
resizingMode? | string | `widget` | Specifies the resizing mode: `widget` or `nextColumn`. In `widget` mode, `auto` and percentage values cannot be used to specify column widths.

## Interfaces

### TableColumnWidthInfo

Describes an object that specifies a column width.

Field | Type | Description
------|------|------------
columnName | string | A column name.
width | number &#124; string | A column width in pixels or CSS-accepted units (`auto`, `px`, `%`, `em`, `rem`, `vm`, `vh`, `vmin`, `vmax`).

### TableColumnResizing.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
minWidth? | number | A minimum column width.
maxWidth? | number | A maximum column width.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns whose width the plugin manages.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns with new width values applied.
tableColumnResizingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Specifies whether table column resizing is enabled.
columnResizingMode | [Getter](../../../dx-react-core/docs/reference/getter.md) | string | Specifies the resizing mode: `widget` or `nextColumn`.
changeTableColumnWidth | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, shift: number }) => void | Changes the specified column width. The column width is increased by the corresponding shift value, or decreased if the value is negative.
draftTableColumnWidth | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, shift: number }) => void | Changes the specified column width used for preview. The column width is increased by the corresponding shift value or decreased if the value is less than zero.
cancelTableColumnWidthDraft | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Cancels changes to the column width used for preview.
