# ViewState Plugin Reference

A plugin that manages the view state. It controls what view will be displayed and what date will be current.

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
currentDate? | number &#124; string &#124; Date | | Specifies the current date.
defaultCurrentDate? | number &#124; string &#124; Date | | Specifies the initial date in uncontrolled mode.
onCurrentDateChange? | (currentDate: number) => void | | Handles current date changes.
currentViewName? | string | | Specifies the current view name. Show what view is display.
defaultCurrentViewName? | string | | Specifies the initial view name in uncontrolled mode.
onCurrentViewNameChange? | (viewName: string) => void | | Handles view name changes.
