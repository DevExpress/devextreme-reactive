# React Chart - Zoom and Pan

The React Chart allows to set viewport. It supports mouse and touch events on its plot and allows you to pan and zoom.

## Basic Setup

Import the [ZoomAndPan](../reference/zoom-and-pan.md) plugin and add it to the Chart component to enable the feature.

.embedded-demo({ "path": "zoom-pan/categories", "showThemeSelector": true })

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.


## Usage

### Basics

Use the `viewport` and `onViewportChange` properties to use zoom and pan in a controlled mode and the `defaultViewport` property for an uncontrolled mode.

### Particular setup for a scale

Use the `interactionWithArguments` and `interactionWithValues` properties to enable only zooming or only panning for a corresponding scale.

.embedded-demo({ "path": "zoom-pan/datetime", "showThemeSelector": true })

### Zooming by region

Zooming by region is performed when mouse button and `zoomRegionKey` are pressed. Zoom is applied when mouse button is released.
