# TableFilterRow Plugin Reference

A plugin that renders a filter row.

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
filteringEnabled | boolean | Specifies whether filtering by a column is enabled.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the filter editor placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
filterPlaceholder? | string | 'Filter...' | The filter editor placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableFilterRow.Cell | [TableFilterRow.CellProps](#tablefilterrowcellprops) | A component that renders a filter row cell.
TableFilterRow.Row | [Table.RowProps](table.md#tablerowprops) | A component that renders a filter row.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
filters | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Filter](filtering-state.md#filter)&gt; | The filtering options.
isColumnFilteringEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function used to define if filtering by a column is enabled.
changeColumnFilter | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, config: object }) => void | Changes a column's filter or clears it if config is null.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.
valueEditor | [Template](../../../dx-react-core/docs/reference/template.md) | [DataTypeProvider.ValueEditorProps](data-type-provider.md#datatypeprovidervalueeditorprops) | A template that renders the editor.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
