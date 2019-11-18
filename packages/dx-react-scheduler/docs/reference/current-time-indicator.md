# CurrentTimeIndicator Plugin Reference

A plugin that renders the Scheduler's current time indicator

## Import

Use the following statement to import a plugin with embedded theme components:

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
updateInterval | number | 60000 | The time interval in milliseconds between Indicator's position updates.
reduceBrightnessOfPastAppointments | boolean | `false` | Specifies whether the brightness of past appointments should be reduced.
shadePastCells | boolean | `false` | Specifies whether past cells should be shaded.
indicatorComponent | ComponentType&lt;[CurrentTimeIndicator.IndicatorProps](#currenttimeindicatorindicatorprops)&gt; | | A component that renders the CurrentTimeIndicator.

## Interfaces

### CurrentTimeIndicator.IndicatorProps

Properties passed to the component that renders the CurrentTimeIndicator.

Field | Type | Description
------|------|------------
top? | string | `Top` CSS property in percentages of the containing element's height.

## Plugin Components

Name | Properties | Description
-----|------------|------------
CurrentTimeIndicator.Indicator | [CurrentTimeIndicator.IndicatorProps](#currenttimeindicatorindicatorprops) | A component that renders the CurrentTimeIndicator.

Additional properties are added to the component's root element.
