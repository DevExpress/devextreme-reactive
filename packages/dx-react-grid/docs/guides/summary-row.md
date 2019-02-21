# React Grid - Summary Row

The Grid component can calculate a summary for all rows (total summary), row groups (group summary), and tree nodes that contain child nodes (tree summary). You can use the corresponding plugins to calculate the summary and manage its state.

## Related Plugins

The following plugins implement summary features:

- [SummaryState](../reference/summary-state.md) - manages the data summary state
- [IntegratedSummary](../reference/integrated-summary.md) - performs the built-in data summary calculation
- [CustomSummary](../reference/custom-summary.md) - allows you to calculate a custom data summary
- [TableSummaryRow](../reference/table-summary-row.md) - renders table summary rows

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Use the `SummaryState`, `IntegratedSummary` (or `CustomSummary`) and `TableSummaryRow` plugins to set up a Grid that displays a data summary.

### Calculate Built-in Data Summaries

The `IntegratedSummary` plugin performs the built-in summary calculation.

In the following example, the summary items array is passed to the `SummaryState` plugin's `totalItems` property to calculate the total summary internally.

.embedded-demo({ "path": "grid-summary/total-summary", "showThemeSelector": true })

Pass the summary items array to the `SummaryState` plugin's `groupItems` property to display group summary rows as demonstrated in the following example:

.embedded-demo({ "path": "grid-summary/group-summary", "showThemeSelector": true })

The following example demonstrates tree summary rows. In this example, the summary items array is passed to the `SummaryState` plugin's `treeItems` property.

.embedded-demo({ "path": "grid-summary/tree-summary", "showThemeSelector": true })

### Calculate Custom Data Summaries

The `CustomSummary` plugin allows you to calculate a data summary on a remote server or local machine.

The following example demonstrates custom total summary calculation. In this example, the summary items array is passed to the `SummaryState` plugin's `totalItems` property and the calculated summary values to the `totalValues` property.

Select several rows to calculate a summary for them.

.embedded-demo({ "path": "grid-summary/custom-summary", "showThemeSelector": true })

Use the `CustomSummary` plugin's `groupValues` and `treeValues` properties to calculate a custom group and tree summary.

## Implement a Custom Algorithm

The `IntegratedSummary` plugin allows you to extend the built-in summary types (`count`, `sum`, `max`, `min`, `avg`) with custom types. The following example shows a custom `median` summary type:

.embedded-demo({ "path": "grid-summary/custom-algorithm", "showThemeSelector": true })

## Prevent Summary Formatting

If a `DataTypeProvider` plugin is assigned to a column, its value formatting component is applied to a summary row. Use the `formattlessSummaryTypes` property to specify summary types that should not be formatted. The following example shows a custom `overprice` summary type that is not formatted:

.embedded-demo({ "path": "grid-summary/formatless-custom-algorithm", "showThemeSelector": true })
