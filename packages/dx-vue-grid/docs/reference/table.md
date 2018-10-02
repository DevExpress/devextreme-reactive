# DxTable Plugin Reference

A plugin that renders Grid data as a table. It contains the Table Row and Table Cell components that can be extended by other plugins and provides ways to customize table rows and columns.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTable } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTable } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[DxTable.ColumnExtension](#dxtablecolumnextension)&gt; | | Additional column properties that the plugin can handle.
tableComponent | [DxTable.DxTable](#dxtabledxtable) | | A component that renders a table.
headComponent | [DxTable.DxHead](#dxtabledxhead)  | | A component that renders a table head.
bodyComponent | [DxTable.DxBody](#dxtabledxbody) | | A component that renders a table body.
containerComponent | [DxTable.DxContainer](#dxtabledxcontainer) | | A component that renders a table's container.
cellComponent | [DxTable.DxCell](#dxtabledxcell) | | A component that renders a table cell.
rowComponent | [DxTable.DxRow](#dxtabledxrow) | | A component that renders a table row.
noDataCellComponent | [DxTable.DxNoDataCell](#dxtabledxnodatacell) | | A component that renders a table cell when the table is empty.
noDataRowComponent | [DxTable.DxNoDataRow](#dxtabledxnodatarow) | | A component that renders a table row when the table is empty.
stubRowComponent | [DxTable.DxStubRow](#dxtabledxstubrow) | | A component that renders a stub table row if the row type is not recognized.
stubCellComponent | [DxTable.DxStubCell](#dxtabledxstubcell) | | A component that renders a stub table cell if the cell value is not provided.
stubHeaderCellComponent | [DxTable.DxStubHeaderCell](#dxtabledxstubheadercell) | | A component that renders a stub header cell if the cell value is not provided.
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

## Component Types

### DxTable.DxTable

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTable.DxHead

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTable.DxBody

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTable.DxContainer

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTable.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | Specifies a table row.
tableColumn | [TableColumn](#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
value | any | Specifies a value to be rendered within the cell.
row | any | Specifies the cell's row.
column | [Column](grid.md#column) | Specifies the cell's column.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTable.DxNoDataCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | Specifies a table row.
tableColumn | [TableColumn](#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in a cell when a table is empty.

### DxTable.DxRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
row | any | A row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTable.DxNoDataRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTable.DxStubRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTable.DxStubCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | Specifies a table row.
tableColumn | [TableColumn](#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.

### DxTable.DxStubHeaderCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | Specifies a table row.
tableColumn | [TableColumn](#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
noData? | string | 'No data' | Specifies text shown when the Grid does not contain data.

## Plugin Components

Name | Type | Description
-----|------|------------
DxTable.components.DxTable | [DxTable.DxTable](#dxtabledxtable) | A component that renders a table.
DxTable.components.DxHead | [DxTable.DxHead](#dxtabledxhead) | A component that renders a table head.
DxTable.components.DxBody | [DxTable.DxBody](#dxtabledxbody) | A component that renders a table body.
DxTable.components.DxContainer | [DxTable.DxContainer](#dxtabledxcontainer) | A component that renders a table's container.
DxTable.components.DxCell | [DxTable.DxCell](#dxtabledxcell) | A component that renders a table data cell.
DxTable.components.DxRow | [DxTable.DxRow](#dxtabledxrow) | A component that renders a table data row.
DxTable.components.DxNoDataCell | [DxTable.DxNoDataCell](#dxtabledxnodatacell) | A component that renders a table cell when the table is empty.
DxTable.components.DxNoDataRow | [DxTable.DxNoDataRow](#dxtabledxnodatarow) | A component that renders a table row when the table is empty.
DxTable.components.DxStubRow | [DxTable.DxStubRow](#dxtabledxstubrow) | A component that renders a stub table row.
DxTable.components.DxStubCell | [DxTable.DxStubCell](#dxtabledxstubcell) | A component that renders a stub table cell.
DxTable.components.DxStubHeaderCell | [DxTable.DxStubHeaderCell](#dxtabledxstubheadercell) | A component that renders a stub table header cell.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be rendered by the table view.
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns to be rendered by the table view.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get a cell’s value.
valueFormatter | Template | [DxDataTypeProvider.DxValueFormatter](data-type-provider.md#dxdatatypeproviderdxvalueformatter) | A template that renders the formatted value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Header rows to be rendered.
tableBodyRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
tableColumns | Getter | Array&lt;[TableColumn](#tablecolumn)&gt; | Columns to be rendered.
table | Template | object? | A template that renders the table.
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object? | A template that renders a table row.
