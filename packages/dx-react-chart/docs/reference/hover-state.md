# HoverState Plugin Reference

The `HoverState` plugin implements series' and point's hover state.

## Import

Use the following statement to import the plugin:

```js
import { HoverState } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
defaultHover? | [SeriesRef](./event-tracker.md#seriesref) | | Specifies a series or point that is initially displayed hovered.
hover? | [SeriesRef](./event-tracker.md#seriesref) | | Specifies a series or point that is hovered.
onHoverChange? | (target: [SeriesRef](./event-tracker.md#seriesref)) => void | | A function that is executed when the hover target is changed.
