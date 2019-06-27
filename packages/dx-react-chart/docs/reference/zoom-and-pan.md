# ZoomAndPan Plugin Reference

The `ZoomAndPan` plugin allows you to set the chart's viewport and change it in response to mouse and touch events.

## Import

Use the following statement to import the plugin with embedded theme components:

```js
import { ZoomAndPan } from '@devexpress/dx-react-chart-material-ui';
//import { ZoomAndPan } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { ZoomAndPan } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
defaultViewport? | [Viewport](#viewport) | The default viewport.
viewport? | [Viewport](#viewport) | The viewport.
onViewportChange? | (viewport: [Viewport](#viewport)) => void | A function that is executed when the viewport changes.
interactionWithArguments? | 'none' &#124; 'pan' &#124; 'zoom' &#124; 'both' | The type of interaction available for the argument scale.
interactionWithValues? | 'none' &#124; 'pan' &#124; 'zoom' &#124; 'both' | The type of interaction available for the value scale.
zoomRegionKey? | 'shift' &#124; 'alt' &#124; 'ctrl' | The key the allows a user to zoom a region by selecting it with the mouse drag gesture.
dragBoxComponent? | ComponentType&lt;[ZoomAndPan.DragBoxProps](#zoomandpandragboxprops)&gt; | A component that renders the rectangle that appears when a user zooms a region.

## Interfaces

### Viewport

The viewport configuration.

Field | Type | Description
------|------|------------
argumentStart | any | The viewport's start boundary on the argument scale.
argumentEnd | any | The viewport's end boundary on the argument scale.
valueStart | any | The viewport's start boundary on the value scale.
valueEnd | any | The viewport's end boundary on the value scale.
scaleName | string | The scale on which `valueStart` and `valueEnd` should be applied.

### ZoomAndPan.DragBoxProps

Describes properties passed to a component that renders the rectangle around the area a user zooms with the mouse drag gesture.

Field | Type | Description
------|------|------------
rect | { x: number, y: number, width: number, height: number } | The rectangle's coordinates.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ZoomAndPan.DragBox | [ZoomAndPan.DragBoxProps](#zoomandpandragboxprops) | A component that renders the rectangle that appears when a user zooms a region.
