# WeekView Plugin Reference

A plugin that renders the Scheduler's week view. This plugin arranges appointments from top to bottom. If their time intervals overlap, their width is decreased and they are placed next to each other.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { WeekView } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | `Week` | The view's unique identifier. Required if you use several `WeekView` plugins.
displayName? | string |  | The view's name used in UI plugins. The default value is equal to `name`.
excludedDays? | Array&lt;number&gt; | [] | Specifies the days of week that should not be displayed in the view. Accepts an array of zero-based day indexes (0 - Sunday).
intervalCount? | number | 1 | Multiplies the default view interval.
cellDuration? | number | 30 | Specifies the cell's duration in minutes.
startDayHour? | number | 0 | Specifies the start hour of the view time scale. Accepts floating-point numbers from 0 to 24.
endDayHour? | number | 24 | Specifies the end hour of the view time scale. Accepts floating-point numbers from 0 to 24.
layoutComponent | ComponentType&lt;[WeekView.LayoutProps](#weekviewlayoutprops)&gt; | | A component that renders a week view layout.
timeScaleLayoutComponent | ComponentType&lt;[WeekView.TimeScaleLayoutProps](#weekviewtimescalelayoutprops)&gt; | | A component that renders a time scale layout.
timeScaleLabelComponent | ComponentType&lt;[WeekView.TimeScaleLabelProps](#weekviewtimescalelabelprops)&gt; | | A component that renders a time scale label.
dayScaleLayoutComponent | ComponentType&lt;[WeekView.DayScaleLayoutProps](#weekviewdayscalelayoutprops)&gt; | | A component that renders a day scale layout.
dayScaleCellComponent | ComponentType&lt;[WeekView.DayScaleCellProps](#weekviewdayscalecellprops)&gt; | | A component that renders a day scale cell.
dayScaleRowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | | A component that renders a day scale row.
dayScaleEmptyCellComponent | ComponentType&lt;[WeekView.DayScaleEmptyCellProps](#weekviewdayscaleemptycellprops)&gt; | | A component that renders a day scale empty cell.
timeTableLayoutComponent | ComponentType&lt;[WeekView.TimeTableLayoutProps](#weekviewtimetablelayoutprops)&gt; | | A component that renders a timetable layout.
timeTableCellComponent | ComponentType&lt;[WeekView.TimeTableCellProps](#weekviewtimetablecellprops)&gt; | | A component that renders a timetable cell.
timeTableRowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | | A component that renders a timetable row.
appointmentLayerComponent | ComponentType&lt;[WeekView.AppointmentLayerProps](#weekviewappointmentlayerprops)&gt; | | A component that renders an appointment layer.

## Interfaces

### WeekView.CellData

Describes a cell data configuration object.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell's start time.
endDate | Date | Specifies the cell's end time.
today | boolean | Indicates whether the cell's date is today.
groupingInfo? | Array&lt;[Group](./grouping-panel.md/#group)&gt; | Information about the cell's grouping.
endOfGroup? | boolean | `true` if this cell is last in its group.

### WeekView.LayoutProps

Describes properties passed to a component that renders a week view layout.

Field | Type | Description
------|------|------------
setScrollingStrategy | (scrollingStrategy: [ScrollingStrategy](./scheduler.md#scrollingstrategy)) => void | A scrollingStrategy callback.
timeScaleComponent | ComponentType&lt;[WeekView.TimeScaleLayoutProps](#weekviewtimescalelayoutprops)&gt; | A component that renders a time scale layout.
dayScaleComponent | ComponentType&lt;[WeekView.DayScaleLayoutProps](#weekviewdayscalelayoutprops)&gt; | A component that renders a day scale layout.
timeTableComponent | ComponentType&lt;[WeekView.TimeTableLayoutProps](#weekviewtimetablelayoutprops)&gt; | A component that renders a timetable layout.
dayScaleEmptyCellComponent | ComponentType&lt;[WeekView.DayScaleEmptyCellProps](#weekviewdayscaleemptycellprops)&gt; | A component that renders a day scale empty cell.

### WeekView.TimeScaleLayoutProps

Describes properties passed to a component that renders a time scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[WeekView.CellData](#weekviewcelldata)&gt;&gt; | Specifies the cells meta data.
groups? | Array&lt;Array&lt;[Group](./grouping-panel.md#group)&gt;&gt; | Groups in the order in which they should be rendered.
groupOrientation? | [GroupOrientation](./grouping-state.md#grouporientation) | The orientation of groups: `Vertical` or `Horizontal`.
height? | number | Specifies the height of the time scale in pixels.
showAllDayTitle? | boolean | Specifies whether to display the "All Day" title.
labelComponent | ComponentType&lt;[WeekView.TimeScaleLabelProps](#weekviewtimescalelabelprops)&gt; | A component that renders a time scale label.
allDayTitleComponent? | ComponentType&lt;[AllDay.TitleCellProps](./all-day-panel.md#alldaypaneltitlecellprops)&gt; | A component that renders a cell displaying the "All Day" text.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### WeekView.TimeScaleLabelProps

Describes properties passed to a component that renders a time scale label.

Field | Type | Description
------|------|------------
time? | Date | Specifies the cell's time.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.
groupingInfo? | Array&lt;[Group](./grouping-panel.md/#group)&gt; | Information about the cell's grouping.
endOfGroup? | boolean | `true` if this cell is last in its group.

### WeekView.DayScaleLayoutProps

Describes properties passed to a component that renders a day scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[WeekView.CellData](#weekviewcelldata)&gt;&gt; | Specifies the cells meta data.
cellComponent | ComponentType&lt;[WeekView.DayScaleCellProps](#weekviewdayscalecellprops)&gt; | A component that renders a day scale cell.
rowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | A component that renders a day scale row.
groupingPanelComponent? | ComponentType&lt;[GroupingPanel.HorizontalLayoutProps](./grouping-panel.md/#groupingpanelhorizontallayoutprops)&gt; | A component that renders the grouping panel.
groupedByDate? | boolean | Indicates whether grouping by date is enabled. Takes its value from the `groupByDate` property of the [GroupingState](grouping-state.md) plugin.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### WeekView.DayScaleCellProps

Describes properties passed to a component that renders a day scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell's start time.
endDate? | Date | Specifies the cell's end time.
today? | boolean | Indicates whether the cell's date is today.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.
groupingInfo? | Array&lt;[Group](./grouping-panel.md/#group)&gt; | Information about the cell's grouping.
endOfGroup? | boolean | `true` if this cell is last in its group.

### WeekView.DayScaleEmptyCellProps

Describes properties passed to a component that renders a day scale empty cell.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

### WeekView.TimeTableLayoutProps

Describes properties passed to a component that renders a timetable layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[WeekView.CellData](#weekviewcelldata)&gt;&gt; | Specifies the cells meta data.
allDayCellsData? | Array&lt;Array&lt;[AllDayPanel.CellData](./all-day-panel.md#alldaypanelcelldata)&gt;&gt; | Information about cells on the All Day Panel.
cellComponent | ComponentType&lt;[WeekView.TimeTableCellProps](#weekviewtimetablecellprops)&gt; | A component that renders a timetable cell.
rowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | A component that renders a timetable row.
allDayCellComponent? | ComponentType&lt;[AllDay.CellProps](./all-day-panel.md#alldaypanelcellprops)&gt; | A component that renders a cell on the All Day Panel.
allDayRowComponent? | ComponentType&lt;[AllDay.RowProps](./all-day-panel.md#alldaypanelrowprops)&gt; | A component that renders a row on the All Day Panel.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### WeekView.TimeTableCellProps

Describes properties passed to a component that renders a timetable cell.

Field | Type | Description
------|------|------------
startDate? | Date | Specifies the cell's start time.
endDate? | Date | Specifies the cell's end time.
groupOrientation? | [GroupOrientation](./grouping-state.md#grouporientation) | The orientation of groups: `Vertical` or `Horizontal`.
groupingInfo? | Array&lt;[Group](./grouping-panel.md/#group)&gt; | Information about the cell's grouping.
endOfGroup? | boolean | `true` if this cell is last in its group.
isShaded? | boolean | Indicates whether the cell is shaded.
currentTimeIndicatorPosition? | string | Indicates the distance from the top edge of the containing element (usually, a timetable cell). The distance is measured as a percentage of the element's height.
onDoubleClick? | (e: object) => void | A function that handles a double click on the cell.
currentTimeIndicatorComponent? | ComponentType&lt;[CurrentTimeIndicator.IndicatorProps](#currenttimeindicatorindicatorprops)&gt; | A component that renders the current time indicator.
children? | ReactNode | A React node used to render the timetable cell content.

### WeekView.AppointmentLayerProps

Describes properties passed to a component that renders the appointment layer.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the appointment layer content.

### WeekView.RowProps

Describes properties passed to a component that renders a week view row.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

## Plugin Components

Name | Properties | Description
-----|------------|------------
WeekView.Layout | [WeekView.LayoutProps](#weekviewlayoutprops) | A component that renders a week view layout.
WeekView.TimeScaleLayout | [WeekView.TimeScaleLayoutProps](#weekviewtimescalelayoutprops) | A component that renders a time scale layout.
WeekView.TimeScaleLabel | [WeekView.TimeScaleLabelProps](#weekviewtimescalelabelprops) | A component that renders a time scale label.
WeekView.DayScaleLayout | [WeekView.DayScaleLayoutProps](#weekviewdayscalelayoutprops) | A component that renders a day scale layout.
WeekView.DayScaleCell | [WeekView.DayScaleCellProps](#weekviewdayscalecellprops) | A component that renders a day scale cell.
WeekView.DayScaleRow | [WeekView.RowProps](#weekviewrowprops) | A component that renders a day scale row.
WeekView.DayScaleEmptyCell | [WeekView.DayScaleEmptyCellProps](#weekviewdayscaleemptycellprops) | A component that renders a day scale empty cell.
WeekView.TimeTableLayout | [WeekView.TimeTableLayoutProps](#weekviewtimetablelayoutprops) | A component that renders a timetable layout.
WeekView.TimeTableCell | [WeekView.TimeTableCellProps](#weekviewtimetablecellprops) | A component that renders a timetable cell.
WeekView.TimeTableRow | [WeekView.RowProps](#weekviewrowprops) | A component that renders a timetable row.
WeekView.AppointmentLayer | [WeekView.AppointmentLayerProps](#weekviewappointmentlayerprops) | A component that renders the appointment layer.

Additional properties are added to the component's root element.
