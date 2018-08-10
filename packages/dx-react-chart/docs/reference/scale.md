# Scale Plugin Reference

The `Scale` plugin is used to processing data for further correct drawing axes and series.

## Importing

Use the following import statement:

```js
import { Scale } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
axisExtension? | Array&lt;[scaleOptions](#scaleoptions)&gt; | | A array of scales with options.

## Interfaces

### scaleOptions

Field | Type | Description
------|------|------------
type? | string | Type of scale.
scale? | () => object | A function that constructs a custom scale.
format? | (scale: object) => (tick: string) => string | A function that return function for formatting ticks.
