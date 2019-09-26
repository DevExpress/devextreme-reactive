# ViewState Plugin Reference

A plugin that manages the view state. It specifies the current date and the displayed view.

## Import

Use the following statement to import the plugin:

```js
import { ViewState } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
currentDate? | [SchedulerDateTime](./scheduler.md#schedulerdatetime) | | The current date.
defaultCurrentDate? | [SchedulerDateTime](./scheduler.md#schedulerdatetime) | | The initial date in the uncontrolled mode.
onCurrentDateChange? | (currentDate: Date) => void | | Handles changes to the current date.
currentViewName? | string | | The displayed view's name.
defaultCurrentViewName? | string | | The initially displayed view's name in the uncontrolled mode.
onCurrentViewNameChange? | (viewName: string) => void | | Handles changes to the displayed view.
