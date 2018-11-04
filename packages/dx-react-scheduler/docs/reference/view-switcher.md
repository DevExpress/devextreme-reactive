# ViewSwitcher Plugin Reference

A plugin that renders the Scheduler's view switcher selectbox.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

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
switcherComponent | ComponentType&lt;[ViewSwitcher.SwitcherProps](#viewswitcherswitcherprops)&gt; | | A component that renders the Scheduler's view switcher.

## Interfaces

### ViewSwitcher.SwitcherProps

Describes properties passed to a component that renders the Scheduler's view switcher.

Field | Type | Description
------|------|------------
currentViewName | string | A current view name.
availableViews | Array&lt;string&gt; | An array of available view names.
onChange | ({ nextViewName: string }) => void | A function that handles a view name change.


## Plugin Components

Name | Properties | Description
-----|------------|------------
ViewSwitcher.Switcher | [ViewSwitcher.SwitcherProps](#viewswitcherswitcherprops) | A component that renders the Scheduler's view switcher.

Additional properties are added to the component's root element.
