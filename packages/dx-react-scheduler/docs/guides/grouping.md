# React Scheduler - Grouping

Appointments can be grouped by [resources](../reference/resources.md). Group names are displayed on a grouping panel.

## Related Plugins

- [Resources](../reference/resources.md) - configures resources
- [GroupingState](../reference/grouping-state.md) - manages the grouping state
- [IntegratedGrouping](../reference/integrated-grouping.md) - implements grouping
- [GroupingPanel](../reference/grouping-panel.md) - displays resource titles (group names)

## Basic Usage

To group by resources, [configure them](./resources.md) first.

Grouping is implemented in the [IntegratedGrouping](../reference/integrated-grouping.md) plugin. Add this and the [GroupingState](../reference/grouping-state.md) plugin to enable this feature.

`GroupingState` has a `grouping` property that accepts an array of resources to group by. Resource order in this array is important. For example, if the Room resource goes first, and Attendees goes second, appointments will be grouped in that order. If you leave the `grouping` property unspecified, the appointments are grouped by the [main resource](../reference/resources.md/#properties).

Group names (resource titles) are displayed on a grouping panel. To show it, add the [GroupingPanel](../reference/grouping-panel.md) plugin.

A single appointment can appear in multiple groups if it is assigned to [multiple instances of a resource](./resources.md/#single-and-multiple-instance-resources). For example, an appointment assigned to three instances appears thrice - once in each group. The appointment's color is inherited from a particular resource instance. The `members` resource from the following demo illustrates this case:


.embedded-demo({ "path": "scheduler-grouping/basic", "showThemeSelector": true })

## Move Appointments Between Groups

Users can drag-and-drop appointments between groups or use the appointment editing form to assign an an appointment to another resource (group). To enable these capabilities, configure [editing](./editing.md):

.embedded-demo({ "path": "scheduler-grouping/editing", "showThemeSelector": true })

## Customize the Appearance

Timetable cells have the `groupingInfo` property that lists groups to which a particular cell belongs. Use this property to customize cells depending on their group.

In addition, the `GroupingPanel` plugin has properties that customize the grouping panel: `horizontalLayoutComponent`, `rowComponent`, and `cellComponent`.

The following example shows how to use the properties mentioned above:

.embedded-demo({ "path": "scheduler-grouping/custom", "showThemeSelector": true })
