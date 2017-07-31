# TableGroupRow Plugin Reference

A plugin that renders group rows. Provides the capability to expand and collapse them.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
groupCellTemplate | (args: [GroupCellArgs](#group-cell-args)) => ReactElement | | A component that renders a group row
groupIndentCellTemplate | (args: [GroupIndentCellArgs](#group-indent-cell-args)) => ReactElement | null | A component that renders a group indent cell
groupIndentColumnWidth | number | | The group indent column's width

## Interfaces

### <a name="group-cell-args"></a>GroupCellArgs

Describes the properties passed to the template that renders a group row.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [GroupRow](#group-row) | A group row data object
isExpanded | boolean | Specifies if a row is expanded
toggleGroupExpanded | () => void | Toggles the group row's expanded state

### <a name="group-indent-cell-args"></a>GroupIndentCellArgs

Describes properties passed to the template that renders a group indent cell.

A value with the following shape:

Field | Type | Description
------|------|------------
row | [Row](grid.md#row) | A row object
column | [Column](grid.md#column) | A group indent column

### <a name="group-row"></a>GroupRow

Describes the group row data structure.

Extends [Row](grid.md#row)

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | The column associated with the group
value | any | The current group key value

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns
tableBodyRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Table body rows
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Columns used for grouping
draftGrouping | Getter | Array&lt;[DraftGrouping](grouping-state.md#draft-grouping)&gt; | Grouping options used for preview
expandedGroups | Getter | Set&lt;[GroupKey](grouping-state.md#group-key)&gt; | Expanded groups
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](grouping-state.md#group-key) }) => void | Toggles the expanded group state
tableViewCell | Template | { row: [TableRow](table-view.md#table-row), column: [TableColumn](table-view.md#table-column), style?: Object, colspan?: number } | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns, including the ones by which the table is grouped
tableBodyRows | Getter | Array&lt;[TableRow](table-view.md#table-column)&gt; | Table body rows with modified group rows
