# TableGroupRow Plugin Reference

A plugin that renders group rows. Enables expanding and collapsing them.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [Table](table.md)
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getCellComponent | (columnName: string) => ElementType&lt;[TableGroupCellProps](#tablegroupcellprops)&gt; | | A function returning a component that renders a group cell for specific column.
rowComponent | ElementType&lt;[TableGroupRowProps](#tablegrouprowprops)&gt; | | A component that renders a group row.
indentCellComponent | ElementType&lt;[TableGroupIndentCellProps](#tablegroupindentcellprops)&gt; | null | A component that renders a group indent cell.
indentColumnWidth | number | | The group indent column's width.
showColumnWhenGrouped | (args: columnName) => boolean | null | A custom function that returns a boolean value specifying if the grid displays the column by which data is grouped.

## Interfaces

### Column (Extension)

A value with the [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
showWhenGrouped? | boolean | Specifies if the grid displays the column by which data is grouped.
title? | string | Specifies a table column title.

### TableGroupCellProps

Describes the properties passed to a component that renders a group cell.

A value with the [TableCellArgs](table.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](#column-extension) | The column associated with the group.
isExpanded | boolean | Specifies if the row is expanded.
toggleGroupExpanded | () => void | Toggles the group row's expanded state.

### TableGroupRowProps

Describes the properties passed to a component that renders a group row.

A value with the [TableRowArgs](table.md#table-row-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.

### TableGroupIndentCellProps

Describes properties passed to a component that renders a group indent cell.

A value with the [TableCellArgs](table.md#table-cell-args) shape extended by the following fields:

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](#column-extension) | The column associated with the group.

### GroupRow

Describes the group row structure.

Field | Type | Description
------|------|------------
key | number &#124; string | The current group key.
value | any | The current group value.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#table-row)&gt; | Table body rows.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Columns used for grouping.
draftGrouping | Getter | Array&lt;[DraftGrouping](grouping-state.md#draft-grouping)&gt; | Grouping options used for preview.
expandedGroups | Getter | Set&lt;[GroupKey](grouping-state.md#group-key)&gt; | Expanded groups.
isGroupRow | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](grouping-state.md#group-key) }) => void | Toggles the expanded group state.
tableCell | Template | [TableCellArgs](table.md#table-cell-args) | A template that renders a table cell.
tableRow | Template | [TableRowArgs](table.md#table-row-args) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#table-column)&gt; | Table columns, including the ones by which the table is grouped.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#table-column)&gt; | Table body rows with modified group rows.
