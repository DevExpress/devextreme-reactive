# Toolbar Plugin Reference

A plugin that renders Grid's toolbar.

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
style? | Object | Styles that should be applied to the root toolbar element.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Toolbar.Root | [ToolbarRootProps](#toolbarrootprops) | A component that renders a table data cell.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

none

### Exports

none
