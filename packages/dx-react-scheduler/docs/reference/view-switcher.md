# ViewSwitcher Plugin Reference

A plugin that renders the Scheduler's view switcher.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { ViewSwitcher } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [ViewState](view-state.md)
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
switcherComponent | ComponentType&lt;[ViewSwitcher.SwitcherProps](#viewswitcherswitcherprops)&gt; | | A component that renders the view switcher.

## Interfaces

### ViewSwitcher.SwitcherProps

Properties passed to a component that renders the view switcher.

Field | Type | Description
------|------|------------
currentView | [SchedulerView](#schedulerview) | A displayed view.
availableViews | Array&lt;[SchedulerView](#schedulerview)&gt; | An array of available views.
onChange | (nextViewName: string) => void | A function that handles changes to the displayed view.

### SchedulerView

Describes a scheduler view object.

Field | Type | Description
------|------|------------
name | string | View's unique identifier.
displayName | string | View's visible name.

## Plugin Components

Name | Properties | Description
-----|------------|------------
ViewSwitcher.Switcher | [ViewSwitcher.SwitcherProps](#viewswitcherswitcherprops) | A component that renders the view switcher.

Additional properties are added to the component's root element.
