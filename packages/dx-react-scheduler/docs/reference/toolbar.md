# Toolbar Plugin Reference

A plugin that renders the Scheduler's toolbar.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Toolbar } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rootComponent | ComponentType&lt;[Toolbar.RootProps](#toolbarrootprops)&gt; | | A component that renders the toolbar's root element.
flexibleSpaceComponent | ComponentType&lt;[Toolbar.FlexibleSpaceProps](#toolbarflexiblespaceprops)&gt; | | A component that renders the toolbar's empty area.

## Interfaces

### Toolbar.RootProps

Describes properties passed to a component that renders the toolbar's root element.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node that should be placed in the toolbar.

### Toolbar.FlexibleSpaceProps

Describes properties passed to a component that renders the the toolbar's empty area.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node that should be placed inside the empty area.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Toolbar.Root | [Toolbar.RootProps](#toolbarrootprops) | A component that renders the toolbar's root element.
Toolbar.FlexibleSpace | [Toolbar.FlexibleSpaceProps](#toolbarflexiblespaceprops) | A component that renders the toolbar's empty area.

Additional properties are added to the component's root element.
