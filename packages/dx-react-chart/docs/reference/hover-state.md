# HoverState Plugin Reference

The `HoverState` plugin is used to handle series hover state.

## Import

Use the following statement to import the plugin:

```js
import { HoverState } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
defaultHover? | [SeriesRef](./event-tracker.md#seriesref) | | Specifies initial hover target in the uncontrolled mode.
hover? | [SeriesRef](./event-tracker.md#seriesref) | | Specifies hover.
onHoverChange? | (target: [SeriesRef](./event-tracker.md#seriesref)) => void | | A function that gets hovered target.
