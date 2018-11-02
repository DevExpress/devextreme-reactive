# React Chart - Hover and Selection

The React Chart supports click, hover and selection for series.
The `EventTracker` allows to handle series click.
The `HoverState` plugin uses the `EventTracker` plugin to track series hovering and turn series to *hovered* state.  
The `SelectionState` plugin allows to turn series to *selected* state.  

## Related Plugins

- [EventTracker](../reference/event-tracker.md) - handles click events
- [HoverState](../reference/hover-state.md) - enables hover
- [SelectionState](../reference/selection-state.md) - enables selection

## Basic Setup

Import the plugins listed above to enable Chart interactivity.

.embedded-demo({ "path": "TODO", "showThemeSelector": true })

### Click

Handle the `EventTracker` plugin's `onClick` event to process series click.

### Hover in Uncontrolled Mode

In the uncontrolled mode, specify initial hover target in the `HoverState` plugin's `defaultHover` property.

.embedded-demo({ "path": "TODO", "showThemeSelector": true })

### Hover in Controlled Mode

In the controlled mode, specify hover target in the `HoverState` plugin's `hover` property and handle the `onHoverChange` event to control the hover externally.

.embedded-demo({ "path": "TODO", "showThemeSelector": true })

### Selection

Use the `SelectionState` plugin's `selection` property to specify selected series and points.
