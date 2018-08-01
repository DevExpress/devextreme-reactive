# SummaryState Plugin Reference

A plugin that manages the summary state. It controls the list of items for total, group and tree summaries.

## Importing

Use the following import statement:

```js
import { SummaryState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
totalItems? | Array&lt;[SummaryItem](#summaryitem)&gt; | | Specifies the applied total summaries.
groupItems? | Array&lt;[SummaryItem](#summaryitem)&gt; | | Specifies the applied group summaries.
treeItems? | Array&lt;[SummaryItem](#summaryitem)&gt; | | Specifies the applied tree summaries.

## Interfaces

### SummaryItem

Describes the sorting applied to a column

Field | Type | Description
------|------|------------
columnName | string | Specifies a column's name to which the summary is applied.
type | [SummaryType](#summarytype) | Specifies the summary type.

### SummaryType

Describes a filter operation. Accepts one of the built-in operations or a custom string.

Type: `string`

Built-in operations: `sum`, `max`, `min`, `avg`, `count`.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
totalSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](#summaryitem)&gt; | Summary items applied to all rows.
groupSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](#summaryitem)&gt; | Summary items applied to group rows.
treeSummaryItems | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[SummaryItem](#summaryitem)&gt; | Summary items applied to rows that contains children rows.
