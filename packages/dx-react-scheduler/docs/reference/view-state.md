# ViewState Plugin Reference

A plugin that manages the view state. It controls the total page count depending on the total row count and the specified page size, controls the currently selected page number and changes it in response to the corresponding actions.

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
