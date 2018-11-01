# Toolbar Plugin Reference

A plugin that renders the Scheduler toolbar.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rootComponent | ComponentType&lt;[Toolbar.RootProps](#toolbarrootprops)&gt; | | A component that renders the toolbar root element.
flexibleSpaceComponent | ComponentType&lt;[Toolbar.FlexibleSpaceProps](#toolbarflexiblespaceprops)&gt; | | A component that renders the toolbar empty space area inside a root component.

## Interfaces

### Toolbar.RootProps

Describes properties passed to a component that renders the toolbar root element.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed in the toolbar.

### Toolbar.FlexibleSpaceProps

Describes properties passed to a component that renders the the toolbar empty space area inside a root component.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed inside a root component.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Toolbar.Root | [Toolbar.RootProps](#toolbarrootprops) | A component that renders the toolbar root element.
Toolbar.FlexibleSpace | [Toolbar.FlexibleSpaceProps](#toolbarflexiblespaceprops) | A component that renders the toolbar empty space area inside a root component.

Additional properties are added to the component's root element.
