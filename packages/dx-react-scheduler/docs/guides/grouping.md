# React Scheduler - Grouping

The React Scheduler allows you to group appointments by their [resources](../reference/resources.md). The group names are displayed by [GroupingPanel](../reference/grouping-panel.md) plugin.

## Related Plugins

- [Resources](../reference/resources.md) - configures resources
- [GroupingState](../reference/grouping-state.md) - manages the grouping state
- [IntegratedGrouping](../reference/integrated-grouping.md) - performs built-in grouping
- [GroupingPanel](../reference/grouping-panel.md) - displays resource titles by which appointments are grouped

## Basic Usage

First of all, you need to configure the Scheduler's resources. For that, add and configure the `Resources` plugin as described in [this article](./resources.md).

After you've added the resources, you need to add the [GroupingState](../reference/grouping-state.md) plugin. Use this plugin's `grouping` property to specify grouping options. The grouping order depends on grouping options' order. For example, if you want to group the appointments by `members` and then by `location` resources, the first item of the `grouping` property should correspond to the members resource, the second - to the location. If the grouping is not specified, the appointments will be grouped by the main resource. Then, you need to add the [IntegratedGrouping](../reference/integrated-grouping.md) plugin. And finally, if you want to display grouping headers, add the [GroupingPanel](../reference/grouping-panel.md) plugin.

It is worth mentioning that multiple instance resource appointments may be displayed several times. For instance, if one of the appointments belongs to three instances of a multiple resource, it will be displayed three times in the corresponding groups. The appointment's color will depend on the group a particular instance belongs to.

In the following example the appointments are grouped by their `members` resource which supports multiple resource instances. All of the appointments in this demo are displayed three times (once for every instance they belong to) and their color changes depending on the color specified in the corresponding resource instance:

.embedded-demo({ "path": "scheduler-grouping/basic", "showThemeSelector": true })

## Group Editing

To allow users to edit the appointments' groups, it is sufficient to configure [Editing](./editing.md). You may change the resources an appointment belongs to through the `AppointmentForm` or just drag-drop it from one group into another. The following example demonstrates this:

.embedded-demo({ "path": "scheduler-grouping/editing", "showThemeSelector": true })

## Customize the Appearance

You can change `GroupingPanel`'s appearance using its `horizontalLayoutComponent`, `rowComponent` and `cellComponent`. You can also customize the Scheduler's cells depending on the group a cell belongs to using cell's `groupInfo` property. The example below shows how to do that:

.embedded-demo({ "path": "scheduler-grouping/custom", "showThemeSelector": true })
