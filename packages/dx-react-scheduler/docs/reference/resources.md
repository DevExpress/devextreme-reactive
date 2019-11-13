# Resources Plugin Reference

A plugin that configures [resources]().

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
data | Array&lt;[Resource](#resource)&gt; | | Resource data objects.
mainResourceName? | string | | Specifies which of several resources provides colors for appointments.
palette? | [Palette](#palette) | [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, ember, orange, deepOrange] | A palette used if a resource instance color is not defined.

## Interfaces

### Resource

Configures a resource.

Field | Type | Description
------|------|------------
id | number &#124; string | The resource ID.
fieldName | string | A data field name used to assign appointments to this resource. This field should be present in appointment data objects.
items | Array&lt;[ResourceItem](#resourceitem)&gt; | Resource instances.
title? | string | The resource title.
allowMultiple? | boolean | Indicates whether an appointment can be assigned to several instances of this resource.

### ResourceItem

Configures a resource instance.

Field | Type | Description
------|------|------------
id | number &#124; string | The resource instance ID.
text? | string | The resource instance text.
color? | string &#124; [Color](#color) | The resource instance color.

### Palette

Specifies a palette that provides colors for those resource instances whose color is not defined.

Type: `Array<string | Color>`

### ValidResource

The resource with all properties.

Field | Type | Description
------|------|------------
fieldName | string | A data field name used to assign an appointment to this resource.
title | string | The resource title.
allowMultiple | boolean | Indicates whether an appointment can be assigned to several instances of this resource.
isMain | boolean | `true` if this resource's name is assigned to the `mainResourceName` property.
items | Array&lt;[ValidResourceItem](#validresourceitem)&gt; | Resource instances.

### ValidResourceItem

An object that provides information about a resource instance.

Field | Type | Description
------|------|------------
id | number &#124; string | The resource instance ID.
fieldName | string | A data field name used to assign an appointment to the instance's resource.
text | string | The resource instance text.
title | string | The title of the instance's resource.
allowMultiple | boolean | Indicates whether the instance's resource allows users to assign an appointment to several resource instances.
isMain | boolean | `true` if the name of the instance's resource is assigned to the `mainResourceName` property.
color? | string &#124; [Color](#color) | The resource instance color.

### Color

The [Material-UI Color](https://material-ui.com/customization/color/#color-palette) object. See [these examples](https://material-ui.com/customization/color/#examples) for information on how to use it.

Type: `object`
