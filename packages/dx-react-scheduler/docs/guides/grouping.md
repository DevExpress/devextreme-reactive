# React Scheduler - Grouping

The React Scheduler allows you to group appointments by their [resources](../reference/resources.md). The group names are displayed by [GroupingPanel](../reference/grouping-panel.md) plugin.

To change the group an appointment belongs to users can edit a corresponding appointment through the [AppointmentForm](../reference/appointment-form.md) or by drag-dropping the appointment with the help of [DragDropProvider](../reference/drag-drop-provider.md) plugin.

## Related Plugins

- [Resources](../reference/resources.md) - configures resources
- [GroupingState](../reference/grouping-state.md) - manages the grouping state
- [IntegratedGrouping](../reference/integrated-grouping.md) - performs built-in grouping
- [GroupingPanel](../reference/grouping-panel.md) - displays resource titles by which appointments are grouped

## Basic Usage

First of all, you need to configure the Scheduler's resources. For that, add and configure the `Resources` plugin as described in [this article](./resources.md).

After you've added the resources, you need to add the `GroupingState` plugin. Use this plugin's `grouping` property to specify grouping options. The grouping order depends on grouping options' order. Fro example, if you want to group the appointments by `members` and then by `location` resources, the first item of the `grouping` property should correspond to the `members` resource, the second - to the `location`. If the `grouping` property is not specified, the appointments will be grouped by the main resource. Then, you need to add the `IntegratedGrouping` plugin. And finally, if you want to display grouping headers, add the `GroupingPanel` plugin.

In the following example the appointments are grouped by their `priorityId` resource:

.embedded-demo({ "path": "scheduler-grouping/basic", "showThemeSelector": true })

## Group Editing

To allow users to edit the appointments' groups, it is sufficient to configure [Editing](./editing.md). You may change the resources an appointment belongs to through the `AppointmentForm` or just drag-drop it from one group into another. The following example demonstrates this:

.embedded-demo({ "path": "scheduler-grouping/editing", "showThemeSelector": true })

## Customize the Appearance

You can change `GroupingPanel`'s appearance using its `horizontalLayoutComponent`, `rowComponent` and `cellComponent`. You can also customize the Scheduler's cells depending on the group a cell belongs to using cell's `groupInfo` property. The example below shows how to do that:

.embedded-demo({ "path": "scheduler-grouping/custom", "showThemeSelector": true })
