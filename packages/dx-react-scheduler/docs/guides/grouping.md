# React Scheduler - Group Appointments

You can group appointments by [resources](../reference/resources.md) programmatically. Group names are displayed in a group panel.

## Related Plugins

- [Resources](../reference/resources.md) - configures resources
- [GroupingState](../reference/grouping-state.md) - manages the grouping state
- [IntegratedGrouping](../reference/integrated-grouping.md) - implements grouping
- [GroupingPanel](../reference/grouping-panel.md) - displays resource titles (group names)

## Basic Usage

To group by resources, [configure them](./resources.md) first. Then, add the [GroupingState](../reference/grouping-state.md) and [IntegratedGrouping](../reference/integrated-grouping.md) plugins.

`GroupingState` has a `grouping` property that accepts an array of resources to group by. The resource order in this array is important. For example, if the Room resource is first and Attendees second, appointments are grouped in that order. If the `grouping` property is unspecified, appointments are grouped by the [main resource](../reference/resources.md/#properties).

Group names (resource titles) are displayed in a group panel. To show the panel, add the [GroupingPanel](../reference/grouping-panel.md) plugin.

A single appointment can appear in multiple groups if it is assigned to [multiple instances of a resource](./resources.md/#single-and-multiple-instance-resources). For example, an appointment assigned to three instances appears in three groups. A particular resource instance provides the appointment's color. The `members` resource from the following demo illustrates this case:

.embedded-demo({ "path": "scheduler-grouping/basic", "showThemeSelector": true })

## Vertical Group Orientation

Groups are arranged horizontally (one next to another). To arrange them vertically (one _underneath_ another), set the `GroupingState`'s `groupOrientation` property to `Vertical`. You can adjust group orientation based on a view, as shown in the following example:

.embedded-demo({ "path": "scheduler-grouping/group-orientation", "showThemeSelector": true })

## Group by Date

To group appointments by date, set the `GroupingState`'s `groupByDate` property to `true`.

In the example below, appointments are first grouped by date and then by resource. Click the "Group by Date First" switch to change the order.

.embedded-demo({ "path": "scheduler-grouping/group-by-dates", "showThemeSelector": true })

## Move Appointments Between Groups

Users can drag-and-drop appointments between groups or use the appointment edit form to assign an appointment to another resource (group). To enable this, configure [editing](./editing.md):

.embedded-demo({ "path": "scheduler-grouping/editing", "showThemeSelector": true })

## Customize the Appearance

Timetable cells have a `groupingInfo` property that lists groups to which a particular cell belongs. Use this property to customize cells based on their group.

In addition, you can use the following `GroupingPanel` plugin properties to customize the group panel: `horizontalLayoutComponent`, `rowComponent`, and `cellComponent`.

The following example shows how to use these properties:

.embedded-demo({ "path": "scheduler-grouping/custom", "showThemeSelector": true })
