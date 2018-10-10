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
settings? | (point: object, seriesName: string) => string | | A function that returns string with animation options for series and their points. The string can consists of the following properties: duration, timing, direction, delay, fill mode, play state, iteration. All this properties has the same values as in the css animation (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations).
