# DateNavigator Plugin Reference

A plugin that renders the Scheduler's date navigator.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin to use custom components:

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
openButtonComponent | ComponentType&lt;[DateNavigator.OpenButtonProps](#datenavigatoropenbuttonprops)&gt; | | A component that renders a button that invokes the date navigator.
navigationButtonComponent | ComponentType&lt;[DateNavigator.NavigationButtonProps](#datenavigatornavigationbuttonprops)&gt; | | A component that renders the date navigator's navigation buttons.

## Interfaces

### DateNavigator.RootProps

Properties passed to a component that renders the date navigator's root element.

Field | Type | Description
------|------|------------
navigationButtonComponent | ComponentType&lt;[DateNavigator.NavigationButtonProps](#datenavigatornavigationbuttonprops)&gt; | A component that renders the date navigator's navigation buttons.
openButtonComponent | ComponentType&lt;[DateNavigator.OpenButtonProps](#datenavigatoropenbuttonprops)&gt; | A component that renders a button that invokes the date navigator.
navigatorText? | string | Text displayed in the date navigator.
rootRef | (ref: ReactInstance) => void | A function that accepts the date navigator's root element.
onVisibilityToggle | () => void | An event raised when the date navigator should be shown or hidden.
onNavigate | (direction: 'forward' &#124; 'back') => void | An event raised when a navigation button is clicked. The event handler should switch the date navigator to the next or previous date.

### DateNavigator.OverlayProps

Properties passed to a component that renders the date navigator's overlay element.

Field | Type | Description
------|------|------------
visible? | boolean | Specifies whether the overlay is visible.
target? | ReactInstance | A React component instance or a DOM element that is used to position the overlay element.
onHide | () => void | An event raised when the date navigator should be hidden.
children | ReactNode | A React node used to render the overlay content.

### DateNavigator.OpenButtonProps

Properties passed to a component that renders the date navigator's open button.

Field | Type | Description
------|------|------------
onVisibilityToggle | () => void | An event raised when the date navigator should be shown or hidden.
text? | string | The button text.

### DateNavigator.NavigationButtonProps

Properties passed to a component that renders the date navigator's navigation button.

Field | Type | Description
------|------|------------
type | 'forward' &#124; 'back' | The button type.
onClick? | (e: object) => void | An event raised when the button is clicked.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DateNavigator.Root | [DateNavigator.RootProps](#datenavigatorrootprops) | A component that renders the date navigator's root element.
DateNavigator.Overlay | [DateNavigator.OverlayProps](#datenavigatoroverlayprops) | A component that renders the date navigator's overlay element.
DateNavigator.OpenButton | [DateNavigator.OpenButtonProps](#datenavigatoropenbuttonprops) | A component that renders a button that invokes the date navigator.
DateNavigator.NavigationButton | [DateNavigator.NavigationButtonProps](#datenavigatornavigationbuttonprops) | A component that renders the date navigator's navigation buttons.

Additional properties are added to the component's root element.
