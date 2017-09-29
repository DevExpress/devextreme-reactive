# LocalGrouping Plugin Reference

A plugin that performs local grouping and group expanding/collapsing.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getGroupValue | (columnName: string) => Function | | A function that returns a function that calculates a grouping value. Returning function should have the following signature `(value: any, row: Row) => any`. See the [Grouping](../guides/grouping.md#custom-grouping-values) guide for more details.
getGroupKey | (columnName: string) => Function | | A function that returns a function that calculates a group key. Returning function should have the following signature `(value: any, row: Row) => string`. See the [Grouping](../guides/grouping.md#custom-grouping-values) guide for more details.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be grouped
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state
expandedGroups | Getter | Set&lt;[GroupKey](grouping-state.md#group-key)&gt; | Groups to be expanded
getCellValue | Getter | (row: [Row](grid.md#row), columnName: string) => any | The function used to get a cell value

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows with the applied grouping and expanded groups
