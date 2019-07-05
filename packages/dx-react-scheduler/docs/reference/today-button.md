# TodayButton Plugin Reference

A plugin that renders the Scheduler's button that is used to navigate to the today's date

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TodayButton } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { TodayButton } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [ViewState](view-state.md)
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
buttonComponent | ComponentType&lt;[TodayButton.ButtonProps](#todaybuttonbuttonprops)&gt; | | A component that renders the today button.
messages? | [TodayButton.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### TodayButton.ButtonProps

Properties passed to the component that renders the today button.

Field | Type | Description
------|------|------------
setCurrentDate | (nextDate: Date) => void | Function that sets the Scheduler's current date.
getMessage | ([messageKey](#localization-messages): string) => string | Returns a localization message by the message key.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
today? | string | `today` | The today button's text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TodayButton.Button | [TodayButton.ButtonProps](#todaybuttonbuttonprops) | A component that renders the today button.

Additional properties are added to the component's root element.
