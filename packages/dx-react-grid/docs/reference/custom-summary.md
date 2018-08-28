# CustomSummary Plugin Reference

A plugin that allows you to calculate a custom summary.

## Import

Use the following statement to import the plugin:

```js
import { CustomSummary } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SummaryState](summary-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
totalValues? | Array&lt;any&gt; | | Total summary values.
groupValues? | { [key: [GroupKey](grouping-state.md#groupkey)]: Array&lt;any&gt; } | | Group summary values.
treeValues? | { [key: number &#124; string]: Array&lt;any&gt; } | | Tree summary values.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
totalSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Total summary values.
groupSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: [GroupKey](grouping-state.md#groupkey)]: Array&lt;any&gt; } | Group summary values.
treeSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: number &#124; string]: Array&lt;any&gt; } | Tree summary values.
