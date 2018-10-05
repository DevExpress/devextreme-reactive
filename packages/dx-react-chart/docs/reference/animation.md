# Animation Plugin Reference

The `Animation` plugin animate series elements such as series and points.

## Import

Use the following statement to import the plugin:

```js
import { Animation } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
extensions? | Array&lt;[AnimationOptions](#animationoptions)&gt; | | An array of animations for series.

## Interfaces

### AnimationOptions

Field | Type | Description
------|------|------------
name | string | Animation name.
settings | (item: {index: number, x: number, y: number}, startCoordinates: {x: number, y: number} ) => { keyframes: object, options: string } | Animation settings.
