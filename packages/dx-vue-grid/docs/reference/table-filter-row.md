# DxTableFilterRow Plugin Reference

A plugin that renders a filter row.

## Importing

Use the following statement to import a plugin with embedded theme components:

```js
import { TableFilterRow } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableFilterRow } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxFilteringState](filtering-state.md)
- [DxTable](table.md)
- [DxDataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | Object | [DxTableFilterRow.components.DxCell](#dxtablefilterrowcomponentsdxcell) | A component that renders a filter cell.
rowComponent | Object | [DxTableFilterRow.components.DxRow](#dxtablefilterrowcomponentsdxrow) | A component that renders a filter row.
rowHeight? | number | | The filter row's height.
messages? | [DxTableFilterRow.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
filterPlaceholder? | string | 'Filter...' | The filter editor placeholder text.

## Plugin Components

### DxTableFilterRow.components.DxCell

A component that renders a filter cell.

#### Props

Extends [DxTable.CellProps](table.md#dxtablecellprops)

Field | Type | Description
------|------|------------
filter | [Filter](filtering-state.md#filter) &#124; null | Filtering options that are applied to a column.
column | [Column](grid.md#column) | A column.
filteringEnabled | boolean | Specifies whether filtering by a column is enabled.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the filter editor placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package.

#### Events

Field | Type | Description
------|------|------------
filter | (filter: [Filter](filtering-state.md#filter) &#124; null) => void | An event that initiates applying a new filter to a column.

### DxTableFilterRow.components.DxRow

A component that renders a filter row.

Inherits [DxTable.RowProps](#dxtablerowprops) and [DxTable.RowSlots](#dxtablerowslots).

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
filters | Getter | Array&lt;[Filter](filtering-state.md#filter)&gt; | The filtering options.
isColumnFilteringEnabled | Getter | (columnName: string) => boolean | A function used to define if filtering by a column is enabled.
changeColumnFilter | Action | ({ columnName: string, config: object }) => void | Changes a column's filter or clears it if config is null.
tableCell | Template | [DxTable.CellProps](table.md#dxtablecellprops) | A template that renders a table cell.
tableRow | Template | [DxTable.RowProps](table.md#dxtablerowprops) | A template that renders a table row.
valueEditor | Template | [DxDataTypeProvider.ValueEditor](data-type-provider.md#datatypeprovidervalueeditor) | A template that renders the editor.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
