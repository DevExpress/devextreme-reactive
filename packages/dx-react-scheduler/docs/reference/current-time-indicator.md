# CurrentTimeIndicator Plugin Reference

A plugin that renders the current time indicator and the shading that covers appointments and timetable cells up to the current time.

## Import

Use the following statement to import the plugin with embedded theme components:

```js
import { CurrentTimeIndicator } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { CurrentTimeIndicator } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [DayView](day-view.md) [Optional]
- [WeekView](week-view.md) [Optional]
- [MonthView](month-view.md) [Optional]
- [Appointments](appointments.md) [Optional]
- [DragDropProvider](drag-drop-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
updateInterval | number | 60000 | An interval in milliseconds that specifies how frequently the indicator's position is updated.
shadePreviousAppointments | boolean | `false` | Specifies whether previous appointments should be shaded.
shadePreviousCells | boolean | `false` | Specifies whether previous cells should be shaded.
indicatorComponent | ComponentType&lt;[CurrentTimeIndicator.IndicatorProps](#currenttimeindicatorindicatorprops)&gt; | | A component that renders the current time indicator.

## Interfaces

### CurrentTimeIndicator.IndicatorProps

Properties passed to the `indicatorComponent`.

Field | Type | Description
------|------|------------
top? | string | Indicates the distance from the top edge of the containing element (usually, a timetable cell). The distance is a percentage of the element's height.

## Plugin Components

Name | Properties | Description
-----|------------|------------
CurrentTimeIndicator.Indicator | [CurrentTimeIndicator.IndicatorProps](#currenttimeindicatorindicatorprops) | A component that renders the current time indicator.

Additional properties are added to the component's root element.
