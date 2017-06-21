# TableView Plugin Reference

This plugin renders the Grid data as a table. It contains the Table View and Table View Cell components that can be extended by other plugins and provides ways to customize table rows and columns.

## User Reference

### Dependencies

- [ColumnOrderState](column-order-state.md) [Optional]
- [DragDropContext](drag-drop-context.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tableTemplate | (args: [TableArgs](#table-args)) => ReactElement | | Renders a table using the specified parameters
tableCellTemplate | (args: [TableCellArgs](#table-cell-args)) => ReactElement | | Renders a table cell using the specified parameters
tableNoDataCellTemplate | (args: [TableNoDataCellArgs](#table-no-data-cell-args)) => ReactElement | | Renders a table cell using the specified parameters when the table is empty
tableStubCellTemplate | (args: [TableStubCellArgs](#table-stub-cell-args)) => ReactElement | | Renders a stub table cell if the cell data is not provided
tableStubHeaderCellTemplate | (args: [TableStubHeaderCellArgs](#table-stub-header-cell-args)) => ReactElement | | Renders a stub header cell if the cell data is not provided
allowColumnReordering | boolean | false | If true, allows an end-user to change the column's order by dragging it

## Interfaces

### <a name="table-args"></a>TableArgs

Describes properties passed to the table template when it is being rendered.

Field | Type | Description
------|------|------------
headerRows | Array&lt;[TableRow](#table-row)&gt; | Specifies rows rendered in the table header
bodyRows | Array&lt;[TableRow](#table-row)&gt; | Specifies rows rendered in the table body
columns | Array&lt;[TableColumn](#table-column)&gt; | Specifies the rendered table columns
cellTemplate | (args: [CellArgs](#cell-args)) => ReactElement | The template used to render table cells

### <a name="cell-args"></a>CellArgs

Describes properties passed to a cell template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](#table-row) | Specifies a table row
column | [TableColumn](#table-column) | Specifies a table column
style? | Object | Specifies cell styles

### <a name="table-cell-args"></a>TableCellArgs

Describes properties passed to the table cell template when it is being rendered.

Field | Type | Description
------|------|------------
row | [TableRow](#table-row) | Specifies a table row
column | [TableColumn](#table-column) | Specifies a table column
style? | Object | Specifies cell styles

### <a name="table-no-data-cell-args"></a>TableNoDataCellArgs

Describes properties passed to the table cell being rendered when using an empty template.

Field | Type | Description
------|------|------------
style? | Object | Specifies cell styles
colspan? | number | Specifies the number of columns the cell spans

### <a name="table-stub-cell-args"></a>TableStubCellArgs

Describes properties passed to the stub table cell template being rendered.

Field | Type | Description
------|------|------------
style? | Object | Specifies cell styles

### <a name="table-stub-header-cell-args"></a>TableStubHeaderCellArgs

Describes properties passed to the stub header cell template being rendered.

Field | Type | Description
------|------|------------
style? | Object | Specifies cell styles

### <a name="table-row"></a>TableRow

Describes properties of a table row rendered by the TableView plugin.

Extends [Row](grid.md#row)

A value with the following shape:

Field | Type | Description
------|------|------------
type? | string | Specifies the table row type. Defines a cell template used to render a row. The type is not defined for rows passed by a user.

### <a name="table-column"></a>TableColumn

Describes table column properties that the TableView plugin takes into account.

Extends [Column](grid.md#column)

A value with the following shape:

Field | Type | Description
------|------|------------
type? | string | Specifies the table column type. Defines a cell template used to render a cell. The type is not defined for data rows

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered by the table view
columns | Getter | () => Array&lt;[Column](grid.md#column)&gt; | Columns to be rendered by the table view

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | () => Array&lt;[TableRow](#table-row)&gt; | Rows to be rendered inside the table header
tableBodyRows | Getter | () => Array&lt;[TableRow](#table-row)&gt; | Rows to be rendered inside the table body
tableColumns | Getter | () => Array&lt;[TableColumn](#table-column)&gt; | Columns to be rendered inside the table
tableExtraProps | Getter | () => { [key: string]: any } | Additional table properties that other plugins can provide 
tableViewCell | Template | { row: [TableRow](#table-row), column: [TableColumn](#table-column) } | A template that renders a table cell
