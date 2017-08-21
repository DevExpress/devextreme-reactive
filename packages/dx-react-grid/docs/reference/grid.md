# Grid Reference

The Grid is a root container component that accepts data via the `rows` property. It provides this data to the hosted plugins specified as child components to preprocess and display it as a table representation. It also accepts the table columns description via the `columns` property.

You should specify plugins to display data as it does not contain any by default. See the [plugins concept](../README.md#plugins-overview) for more details.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | Array&lt;[Row](#row)&gt; | | Specifies rows with data to be rendered
columns | Array&lt;[Column](#column)&gt; | | Specifies row fields to be rendered as columns
getRowId | (row: [Row](#row)) => number &#124; string | null | Specifies the function used to get a unique row identifier
getCellData | (row: [Row](#row), columnName: string) => any | null | Specifies the function used to get a cell data
rootTemplate | (args: [RootArgs](#root-args)) => ReactElement | | Renders a root layout using the specified parameters
headerPlaceholderTemplate | (args: [HeaderPlaceholderArgs](#header-placeholder-args)) => ReactElement | null | Renders a heading placeholder using the specified parameters
footerPlaceholderTemplate | (args: [FooterPlaceholderArgs](#footer-placeholder-args)) => ReactElement | null | Renders a footer placeholder using the specified parameters

## Interfaces

### Row

A data object to be represented as a Grid row

Note that multiple fields can be specified. These fields are displayed as data within the Grid.

### Column

Describes the column interface

A value with the following shape:

Field | Type | Description
------|------|------------
name | string | Specifies the field name in the data row to obtain a column value. A unique key can also be used to identify a column
getCellData | (row: [Row](#row), columnName: string) => any | Specifies the function used to get a cell data
createRowChange | (row: [Row](#row), value: string &#124; number, columnName: string) => object | Specifies the function used to create a row change

### <a name="root-args"></a>RootArgs

Describes properties passed to the root template when it is being rendered

Field | Type | Description
------|------|------------
headerTemplate | () => ReactElement | A template for rendering the header
bodyTemplate | () => ReactElement | A template for rendering the body
footerTemplate | () => ReactElement | A template for rendering body the footer

### <a name="header-placeholder-args"></a>HeaderPlaceholderArgs

Describes properties passed to the header placeholder template when it is being rendered

Field | Type | Description
------|------|------------
children? | ReactElement | A markup to be placed into the header

### <a name="footer-placeholder-args"></a>FooterPlaceholderArgs

Describes properties passed to the footer placeholder template when it is being rendered

Field | Type | Description
------|------|------------
children? | ReactElement | A markup to be placed into the footer

## Plugin Developer Reference

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](#row)&gt; | Grid rows
columns | Getter | Array&lt;[Column](#column)&gt; | Grid columns
root | Template | Object? | A template that renders the grid root layout
header | Template | Object? | A template that renders the grid header
body | Template | Object? | A template that renders the grid body
footer | Template | Object? | A template that renders the grid footer
