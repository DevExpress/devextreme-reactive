# TableView Plugin Reference

Plugin that renders table. It contains visualization components like table view, table view cell that can be extended by other plugins. There ara also defined customization points like columns span, height and width specification for rows and columns and etc.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
tableTemplate | Component&lt;[TableProps](#table-props)&gt; | | Component that renders table based on supplied parameters

## Interfaces

### <a name="table-props"></a>TableProps

Describes properties passed to table template when rendered

Field | Type | Description
------|------|------------
headerRows | Array&lt;[TableRow](#table-row)&gt; | Specifies rows that will be placed inside table heading
bodyRows | Array&lt;[TableRow](#table-row)&gt; | Specifies rows that will be placed inside table body
columns | Array&lt;[TableColumn](#table-column)&gt; | Specifies columns that will be rendered inside table
cellContentTemplate | Component&lt;[CellContentProps](#cell-content-props)&gt; | Cell content template provided by plugin that should be rendered inside table

### <a name="cell-content-props"></a>CellContentProps

Describes properties passed to cell content template when rendered

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](#table-row) | Specifies table row
column | [TableColumn](#table-column) | Specifies table column

### <a name="table-row"></a>TableRow

Describes properties used to define table row

Extends [Row](datagrid.md#row)

A value with the following shape:

Field | Type | Description
------|------|------------
type? | string | Specifies table row type. Used to identify cell template for rendered row. For rows passed by user into the widget type is not defined

### <a name="table-column"></a>TableColumn

Describes properties used to define table column

Extends [Column](datagrid.md#column)

A value with the following shape:

Field | Type | Description
------|------|------------
type? | string | Specifies table column type. Used to identify cell template for rendered column. For rows passed by user into the widget type is not defined

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => Array&lt;[Row](datagrid.md#row)&gt; | Rows to be rendered by table view
columns | Getter | () => Array&lt;[Column](datagrid.md#column)&gt; | Rows to be rendered by table view

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | () => Array&lt;[TableRow](#table-row)&gt; | Rows that will be placed inside table heading
tableBodyRows | Getter | () => Array&lt;[TableRow](#table-row)&gt; | Rows that will be placed inside table body
tableColumns | Getter | () => Array&lt;[TableColumn](#table-column)&gt; | Specifies columns that will be rendered inside table
tableExtraProps | Getter | () => { [key: string]: any } | Specifies additional table properties that can be added by plugins
tableView | Template | none | Template that renders table
tableViewCell | Template | { row: [TableRow](#table-row), column: [TableColumn](#table-column) } | Template that renders table cell content
