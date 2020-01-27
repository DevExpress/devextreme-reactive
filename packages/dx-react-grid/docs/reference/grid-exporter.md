# GridExporter Component Reference

A component that performs data export to Excel format.

## Import

Use the following statement to import the component:

```js
import { GridExporter } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

None.

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | ReadonlyArray&lt;any&gt; | | An array containing custom data. A user defines the access to this data. Refer to [Data Accessors](../guides/data-accessors.md) for details.
columns | ReadonlyArray&lt;[Column](#column)&gt; | | Specifies for which row fields columns are created.
getRowId? | (row: any) => number &#124; string | | Specifies the function used to get a unique row identifier. Define this function if the identifier is different than the row index.
getCellValue? | (row: any, columnName: string) => any | | Specifies the function used to get a cell's value.
filters? | Array&lt;[Filter](#filter)&gt; | | Specifies the applied filters.
sorting? | Array&lt;[Sorting](#sorting)&gt; | | Specifies the applied sorting.
grouping? | Array&lt;[Grouping](#grouping)&gt; | | Specifies columns to group by.
groupColumnExtensions? | Array&lt;[GroupingState.ColumnExtension](#groupingstatecolumnextension)&gt; | | Additional column properties.
showColumnsWhenGrouped? | boolean | false | A Boolean value that specifies whether the grid's table displays a column by which data is grouped.
columnOrder? | Array&lt;string&gt; | | The column order.
hiddenColumnNames? | Array&lt;string&gt; | | Hidden column names.
selection? | Array&lt;number &#124; string&gt; | | The selected row's IDs.
columnExtensions? | Array&lt;[Table.ColumnExtension](#tablecolumnextension)&gt; | | Additional column properties.
totalSummaryItems? | Array&lt;[SummaryItem](#summaryitem)&gt; | | The total summary items.
groupSummaryItems? | Array&lt;[GroupSummaryItem](#groupsummaryitem)&gt; | | The group summary items.
onSave | (workbook: Excel.Workbook) => void | | Handles workbook saving.
customizeCell? | (cell: Excel.Cell, row: Table.Row, column: Table.Column) => void | | Handles the Excel cells appearance customization.
customizeSummaryCell? | (cell: Excel.Cell, row: Table.Row, summary: { type: string, ranges: number[][] }) => void | | Handles the Excel summary cells customization.
customizeHeader? | (worksheet: Excel.Worksheet) => void | | Handles the Excel sheet header customization.
customizeFooter? | (worksheet: Excel.Worksheet) => void | | Handles the Excel sheet footer customization.
