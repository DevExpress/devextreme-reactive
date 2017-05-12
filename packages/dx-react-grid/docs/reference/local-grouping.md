# LocalGrouping Plugin Reference

A plugin that performs local grouping and group expanding/collapsing.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be grouped
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | Grouping to be applied
expandedGroups | Getter | { [key: [GroupKey](grouping-state.md#group-key)]: true } | Groups to be expanded

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => Array&lt;[Row](grid.md#row)&gt; | Rows with the applied grouping and expanded groups
