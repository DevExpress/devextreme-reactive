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
columns | ReadonlyArray&lt;[Grid.Column](grid.md#column)&gt; | | Specifies for which row fields columns are created.
getRowId? | (row: any) => number &#124; string | | Specifies the function used to get a unique row identifier. Define this function if the identifier is different than the row index.
getCellValue? | (row: any, columnName: string) => any | | Specifies the function used to get a cell's value.
filters? | ReadonlyArray&lt;[FilteringState.Filter](filtering-state.md#filter)&gt; | | Specifies the applied filters.
sorting? | ReadonlyArray&lt;[SortingState.Sorting](sorting-state.md#sorting)&gt; | | Specifies the applied sorting.
grouping? | ReadonlyArray&lt;[GroupingState.Grouping](grouping-state.md#grouping)&gt; | | Specifies columns to group by.
groupColumnExtensions? | ReadonlyArray&lt;[GroupingState.ColumnExtension](grouping-state.md#groupingstatecolumnextension)&gt; | | Additional column properties.
showColumnsWhenGrouped? | boolean | false | A Boolean value that specifies whether the grid's table displays a column by which data is grouped.
columnOrder? | ReadonlyArray&lt;string&gt; | | The column order.
hiddenColumnNames? | ReadonlyArray&lt;string&gt; | | Hidden column names.
selection? | ReadonlyArray&lt;number &#124; string&gt; | | The selected row's IDs.
columnExtensions? | ReadonlyArray&lt;[Table.ColumnExtension](table.md#tablecolumnextension)&gt; | | Additional column properties.
totalSummaryItems? | ReadonlyArray&lt;[SummaryState.SummaryItem](summary-state.md#summaryitem)&gt; | | The total summary items.
groupSummaryItems? | ReadonlyArray&lt;[SummaryState.GroupSummaryItem](summary-state.md#groupsummaryitem)&gt; | | The group summary items.
onSave | (workbook: [ExcelJS.Workbook](https://github.com/exceljs/exceljs#set-workbook-properties)) => void | | Handles workbook saving.
customizeCell? | (cell: Excel.Cell, row: any, column: [Grid.Column](grid.md#column)) => void | | Handles the Excel cells appearance customization.
customizeSummaryCell? | (cell: [ExcelJS.Cell](https://github.com/exceljs/exceljs#handling-individual-cells), row: any, summary: { type: string, ranges: number[][] }) => void | | Handles the Excel summary cells customization.
customizeHeader? | (worksheet: [ExcelJS.Worksheet](https://github.com/exceljs/exceljs#worksheet-properties)) => void | | Handles the Excel sheet header customization.
customizeFooter? | (worksheet: [ExcelJS.Worksheet](https://github.com/exceljs/exceljs#worksheet-properties)) => void | | Handles the Excel sheet footer customization.
