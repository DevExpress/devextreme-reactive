# LocalGrouping Plugin Reference

A plugin that performs local grouping and group expanding/collapsing.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getGroupValue | (value: any, grouping: [Grouping](grouping-state.md#grouping), row: [Row](grid.md#row)) => any | | A function that returns a custom grouping value.
getGroupKey | (value: any, grouping: [Grouping](grouping-state.md#grouping), row: [Row](grid.md#row)) => String | | A function that returns a group key.

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
