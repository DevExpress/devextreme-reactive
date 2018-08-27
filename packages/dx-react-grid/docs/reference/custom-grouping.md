# CustomGrouping Plugin Reference

A plugin that converts custom formatted grouped data to a supported format and performs local group expanding/collapsing.

## Import

Use the following statement to import the plugin:

```js
import { CustomGrouping } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getChildGroups | (currentRows: Array&lt;any&gt;, grouping: [Grouping](grouping-state.md#grouping), rootRows: Array&lt;any&gt;) => Array&lt;{ key: number &#124; string, value?: any, childRows?: Array&lt;any&gt; }&gt; | | A function that extracts groups from the specified data. It is executed recursively for the root and nested groups.
grouping? | Array&lt;[Grouping](grouping-state.md#grouping)&gt; &#124; null | | Specifies columns by which data is grouped.
expandedGroups? | Array&lt;[GroupKey](grouping-state.md#groupkey)&gt; &#124; null | | Specifies the expanded groups.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be grouped.
grouping | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state.
expandedGroups | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[GroupKey](grouping-state.md#groupkey)&gt; | Groups to be expanded.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows with the applied grouping and expanded groups.
grouping | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The specified data's current grouping state.
expandedGroups | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[GroupKey](grouping-state.md#groupkey)&gt; | Groups expanded in the specified data.
isGroupRow | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function used to get a group row level key.
getCollapsedRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => Array&lt;any&gt;? | A function used to get collapsed rows associated with the given row.
