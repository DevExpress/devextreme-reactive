# Grid Reference

The Grid is a root container component designed to process and display data specified via the `rows` property. You can configure columns using the `columns` property. The Grid's functionality (data visualization and data processing) is implemented in several plugins specified as child components. See the [plugins concept](../README.md#plugins-overview) for details.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | Array&lt;any&gt; | | An array containing custom data. A user defines the access to this data. Refer to [Data Accessors](../guides/data-accessors.md) for details.
columns | Array&lt;[Column](#column)&gt; | | Specifies for which row fields columns are created.
getRowId | (row: any) => number &#124; string | null | Specifies the function used to get a unique row identifier.
getCellValue | (row: any, columnName: string) => any | null | Specifies the function used to get a cell's value.
rootTemplate | (args: [RootArgs](#root-args)) => ReactElement | | A template that renders the grid root layout.
headerPlaceholderTemplate | (args: [HeaderPlaceholderArgs](#header-placeholder-args)) => ReactElement | null | A template that renders the header placeholder.
footerPlaceholderTemplate | (args: [FooterPlaceholderArgs](#footer-placeholder-args)) => ReactElement | null | A template that renders the footer placeholder.

## Interfaces

### Column

Defines the column configuration object. Used to display data stored in a row. Can be extended by plugins.

A value with the following shape:

Field | Type | Description
------|------|------------
name | string | Specifies the column name or the name of a row field whose value the column displays. If the column name does not match any field name, specify the `getCellValue` function.
getCellValue | (row: any, columnName: string) => any | Specifies the function used to get the column value for a given row.

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
rows | Getter | Array&lt;any&gt; | Grid rows.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
columns | Getter | Array&lt;[Column](#column)&gt; | Grid columns.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get the column value for a given row.
root | Template | Object? | A template that renders the grid root layout.
header | Template | Object? | A template that renders the grid header.
body | Template | Object? | A template that renders the grid body.
footer | Template | Object? | A template that renders the grid footer.
