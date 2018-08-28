# DxTableHeaderRow Plugin Reference

A plugin that renders the table's header row. The [Column](grid.md#column)'s `title` field specifies the column's title in the header row.

The plugin also allows you to manage a column's sorting and grouping state.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableHeaderRow } from '@devexpress/dx-vue-grid-bootstrap4';
```

You can import a themeless plugin if you want to use custom components:

```js
import { DxTableHeaderRow } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxSortingState](sorting-state.md) [Optional]
- [DxGroupingState](grouping-state.md) [Optional]
- [DxTable](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | [DxTableHeaderRow.DxCell](#dxtableheaderrowdxcell) | | A component that renders a header cell.
rowComponent | [DxTableHeaderRow.DxRow](#dxtableheaderrowdxrow) | | A component that renders a header row.
showSortingControls? | boolean | false | Specifies whether to render controls that toggle the column's sorting state. Requires [DxSortingState](sorting-state.md).
showGroupingControls? | boolean | false | Specifies whether to display a button that groups data by column. Requires [DxGroupingState](grouping-state.md).

## Component Types

### DxTableHeaderRow.DxCell

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
column | [Column](grid.md#column) | A column object associated with a header cell.
showSortingControls | boolean | Specifies whether to render controls that toggle the column's sorting state.
sortingEnabled | boolean | Specifies whether sorting by a column is enabled.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the associated column's sorting direction.
showGroupingControls | boolean | Specifies whether to display a button that groups data by column.
groupingEnabled | boolean | Specifies whether grouping by a column is enabled.

#### Events

Field | Type | Description
------|------|------------
sort | (parameters: { direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean }) => void | An event that initiates changing the column sorting direction. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the current column if `direction` is set to null.
group | () => void | An event that invokes grouping by the associated column.

#### Slots

Field | Description
-------|------------
before | The Vue slot containing controls that are rendered before the column title.

### DxTableHeaderRow.DxRow

#### Props

Field | Type | Description
-------|------|------------
tableRow | [TableRow](table.md#tablerow) | A table row.

#### Slots

Field | Description
-------|------------
default | The default Vue slot.

## Plugin Components

Name | Type | Description
-----|------|------------
DxTableHeaderRow.components.DxCell | [DxTableHeaderRow.DxCell](#dxtableheaderrowdxcell) | A component that renders a header cell.
DxTableHeaderRow.components.DxRow | [DxTableHeaderRow.DxRow](#dxtableheaderrowdxrow) | A component that renders a header row.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Columns' sorting state.
changeColumnSorting | Action | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex?: number }) => void | Changes the column sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column. If `sortIndex` is omitted, the sorting is added to the end of the sorting list.
changeColumnGrouping | Action | ({ columnName: string, groupIndex?: number }) => void | Groups data by a specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the end of the group list.
isColumnSortingEnabled | Getter | (columnName: string) => boolean | A function that returns a Boolean value that defines if sorting by a column is enabled.
isColumnGroupingEnabled | Getter | (columnName: string) => boolean | A function that returns a Boolean value that defines if grouping by a column is enabled.
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object? | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table header rows.
