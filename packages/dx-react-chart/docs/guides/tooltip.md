# React Chart - Tooltip

A tooltip displays information about a series point when you hover the mouse pointer over it.

## Related Plugins

The following plugins implement the tooltip:

- [EventTracker](../reference/event-tracker.md) - allows you to handle clicking/hovering a point or series
- [Tooltip](../reference/tooltip.md) - renders the tooltip

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to create a Chart with tooltip support.

### Uncontrolled Mode

In uncontrolled mode, add the `Tooltip` plugin to the chart to show a tooltip for hovered points.

.embedded-demo({ "path": "tooltip/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, specify in the `Tooltip` plugin's `targetItem` property and handle the `onTargetItemChange` event to control the tooltip's visibility externally.

.embedded-demo({ "path": "tooltip/controlled", "showThemeSelector": true })
