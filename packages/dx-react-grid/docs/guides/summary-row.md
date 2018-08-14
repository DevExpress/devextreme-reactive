# React Grid - Summary Row

The Grid component can calculate a summary for all rows (total summary), row groups (group summary), and tree nodes that contain child nodes (tree summary). Use the corresponding plugins to calculate the summary and manage its state.

## Related Plugins

The following plugins implement summary features:

- [SummaryState](../reference/summary-state.md) - manages the data summary state
- [IntegratedSummary](../reference/integrated-summary.md) - performs the built-in data summary calculation
- [CustomSummary](../reference/custom-summary.md) - provides a capability to calculate a custom data summary
- [TableSummaryRow](../reference/table-summary-row.md) - renders table summary rows

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `SummaryState`, `IntegratedSummary` (or `CustomSummary`) and `TableSummaryRow` plugins to set up a Grid that displays data summary.

### Built-in Data Summaries Calculation

The `IntegratedSummary` plugin performs the built-in summary calculation.

The following example displays the total summary calculated internally. Pass summary items array to the `SummaryState` plugin's `totalItems` property.

.embedded-demo({ "path": "grid-summary/total-summary", "showThemeSelector": true })

The following example demonstrates group summary rows. Pass the summary items' array to the `SummaryState` plugin's `groupItems` property.

.embedded-demo({ "path": "grid-summary/group-summary", "showThemeSelector": true })

The following example shows tree summary rows. Pass the summary items' array to the `SummaryState` plugin's `treeItems` property.

.embedded-demo({ "path": "grid-summary/tree-summary", "showThemeSelector": true })

### Custom Data Summaries Calculation

The `CustomSummary` plugin allows you to calculate a data summary on a remote server or local machine.

The following example demonstrates customly calculated total summary. Pass summary items array to the `SummaryState` plugin's `totalItems` property and summary values to the `totalValues` property.

.embedded-demo({ "path": "grid-summary/custom-summary", "showThemeSelector": true })

Calculate custom group and tree summary in the same manner. Pass the `groupValues` and `treeValues` data objects to the `CustomSummary` plugin.

## Custom Algorithms

The `IntegratedSummary` plugin allows you to extend the built-in summary types (`count`, `sum`, `max`, `min`, `avg`) with custom types. In the followith example, a custom `median` summary type is defined:

.embedded-demo({ "path": "grid-summary/custom-algorithm", "showThemeSelector": true })

## Avoiding Summary Formatting

If a `DataTypeProvider` plugin is assigned to a column, its value formatting component is applied to a summary row. Use the `formattlessSummaryTypes` property to specify summary types that should not be formatted. The following example shows the custom `overprice` summary type that is not formatted:

.embedded-demo({ "path": "grid-summary/formatless-custom-algorithm", "showThemeSelector": true })
