# ValueScale Plugin Reference

The `ValueScale` plugin allows you to customize the value scale and display multiple value scales.

## Import

Use the following statement to import the plugin:

```js
import { ValueScale } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | | The scale's name.
factory? | () => [ScaleObject](./argument-scale.md#scaleobject) | | A function that constructs a custom scale.
modifyDomain? | (domain: Array&lt;any&gt;) => Array&lt;any&gt; | | A function that modifies the scale domain.
