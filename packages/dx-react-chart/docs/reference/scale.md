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
extensions? | Array&lt;[scaleOptions](#scaleoptions)&gt; | [{type: 'linear', constructor: () => object}, {type: 'band', constructor: () => object}] | An array of scales with constructors.

## Interfaces

### scaleOptions

Field | Type | Description
------|------|------------
type? | string | A scale type.
constructor? | () => [scaleObject](#scaleobject) | A function that constructs a custom scale.

### scaleObject

Field | Type | Description
------|------|------------
domain | (domain?: Array&lt;any&gt;) => [scaleObject](#scaleobject) &#124; Array&lt;any&gt; | A function that accepts a domain as array of any values or returns current domain.
range | () => (range?: Array&lt;any&gt;) => [scaleObject](#scaleobject) &#124; Array&lt;any&gt; | A function that accepts scale’s range as array of any values or returns current range.
tickFormat? | (count: number, specifier: string) => (tick: any) => string | A function that returns a tick formatter function.
ticks? | (count: number) => Array&lt;any&gt; | A function that returns array of ticks.
paddingInner? | (padding: number) => [scaleObject](#scaleobject) | A function that set scale's inner padding and returns current scale.
paddingOuter? | (padding: number) => [scaleObject](#scaleobject) | A function that set scale's outer padding and returns current scale.
bandWidth? | () => number | A function that returns the width of each band.
