# React Scheduler - Grouping

The React Scheduler allows you to group appointments by their [resources](../reference/resources.md). The group names are displayed above the Scheduler's view by [GroupingPanel](../reference/grouping-panel.md) plugin.

To change the group an appointment belongs to, users can edit a corresponding resource through the [AppointmentForm](../reference/appointment-form.md) or be drag-dropping the appointment with the help of [DragDropProvider](../reference/drag-drop-provider.md) plugin.

## Related Plugins

- [Resources](../reference/resources.md) - configures resources
- [GroupingState](../reference/grouping-state.md) - manages the grouping state
- [IntegratedGrouping](../reference/integrated-grouping.md) - performs built-in grouping
- [GroupingPanel](../reference/grouping-panel.md) - renders the Grouping Panel

## Basic Usage

First of all, you need to configure the Scheduler's resources. For that, add and configure the `Resources` plugin as described in [this article](./resources.md).

After you've added the resources, you need to add `GroupingState` plugin. Use this plugin's `grouping` property to specify grouping options. The grouping order depends on how grouping options' order: specify them in the order you want your appointments to be grouped. Then, you need to add `IntegratedGrouping` plugin. And if you want to display grouping headers at the top of the Scheduler, add the `GroupingPanel` plugin.

In the following example, the appointments are grouped by their `priorityId` resource:

.embedded-demo({ "path": "scheduler-grouping/basic", "showThemeSelector": true })

## Group Editing

To allow users to edit the appointments' groups, it is sufficient to configure [Editing](./editing.md). You may change the resources an appointment belongs to through the `AppointmentForm` or just drag-drop it from one group into another. The following example demonstrates this:

.embedded-demo({ "path": "scheduler-grouping/editing", "showThemeSelector": true })

## Customize the Appearance

You can change `GroupingPanel`'s appearance using its `horizontalLayoutComponent`, `rowComponent` and `cellComponent`. You can also customize the Scheduler's cells depending on the group a cell belongs to using cell's `groupInfo` property. The example below shows how to do that:

.embedded-demo({ "path": "scheduler-grouping/custom", "showThemeSelector": true })
