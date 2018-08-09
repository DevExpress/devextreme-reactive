# React Grid - Summary Row

The Grid component supports calculating data summaries. Use the corresponding plugins to manage the data summaries state and calculate data summaries programmatically.

## Related Plugins

The following plugins implement sorting features:

- [SummaryState](../reference/summary-state.md) - controls the data summaries state
- [IntegratedSummary](../reference/integrated-summary.md) - performs built-in data summaries calculating
- [CustomSummary](../reference/custom-summary.md) - provides custom data summaries
- [TableSummaryRow](../reference/table-summary-row.md) - renders table summary rows

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `SummaryState`, `IntegratedSummary` (or `CustomSummary`) and `TableSummaryRow` plugins to set up a Grid with simple data summaries.

### Built-in Data Summaries Calculation

Built-in data summaries calculation is performed by the `IntegratedSummary` plugin.

In the following example, the total summary row is shown with the data calculated internally. Pass summary items array to the `totalItems` property of the `SummaryState` plugin.

.embedded-demo({ "path": "grid-summary/total-summary", "showThemeSelector": true })

In the following example, group summary rows is shown. Pass summary items array to the `groupItems` property of the `SummaryState` plugin.

.embedded-demo({ "path": "grid-summary/group-summary", "showThemeSelector": true })

In the following example, tree summary rows is shown. Pass summary items array to the `treeItems` property of the `SummaryState` plugin.

.embedded-demo({ "path": "grid-summary/tree-summary", "showThemeSelector": true })

### Custom Data Summaries Calculation

The `CustomSummary` plugin allows providing data summary values calculated externally. It may be received from the server or computed locally.

In the following example, customly calculated total summary row is shown. Pass summary items array to the `totalItems` property of the `SummaryState` plugin and summary values to the `totalValues` property of the `CustomSummary` plugin.

.embedded-demo({ "path": "grid-summary/custom-summary", "showThemeSelector": true })

The same is possible with grouped and tree data. Pass the `groupValues` and `treeValues` data object to the `CustomSummary` plugin.

## Custom Algorithms

The `IntegratedSummary` plugin allows extending built-in summary types (`count`, `sum`, `max`, `min`, `avg`) with custom ones. In the followith example, a custom `median` summary type is shown.

.embedded-demo({ "path": "grid-summary/custom-algorithm", "showThemeSelector": true })

## Avoiding Summary Formatting

Formatter component specified by the `DataTypeProvider` plugin that is assigned to a column will be used within a summary row. But not all summary types needs to be formatted. The `count` summary type is not formatted, for example. In the followith example, a custom formatless `overprice` summary type is shown.

.embedded-demo({ "path": "grid-summary/formatless-custom-algorithm", "showThemeSelector": true })
