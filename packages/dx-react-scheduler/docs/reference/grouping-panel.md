# GroupingPanel Plugin Reference

A plugin that renders the Grouping Panel and used to display groups.

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
horizontalLayoutComponent | ComponentType&lt;[GroupingPanel.HorizontalLayoutProps](#groupingpanelhorizontallayoutprops)&gt; | | A component that renders a Grouping panel horizontal layout.
rowComponent | ComponentType&lt;[GroupingPanel.RowProps](#groupingpanelrowprops)&gt; | | A component that renders a Grouping panel row.
cellComponent | ComponentType&lt;[GroupingPanel.CellProps](#groupingpanelcellprops)&gt; | | A component that renders a Grouping panel cell.

## Interfaces

### GroupingItem

Describes a single grouping instance.

Field | Type | Description
------|------|------------
id | number &#124; string | The ID of the corresponding resource the appointments are grouped by.
text | string | The grouping item text.
fieldName | string | The corresponding resource's filedName.

### GroupingPanel.HorizontalLayoutProps

Describes properties passed to a component that renders a Grouping panel horizontal layout.

Field | Type | Description
------|------|------------
groups | Array&lt;Array&lt;[GroupingItem](#groupingitem)&gt;&gt; | Specifies the final representation of Scheduler's groups and the order they will be rendered in.
length | number | Indicates the number of cells in the Scheduler's timetable.
cellStyle | object | Grouping Panel cell's style.
rowComponent | ComponentType&lt;[GroupingPanel.RowProps](#groupingpanelrowprops)&gt; |  A component that renders a Grouping panel row.
cellComponent | ComponentType&lt;[GroupingPanel.CellProps](#groupingpanelcellprops)&gt; | | A component that renders a Grouping panel cell.

### GroupingPanel.RowProps

Describes properties passed to a component that renders a Grouping panel row.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

### GroupingPanel.CellProps

Describes properties passed to a component that renders a Grouping panel horizontal layout.

Field | Type | Description
------|------|------------
groupingItem | [GroupingItem](#groupingitem) | The group the cell represents.
colSpan | number | Specifies the cell's size in the number of Scheduler's timetable cells.
left | number | Specifies cell's horizontal position.
children? | ReactNode | A React node used to render an additional content to the cell.

## Plugin Components

Name | Properties | Description
-----|------------|------------
GroupingPanel.HorizontalLayout | [GroupingPanel.HorizontalLayoutProps](#groupingpanelhorizontallayoutprops) | A component that renders a Grouping panel horizontal layout.
GroupingPanel.Row | [GroupingPanel.RowProps](#groupingpanelrowprops) | A component that renders a Grouping panel row.
GroupingPanel.Cell | [GroupingPanel.CellProps](#groupingpanelcellprops) | A component that renders a Grouping panel cell.

Additional properties are added to the component's root element.
