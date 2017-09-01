# Grid Reference

The Grid is a root container component designed to process and display data specified via the `rows` property. You can provide the columns configuration using the `columns` property. The Grid functionality (data visualization and data processing) is implemented in several plugins specified as child components. See the [plugins concept](../README.md#plugins-overview) for details.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | Array&lt;[Row](#row)&gt; | | Specifies data to be displayed by the Grid.
columns | Array&lt;[Column](#column)&gt; | | Specifies for which row object fields columns are created.
getRowId | (row: [Row](#row)) => number &#124; string | null | Specifies the function used to get a row ID.
getCellData | (row: [Row](#row), columnName: string) => any | null | Specifies the function used to get a cell data.
rootTemplate | (args: [RootArgs](#root-args)) => ReactElement | | A template rendering the grid root layout.
headerPlaceholderTemplate | (args: [HeaderPlaceholderArgs](#header-placeholder-args)) => ReactElement | null | A template that renders the header placeholder.
footerPlaceholderTemplate | (args: [FooterPlaceholderArgs](#footer-placeholder-args)) => ReactElement | null | A template that renders the footer placeholder.

## Interfaces

### Row

A data object representing a Grid row. This object can contain any field. The grid creates columns for the ones listed in the `columns` property.

### Column

Describes the column interface.

A value with the following shape:

Field | Type | Description
------|------|------------
name | string | Specifies the column name or the name of a row object field whose value the column displays. If the column name does not match any field name, specify the `getCellData` function.
getCellData | (row: [Row](#row), columnName: string) => any | Specifies the function used to get the column data for a given row.

### <a name="root-args"></a>RootArgs

Describes properties passed to the root template when it is being rendered.

Field | Type | Description
------|------|------------
headerTemplate | () => ReactElement | A template that renders the grid header.
bodyTemplate | () => ReactElement | A template that renders the grid body.
footerTemplate | () => ReactElement | A template that renders the grid footer.

### <a name="header-placeholder-args"></a>HeaderPlaceholderArgs

Describes properties passed to the header placeholder template when it is being rendered.

Field | Type | Description
------|------|------------
children? | ReactElement | A React element to be placed into the header.

### <a name="footer-placeholder-args"></a>FooterPlaceholderArgs

Describes properties passed to the footer placeholder template when it is being rendered.

Field | Type | Description
------|------|------------
children? | ReactElement | A React element to be placed into the footer.

## Plugin Developer Reference

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](#row)&gt; | Grid rows.
columns | Getter | Array&lt;[Column](#column)&gt; | Grid columns.
root | Template | Object? | A template that renders the grid root layout.
header | Template | Object? | A template that renders the grid header.
body | Template | Object? | A template that renders the grid body.
footer | Template | Object? | A template that renders the grid footer.
