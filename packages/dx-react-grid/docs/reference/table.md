# Table Plugin Reference

A plugin that renders Grid data as a table. It contains the Table Row and Table Cell components that can be extended by other plugins and provides ways to customize table rows and columns.

## User Reference

### Dependencies

- [DragDropProvider](drag-drop-provider.md) [Optional]
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[Table.ColumnExtension](#tablecolumnextension)&gt; | | Additional column properties that the plugin can handle.
cellComponent | ComponentType&lt;[Table.DataCellProps](#tabledatacellprops)&gt; | | A component that renders a table cell.
rowComponent | ComponentType&lt;[Table.DataRowProps](#tabledatarowprops)&gt; | | A component that renders a table row.
noDataCellComponent | ComponentType&lt;[Table.NoDataCellProps](#tablenodatacellprops)&gt; | | A component that renders a table cell when the table is empty.
noDataRowComponent | ComponentType&lt;[Table.RowProps](#tablerowprops)&gt; | | A component that renders a table row when the table is empty.
stubCellComponent | ComponentType&lt;[Table.CellProps](#tablecellprops)&gt; | | A component that renders a stub table cell if the cell value is not provided.
stubHeaderCellComponent | ComponentType&lt;[Table.CellProps](#tablecellprops)&gt; | | A component that renders a stub header cell if the cell value is not provided.
messages? | [Table.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Interfaces

### Table.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of the column to extend.
width? | number | The table column width in pixels.
align? | 'left' &#124; 'right' | The table column alignment.

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
align? | 'left' &#124; 'right' | Specifies the table's column alignment.

### Table.CellProps

Describes properties passed to a component that renders a generic table cell.

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | Specifies a table row.
tableColumn | [TableColumn](#tablecolumn) | Specifies a table column.
style? | Object | Styles that should be applied to the root cell element.
colSpan? | number | The count of columns that the root cell element spans.

### Table.DataCellProps

Describes properties passed to a component that renders a table cell.

Extends [Table.CellProps](#tablecellprops)

Field | Type | Description
------|------|------------
value | any | Specifies a value to be rendered within the cell.
row | any | Specifies the cell's row.
column | [Column](grid.md#column) | Specifies the cell's column.

### Table.NoDataCellProps

Describes properties passed to a component that renders a table cell when the table is empty.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in a cell when a table is empty.

### Table.RowProps

Describes properties passed to a component that renders a generic table row.

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
children | ReactNode | A React node used to render a table row.
style? | Object | Styles that should be applied to the root row element.

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
Table.Cell | [Table.DataCellProps](#tabledatacellprops) | A component that renders a table data cell.
Table.Row | [Table.DataRowProps](#tabledatarowprops) | A component that renders a table data row.
Table.NoDataCell | [Table.CellProps](#tablecellprops) | A component that renders a table cell when the table is empty.
Table.NoDataRow | [Table.RowProps](#tablerowprops) | A component that renders a table row when the table is empty.
Table.StubCell | [Table.CellProps](#tablecellprops) | A component that renders a stub table cell.
Table.StubHeaderCell | [Table.CellProps](#tablecellprops) | A component that renders a stub table header cell.

If you specify additional properties, they are added to the component's root element.

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
table | Template | Object? | A template that renders the table.
tableCell | Template | [Table.CellProps](#tablecellprops) | A template that renders a table cell.
tableRow | Template | [Table.RowProps](#tablerowprops) | A template that renders a table row.
