# LocalGrouping Plugin Reference

Plugin that performs local grouping and group expanding.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | array&lt;[Row](datagrid.md#row)&gt; | Rows to be filtered
grouping | Getter | array&lt;[Grouping](grouping-state.md#grouping)&gt; | Grouping to be applied
expandedGroups | Getter | { [key: [GroupKey](grouping-state.md#group-key)]: true } | Groups to be expanded

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | array&lt;[Row](datagrid.md#row)&gt; | Rows with applied grouping and expanded groups
