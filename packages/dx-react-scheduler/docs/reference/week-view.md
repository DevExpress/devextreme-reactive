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
excludedDays? | Array&lt;number&gt; | [] | Specifies the days of week that should not be displayed in the view. Accepts an array of zero-bazed day indexes (0 - Sunday).
intervalCount? | number | 1 | Multiplies the default view interval.
cellDuration? | number | 30 | Specifies the cell's duration in minutes.
startDayHour? | number | 0 | Specifies the start hour of the view time scale. Accepts floating-point numbers from 0 to 24.
endDayHour? | number | 24 | Specifies the end hour of the view time scale. Accepts floating-point numbers from 0 to 24.
layoutComponent | ComponentType&lt;[WeekView.LayoutProps](#weekviewlayoutprops)&gt; | | A component that renders a week view layout.
timeScaleLayoutComponent | ComponentType&lt;[WeekView.TimeScaleLayoutProps](#weekviewtimescalelayoutprops)&gt; | | A component that renders a time scale layout.
timeScaleRowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | | A component that renders a time scale row.
timeScaleCellComponent | ComponentType&lt;[WeekView.TimeScaleCellProps](#weekviewtimescalecellprops)&gt; | | A component that renders a time scale cell.
dayScaleLayoutComponent | ComponentType&lt;[WeekView.DayScaleLayoutProps](#weekviewdayscalelayoutprops)&gt; | | A component that renders a day scale layout.
dayScaleCellComponent | ComponentType&lt;[WeekView.DayScaleCellProps](#weekviewdayscalecellprops)&gt; | | A component that renders a day scale cell.
dayScaleRowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | | A component that renders a day scale row.
dayScaleEmptyCellComponent | ComponentType&lt;[WeekView.DayScaleEmptyCellProps](#weekviewdayscaleemptycellprops)&gt; | | A component that renders a day scale empty cell.
timeTableLayoutComponent | ComponentType&lt;[WeekView.TimeTableLayoutProps](#weekviewtimetablelayoutprops)&gt; | | A component that renders a time table layout.
timeTableCellComponent | ComponentType&lt;[WeekView.TimeTableCellProps](#weekviewtimetablecellprops)&gt; | | A component that renders a time table cell.
timeTableRowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | | A component that renders a time table row.
appointmentLayerComponent | ComponentType&lt;[WeekView.AppointmentLayerProps](#weekviewappointmentlayerprops)&gt; | | A component that renders an appointment layer.

## Interfaces

### WeekView.CellData

Describes a cell data configuration object.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell start time.
endDate | Date | Specifies the cell end time.
today | boolean | Indicates whether the cell's date is today.

### WeekView.LayoutProps

Describes properties passed to a component that renders a week view layout.

Field | Type | Description
------|------|------------
setScrollingStrategy | (scrollingStrategy: [ScrollingStrategy](./scheduler.md#scrollingstrategy)) => void | A scrollingStrategy callback.
timeScaleComponent | ComponentType&lt;[WeekView.TimeScaleLayoutProps](#weekviewtimescalelayoutprops)&gt; | A component that renders a time scale layout.
dayScaleComponent | ComponentType&lt;[WeekView.DayScaleLayoutProps](#weekviewdayscalelayoutprops)&gt; | A component that renders a day scale layout.
timeTableComponent | ComponentType&lt;[WeekView.TimeTableLayoutProps](#weekviewtimetablelayoutprops)&gt; | A component that renders a time table layout.
dayScaleEmptyCellComponent | ComponentType&lt;[WeekView.DayScaleEmptyCellProps](#weekviewdayscaleemptycellprops)&gt; | A component that renders a day scale empty cell.

### WeekView.TimeScaleLayoutProps

Describes properties passed to a component that renders a time scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[WeekView.CellData](#weekviewcelldata)&gt;&gt; | Specifies the cells meta data.
cellComponent | ComponentType&lt;[WeekView.TimeScaleCellProps](#weekviewtimescalecellprops)&gt; | A component that renders a time scale cell.
rowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | A component that renders a time scale row.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### WeekView.TimeScaleCellProps

Describes properties passed to a component that renders a time scale cell.

Field | Type | Description
------|------|------------
endDate | Date | Specifies the cell end time.
startDate? | Date | Specifies the cell start time.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### WeekView.DayScaleLayoutProps

Describes properties passed to a component that renders a day scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[WeekView.CellData](#weekviewcelldata)&gt;&gt; | Specifies the cells meta data.
cellComponent | ComponentType&lt;[WeekView.DayScaleCellProps](#weekviewdayscalecellprops)&gt; | A component that renders a day scale cell.
rowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | A component that renders a day scale row.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### WeekView.DayScaleCellProps

Describes properties passed to a component that renders a day scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell start time.
endDate? | Date | Specifies the cell end time.
today? | boolean | Indicates whether the cell's date is today.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### WeekView.DayScaleEmptyCellProps

Describes properties passed to a component that renders a day scale empty cell.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

### WeekView.TimeTableLayoutProps

Describes properties passed to a component that renders a time table layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[WeekView.CellData](#weekviewcelldata)&gt;&gt; | Specifies the cells meta data.
tableRef | (ref: ReactInstance) => void | A function that accepts the table root React element.
cellComponent | ComponentType&lt;[WeekView.TimeTableCellProps](#weekviewtimetablecellprops)&gt; | A component that renders a time table cell.
rowComponent | ComponentType&lt;[WeekView.RowProps](#weekviewrowprops)&gt; | A component that renders a time table row.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### WeekView.TimeTableCellProps

Describes properties passed to a component that renders a time table cell.

Field | Type | Description
------|------|------------
startDate? | Date | Specifies the cell a start time.
endDate? | Date | Specifies the cell end time.
children? | ReactNode | A React node used to render the time table cell content.

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
WeekView.TimeScaleCell | [WeekView.TimeScaleCellProps](#weekviewtimescalecellprops) | A component that renders a time scale cell.
WeekView.DayScaleLayout | [WeekView.DayScaleLayoutProps](#weekviewdayscalelayoutprops) | A component that renders a day scale layout.
WeekView.DayScaleCell | [WeekView.DayScaleCellProps](#weekviewdayscalecellprops) | A component that renders a day scale cell.
WeekView.DayScaleEmptyCell | [WeekView.DayScaleEmptyCellProps](#weekviewdayscaleemptycellprops) | A component that renders a day scale empty cell.
WeekView.TimeTableLayout | [WeekView.TimeTableLayoutProps](#weekviewtimetablelayoutprops) | A component that renders a time table layout.
WeekView.TimeTableCell | [WeekView.TimeTableCellProps](#weekviewtimetablecellprops) | A component that renders a time table cell.
WeekView.Row | [WeekView.RowProps](#weekviewrowprops) | A component that renders a week view's generic row.
WeekView.AppointmentLayer | [WeekView.AppointmentLayerProps](#weekviewappointmentlayerprops) | A component that renders the appointment layer.

Additional properties are added to the component's root element.
