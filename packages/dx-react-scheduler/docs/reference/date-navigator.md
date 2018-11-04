# DateNavigator Plugin Reference

A plugin that renders the Scheduler's date navigator.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DateNavigator } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [ViewState](view-state.md)
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rootComponent | ComponentType&lt;[DateNavigator.RootProps](#datenavigatorrootprops)&gt; | | A component that renders the date navigator's root element.
overlayComponent | ComponentType&lt;[DateNavigator.OverlayProps](#datenavigatoroverlayprops)&gt; | | A component that renders the date navigator's overlay element.
openButtonComponent | ComponentType&lt;[DateNavigator.OpenButtonProps](#datenavigatoropenbuttonprops)&gt; | | A component that renders a button that opens a data navigator overlay element.
navigationButtonComponent | ComponentType&lt;[DateNavigator.NavigationButtonProps](#datenavigatornavigationbuttonprops)&gt; | | A component that renders the date navigator's navitation button.

## Interfaces

### DateNavigator.RootProps

Describes properties passed to a component that renders the date navigator's root element.

Field | Type | Description
------|------|------------
navigationButtonComponent | ComponentType&lt;[DateNavigator.NavigationButtonProps](#datenavigatornavigationbuttonprops)&gt; | A component that renders the date navigator's navitation button.
openButtonComponent | ComponentType&lt;[DateNavigator.OpenButtonProps](#datenavigatoropenbuttonprops)&gt; | A component that renders a button that open a data navigator overlay element.
navigatorText? | string | A date navigator text.
rootRef | (ref: ReactInstance) => void | A function that accepts the root component's React element.
onVisibilityToggle | () => void | An event that initiates overlay showing or hiding.
onNavigate | ({ back: boolean }) => void | An event than initiates navigation to the next date.

### DateNavigator.OverlayProps

Describes properties passed to a component that renders the date navigator's overlay element.

Field | Type | Description
------|------|------------
visible? | boolean | Specifies whether the overlay is visible.
target? | ReactInstance | A React component instance or a DOM element that is used for overlay positioning.
onHide | () => void | An event that initiates overlay hiding.
children | ReactNode | A React node used to render overlay content.

### DateNavigator.OpenButtonProps

Describes properties passed to a component that renders the date navigator's open button element.

Field | Type | Description
------|------|------------
onVisibilityToggle | () => void | An event that initiates overlay showing or hiding.
text? | string | A button text.

### DateNavigator.NavigationButtonProps

Describes properties passed to a component that renders the date navigator's navigation button element.

Field | Type | Description
------|------|------------
type | 'forward' &#124; 'back' | A navigation button type.
onClick? | (e: object) => void | An event that handles a button click.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DateNavigator.Root | [DateNavigator.RootProps](#datenavigatorrootprops) | A component that renders the date navigator's root element.
DateNavigator.Overlay | [DateNavigator.OverlayProps](#datenavigatoroverlayprops) | A component that renders the date navigator's overlay element.
DateNavigator.OpenButton | [DateNavigator.OpenButtonProps](#datenavigatoropenbuttonprops) | A component that renders the date navigator's open button element.
DateNavigator.NavigationButton | [DateNavigator.NavigationButtonProps](#datenavigatornavigationbuttonprops) | A component that renders the date navigator's navigation button element.

Additional properties are added to the component's root element.
