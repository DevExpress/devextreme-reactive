# React Chart - Tooltip

The React Chart supports tooltip.

## Related Plugins

The following plugins implement tooltip:

- [EventTracker](../reference/event-tracker.md) - allows you to handle a click and hover on a point or series
- [Tooltip](../reference/tooltip.md) - renders the tooltip

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to create a Chart with tooltip.

### Tooltip in Uncontrolled Mode

In uncontrolled mode, add the `Tooltip` plugin to the chart to enable tooltip showing for hovered points.

.embedded-demo({ "path": "tooltip/uncontrolled", "showThemeSelector": true })

### Tooltip in Controlled Mode

In controlled mode, specify in the `Tooltip` plugin's `targetItem` property and handle the `onTargetItemChange` event to control tooltip showing externally.

.embedded-demo({ "path": "tooltip/controlled", "showThemeSelector": true })
