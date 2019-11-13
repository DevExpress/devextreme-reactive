# React Scheduler - Resources

The React Scheduler allows you to assign appointments to different resources. For example, if the Scheduler illustrates talks at a conference, resources could be rooms, speakers, and attendees. 

In the UI, resources are identified by different colors. If the colors are not defined, they are assigned automatically.

To assign appointments to resources, users can edit a dedicated [AppointmentForm](../reference/appointment-form.md) field.

## Related Plugins

- [Resources](../reference/resources.md) - configures resources

## Single and Multiple Instance Resources

Appointments can be assigned to multiple or only one instance of a resource, depending on the resource type. To illustrate the difference, let us return to the example in which appointments are talks at a conference and resources are rooms, speakers, and attendees.

A talk can only be held in a single room, so the appointment can only be assigned to one instance of the Rooms resource. Such resources are called **single instance resources**. This is the default resource type.

Many people can attend a talk and more than one speaker can give it. In this case, the appointment can be assigned to multiple instances of the Attendees and Speakers resources. Such resources are called **multiple instance resources**. Set `allowMultiple` to `true` in the resource data object to allow multiple instances for a resource.

## Basic Usage

Add the `Resources` plugin and specify its `data` property with an array of resource data objects. The `fieldName` property in each data object identifies the resource. Appointments that use this resource should have a field named like the property value.

In the following example, two resources are declared: `location` and `members`. `members` is a multiple instance resource. The `mainResourceName` property specifies which of the two resources provides colors to the appointments.

.embedded-demo({ "path": "scheduler-resources/basic", "showThemeSelector": true })

## Enable Resource Editing

To allow users to edit resources, it is sufficient to configure [Editing](./editing.md). Resource editors are added to the edit form, and the [appointment tooltip](./appointment-tooltip.md) displays information about the resources. The following example demonstrates this case:

.embedded-demo({ "path": "scheduler-resources/editing", "showThemeSelector": true })
