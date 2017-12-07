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
getCellComponent | (columnName: string) => ElementType&lt;[TableFilterCellProps](#tablefiltercellprops)&gt; | | A function returning a component that renders a filter cell for a specific column.
rowComponent | ElementType&lt;[TableRowProps](table.md#tablerowprops)&gt; | | A component that renders a filter row.
rowHeight | number | | The filter row's height.
messages | object | | An object that specifies [localization messages](#localization-messages).

## Interfaces

### TableFilterCellProps

Describes properties passed to a component that renders a filter cell.

A value with the [TableCellProps](table.md#tablecellprops) shape extended by the following fields:

Field | Type | Description
------|------|------------
filter | [Filter](filtering-state.md#filter) | Filtering options that are applied to a column.
onFilter | (filter: [Filter](filtering-state.md#filter)) => void | An event that initiates applying a new filter to a column.
column | [Column](grid.md#column) | A column.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the filter editor placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
filterPlaceholder? | string | 'Filter...' | The filter editor placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
filters | Getter | Array&lt;[Filter](filtering-state.md#filter)&gt; | The filtering options.
setColumnFilter | Action | ({ columnName: string, config: Object }) => void | Changes a column filter or clears it if config is null.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
