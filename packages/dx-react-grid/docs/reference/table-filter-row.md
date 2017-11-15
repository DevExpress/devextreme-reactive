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
rowHeight | number | | Specifies the filter row's height.
filterCellTemplate | (args: [FilterCellArgs](#filter-cell-args)) => ReactElement | | A component that renders a filter cell.
filterRowTemplate | (args: [TableRowArgs](table.md#table-row-args)) => ReactElement | | A component that renders a filter row.
messages | object | | The object specifies [localization messages](#localization-messages).

## Interfaces

### <a name="filter-cell-args"></a>FilterCellArgs

Describes properties passed to the filter row cell template.

A value with the [TableCellArgs](table.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
filter | [Filter](filtering-state.md#filter) | A filter applied to a column.
setFilter | (filter: [Filter](filtering-state.md#filter)) => void | Applies a new filter to a column.
column | [Column](grid.md#column) | Specifies a column.
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
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#table-row)&gt; | Header rows to be rendered.
filters | Getter | Array&lt;[Filter](filtering-state.md#filter)&gt; | Applied column filters.
setColumnFilter | Action | ({ columnName: string, config: Object }) => void | Changes a column filter. Removes the filter if config is `null`.
tableCell | Template | [TableCellArgs](table.md#table-cell-args) | A template that renders a table cell.
tableRow | Template | [TableRowArgs](table.md#table-row-args) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#table-row)&gt; | Header rows with filters to be rendered.
