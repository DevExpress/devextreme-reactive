# Data Accessors

## Cell Value Access

In the case of nested data structure, use the `getCellValue` function to calculate a column value as demonstrated below:

.embedded-demo(data-accessors/custom-data-accessors-in-columns)

If you use a common value calculation algorithm for all columns, specify the `getCellValue` function on the Grid's level.

## Cell Value Editing

If editing features are enabled, you can use the editing column extension's `createRowChange` function to create a row changes object:

.embedded-demo(data-accessors/custom-data-accessors)

Specify the `EditingState` plugin's `createRowChange` property if you use a common algorithm for all columns.
