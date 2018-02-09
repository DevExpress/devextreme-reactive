# TableGroupRow Plugin Reference

A plugin that renders group rows and enables them to expand and collapse.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [Table](table.md)
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
showColumnsWhenGrouped? | boolean | false | A Boolean value that specifies whether the grid's table displays a column by which data is grouped.
columnExtensions? | Array&lt;[TableGroupRow.ColumnExtension](#tablegrouprowcolumnextension)&gt; | | Additional column properties that the plugin can handle.
cellComponent | ComponentType&lt;[TableGroupRow.CellProps](#tablegrouprowcellprops)&gt; | | A component that renders a group cell.
rowComponent | ComponentType&lt;[TableGroupRow.RowProps](#tablegrouprowrowprops)&gt; | | A component that renders a group row.
indentCellComponent? | ComponentType&lt;[TableGroupRow.IndentCellProps](#tablegrouprowindentcellprops)&gt; | null | A component that renders a group indent cell.
indentColumnWidth | number | | The group indent column's width.

## Interfaces

### TableGroupRow.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
showWhenGrouped? | boolean | Specifies whether the grid displays the column by which data is grouped.

### TableGroupRow.CellProps

Describes properties passed to a component that renders a group cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](grid.md#column) | The column associated with the group.
expanded | boolean | Specifies whether the row is expanded.
onToggle | () => void | An event that initiates group row's expanding or collapsing.

### TableGroupRow.RowProps

Describes properties passed to a component that renders a group row.

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.

### TableGroupRow.IndentCellProps

Describes properties passed to a component that renders a group indent cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | [GroupRow](#grouprow) | The group row.
column | [Column](#column-extension) | A column associated with the group.

### GroupRow

Describes the group row structure.

Field | Type | Description
------|------|------------
key | number &#124; string | The current group key.
value | any | The current group value.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableGroupRow.Row | [TableGroupRow.RowProps](#tablegrouprowrowprops) | A component that renders a group row.
TableGroupRow.Cell | [TableGroupRow.CellProps](#tablegrouprowcellprops) | A component that renders a group cell.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](#column-extension)&gt; | The grid columns.
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Table body rows.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Current grouping options.
draftGrouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Grouping options used for the preview.
expandedGroups | Getter | Array&lt;[GroupKey](grouping-state.md#group-key)&gt; | Expanded groups.
isGroupRow | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](grouping-state.md#group-key) }) => void | Toggles the group's expanded state.
tableCell | Template | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | Template | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns, including the ones by which the table is grouped.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablecolumn)&gt; | Table body rows with modified group rows.
