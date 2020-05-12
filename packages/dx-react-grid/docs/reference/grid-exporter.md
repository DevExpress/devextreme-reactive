# GridExporter Component Reference

A component that exports data to the Excel format.

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
rows | ReadonlyArray&lt;any&gt; | | Data for grid rows. Refer to [Data Accessors](../guides/data-accessors.md) for details.
columns | ReadonlyArray&lt;[Grid.Column](grid.md#column)&gt; | | Grid columns.
getRowId? | (row: any) => number &#124; string | | A function that gets a unique row identifier. Use it if the identifier is not the row index.
getCellValue? | (row: any, columnName: string) => any | | A function that gets a cell value.
filters? | ReadonlyArray&lt;[FilteringState.Filter](filtering-state.md#filter)&gt; | | Specifies filtering settings.
sorting? | ReadonlyArray&lt;[SortingState.Sorting](sorting-state.md#sorting)&gt; | | Specifies sorting settings.
grouping? | ReadonlyArray&lt;[GroupingState.Grouping](grouping-state.md#grouping)&gt; | | Specifies columns to group by.
groupColumnExtensions? | ReadonlyArray&lt;[GroupingState.ColumnExtension](grouping-state.md#groupingstatecolumnextension)&gt; | | Specifies additional properties for the columns used in grouping.
showColumnsWhenGrouped? | boolean | false | Specifies whether to display the column used in grouping.
columnOrder? | ReadonlyArray&lt;string&gt; | | The column order.
hiddenColumnNames? | ReadonlyArray&lt;string&gt; | | The names of hidden columns.
selection? | ReadonlyArray&lt;number &#124; string&gt; | | Selected row IDs.
columnExtensions? | ReadonlyArray&lt;[Table.ColumnExtension](table.md#tablecolumnextension)&gt; | | Specifies additional column properties.
totalSummaryItems? | ReadonlyArray&lt;[SummaryState.SummaryItem](summary-state.md#summaryitem)&gt; | | Total summary items.
groupSummaryItems? | ReadonlyArray&lt;[SummaryState.GroupSummaryItem](summary-state.md#groupsummaryitem)&gt; | | Group summary items.
onSave | (workbook: [ExcelJS.Workbook](https://github.com/exceljs/exceljs#set-workbook-properties)) => void | | A function that should save the Excel document.
customizeCell? | (cell: Excel.Cell, row: any, column: [Grid.Column](grid.md#column)) => void | | Customizes Excel cells.
customizeSummaryCell? | (cell: [ExcelJS.Cell](https://github.com/exceljs/exceljs#handling-individual-cells), row: any, summary: { type: string, ranges: number[][] }) => void | | Customizes Excel cells that display summaries.
customizeHeader? | (worksheet: [ExcelJS.Worksheet](https://github.com/exceljs/exceljs#worksheet-properties)) => void | | Customizes the document's header.
customizeFooter? | (worksheet: [ExcelJS.Worksheet](https://github.com/exceljs/exceljs#worksheet-properties)) => void | | Customizes the document's footer.

## Methods

Name | Type | Description
-----|------|------------
exportGrid | (options?: any) => void | A method that exports data.
