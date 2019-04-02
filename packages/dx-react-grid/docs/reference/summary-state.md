# SummaryState Plugin Reference

A plugin that provides items for total, group, and tree summaries.

## Import

Use the following statement to import the plugin:

```js
import { SummaryState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
totalItems? | Array&lt;[SummaryItem](#summaryitem)&gt; | | The total summary items.
groupItems? | Array&lt;[SummaryItem](#summaryitem)&gt; | | The group summary items.
treeItems? | Array&lt;[SummaryItem](#summaryitem)&gt; | | The tree summary items.

## Interfaces

### SummaryItem

Describes the summary item associated with a column.

Field | Type | Description
------|------|------------
columnName | string | The name of a column associated with the current summary item.
type | [SummaryType](#summarytype) | A summary type.

### SummaryType

Describes a filter operation. Accepts a built-in operation or custom string.

Type: `string`

Built-in operations: `sum`, `max`, `min`, `avg`, `count`.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
totalSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](#summaryitem)&gt; | Total summary items.
groupSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](#summaryitem)&gt; | Group summary items.
treeSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](#summaryitem)&gt; | Summary items applied to rows that contain child rows.
