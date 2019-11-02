# React Scheduler - Resources

The React Scheduler allows to use different resources. This feature can helps illustrating varied appointment groups (such as *Author*, *Room Number*, *Participants* and etc) by paint them to various colors. If colors were not defined they would be assigned automatically for each resource item. To simply resource editing this feature adds special editors to the [AppointmentForm](../reference/appointment-form.md) plugin.

## Related Plugins

- [Resources](../reference/resources.md) - configures a resources data

## Basic Usage

Add the `Resource` plugin and define it's property `data` according your resources shape and add specific fields to your appointments data source. The following example shows two resources `location` and `members`. The `members` is a *multiple instance resource* and can be defined by multiple values. Opposite the `location` is a *single instance resource* and can be defined only be one resource item. The property `mainResourceItem` specified witch resource color scheme would be use.

.embedded-demo({ "path": "scheduler-resources/basic", "showThemeSelector": true })

## Usage With Other Features

To add editing resources for specific appointment you just only should add the [Editing feature](./editing.md) to your Scheduler configuration. All editors for resources would be added into edit form automatically, also information about resources would be added into [appointment tooltip](./appointment-tooltip.md) as well. The following demo demonstrates how to use the Resources with editing features.

.embedded-demo({ "path": "scheduler-resources/editing", "showThemeSelector": true })
