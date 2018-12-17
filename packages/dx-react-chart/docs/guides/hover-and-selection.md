# React Chart - Hover and Selection

The React Chart supports click and hover events on its plot and allows you to select series and points.

## Related Plugins

- [EventTracker](../reference/event-tracker.md) - allows you to handle a click on a point or series
- [HoverState](../reference/hover-state.md) - implements the *hovered* state for points and series
- [SelectionState](../reference/selection-state.md) -  implements the *selected* state for points and series

## Basic Setup

Import the plugins listed above to create an interactive chart.

### Hover in Uncontrolled Mode

In uncontrolled mode, add the `HoverState` plugin to the chart to enable the *hovered* state for series and points. You can also specify a series or point that is initialy hovered in the `HoverState` plugin's `defaultHover` property.

.embedded-demo({ "path": "interaction/hover", "showThemeSelector": true })

### Hover in Controlled Mode

In controlled mode, specify a hovered series or point in the `HoverState` plugin's `hover` property and handle the `onHoverChange` event to control the hover state externally.

.embedded-demo({ "path": "interaction/hover-controlled", "showThemeSelector": true })

### Selection

Use the `SelectionState` plugin's `selection` property to specify selected series and points. Handle the `EventTracker` plugin's `onClick` event to change the selection state when a series or point is clicked.

The following demos show how to create a chart using the single and multiple selection mode.

- Single selection mode

.embedded-demo({ "path": "interaction/selection", "showThemeSelector": true })

- Multiple selection mode

.embedded-demo({ "path": "interaction/multiple-selection", "showThemeSelector": true })

- Single/multiple selection by `Ctrl` (`Cmd` for MacOS) + mouse click

.embedded-demo({ "path": "interaction/single-multiple-selection", "showThemeSelector": true })
