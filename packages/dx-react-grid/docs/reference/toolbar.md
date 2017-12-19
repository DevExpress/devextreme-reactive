# Toolbar Plugin Reference

A plugin that renders the Grid toolbar.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rootComponent | ElementType&lt;[ToolbarRootProps](#toolbarrootprops)&gt; | | A component that renders the toolbar root element.

## Interfaces

### ToolbarRootProps

Describes properties passed to a component that renders the toolbar root element.

Field | Type | Description
------|------|------------
children? | ReactElement | A React element to be placed in the toolbar.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Toolbar.Root | [ToolbarRootProps](#toolbarrootprops) | A component that renders the toolbar root element.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
header | Template | Object? | A template that renders the grid header.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toolbarContent | Template | Object? | A template that renders the toolbar content.
