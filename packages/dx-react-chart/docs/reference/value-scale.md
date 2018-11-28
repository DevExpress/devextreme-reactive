# ValueScale Plugin Reference

The `ValueScale` plugin customizes value scale and allows to add more value scales.

## Import

Use the following statement to import the plugin:

```js
import { ValueScale } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | | A scale name.
factory? | () => [ScaleObject](./argument-scale.md#scaleobject) | | A function that constructs a custom scale.
min? | number | | A minimal scale bound.
max? | number | | A maximal scale bound.
