# TableView Plugin Reference

This plugin renders Grid data as a table. It contains the Table View and Table View Cell components that can be extended by other plugins and provides ways to customize table rows and columns.

## User Reference

### Dependencies

- [ColumnOrderState](column-order-state.md) [Optional]
- [DragDropContext](drag-drop-context.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tableLayoutTemplate | (args: [TableArgs](#table-args)) => ReactElement | | Renders a table layout using the specified parameters
tableCellTemplate | (args: [TableDataCellArgs](#table-data-cell-args)) => ReactElement | | Renders a table cell using the specified parameters
tableNoDataCellTemplate | (args: [TableCellArgs](#table-cell-args)) => ReactElement | | Renders a table cell using the specified parameters when the table is empty
tableStubCellTemplate | (args: [TableCellArgs](#table-cell-args)) => ReactElement | | Renders a stub table cell if the cell data is not provided
tableStubHeaderCellTemplate | (args: [TableCellArgs](#table-cell-args)) => ReactElement | | Renders a stub header cell if the cell data is not provided
allowColumnReordering | boolean | false | If true, it allows end-users to change the column's order by dragging it. Requires the [ColumnOrderState](column-order-state.md) and the [DragDropContext](drag-drop-context.md) dependencies.

## Interfaces

### <a name="column"></a>Column (Extension)

A value with a [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
align? | 'left' &#124; 'right' | Specifies the table column alignment.
width? | number | Specifies the table column width in pixels.

### <a name="table-args"></a>TableArgs

Describes properties passed to the table template when it is being rendered.

Field | Type | Description
------|------|------------
headerRows | Array&lt;[TableRow](#table-row)&gt; | Specifies rows rendered in the table header
bodyRows | Array&lt;[TableRow](#table-row)&gt; | Specifies rows rendered in the table body
columns | Array&lt;[TableColumn](#table-column)&gt; | Specifies the rendered table columns
cellTemplate | (args: [TableCellArgs](#table-cell-args)) => ReactElement | The template used to render table cells

### <a name="table-row"></a>TableRow

Describes properties of a table row the TableView plugin renders.

A value with the following shape:

Field | Type | Description
------|------|------------
key | string | A table row's unique identifier.
type | string | Specifies the table row type. The specified value affects which cell template is used to render the row.
rowId? | number &#124; string  | Specifies the associated user data row's ID.
row? | [Row](grid.md#row) | Specifies the associated user data row.
height? | number | Specifies the table row height.

### <a name="table-column"></a>TableColumn

Describes table column properties that the TableView plugin takes into account.

A value with the following shape:

Field | Type | Description
------|------|------------
key | string | A table column's unique identifier.
type | string | Specifies the table column type. The specified value affects which cell template is used to render the column.
column? | [Column](#column) | Specifies the associated user data column.
width? | number | Specifies the table column width.

### <a name="table-cell-args"></a>TableCellArgs

Describes properties passed to a cell template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
tableRow | [TableRow](#table-row) | Specifies a table row
tableColumn | [TableColumn](#table-column) | Specifies a table column
style? | Object | Styles that should be applied to the root cell element
colSpan? | number | The number of columns the cell spans that should be applied to the root cell element

### <a name="table-data-cell-args"></a>TableDataCellArgs

Describes properties passed to the table cell template when it is being rendered.

A value with the [TableCellArgs](#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
value | any | The value to be rendered within the cell
row | [Row](grid.md#row) | Specifies a table row
column | [Column](#column) | Specifies a table column

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered by the table view
columns | Getter | Array&lt;[Column](#column)&gt; | Columns to be rendered by the table view
getRowId | Getter | (row: [Row](grid.md#row)) => number &#124; string | The function used to get a unique row identifier
getCellData | Getter | (row: [Row](grid.md#row), columnName: string) => any | The function used to get a cell's data

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](#table-row)&gt; | Header rows to be rendered
tableBodyRows | Getter | Array&lt;[TableRow](#table-row)&gt; | Body rows to be rendered
tableColumns | Getter | Array&lt;[TableColumn](#table-column)&gt; | Columns to be rendered
tableExtraProps | Getter | { [key: string]: any } | Additional table properties that other plugins can provide
tableViewCell | Template | [TableCellArgs](#table-cell-args) | A template that renders a table cell
