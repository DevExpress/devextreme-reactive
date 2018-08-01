# CustomSummary Plugin Reference

A plugin that provides customly calculated summary values.

## Importing

Use the following import statement:

```js
import { CustomSummary } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SummaryState](summary-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
totalValues | Array&lt;any&gt; | Summary values related to all rows.
groupValues | { [key: [GroupKey](grouping-state.md#groupkey)]: Array&lt;any&gt; } | Summary values related to group rows.
treeValues | { [key: number &#124; string]: Array&lt;any&gt; } | Summary values related to rows that contains children rows.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
totalSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Summary values related to all rows.
groupSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: [GroupKey](grouping-state.md#groupkey)]: Array&lt;any&gt; } | Summary values related to group rows.
treeSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: number &#124; string]: Array&lt;any&gt; } | Summary values related to rows that contains children rows.
