# Animation Plugin Reference

The `Animation` plugin animates series.

## Import

Use the following statement to import the plugin:

```js
import { Animation } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
settings? | (point: object, seriesName: string) => string | | A function that returns a settings string. The string can contain the following animation properties: duration, timing, direction, delay, fill mode, play state, iteration. See the [Using CSS animations
](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) article for more information.
