# DayView Plugin Reference

A plugin that renders Scheduler data for a day. This plugin arranges appointments from top to bottom. If their time intervals overlap, their width is decreased and they are placed next to each other.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DayView } from '@devexpress/dx-react-scheduler-material-ui';
```

You can import the themeless plugin if you want to use custom components:

```js
import { DayView } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | `Day` | The view's unique identifier. Required if you use several `DayView` plugins.
displayName? | string |  | The view's name used in UI plugins. The default value is `name`.
intervalCount? | number | 1 | Multiplies the default view interval.
cellDuration? | number | 30 | Specifies the cell's duration in minutes.
startDayHour? | number | 0 | Specifies the start hour of the view time scale. Accepts floating-point numbers from 0 to 24.
endDayHour? | number | 24 | Specifies the end hour of the view time scale. Accepts floating-point numbers from 0 to 24.
layoutComponent | ComponentType&lt;[DayView.LayoutProps](#dayviewlayoutprops)&gt; | | A component that renders a day view layout.
timeScaleLayoutComponent | ComponentType&lt;[DayView.TimeScaleLayoutProps](#dayviewtimescalelayoutprops)&gt; | | A component that renders a time scale layout.
timeScaleRowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | | A component that renders a time scale row.
timeScaleCellComponent | ComponentType&lt;[DayView.TimeScaleCellProps](#dayviewtimescalecellprops)&gt; | | A component that renders a time scale cell.
dayScaleLayoutComponent | ComponentType&lt;[DayView.DayScaleLayoutProps](#dayviewdayscalelayoutprops)&gt; | | A component that renders a day scale layout.
dayScaleCellComponent | ComponentType&lt;[DayView.DayScaleCellProps](#dayviewdayscalecellprops)&gt; | | A component that renders a day scale cell.
dayScaleRowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | | A component that renders a day scale row.
dayScaleEmptyCellComponent | ComponentType&lt;[DayView.DayScaleEmptyCellProps](#dayviewdayscaleemptycellprops)&gt; | | A component that renders a day scale empty cell.
timeTableLayoutComponent | ComponentType&lt;[DayView.TimeTableLayoutProps](#dayviewtimetablelayoutprops)&gt; | | A component that renders a time table layout.
timeTableCellComponent | ComponentType&lt;[DayView.TimeTableCellProps](#dayviewtimetablecellprops)&gt; | | A component that renders a time table cell.
timeTableRowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | | A component that renders a time table row.
appointmentLayerComponent | ComponentType&lt;[DayView.AppointmentLayerProps](#dayviewappointmentlayerprops)&gt; | | A component that renders the appointment layer.

## Interfaces

### DayView.CellData

Describes a cell data configuration object.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell start time.
endDate | Date | Specifies the cell end time.
today | boolean | Indicates whether the cell's date is today.

### DayView.LayoutProps

Describes properties passed to a component that renders a day view layout.

Field | Type | Description
------|------|------------
setScrollingStrategy | (scrollingStrategy: [ScrollingStrategy](./scheduler.md#scrollingstrategy)) => void | A scrollingStrategy callback.
timeScaleComponent | ComponentType&lt;[DayView.TimeScaleLayoutProps](#dayviewtimescalelayoutprops)&gt; | A component that renders a time scale layout.
dayScaleComponent | ComponentType&lt;[DayView.DayScaleLayoutProps](#dayviewdayscalelayoutprops)&gt; | A component that renders a day scale layout.
timeTableComponent | ComponentType&lt;[DayView.TimeTableLayoutProps](#dayviewtimetablelayoutprops)&gt; | A component that renders a time table layout.
dayScaleEmptyCellComponent | ComponentType&lt;[DayView.DayScaleEmptyCellProps](#dayviewdayscaleemptycellprops)&gt; | A component that renders a day scale empty cell.

### DayView.TimeScaleLayoutProps

Describes properties passed to a component that renders a time scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[DayView.CellData](#dayviewcelldata)&gt;&gt; | Specifies the cells meta data.
cellComponent | ComponentType&lt;[DayView.TimeScaleCellProps](#dayviewtimescalecellprops)&gt; | A component that renders a time scale cell.
rowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | A component that renders a time scale row.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the locale.

### DayView.TimeScaleCellProps

Describes properties passed to a component that renders a time scale cell.

Field | Type | Description
------|------|------------
endDate | Date | Specifies the cell end time.
startDate? | Date | Specifies the cell start time.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the locale.

### DayView.DayScaleLayoutProps

Describes properties passed to a component that renders a day scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[DayView.CellData](#dayviewcelldata)&gt;&gt; | Specifies the cells meta data.
cellComponent | ComponentType&lt;[DayView.DayScaleCellProps](#dayviewdayscalecellprops)&gt; | A component that renders a day scale cell.
rowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | A component that renders a day scale row.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### DayView.DayScaleCellProps

Describes properties passed to a component that renders a day scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell end time.
endDate? | Date | Specifies the cell start time.
today? | boolean | Indicates whether the cell's date is today.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### DayView.DayScaleEmptyCellProps

Describes properties passed to a component that renders a day scale empty cell.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

### DayView.TimeTableLayoutProps

Describes properties passed to a component that renders a time table layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[DayView.CellData](#dayviewcelldata)&gt;&gt; | Specifies the cells meta data.
tableRef | (ref: ReactInstance) => void | A function that accepts the table root React element.
cellComponent | ComponentType&lt;[DayView.TimeTableCellProps](#dayviewtimetablecellprops)&gt; | A component that renders a time table cell.
rowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | A component that renders a time table row.
formatDate | [FormatterFn](scheduler.md#formatterfn) | A function that formats dates according to the set locale.

### DayView.TimeTableCellProps

Describes properties passed to a component that renders a time table cell.

Field | Type | Description
------|------|------------
startDate? | Date | Specifies the cell a start time.
endDate? | Date | Specifies the cell end time.
children? | ReactNode | A React node used to render the time table cell content.

### DayView.AppointmentLayerProps

Describes properties passed to a component that renders the appointment layer.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the appointment layer content.

### DayView.RowProps

Describes properties passed to a component that renders a day view row.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

## Plugin Components

Name | Properties | Description
-----|------------|------------
DayView.Layout | [DayView.LayoutProps](#dayviewlayoutprops) | A component that renders a day view layout.
DayView.TimeScaleLayout | [DayView.TimeScaleLayoutProps](#dayviewtimescalelayoutprops) | A component that renders a time scale layout.
DayView.TimeScaleCell | [DayView.TimeScaleCellProps](#dayviewtimescalecellprops) | A component that renders a time scale cell.
DayView.DayScaleLayout | [DayView.DayScaleLayoutProps](#dayviewdayscalelayoutprops) | A component that renders a day scale layout.
DayView.DayScaleCell | [DayView.DayScaleCellProps](#dayviewdayscalecellprops) | A component that renders a day scale cell.
DayView.DayScaleEmptyCell | [DayView.DayScaleEmptyCellProps](#dayviewdayscaleemptycellprops) | A component that renders a day scale empty cell.
DayView.TimeTableLayout | [DayView.TimeTableLayoutProps](#dayviewtimetablelayoutprops) | A component that renders a time table layout.
DayView.TimeTableCell | [DayView.TimeTableCellProps](#dayviewtimetablecellprops) | A component that renders a time table cell.
DayView.Row | [DayView.RowProps](#dayviewrowprops) | A component that renders a day view's generic row.
DayView.AppointmentLayer | [DayView.AppointmentLayerProps](#dayviewappointmentlayerprops) | A component that renders the appointment layer.

Additional properties are added to the component's root element.
