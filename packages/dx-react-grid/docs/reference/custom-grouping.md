# CustomGrouping Plugin Reference

A plugin that converts custom formatted grouped data to a supported format and performs local group expanding/collapsing.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getChildGroups | (currentRows: Array&lt;any&gt;, grouping: [Grouping](grouping-state.md#grouping), rootRows: Array&lt;any&gt;) => Array&lt;{ key: number &#124; string, value?: any, childRows?: Array&lt;any&gt; }&gt; | | A function that extracts groups from the specified data. It is executed recursively for the root and nested groups.
grouping? | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | | Specifies columns by which data is grouped.
expandedGroups? | Array&lt;[GroupKey](grouping-state.md#group-key)&gt; | | Specifies the expanded groups.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be grouped.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state.
expandedGroups | Getter | Array&lt;[GroupKey](grouping-state.md#group-key)&gt; | Groups to be expanded.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows with the applied grouping and expanded groups.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The specified data's current grouping state.
expandedGroups | Getter | Array&lt;[GroupKey](grouping-state.md#group-key)&gt; | Groups expanded in the specified data.
isGroupRow | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey | Getter | (row: any) => string? | A function used to get a group row level key.
