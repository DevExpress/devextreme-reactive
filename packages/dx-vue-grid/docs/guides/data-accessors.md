# Vue Grid - Data Accessors

The Grid component supports custom data structures. In a common scenario with a simple data structure, you can associate a column with a row field using the column’s `name` field.

## Custom Cell Value Getters

In the case of nested data structure, use the `getCellValue` function to calculate a column value as demonstrated below:

.embedded-demo({ "path": "grid-data-accessors/value-getters", "showThemeSelector": true })

If you use a common value calculation algorithm for all columns, specify the `getCellValue` function on the Grid's level.

## Custom Cell Value Setters

If editing features are enabled, you can use the editing column extension's `createRowChange` function to create a row changes object:

.embedded-demo({ "path": "grid-data-accessors/value-setters", "showThemeSelector": true })

Specify the `DxEditingState` plugin's `createRowChange` property if you use a common algorithm for all columns.
