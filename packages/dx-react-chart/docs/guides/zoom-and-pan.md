# React Chart - Zoom and Pan

Users can zoom and pan (scroll) the React Chart. These actions change the chart's viewport. Mouse and touch gestures are supported.

## Basic Setup

Import the [ZoomAndPan](../reference/zoom-and-pan.md) plugin and add it to the `Chart` component to enable zooming and panning.

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

### Uncontrolled Mode

In uncontrolled mode, add the `ZoomAndPan` plugin to the `Chart` component.

.embedded-demo({ "path": "zoom-pan/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, pass the viewport's coordinates to the `ZoomAndPan` plugin's `viewport` property and handle `onViewportChange` event to control zoom and pan externally.

.embedded-demo({ "path": "zoom-pan/controlled", "showThemeSelector": true })

## Enable Zooming or Panning Inidividually

Use the `interactionWithArguments` and `interactionWithValues` properties to enable zooming or panning individually for corresponding scales.

.embedded-demo({ "path": "zoom-pan/datetime", "showThemeSelector": true })

## Zoom by Selecting a Region

Users can zoom a region by selecting it with the mouse drag gesture while pressing the `zoomRegionKey`. Zooming is applied when the mouse button is released.
