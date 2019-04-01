# ZoomAndPan Plugin Reference

The `ZoomAndPan` plugin allows you to set chart viewport and to change it in response to mouse and touch events.

## Import

Use the following statement to import the plugin:

```js
import { ZoomAndPan } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
defaultViewport? | [Viewport](#viewport) | A default viewport.
viewport? | [Viewport](#viewport) | A viewport.
onViewportChange? | (viewport: [Viewport](#viewport)) => void | A function that is executed when the viewport changes.
interactionWithArguments? | 'none' \| 'pan' \| 'zoom' \| 'both' | A type of interaction available for the argument scale.
interactionWithValues? | 'none' \| 'pan' \| 'zoom' \| 'both' | A type of interaction available for the value scale.
zoomRegionKey? | 'shift' \| 'alt' \| 'ctrl' | A key the enables zoom region mode.
dragBoxComponent? | ComponentType&lt;[Viewport.DragBoxProps](#viewportdragboxprops)&gt; | A component that renders zoom region rect.

## Interfaces

### Viewport

The viewport data.

Field | Type | Description
------|------|------------
argumentStart | any | The start bound on the argument scale.
argumentEnd | any | The end bound on the argument scale.
valueStart | any | The start bound on the value scale.
valueEnd | any | The end bound on the value scale.
scaleName | string | Specifies the value scale where *start* and *end* are applied.

### Viewport.DragBoxProps

Field | Type | Description
------|------|------------
rect | `{ x: number, y: number, width: number, height: number }` | The rect's coordinates.
