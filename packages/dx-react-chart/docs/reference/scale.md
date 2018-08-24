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
constructor? | () => object | A function that constructs a custom scale.
