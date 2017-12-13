# Table Plugin Reference

A plugin that renders Grid data as a table. It contains the Table Row and Table Cell components that can be extended by other plugins and provides ways to customize table rows and columns.

## User Reference

### Dependencies

- [DragDropContext](drag-drop-context.md) [Optional]
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
layoutComponent | ElementType&lt;[TableLayoutProps](#tablelayoutprops)&gt; | | A component that renders a table layout.
cellComponent | ElementType&lt;[TableDataCellProps](#tabledatacellprops)&gt; | | A component that renders a table cell.
rowComponent | ElementType&lt;[TableDataRowProps](#tabledatarowprops)&gt; | | A component that renders a table row.
noDataCellComponent | ElementType&lt;[TableNoDataCellProps](#tablenodatacellprops)&gt; | | A component that renders a table cell when the table is empty.
noDataRowComponent | ElementType&lt;[TableRowProps](#tablerowprops)&gt; | | A component that renders a table row when the table is empty.
stubCellComponent | ElementType&lt;[TableCellProps](#tablecellprops)&gt; | | A component that renders a stub table cell if the cell value is not provided.
stubHeaderCellComponent | ElementType&lt;[TableCellProps](#tablecellprops)&gt; | | A component that renders a stub header cell if the cell value is not provided.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### Column (Extension)

A value with a [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
align? | 'left' &#124; 'right' | Specifies the table's column alignment.
width? | number | Specifies the table's column width in pixels.

### TableLayoutProps

Describes properties passed to a component that renders a table layout.

Field | Type | Description
------|------|------------
headerRows | Array&lt;[TableRow](#tablerow)&gt; | Specifies the table header rows.
bodyRows | Array&lt;[TableRow](#tablerow)&gt; | Specifies the table body rows.
columns | Array&lt;[TableColumn](#tablecolumn)&gt; | Specifies the table columns.
rowComponent | ElementType&lt;[TableRowProps](#tablerowprops)&gt; | A component that renders table rows.
cellComponent | ElementType&lt;[TableCellArgs](#tablecellprops)&gt; | A component that renders table cells.

### TableRow

Describes properties of a table row that the Table plugin renders.

A value with the following shape:

Field | Type | Description
------|------|------------
key | string | A unique table row identifier.
type | string | Specifies the table row type. The specified value defines which cell template is used to render the row.
rowId? | number &#124; string | Specifies the associated row's ID.
row? | any | Specifies the associated row.
height? | number | Specifies the table row height.

### TableColumn

Describes properties of a table column that the Table plugin renders.

A value with the following shape:

Field | Type | Description
------|------|------------
key | string | A unique table column identifier.
type | string | Specifies the table column type. The specified value defines which cell template is used to render the column.
column? | [Column](#column-extension) | Specifies the associated user column.
width? | number | Specifies the table column width.

### TableCellProps

Describes properties passed to a component that renders a generic table cell.

A value with the following shape:

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | Specifies a table row.
tableColumn | [TableColumn](#tablecolumn) | Specifies a table column.
style? | Object | Styles that should be applied to the root cell element.
colSpan? | number | The count of columns that the root cell element spans.

### TableDataCellProps

Describes properties passed to a component that renders a table cell.

A value with the [TableCellProps](#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
value | any | Specifies a value to be rendered within the cell.
row | any | Specifies the cell's row.
column | [Column](#column-extension) | Specifies the cell's column.

### TableNoDataCellProps

Describes properties passed to a component that renders a table cell when the table is empty.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in a cell when a table is empty.

### TableRowProps

Describes properties passed to a component that renders a generic table row.

A value with the following shape:

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
children | ReactElement | A React element used to render a table row.
style? | Object | Styles that should be applied to the root row element.

### TableDataRowProps

Describes properties passed to a component that renders a table row.

A value with the [TableRowProps](#tablerowprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | any | A row.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
noData? | string | 'No data' | Specifies text shown when the Grid does not contain data.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Table.Cell | [TableDataCellProps](#tabledatacellprops) | A component that renders a table data cell.
Table.Row | [TableDataRowProps](#tabledatarowprops) | A component that renders a table data row.
Table.NoDataCell | [TableCellProps](#tablecellprops) | A component that renders a table cell when the table is empty.
Table.NoDataRow | [TableRowProps](#tablerowprops) | A component that renders a table row when the table is empty.
Table.StubCell | [TableCellProps](#tablecellprops) | A component that renders a stub table cell.
Table.StubHeaderCell | [TableCellProps](#tablecellprops) | A component that renders a stub table header cell.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be rendered by the table view.
columns | Getter | Array&lt;[Column](#column-extension)&gt; | Columns to be rendered by the table view.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get a cell’s value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Header rows to be rendered.
tableBodyRows | Getter | Array&lt;[TableRow](#tablerow)&gt; | Body rows to be rendered.
tableColumns | Getter | Array&lt;[TableColumn](#tablecolumn)&gt; | Columns to be rendered.
table | Template | Object? | A template that renders the table.
tableCell | Template | [TableCellProps](#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](#tablerowprops) | A template that renders a table row.
