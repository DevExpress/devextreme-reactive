# Resources Plugin Reference

A plugin that configure resources.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Resources } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Resources } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [Appointments](appointments.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
data | Array&lt;[Resources.Resource](#resourcesresourceitem)&gt; | The resources data set.
mainResourceName? | string | | Specifies whether appointments are colored like this resource kind.
palette? | [Resource.Palette](#resources.palette) | [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, ember, orange, deepOrange] | The palette that would be used if resource item colors were not defined.

## Interfaces

### Resources.Resource

Specifies a resource that available in scheduler.

Field | Type | Description
------|------|------------
id | number &#124; string | The resource kind ID.
fieldName | string | The appointment data field name that would binding to resource.
items | Array&lt;[Resources.ResourceItem](#resourcesresourceitem)&gt; | The array of resource items.
title? | string | The resource kind title that would displays inside UI components.
allowMultiple? | boolean | Indicates whether or not several resources of this kind can be assigned to an appointment.

### Resources.ResourceItem

Specifies the resource item object.

Field | Type | Description
------|------|------------
id | number &#124; string | The resource item ID.
text? | string | The resource item text that would displays inside UI components.
color? | string &#124; [Resources.Color](#resources.color) | The resource item color that would used inside UI components.

### Resources.Palette

Specifies the resources palette.

Type: `Array<string | Resources.Color>`

### Resources.ValidResource

Field | Type | Description
------|------|------------
fieldName | string | The appointment data field name that would binding to resource.
text | string | The resource item text that would displays inside UI components.
title | string | The resource kind title that would displays inside UI components.
allowMultiple | boolean | Indicates whether or not several resources of this kind can be assigned to an appointment.
isMain | boolean | Specifies the main resource kind.
items | Array&lt;[Resources.ValidResourceItem](#resourcesvalidresourceitem)&gt; | The array of resource items.
color? | string &#124; [Resources.Color](#resources.color) | The resource item color that would used inside UI components.

### Resources.ValidResourceItem

Field | Type | Description
------|------|------------
id | number &#124; string | The resource item ID.
fieldName | string | The appointment data field name that would binding to resource.
text | string | The resource item text that would displays inside UI components.
title | string | The resource kind title that would displays inside UI components.
allowMultiple | boolean | The flag that specifies multiple instances resource kind.
isMain | boolean | Specifies the main resource kind.
color? | string &#124; [Resources.Color](#resources.color) | The resource item color that would used inside UI components.

### Resources.Color

The Material-UI Color object that described [here](https://material-ui.com/customization/color/#color-palette). You see the [following examples](https://material-ui.com/customization/color/#examples) to use the color objects.

Type: `object`

## Plugin Components

Name | Properties | Description
-----|------------|------------
Resources.Root | [Resources.RootProps](#resourcesrootprops) | A component that renders the resources root element.
Resources.FlexibleSpace | [Resources.FlexibleSpaceProps](#resourcesflexiblespaceprops) | A component that renders the resources empty area.

Additional properties are added to the component's root element.