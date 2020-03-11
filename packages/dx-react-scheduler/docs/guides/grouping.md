# React Scheduler - Grouping

Appointments can be grouped by [resources](../reference/resources.md). Group names are displayed in a grouping panel.

## Related Plugins

- [Resources](../reference/resources.md) - configures resources
- [GroupingState](../reference/grouping-state.md) - manages the grouping state
- [IntegratedGrouping](../reference/integrated-grouping.md) - implements grouping
- [GroupingPanel](../reference/grouping-panel.md) - displays resource titles (group names)

## Basic Usage

To group by resources, [configure them](./resources.md) first.

Grouping is implemented in the [IntegratedGrouping](../reference/integrated-grouping.md) plugin. Add this and the [GroupingState](../reference/grouping-state.md) plugin to enable this feature.

`GroupingState` has a `grouping` property that accepts an array of resources to group by. The resource order in this array is important. For example, if the Room resource is first and Attendees second, appointments are grouped in that order. If the `grouping` property is unspecified, appointments are grouped by the [main resource](../reference/resources.md/#properties).

Group names (resource titles) are displayed in a grouping panel. To show it, add the [GroupingPanel](../reference/grouping-panel.md) plugin.

A single appointment can appear in multiple groups if it is assigned to [multiple instances of a resource](./resources.md/#single-and-multiple-instance-resources). For example, an appointment assigned to three instances appears in three groups. The appointment's color is inherited from a particular resource instance. The `members` resource from the following demo illustrates this case:


.embedded-demo({ "path": "scheduler-grouping/basic", "showThemeSelector": true })

## Group Orientation

Use `GroupingState`'s `groupOrientation` property to switch between `Vertical` and `Horizontal` group orientations depending on view name. The example below illustrates this:

.embedded-demo({ "path": "scheduler-grouping/group-orientation", "showThemeSelector": true })

## Group by Date

To group appointments by date, set the `GroupingState`'s `groupByDate` property to `true`.

In the example below, appointments are grouped first by date and then by resource. Click the "Group by Date First" switch to change this order.

.embedded-demo({ "path": "scheduler-grouping/group-by-dates", "showThemeSelector": true })

## Move Appointments Between Groups

Users can drag-and-drop appointments between groups or use the appointment edit form to assign an appointment to another resource (group). To enable this, configure [editing](./editing.md):

.embedded-demo({ "path": "scheduler-grouping/editing", "showThemeSelector": true })

## Customize the Appearance

Timetable cells have the `groupingInfo` property that lists groups to which a particular cell belongs. Use this property to customize cells depending on their group.

In addition, the `GroupingPanel` plugin has properties that customize the grouping panel: `horizontalLayoutComponent`, `rowComponent`, and `cellComponent`.

The following example shows how to use the properties mentioned above:

.embedded-demo({ "path": "scheduler-grouping/custom", "showThemeSelector": true })
