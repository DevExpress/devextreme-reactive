# DxTableFilterRow Plugin Reference

A plugin that renders a filter row.

## Importing

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableFilterRow } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableFilterRow } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxFilteringState](filtering-state.md)
- [DxTable](table.md)
- [DxDataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | [DxTableFilterRow.DxCell](#dxtablefilterrowdxcell) | | A component that renders a filter cell.
rowComponent | [DxTableFilterRow.DxRow](#dxtablefilterrowdxrow) | | A component that renders a filter row.
rowHeight? | number | | The filter row's height.
messages? | [DxTableFilterRow.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Component Types

### DxTableFilterRow.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
filter | [Filter](filtering-state.md#filter) &#124; null | Filtering options that are applied to a column.
column | [Column](grid.md#column) | A column.
filteringEnabled | boolean | Specifies whether filtering by a column is enabled.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the filter editor placeholder text.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

#### Events

Field | Type | Description
------|------|------------
filter | (filter: [Filter](filtering-state.md#filter) &#124; null) => void | An event that initiates applying a new filter to a column.

### DxTableFilterRow.DxRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | A table row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
filterPlaceholder? | string | 'Filter...' | The filter editor placeholder text.

## Plugin Components

Name | Type | Description
-----|------|------------
DxTableFilterRow.components.DxCell | [DxTableFilterRow.DxCell](#dxtablefilterrowdxcell) | A component that renders a filter cell.
DxTableFilterRow.components.DxRow | [DxTableFilterRow.DxRow](#dxtablefilterrowdxrow) | A component that renders a filter row.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
filters | Getter | Array&lt;[Filter](filtering-state.md#filter)&gt; | The filtering options.
isColumnFilteringEnabled | Getter | (columnName: string) => boolean | A function used to define if filtering by a column is enabled.
changeColumnFilter | Action | ({ columnName: string, config: object }) => void | Changes a column's filter or clears it if config is null.
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object? | A template that renders a table row.
valueEditor | Template | [DxDataTypeProvider.DxValueEditor](data-type-provider.md#dxdatatypeproviderdxvalueeditor) | A template that renders the editor.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
