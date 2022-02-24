# Table Plugin Reference

A plugin that renders Grid data as a table. This plugin enables you to customize table rows and columns, and contains the Table Row and Table Cell components that can be extended by other plugins

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Table } from '@devexpress/dx-react-grid-material-ui';
// import { Table } from '@devexpress/dx-react-grid-bootstrap4';
// import { Table } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Table } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [DragDropProvider](drag-drop-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[Table.ColumnExtension](#tablecolumnextension)&gt; | | Additional column properties that the plugin can handle.
tableComponent | ComponentType&lt;object&gt; | | A component that renders a table.
headComponent | ComponentType&lt;object&gt; | | A component that renders a table head.
bodyComponent | ComponentType&lt;object&gt; | | A component that renders a table body.
footerComponent | ComponentType&lt;object&gt; | | A component that renders a table footer.
containerComponent | ComponentType&lt;object&gt; | | A component that renders a table's container.
cellComponent | ComponentType&lt;[Table.DataCellProps](#tabledatacellprops)&gt; | | A component that renders a table cell.
rowComponent | ComponentType&lt;[Table.DataRowProps](#tabledatarowprops)&gt; | | A component that renders a table row.
noDataCellComponent | ComponentType&lt;[Table.NoDataCellProps](#tablenodatacellprops)&gt; | | A component that renders a table cell when the table is empty.
noDataRowComponent | ComponentType&lt;[Table.RowProps](#tablerowprops)&gt; | | A component that renders a table row when the table is empty.
stubRowComponent | ComponentType&lt;[Table.RowProps](#tablerowprops)&gt; | | A component that renders a stub table row if the row type is not recognized.
stubCellComponent | ComponentType&lt;[Table.CellProps](#tablecellprops)&gt; | | A component that renders a stub table cell if the cell value is not provided.
stubHeaderCellComponent | ComponentType&lt;[Table.CellProps](#tablecellprops)&gt; | | A component that renders a stub header cell if the cell value is not provided.
messages? | [Table.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Interfaces

### Table.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of the column to extend.
width? | number &#124; string | The table column width in pixels or CSS-accepted units (`auto`, `px`, `%`, `em`, `rem`, `vm`, `vh`, `vmin`, `vmax`).
align? | 'left' &#124; 'right' &#124; 'center' | The table column alignment.
wordWrapEnabled? | boolean | Specifies whether word wrap is enabled in a column's cells.

### TableRow

Describes properties of a table row that the Table plugin renders.

Field | Type | Description
------|------|------------
key | string | A unique table row identifier.
type | symbol | Specifies the table row type. The specified value defines which cell template is used to render the row.
rowId? | number &#124; string | Specifies the associated row's ID.
row? | any | Specifies the associated row.
height? | number | Specifies the table row height.

### TableColumn

Describes properties of a table column that the Table plugin renders.

Field | Type | Description
------|------|------------
key | string | A unique table column identifier.
type | symbol | Specifies the table column type. The specified value defines which cell template is used to render the column.
column? | [Column](grid.md#column) | Specifies the associated user column.
width? | number | Specifies the table column width.
align? | 'left' &#124; 'right' &#124; 'center' | Specifies the table's column alignment.
fixed? | 'left' &#124; 'right' | Specifies the fixed table's column alignment.

### Table.CellProps

Describes properties passed to a component that renders a generic table cell.

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | Specifies a table row.
tableColumn | [TableColumn](#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.

### Table.DataCellProps

Describes properties passed to a component that renders a table cell.

Extends [Table.CellProps](#tablecellprops)

Field | Type | Description
------|------|------------
value | any | Specifies a value to be rendered within the cell.
row | any | Specifies the cell's row.
column | [Column](grid.md#column) | Specifies the cell's column.
children? | ReactNode | A React node used to render the cell content.

### Table.NoDataCellProps

Describes properties passed to a component that renders a table cell when the table is empty.

Extends [Table.CellProps](#tablecellprops)

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in a cell when a table is empty.

### Table.RowProps

Describes properties passed to a component that renders a generic table row.

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
children | ReactNode | A React node used to render a table row.

### Table.DataRowProps

Describes properties passed to a component that renders a table row.

Extends [Table.RowProps](#tablerowprops)

Field | Type | Description
------|------|------------
row | any | A row.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
noData? | string | 'No data' | Specifies text shown when the Grid does not contain data.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Table.Table | object | A component that renders a table.
Table.TableHead | object | A component that renders a table head.
Table.TableBody | object | A component that renders a table body.
Table.Container | object | A component that renders a table's container.
Table.Cell | [Table.DataCellProps](#tabledatacellprops) | A component that renders a table data cell.
Table.Row | [Table.DataRowProps](#tabledatarowprops) | A component that renders a table data row.
Table.NoDataCell | [Table.NoDataCellProps](#tablenodatacellprops) | A component that renders a table cell when the table is empty.
Table.NoDataRow | [Table.RowProps](#tablerowprops) | A component that renders a table row when the table is empty.
Table.StubRow | [Table.RowProps](#tablerowprops) | A component that renders a stub table row.
Table.StubCell | [Table.CellProps](#tablecellprops) | A component that renders a stub table cell.
Table.StubHeaderCell | [Table.CellProps](#tablecellprops) | A component that renders a stub table header cell.

Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
COLUMN&lowbar;TYPE | symbol | The data column type's indentifier.
ROW&lowbar;TYPE | symbol | The data row type's indentifier.
NODATA&lowbar;ROW&lowbar;TYPE | symbol | The nodata row type's indentifier.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be rendered by the table view.
columns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Column](grid.md#column)&gt; | Columns to be rendered by the table view.
getRowId | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number &#124; string | A function used to get a unique row identifier.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function used to get a cell’s value.
valueFormatter | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueFormatterProps](data-type-provider.md#datatypeprovidervalueformatterprops) | A template that renders the formatted value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](#tablerow)&gt; | Header rows to be rendered.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
tableFooterRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](#tablerow)&gt; | Footer rows to be rendered.
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](#tablecolumn)&gt; | Columns to be rendered.
table | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the table.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](#tablerowprops) | A template that renders a table row.
