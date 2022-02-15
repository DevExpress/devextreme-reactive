# TableFilterRow Plugin Reference

A plugin that renders a filter row.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableFilterRow } from '@devexpress/dx-react-grid-material-ui';
// import { TableFilterRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableFilterRow } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableFilterRow } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)
- [Table](table.md)
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ComponentType&lt;[TableFilterRow.CellProps](#tablefilterrowcellprops)&gt; | | A component that renders a filter cell.
rowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders a filter row.
filterSelectorComponent | ComponentType&lt;[TableFilterRow.FilterSelectorProps](#tablefilterrowfilterselectorprops)&gt; | | A component that renders a filter selector.
iconComponent | ComponentType&lt;[TableFilterRow.IconProps](#tablefilterrowiconprops)&gt; | | A component that renders filter selector icons.
editorComponent | ComponentType&lt;[TableFilterRow.EditorProps](#tablefilterroweditorprops)&gt; | | A component that renders a filter editor.
toggleButtonComponent | ComponentType&lt;[TableFilterRow.ToggleButtonProps](#tablefilterrowtogglebuttonprops)&gt; | | A component that renders a filter selector's toggle button.
showFilterSelector? | boolean | false | Specifies whether the FilterSelector should be displayed.
rowHeight? | number | | The filter row's height.
messages? | [TableFilterRow.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### TableFilterRow.CellProps

Describes properties passed to a component that renders a filter cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
filter | [Filter](filtering-state.md#filter) &#124; null | Filtering options that are applied to a column.
onFilter | (filter: [Filter](filtering-state.md#filter) &#124; null) => void | An event that initiates applying a new filter to a column.
column | [Column](grid.md#column) | A column.
filteringEnabled | boolean | Specifies whether filtering by column is enabled.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the filter editor placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package.

### TableFilterRow.FilterSelectorProps

Describes properties passed to a component that renders a filter selector.

Field | Type | Description
------|------|------------
iconComponent | ComponentType&lt;[TableFilterRow.IconProps](#tablefilterrowiconprops)&gt; | A component that renders filter selector icons.
value | string | The currently selected filter operation.
availableValues | Array&lt;string&gt; | The list of available filter operations.
onChange | (value: string) => void | Handles filter operation changes.
disabled | boolean | Specifies whether the FilterSelector is disabled.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the specified localization message.

### TableFilterRow.IconProps

Describes properties passed to a component that renders a filter selector icon.

Field | Type | Description
------|------|------------
type | string | Specifies the icon type.

### TableFilterRow.EditorProps

Describes properties passed to a component that renders a filter editor.

Field | Type | Description
------|------|------------
value | any | The current editor value.
disabled | boolean | Specifies whether the editor is disabled.
onChange | (value: string) => void | Handles filter value changes.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the specified localization message.

### TableFilterRow.ToggleButtonProps

Describes properties passed to a component that renders a toggle button for a filter selector.

Field | Type | Description
------|------|------------
disabled? | boolean | Specifies whether the editor is disabled.
onToggle | () => void | Handles filter value changes.
buttonRef | (ref: ReactInstance) => void | A function that accepts the button's root React element.
children? | ReactNode | A React node used to render the button content.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
filterPlaceholder? | string | 'Filter...' | The filter editor placeholder text.
contains? | string | 'Contains' | The 'contains' filter operation name.
notContains? | string | 'Does not contain'| The 'notContains' filter operation name.
startsWith? | string | 'Starts with'| The 'startsWith' filter operation name.
endsWith? | string | 'Ends with'| The 'endsWith' filter operation name.
equal? | string | 'Equals'| The 'equal' filter operation name.
notEqual? | string | 'Does not equal'| The 'notEqual' filter operation name.
greaterThan? | string | 'Greater than'| The 'greaterThan' filter operation name.
greaterThanOrEqual? | string | 'Greater than or equal to'| The 'greaterThanOrEqual' filter operation name.
lessThan? | string | 'Less than' | The 'lessThan' filter operation name.
lessThanOrEqual? | string | 'Less than or equal to' | The 'lessThanOrEqual' filter operation name.

You can also define custom messages for the `TableFilterRow`. Refer to the following demo for more information: [Custom Filter Operations](../guides/filtering.md#custom-filter-operations).

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableFilterRow.Cell | [TableFilterRow.CellProps](#tablefilterrowcellprops) | A component that renders a filter row cell.
TableFilterRow.Row | [Table.RowProps](table.md#tablerowprops) | A component that renders a filter row.
TableFilterRow.FilterSelector | [TableFilterRow.FilterSelectorProps](#tablefilterrowfilterselectorprops) | A component that renders a filter selector.
TableFilterRow.Icon | [TableFilterRow.IconProps](#tablefilterrowiconprops) | A component that renders filter selector icons.
TableFilterRow.Editor | [TableFilterRow.EditorProps](#tablefilterroweditorprops) | A component that renders a filter editor.
TableFilterRow.ToggleButton | [TableFilterRow.ToggleButtonProps](#tablefilterrowtogglebuttonprops) | A component that renders a filter selector's toggle button.

Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
ROW&lowbar;TYPE | symbol | The filter row type's identifier.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
filters | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Filter](filtering-state.md#filter)&gt; | Filtering options.
isColumnFilteringEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function used to define if filtering by column is enabled.
changeColumnFilter | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, config: object }) => void | Changes a column's filter or clears it if config is null.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.
valueEditor | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueEditorProps](data-type-provider.md#datatypeprovidervalueeditorprops) | A template that renders the editor.
getAvailableFilterOperations | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => Array&lt;string&gt;? | A function that returns the names of filter operations that are available for a particular column.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
