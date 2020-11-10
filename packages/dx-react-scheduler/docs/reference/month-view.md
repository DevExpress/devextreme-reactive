# MonthView Plugin Reference

A plugin that renders Scheduler data for a month. This plugin arranges appointments from left to right. An appointment's size depends on its duration in days. However, it occupies the entire day cell if an appointment lasts only for several hours or minutes. The time scale and all-day panel are not available in this view.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { MonthView } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { MonthView } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | `Month` | The view's unique identifier. Required if you use several `MonthView` plugins.
displayName? | string |  | The view's name used in UI plugins. The default value is equal to `name`.
intervalCount? | number | 1 | Multiplies the default view interval.
layoutComponent | ComponentType&lt;[MonthView.LayoutProps](#monthviewlayoutprops)&gt; | | A component that renders a month view layout.
dayScaleLayoutComponent | ComponentType&lt;[MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops)&gt; | | A component that renders a day scale layout.
dayScaleCellComponent | ComponentType&lt;[MonthView.DayScaleCellProps](#monthviewdayscalecellprops)&gt; | | A component that renders a day scale cell.
dayScaleRowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | | A component that renders a day scale row.
dayScaleEmptyCellComponent | ComponentType&lt;[MonthView.DayScaleEmptyCellProps](#monthviewdayscaleemptycellprops)&gt; | | A component that renders an empty cell on the day scale.
timeTableLayoutComponent | ComponentType&lt;[MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops)&gt; | | A component that renders a timetable layout.
timeTableCellComponent | ComponentType&lt;[MonthView.TimeTableCellProps](#monthviewtimetablecellprops)&gt; | | A component that renders a timetable cell.
timeTableRowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | | A component that renders a timetable row.
appointmentLayerComponent | ComponentType&lt;[MonthView.AppointmentLayerProps](#monthviewappointmentlayerprops)&gt; | | A component that renders the appointment layer.

## Interfaces

### MonthView.CellData

Describes a cell data configuration object.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell's start time.
endDate | Date | Specifies the cell's end time.
otherMonth | boolean | Indicates whether the cell's date is not in the current month.
today | boolean | Indicates whether the cell's date is today.
groupingInfo? | Array&lt;[Group](./grouping-panel.md/#group)&gt; | Information about the cell's grouping.
endOfGroup? | boolean | `true` if this cell is last in its group.

### MonthView.LayoutProps

Describes properties passed to a component that renders a month view layout.

Field | Type | Description
------|------|------------
setScrollingStrategy | (scrollingStrategy: [ScrollingStrategy](./scheduler.md#scrollingstrategy)) => void | A scrollingStrategy callback.
dayScaleComponent | ComponentType&lt;[MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops)&gt; | A component that renders a day scale layout.
timeTableComponent | ComponentType&lt;[MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops)&gt; | A component that renders a timetable layout.

### MonthView.DayScaleLayoutProps

Describes properties passed to a component that renders a day scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[MonthView.CellData](#monthviewcelldata)&gt;&gt; | Specifies the cells meta data.
cellComponent | ComponentType&lt;[MonthView.DayScaleCellProps](#monthviewdayscalecellprops)&gt; | A component that renders a day scale cell.
rowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | A component that renders a day scale row.
groupingPanelComponent? | ComponentType&lt;[GroupingPanel.HorizontalLayoutProps](./grouping-panel.md/#groupingpanelhorizontallayoutprops)&gt; | A component that renders the grouping panel.
groupedByDate? | boolean | Indicates whether grouping by date is enabled. Takes its value from the `groupByDate` property of the [GroupingState](grouping-state.md) plugin.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### MonthView.DayScaleCellProps

Describes properties passed to a component that renders a day scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell's start time.
endDate? | Date | Specifies the cell's end time.
today? | boolean | Indicates whether the cell's date is today.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.
groupingInfo? | Array&lt;[Group](./grouping-panel.md/#group)&gt; | Information about the cell's grouping.
endOfGroup? | boolean | `true` if this cell is last in its group.

### MonthView.DayScaleEmptyCellProps

Describes properties passed to a component that renders an empty cell on the day scale.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the cell's content.

### MonthView.TimeTableLayoutProps

Describes properties passed to a component that renders a timetable layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[MonthView.CellData](#monthviewcelldata)&gt;&gt; | Specifies the cells meta data.
cellComponent | ComponentType&lt;[MonthView.TimeTableCellProps](#monthviewtimetablecellprops)&gt; | A component that renders a timetable cell.
rowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | A component that renders a timetable row.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### MonthView.TimeTableCellProps

Describes properties passed to a component that renders a timetable cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell's start time.
endDate? | Date | Specifies the cell's end time.
otherMonth? | boolean | Indicates whether the cell's date is not in the current month.
today? | boolean | Indicates whether the cell's date is today.
isShaded? | boolean | Indicates whether the cell is shaded.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the locale.
groupOrientation? | [GroupOrientation](./grouping-state.md#grouporientation) | The orientation of groups: `Vertical` or `Horizontal`.
groupingInfo? | Array&lt;[Group](./grouping-panel.md/#group)&gt; | Information about the cell's grouping.
endOfGroup? | boolean | `true` if this cell is last in its group.
onDoubleClick? | (e: object) => void | A function that handles a double click on the cell.

### MonthView.AppointmentLayerProps

Describes properties passed to a component that renders the appointment layer.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the appointment layer content.

### MonthView.RowProps

Describes properties passed to a component that renders a row.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

## Plugin Components

Name | Properties | Description
-----|------------|------------
MonthView.Layout | [MonthView.LayoutProps](#monthviewlayoutprops) | A component that renders a month view layout.
MonthView.DayScaleLayout | [MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops) | A component that renders a day scale layout.
MonthView.DayScaleCell | [MonthView.DayScaleCellProps](#monthviewdayscalecellprops) | A component that renders a day scale cell.
MonthView.DayScaleRow | [MonthView.RowProps](#monthviewrowprops) | A component that renders a day scale row.
MonthView.DayScaleEmptyCell | [MonthView.DayScaleEmptyCellProps](#monthviewdayscaleemptycellprops) | A component that renders an empty cell on the day scale.
MonthView.TimeTableLayout | [MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops) | A component that renders a timetable layout.
MonthView.TimeTableCell | [MonthView.TimeTableCellProps](#monthviewtimetablecellprops) | A component that renders a timetable cell.
MonthView.TimeTableRow | [MonthView.RowProps](#monthviewrowprops) | A component that renders a timetable row.
MonthView.AppointmentLayer | [MonthView.AppointmentLayerProps](#monthviewappointmentlayerprops) | A component that renders the appointment layer.

Additional properties are added to the component's root element.
