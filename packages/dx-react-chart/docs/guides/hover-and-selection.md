# React Chart - Hover and Selection

The React Chart's series support click, hover, and selection events that are implemented in the related plugins.

## Related Plugins

- [EventTracker](../reference/event-tracker.md) - allows you to handle a click on a point or series
- [HoverState](../reference/hover-state.md) - implements the *hovered* state for points and series
- [SelectionState](../reference/selection-state.md) -  implements the *selected* state for points and series

## Basic Setup

Import the plugins listed above to create an interactive chart.

### Hover in Uncontrolled Mode

In the uncontrolled mode, add the the `HoverState` plugin to the chart to enable the *hovered* state for series and points. You can also specify a series or point that is initialy hovered in the `HoverState` plugin's `defaultHover` property.

.embedded-demo({ "path": "chart-basic/hover", "showThemeSelector": true })

### Hover in Controlled Mode

In the controlled mode, specify a hovered series or point in the `HoverState` plugin's `hover` property and handle the `onHoverChange` event to control the hover state externally.

.embedded-demo({ "path": "chart-basic/hover-controlled", "showThemeSelector": true })

### Selection

Use the `SelectionState` plugin's `selection` property to specify selected series and points. Handle the `EventTracker` plugin's `onClick` event to change the selection state when when a series or point is clicked.

The following demos show how to create a chart with single and multiple selection mode.

- Single selection mode.

.embedded-demo({ "path": "chart-basic/selection", "showThemeSelector": true })

- Multiple selection mode.

.embedded-demo({ "path": "chart-basic/multiple-selection", "showThemeSelector": true })
