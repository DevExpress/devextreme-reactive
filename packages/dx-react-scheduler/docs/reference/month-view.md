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
name? | string | `Month` | The view name. Required if you use several `MonthView` plugins.
firstDayOfWeek? | number | 0 | Specifies first day of week.
intervalCount? | number | 1 | Multiplies the default view interval.
layoutComponent | ComponentType&lt;[MonthView.LayoutProps](#monthviewlayoutprops)&gt; | | A component that renders a month view layout.
dayScaleLayoutComponent | ComponentType&lt;[MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops)&gt; | | A component that renders a day scale layout.
dayScaleCellComponent | ComponentType&lt;[MonthView.DayScaleCellProps](#monthviewdayscalecellprops)&gt; | | A component that renders a day scale cell.
dayScaleRowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | | A component that renders a day scale row.
timeTableLayoutComponent | ComponentType&lt;[MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops)&gt; | | A component that renders a time table layout.
timeTableCellComponent | ComponentType&lt;[MonthView.TimeTableCellProps](#monthviewtimetablecellprops)&gt; | | A component that renders a time table cell.
timeTableRowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | | A component that renders a time table row.
appointmentLayerComponent | ComponentType&lt;[MonthView.AppointmentLayerProps](#monthviewappointmentlayerprops)&gt; | | A component that renders the appointment layer.

## Interfaces

### MonthView.CellData

Describes a cell data configuration object.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell start time.
endDate | Date | Specifies the cell end time.
otherMonth | boolean | Indicates whether the cell's date is not in the current month.
today | boolean | Indicates whether the cell's date is today.

### MonthView.LayoutProps

Describes properties passed to a component that renders a month view layout.

Field | Type | Description
------|------|------------
dayScaleComponent | ComponentType&lt;[MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops)&gt; | A component that renders a day scale layout.
timeTableComponent | ComponentType&lt;[MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops)&gt; | A component that renders a time table layout.

### MonthView.DayScaleLayoutProps

Describes properties passed to a component that renders a day scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[MonthView.CellData](#monthviewcelldata)&gt;&gt; | Specifies the cells meta data.
cellComponent | ComponentType&lt;[MonthView.DayScaleCellProps](#monthviewdayscalecellprops)&gt; | A component that renders a day scale cell.
rowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | A component that renders a day scale row.
formatDate | (date: Date, options: any) => string | A function that format a date by locale.

### MonthView.DayScaleCellProps

Describes properties passed to a component that renders a day scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell start time.
endDate? | Date | Specifies the cell end time.
formatDate? | (date: Date, options: any) => string | A function that format a date by locale.

### MonthView.TimeTableLayoutProps

Describes properties passed to a component that renders a time table layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[MonthView.CellData](#monthviewcelldata)&gt;&gt; | Specifies the cells meta data.
tableRef | (ref: ReactInstance) => void | A function that accepts the table's root React element.
cellComponent | ComponentType&lt;[MonthView.TimeTableCellProps](#monthviewtimetablecellprops)&gt; | A component that renders a time table cell.
rowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | A component that renders a time table row.
formatDate | (date: Date, options: any) => string | A function that format a date by locale.

### MonthView.TimeTableCellProps

Describes properties passed to a component that renders a time scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell start time.
endDate? | Date | Specifies the cell end time.
otherMonth? | boolean | Indicates whether the cell's date is not in the current month.
today? | boolean | Indicates whether the cell's date is today.
formatDate? | (date: Date, options: any) => string | A function that format a date by locale.

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
MonthView.Layout | ComponentType&lt;[MonthView.LayoutProps](#monthviewlayoutprops)&gt; | A component that renders a month view layout.
MonthView.DayScaleLayout | ComponentType&lt;[MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops)&gt; | A component that renders a day scale layout.
MonthView.DayScaleCell | ComponentType&lt;[MonthView.DayScaleCellProps](#monthviewdayscalecellprops)&gt; | A component that renders a day scale cell.
MonthView.TimeTableLayout | ComponentType&lt;[MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops)&gt; | A component that renders a time table layout.
MonthView.TimeTableCell | ComponentType&lt;[MonthView.TimeTableCellProps](#monthviewtimetablecellprops)&gt; | A component that renders a time table cell.
MonthView.Row | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | A component that renders a generic row.
MonthView.AppointmentLayer | ComponentType&lt;[MonthView.AppointmentLayerProps](#monthviewappointmentlayerprops)&gt; | A component that renders the appointment layer.

Additional properties are added to the component's root element.
