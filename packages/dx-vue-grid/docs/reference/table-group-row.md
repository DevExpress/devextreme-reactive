# DxTableGroupRow Plugin Reference

A plugin that renders group rows and enables them to expand and collapse.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableGroupRow } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableGroupRow } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxGroupingState](grouping-state.md)
- [DxTable](table.md)
- [DxDataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
showColumnsWhenGrouped? | boolean | false | A Boolean value that specifies whether the grid's table displays a column by which data is grouped.
columnExtensions? | Array&lt;[DxTableGroupRow.ColumnExtension](#dxtablegrouprowcolumnextension)&gt; | | Additional column properties that the plugin can handle.
cellComponent | [DxTableGroupRow.DxCell](#dxtablegrouprowdxcell) | | A component that renders a group cell.
rowComponent | [DxTableGroupRow.DxRow](#dxtablegrouprowdxrow) | | A component that renders a group row.
indentCellComponent? | [DxTableGroupRow.DxIndentCell](#dxtablegrouprowdxindentcell) | | A component that renders a group indent cell.
indentColumnWidth | number | | The group indent column's width.

## Interfaces

### DxTableGroupRow.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
showWhenGrouped? | boolean | Specifies whether the grid displays the column by which data is grouped.

### GroupRow

Describes the group row structure.

Field | Type | Description
------|------|------------
key | number &#124; string | The current group key.
value | any | The current group value.

## Component Types

### DxTableGroupRow.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
row | [GroupRow](#grouprow) | The group row.
column | [Column](grid.md#column) | The column associated with the group.
expanded | boolean | Specifies whether the row is expanded.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

#### Events

Field | Type | Description
------|------|------------
toggle | () => void | An event that initiates group row expanding or collapsing.

### DxTableGroupRow.DxRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | A table row.
row | [GroupRow](#grouprow) | The group row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTableGroupRow.DxIndentCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
row | [GroupRow](#grouprow) | The group row.
column | [Column](grid.md#column) | A column associated with the group.

## Plugin Components

Name | Type | Description
-----|------|------------
DxTableGroupRow.components.DxRow | [DxTableGroupRow.DxRow](#dxtablegrouprowdxrow) | A component that renders a group row.
DxTableGroupRow.components.DxCell | [DxTableGroupRow.DxCell](#dxtablegrouprowdxcell) | A component that renders a group cell.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](#column-extension)&gt; | The grid columns.
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Current grouping options.
draftGrouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Grouping options used for the preview.
expandedGroups | Getter | Array&lt;[GroupKey](grouping-state.md#groupkey)&gt; | Expanded groups.
isGroupRow | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](grouping-state.md#groupkey) }) => void | Toggles the group's expanded state.
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object? | A template that renders a table row.
valueFormatter | Template | [DxDataTypeProvider.ValueFormatterProps](data-type-provider.md#dxdatatypeprovidervalueformatter) | A template that renders the formatted value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns, including the ones by which the table is grouped.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows with modified group rows.
