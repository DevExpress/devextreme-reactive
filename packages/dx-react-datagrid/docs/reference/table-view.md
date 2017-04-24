# TableView Plugin Reference

This plugin renders the DataGrid data as a table. It contains visualization components such as a table view, table view cell that can be extended by other plugins. It also exposes some customization points to manage column span, height of rows, width of columns, etc.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tableTemplate | Component&lt;[TableProps](#table-props)&gt; | | A component that renders a table based on the supplied parameters

## Interfaces

### <a name="table-props"></a>TableProps

Describes properties passed to the table template when rendering

Field | Type | Description
------|------|------------
headerRows | Array&lt;[TableRow](#table-row)&gt; | Specifies the rows that should be rendered within the table heading
bodyRows | Array&lt;[TableRow](#table-row)&gt; | Specifies the rows that should be rendered within the table body
columns | Array&lt;[TableColumn](#table-column)&gt; | Specifies the rendered table columns
cellContentTemplate | Component&lt;[CellContentProps](#cell-content-props)&gt; | A template that should be used to render table cell content

### <a name="cell-content-props"></a>CellContentProps

Describes properties passed to a cell content template when rendering

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](#table-row) | Specifies a table row
column | [TableColumn](#table-column) | Specifies a table column

### <a name="table-row"></a>TableRow

Describes properties of a table row that is rendered by the TableView plugin

Extends [Row](datagrid.md#row)

A value with the following shape:

Field | Type | Description
------|------|------------
type? | string | Specifies the table row type. Used to identify a cell template for a rendered row. Type is not defined for rows passed by a user into the widget

### <a name="table-column"></a>TableColumn

Describes properties of a table column that are taken into account by the TableView plugin

Extends [Column](datagrid.md#column)

A value with the following shape:

Field | Type | Description
------|------|------------
type? | string | Specifies the table column type. Used to identify a cell template to render a column cell. The type property is not defined for data rows

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => Array&lt;[Row](datagrid.md#row)&gt; | Rows to be rendered by the table view
columns | Getter | () => Array&lt;[Column](datagrid.md#column)&gt; | Columns to be rendered by the table view

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | () => Array&lt;[TableRow](#table-row)&gt; | Rows to be rendered inside the table heading
tableBodyRows | Getter | () => Array&lt;[TableRow](#table-row)&gt; | Rows to be rendered inside the table body
tableColumns | Getter | () => Array&lt;[TableColumn](#table-column)&gt; | Columns to be rendered inside the table
tableExtraProps | Getter | () => { [key: string]: any } | Additional table properties that can be provided by other plugins
tableView | Template | none | A template that renders a table
tableViewCell | Template | { row: [TableRow](#table-row), column: [TableColumn](#table-column) } | A template that renders the table cell content
