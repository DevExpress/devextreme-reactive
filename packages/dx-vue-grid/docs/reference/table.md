# DxTable Plugin Reference

A plugin that renders Grid data as a table. It contains the Table Row and Table Cell components that can be extended by other plugins and provides ways to customize table rows and columns.

## Importing

Use the following statement to import a plugin with embedded theme components:

```js
import { Table } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Table } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxDataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[DxTable.ColumnExtension](#dxtablecolumnextension)&gt; | | Additional column properties that the plugin can handle.
tableComponent | Object | | A component that renders a table.
headComponent | Object | | A component that renders a table head.
bodyComponent | Object | | A component that renders a table body.
containerComponent | Object | | A component that renders a table's container.
cellComponent | Object | [DxTable.components.DxCell](#dxtablecomponentsdxcell) | A component that renders a table cell.
rowComponent | Object | [DxTable.components.DxRow](#dxtablecomponentsdxrow) | A component that renders a table row.
noDataCellComponent | Object | [DxTable.components.DxNoDataCell](#dxtablecomponentsdxnodatacell) | A component that renders a table cell when the table is empty.
noDataRowComponent | Object | [DxTable.components.DxNoDataRow](#dxtablecomponentsdxnodatarow) | A component that renders a table row when the table is empty.
stubRowComponent | Object | [DxTable.components.DxStubRow](#dxtablecomponentsdxstubrow) | A component that renders a stub table row if the row type is not recognized.
stubCellComponent | Object | [DxTable.components.DxStubCell](#dxtablecomponentsdxstubcell) | A component that renders a stub table cell if the cell value is not provided.
stubHeaderCellComponent | Object | [DxTable.components.DxStubHeaderCell](#dxtablecomponentsdxstubheadercell) | A component that renders a stub header cell if the cell value is not provided.
messages? | [DxTable.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Interfaces

### DxTable.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of the column to extend.
width? | number | The table column width in pixels.
align? | 'left' &#124; 'right' &#124; 'center' | The table column alignment.
wordWrapEnabled? | boolean | Specifies whether word wrap is enabled in a column's cells.

### TableRow

Describes properties of a table row that the Table plugin renders.

Field | Type | Description
------|------|------------
key | string | A unique table row identifier.
type | string | Specifies the table row type. The specified value defines which cell template is used to render the row.
rowId? | number &#124; string | Specifies the associated row's ID.
row? | any | Specifies the associated row.
height? | number | Specifies the table row height.

### TableColumn

Describes properties of a table column that the Table plugin renders.

Field | Type | Description
------|------|------------
key | string | A unique table column identifier.
type | string | Specifies the table column type. The specified value defines which cell template is used to render the column.
column? | [Column](grid.md#column) | Specifies the associated user column.
width? | number | Specifies the table column width.
align? | 'left' &#124; 'right' &#124; 'center' | Specifies the table's column alignment.

### DxTable.CellProps

Describes properties passed to a component that renders a generic table cell.

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | Specifies a table row.
tableColumn | [TableColumn](#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.

### DxTable.RowProps

Describes properties passed to a component that renders a generic table row.

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.

### DxTable.RowSlots

Describes slots passed to a component that renders a generic table row.

Field | Description
------|------------
default | The default Vue slot.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
noData? | string | 'No data' | Specifies text shown when the Grid does not contain data.

## Plugin Components

### DxTable.components.DxCell

A component that renders a table cell.

#### Props

Extends [DxTable.CellProps](#dxtablecellprops).

Field | Type | Description
------|------|------------
value | any | Specifies a value to be rendered within the cell.
row | any | Specifies the cell's row.
column | [Column](grid.md#column) | Specifies the cell's column.

### DxTable.components.DxNoDataCell

A component that renders a table cell when the table is empty.

#### Props

Extends [DxTable.CellProps](#dxtablecellprops).

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in a cell when a table is empty.

### DxTable.components.DxRow

A component that renders a table row.

Inherits [DxTable.RowSlots](#dxtablerowslots).

#### Props

Extends [DxTable.RowProps](#dxtablerowprops).

Field | Type | Description
------|------|------------
row | any | A row.

### DxTable.components.DxNoDataRow

A component that renders a table row when the table is empty.

Inherits [DxTable.RowProps](#dxtablerowprops) and [DxTable.RowSlots](#dxtablerowslots).

### DxTable.components.DxStubRow

A component that renders a stub table row if the row type is not recognized.

Inherits [DxTable.RowProps](#dxtablerowprops) and [DxTable.RowSlots](#dxtablerowslots).

### DxTable.components.DxStubCell

A component that renders a stub table cell if the cell value is not provided.

Inherits [DxTable.CellProps](#dxtablecellprops).

### DxTable.components.DxStubHeaderCell

A component that renders a stub header cell if the cell value is not provided.

Inherits [DxTable.CellProps](#dxtablecellprops).

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be rendered by the table view.
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns to be rendered by the table view.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get a cell’s value.
valueFormatter | Template | [DxDataTypeProvider.ValueFormatterProps](data-type-provider.md#datatypeprovidervalueformatterprops) | A template that renders the formatted value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Header rows to be rendered.
tableBodyRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
tableColumns | Getter | Array&lt;[TableColumn](#tablecolumn)&gt; | Columns to be rendered.
table | Template | object? | A template that renders the table.
tableCell | Template | [Table.CellProps](#tablecellprops) | A template that renders a table cell.
tableRow | Template | [Table.RowProps](#tablerowprops) | A template that renders a table row.
