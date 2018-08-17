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
extension? | Array&lt;[scaleOptions](#scaleoptions)&gt; | [{type: 'linear', constructor: () => object}, {type: 'band', constructor: () => object}] | A array of scales with options.

## Interfaces

### scaleOptions

Field | Type | Description
------|------|------------
type? | string | Type of scale.
constructor? | () => object | A function that constructs a custom scale.
