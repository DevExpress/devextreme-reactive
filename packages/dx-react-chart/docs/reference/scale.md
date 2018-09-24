# Scale Plugin Reference

The `Scale` plugin extends user data with service information that is required to render axes and series.

## Import

Use the following statement to import the plugin:

```js
import { Scale } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
extensions? | Array&lt;[ScaleOptions](#scaleoptions)&gt; | [{type: 'linear', constructor: () => object}, {type: 'band', constructor: () => object}] | An array of scales with constructors.

## Interfaces

### ScaleOptions

Field | Type | Description
------|------|------------
type? | string | A scale type.
constructor? | () => [ScaleObject](#scaleobject) | A function that constructs a custom scale.

### ScaleObject

Field | Type | Description
------|------|------------
domain | (domain?: Array&lt;any&gt;) => [ScaleObject](#scaleobject) &#124; Array&lt;any&gt; | A function that sets (if the `domain` parameter is an array) or gets (if the `domain` parameter is undefined) the current domain.
range | () => (range?: Array&lt;any&gt;) => [ScaleObject](#scaleobject) &#124; Array&lt;any&gt; | A function that sets (if the `domain` parameter is an array) or gets (if the `domain` parameter is undefined) the scale's current range.
tickFormat? | (count: number, specifier: string) => (tick: any) => string | A function that returns a tick formatter function.
ticks? | (count: number) => Array&lt;any&gt; | A function that returns an array of ticks.
paddingInner? | (padding: number) => [ScaleObject](#scaleobject) | A function that sets a scale's inner padding and returns the current scale.
paddingOuter? | (padding: number) => [ScaleObject](#scaleobject) | A function that sets a scale's outer padding and returns the current scale.
bandWidth? | () => number | A function that returns the width of each band.
