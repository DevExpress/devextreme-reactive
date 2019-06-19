# IntegratedSummary Plugin Reference

A plugin that performs a built-in data summary calculation.

## Import

Use the following statement to import the plugin:

```js
import { IntegratedSummary } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SummaryState](summary-state.md)
- [InegratedGrouping](integrated-grouping.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
calculator? | (type: [SummaryType](summary-state.md#summarytype), rows: Array&lt;any&gt;, getValue: (row: any) => any) => any | | A summary calculator.

## Static Fields

Field | Type | Description
------|------|------------
defaultCalculator | (type: [SummaryType](summary-state.md#summarytype), rows: Array&lt;any&gt;, getValue: (row: any) => any) => any | The built-in summary calculator.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows for which to calculate summary.
totalSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](summary-state.md#summaryitem)&gt; | Total summary items.
groupSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](summary-state.md#summaryitem)&gt; | Group summary items.
treeSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](summary-state.md#summaryitem)&gt; | Summary items applied to rows that contain child rows.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
totalSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Total summary values.
groupSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: [GroupKey](grouping-state.md#groupkey)]: Array&lt;any&gt; } | Group summary values.
treeSummaryValues | [Getter](../../../dx-react-core/docs/reference/getter.md) | { [key: number &#124; string]: Array&lt;any&gt; } | Tree summary values.
