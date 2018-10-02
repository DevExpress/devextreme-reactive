# DxVirtualTable Plugin Reference

A plugin that renders a scrollable table instead of a static one. It contains the [DxVirtualTable.components.DxRow](#plugin-components) and [DxVirtualTable.components.DxCell](#plugin-components) components that are used to customize virtual table rows and columns and can be extended by other plugins.

## Import

Use the following statement to import the plugin with embedded theme components:

```js
import { DxVirtualTable } from '@devexpress/dx-vue-grid-bootstrap4';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
height | number | 530 | The virtual table's height.
estimatedRowHeight | number | 49 | Estimated row height. Specify the average value for a table whose rows have different heights.
columnExtensions? | Array&lt;[DxVirtualTable.ColumnExtension](#dxvirtualtablecolumnextension)&gt; | | Additional column properties that the plugin can handle.
tableComponent | [DxVirtualTable.DxTable](#dxvirtualtabledxtable) | | A component that renders a table.
headComponent | [DxVirtualTable.DxHead](#dxvirtualtabledxhead)  | | A component that renders a table head.
bodyComponent | [DxVirtualTable.DxBody](#dxvirtualtabledxbody) | | A component that renders a table body.
containerComponent | [DxVirtualTable.DxContainer](#dxvirtualtabledxcontainer) | | A component that renders a table's container.
cellComponent | [DxVirtualTable.DxCell](#dxvirtualtabledxcell) | | A component that renders a table cell.
rowComponent | [DxVirtualTable.DxRow](#dxvirtualtabledxrow) | | A component that renders a table row.
noDataCellComponent | [DxVirtualTable.DxNoDataCell](#dxvirtualtabledxnodatacell) | | A component that renders a table cell when the table is empty.
noDataRowComponent | [DxVirtualTable.DxNoDataRow](#dxvirtualtabledxnodatarow) | | A component that renders a table row when the table is empty.
stubRowComponent | [DxVirtualTable.DxStubRow](#dxvirtualtabledxstubrow) | | A component that renders a stub table row if the row type is not recognized.
stubCellComponent | [DxVirtualTable.DxStubCell](#dxvirtualtabledxstubcell) | | A component that renders a stub table cell if the cell value is not provided.
stubHeaderCellComponent | [DxVirtualTable.DxStubHeaderCell](#dxvirtualtabledxstubheadercell) | | A component that renders a stub header cell if the cell value is not provided.
messages? | [DxVirtualTable.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Interfaces

### DxVirtualTable.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of the column to extend.
width? | number | The table column width in pixels.
align? | 'left' &#124; 'right' &#124; 'center' | The table column alignment.
wordWrapEnabled? | boolean | Specifies whether word wrap is enabled in column's cells.

### TableRow

Describes properties of a table row that the Table plugin renders.

Field | Type | Description
------|------|------------
key | string | A unique table row identifier.
type | string | The table row type. Defines which cell template is used to render the row.
rowId? | number &#124; string | The associated row's ID.
row? | any | The associated row.
height? | number | The table row height.

### TableColumn

Describes properties of a table column that the Table plugin renders.

Field | Type | Description
------|------|------------
key | string | A unique table column identifier.
type | string | The table column type. Defines which cell template is used to render the column.
column? | [Column](grid.md#column) | The associated user column.
width? | number | The column width.
align? | 'left' &#124; 'right' &#124; 'center' | The column alignment.

## Component Types

### DxVirtualTable.DxTable

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxVirtualTable.DxHead

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxVirtualTable.DxBody

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxVirtualTable.DxContainer

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxVirtualTable.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
tableColumn | [TableColumn](#tablecolumn) | A table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
value | any | A value to be rendered within the cell.
row | any | The cell's row.
column | [Column](grid.md#column) | The cell's column.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxVirtualTable.DxNoDataCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
tableColumn | [TableColumn](#tablecolumn) | A table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in a cell when a table is empty.

### DxVirtualTable.DxRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
row | any | A row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxVirtualTable.DxNoDataRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxVirtualTable.DxStubRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxVirtualTable.DxStubCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
tableColumn | [TableColumn](#tablecolumn) | A table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.

### DxVirtualTable.DxStubHeaderCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
tableColumn | [TableColumn](#tablecolumn) | A table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
noData? | string | 'No data' | The text shown when the Grid does not contain data.

## Plugin Components

Name | Type | Description
-----|------|------------
DxVirtualTable.components.DxTable | [DxVirtualTable.DxTable](#dxvirtualtabledxtable) | A component that renders a table.
DxVirtualTable.components.DxHead | [DxVirtualTable.DxHead](#dxvirtualtabledxhead) | A component that renders a table head.
DxVirtualTable.components.DxBody | [DxVirtualTable.DxBody](#dxvirtualtabledxbody) | A component that renders a table body.
DxVirtualTable.components.DxContainer | [DxVirtualTable.DxContainer](#dxvirtualtabledxcontainer) | A component that renders a table's container.
DxVirtualTable.components.DxCell | [DxVirtualTable.DxCell](#dxvirtualtabledxcell) | A component that renders a table data cell.
DxVirtualTable.components.DxRow | [DxVirtualTable.DxRow](#dxvirtualtabledxrow) | A component that renders a table data row.
DxVirtualTable.components.DxNoDataCell | [DxVirtualTable.DxNoDataCell](#dxvirtualtabledxnodatacell) | A component that renders a table cell when the table is empty.
DxVirtualTable.components.DxNoDataRow | [DxVirtualTable.DxNoDataRow](#dxvirtualtabledxnodatarow) | A component that renders a table row when the table is empty.
DxVirtualTable.components.DxStubRow | [DxVirtualTable.DxStubRow](#dxvirtualtabledxstubrow) | A component that renders a stub table row.
DxVirtualTable.components.DxStubCell | [DxVirtualTable.DxStubCell](#dxvirtualtabledxstubcell) | A component that renders a stub table cell.
DxVirtualTable.components.DxStubHeaderCell | [DxVirtualTable.DxStubHeaderCell](#dxvirtualtabledxstubheadercell) | A component that renders a stub table header cell.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be rendered by the table view.
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns to be rendered by the table view.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get a cell’s value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Header rows to be rendered.
tableBodyRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
tableColumns | Getter | Array&lt;[TableColumn](#tablecolumn)&gt; | Columns to be rendered.
table | Template | object? | A template that renders the table.
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object? | A template that renders a table row.
