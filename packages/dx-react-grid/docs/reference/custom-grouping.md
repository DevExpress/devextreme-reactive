# CustomGrouping Plugin Reference

A plugin that converts grouped data in a custom format to the supported format and performs local group expanding/collapsing if necessary.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getChildGroups | (currentRows: Array&lt;any&gt;, grouping: [Grouping](grouping-state.md#grouping), rootRows: Array&lt;any&gt;) => Array&lt;{ key: number &#124; string, value?: any, childRows?: Array&lt;any&gt; }&gt; | | A function that extracts groups from the data passed to it. It executes recursively for root data and each group nested data if nested groups are expected.
grouping | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | | Specifies columns by which data is grouped by.
expandedGroups | Array&lt;[GroupKey](grouping-state.md#group-key)&gt; | | Specifies expanded groups in data.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be grouped.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state.
expandedGroups | Getter | Set&lt;[GroupKey](grouping-state.md#group-key)&gt; | Groups to be expanded.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows with the applied grouping and expanded groups.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state by which data is grouped by.
expandedGroups | Getter | Set&lt;[GroupKey](grouping-state.md#group-key)&gt; | Groups that is expanded in data.
isGroupRow | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey | Getter | (row: any) => string? | A function used to get group row level key.
