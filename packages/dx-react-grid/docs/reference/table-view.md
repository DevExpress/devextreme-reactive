# TableView Plugin Reference

This plugin renders the Grid data as a table. It contains visualization components such as a table view, table view cell that can be extended by other plugins. It also exposes some customization points to manage column span, row height, column width, etc.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tableTemplate | (args: [TableArgs](#table-args)) => ReactElement | | Renders a table using the specified parameters
tableCellTemplate | (args: [TableCellArgs](#table-cell-args)) => ReactElement | | Renders a table cell using the specified parameters
tableNoDataCellTemplate | (args: Object) => ReactElement | | Renders a table cell for an empty state using the specified parameters

## Interfaces

### <a name="table-args"></a>TableArgs

Describes properties passed to the table template when it is being rendered

Field | Type | Description
------|------|------------
headerRows | Array&lt;[TableRow](#table-row)&gt; | Specifies rows that should be rendered within the table header
bodyRows | Array&lt;[TableRow](#table-row)&gt; | Specifies rows that should be rendered within the table body
columns | Array&lt;[TableColumn](#table-column)&gt; | Specifies the rendered table columns
cellTemplate | (args: [CellArgs](#cell-args)) => ReactElement | A template that should be used to render table cells

### <a name="cell-args"></a>CellArgs

Describes properties passed to a cell template when it is being rendered

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](#table-row) | Specifies a table row
column | [TableColumn](#table-column) | Specifies a table column

### <a name="table-cell-args"></a>TableCellArgs

Describes properties passed to the table cell template when it is being rendered

Field | Type | Description
------|------|------------
row | [TableRow](#table-row) | Specifies a table row
column | [TableColumn](#table-column) | Specifies a table column

### <a name="table-row"></a>TableRow

Describes properties of a table row that is rendered by the TableView plugin

Extends [Row](grid.md#row)

A value with the following shape:

Field | Type | Description
------|------|------------
type? | string | Specifies the table row type. Used to identify a cell template for a rendered row. The type is not defined for rows passed by a user.

### <a name="table-column"></a>TableColumn

Describes table column properties taken into account by the TableView plugin

Extends [Column](grid.md#column)

A value with the following shape:

Field | Type | Description
------|------|------------
type? | string | Specifies the table column type. Used to identify a cell template to render a column cell. The type property is not defined for data rows

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
tableExtraProps | Getter | () => { [key: string]: any } | Additional table properties that can be provided by other plugins
tableView | Template | | A template that renders a table
tableViewCell | Template | { row: [TableRow](#table-row), column: [TableColumn](#table-column) } | A template that renders a table cell
