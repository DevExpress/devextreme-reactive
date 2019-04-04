# React Chart - Zoom and Pan

The React Chart allows to set viewport. It supports mouse and touch events on its plot and allows you to pan and zoom.

## Basic Setup

Import the [ZoomAndPan](../reference/zoom-and-pan.md) plugin and add it to the Chart component to enable the feature.

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

### Uncontrolled Mode

In uncontrolled mode, add `ZoomAndPan` plugin to the Chart component.

.embedded-demo({ "path": "zoom-pan/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In controlled mode, pass the options to the `ZoomAndPan` plugin's `viewport` property and handle `onViewportChange` event to control zoom and pan externally.

.embedded-demo({ "path": "zoom-pan/controlled", "showThemeSelector": true })

## Particular setup for a scale

Use the `interactionWithArguments` and `interactionWithValues` properties to enable only zooming or only panning for a corresponding scale.

.embedded-demo({ "path": "zoom-pan/datetime", "showThemeSelector": true })

### Zooming by region

Zooming by region is performed when mouse button and `zoomRegionKey` are pressed. Zoom is applied when mouse button is released.
