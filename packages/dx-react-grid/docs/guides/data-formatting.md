# React Grid - Data Formatting

The Grid component supports custom value formatting and using a custom editor for cell value editing (depending on column's data type).

The [DataTypeProvider](../reference/data-type-provider.md) plugin holds the `for`, `formatterComponent` and `editorComponent` properties that enable you to associate the data type provider with specific columns, specify custom formatting and a custom editor.

## Related Plugins

- [DataTypeProvider](../reference/data-type-provider.md) - provides the capability to customize formatting and editors depending on the data type

## Value Formatting

Assign a function rendering the formatted value to the `DataTypeProvider` plugin's `formatterComponent` property to apply the required formatting to cells of a column associated with the specified type.

.embedded-demo({ "path": "grid-data-types/formatters", "showThemeSelector": true })

## Custom Editors

If the grid supports editing or header row filtering, assign a function rendering the required editor to the `DataTypeProvider` plugin's `editorComponent` property. In this case, the Grid uses the specified editor to edit all the specified type values.

.embedded-demo({ "path": "grid-data-types/editors", "showThemeSelector": true })
