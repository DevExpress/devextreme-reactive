# GroupingPanel Plugin Reference

A plugin that renders the grouping panel used to display group names.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { GroupingPanel } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { GroupingPanel } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

- [IntegratedGrouping](integrated-grouping.md)
- [GroupingState](grouping-state.md)
- [DayView](day-view.md) [Optional]
- [MonthView](month-view.md) [Optional]
- [WeekView](week-view.md) [Optional]
- [ViewState](view-state.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
horizontalLayoutComponent | ComponentType&lt;[GroupingPanel.HorizontalLayoutProps](#groupingpanelhorizontallayoutprops)&gt; | | A component that renders the grouping panel horizontally.
rowComponent | ComponentType&lt;[GroupingPanel.RowProps](#groupingpanelrowprops)&gt; | | A component that renders a row on the grouping panel.
cellComponent | ComponentType&lt;[GroupingPanel.CellProps](#groupingpanelcellprops)&gt; | | A component that renders a cell in a row on the grouping panel.

## Interfaces

### Group

Describes a group.

Field | Type | Description
------|------|------------
id | number &#124; string | The ID of the resource the appointments are grouped by.
text | string | The resource's title used as a group name.
fieldName | string | The resource's `fieldName`.

### GroupingPanel.HorizontalLayoutProps

Describes properties passed to a component that renders the grouping panel horizontally.

Field | Type | Description
------|------|------------
groups | Array&lt;Array&lt;[Group](#group)&gt;&gt; | Specifies the final representation of Scheduler's groups and the order they will be rendered in.
colSpan | number | The layout's length measured in timetable cells.
cellStyle | object | The CSS styles of a cell on the grouping panel.
showHeaderForEveryDate? | boolean | Specifies whether to show group headings for every date or not.
rowComponent | ComponentType&lt;[GroupingPanel.RowProps](#groupingpanelrowprops)&gt; |  A component that renders a row on the grouping panel.
cellComponent | ComponentType&lt;[GroupingPanel.CellProps](#groupingpanelcellprops)&gt; | A component that renders a cell in a row on the grouping panel.

### GroupingPanel.RowProps

Describes properties passed to a component that renders a row on the grouping panel.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row's content.

### GroupingPanel.CellProps

Describes properties passed to a component that renders a cell in a row on the grouping panel.

Field | Type | Description
------|------|------------
group | [Group](#group) | The group the cell represents.
colSpan | number | The number of columns the cell spans.
left | number | The cell's offset from the left.
endOfGroup? | boolean | `true` if this cell is last in its group.
groupedByDate? | boolean | Indicates whether grouping by date is enabled. Takes its value from the `groupByDate` property of the [GroupingState](grouping-state.md) plugin.
children? | ReactNode | A React node used to render additional content to the cell.

## Plugin Components

Name | Properties | Description
-----|------------|------------
GroupingPanel.HorizontalLayout | [GroupingPanel.HorizontalLayoutProps](#groupingpanelhorizontallayoutprops) | A component that renders the grouping panel horizontally.
GroupingPanel.Row | [GroupingPanel.RowProps](#groupingpanelrowprops) | A component that renders a row on the grouping panel.
GroupingPanel.Cell | [GroupingPanel.CellProps](#groupingpanelcellprops) | A component that renders a cell in a row on the grouping panel.

Additional properties are added to the component's root element.
