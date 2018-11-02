# MonthView Plugin Reference

A plugin that renders Scheduler data for a month. This plugin arranges appointments from left to right. An appointment's size depends on its duration in days. However, it occupies the entire day cell if an appointment lasts only for several hours or minutes. The time scale and all-day panel are not available in this view.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { MonthView } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { MonthView } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | `Month` | Specifies the view name. This is required property if you want to add many same plugins.
firstDayOfWeek? | number | 0 | Specifies first day of week.
intervalCount? | number | 1 | Multiplies the default view interval.
layoutComponent | ComponentType&lt;[MonthView.LayoutProps](#monthviewlayoutprops)&gt; | | A component that renders a month view layout.
dayScaleLayoutComponent | ComponentType&lt;[MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops)&gt; | | A component that renders a month view day scale layout.
dayScaleCellComponent | ComponentType&lt;[MonthView.DayScaleCellProps](#monthviewdayscalecellprops)&gt; | | A component that renders a month view day scale cell.
dayScaleRowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | | A component that renders a month view day scale row.
timeTableLayoutComponent | ComponentType&lt;[MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops)&gt; | | A component that renders a month view time table layout.
timeTableCellComponent | ComponentType&lt;[MonthView.TimeTableCellProps](#monthviewtimetablecellprops)&gt; | | A component that renders a month view time table cell.
timeTableRowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | | A component that renders a month view time table row.
appointmentLayerComponent | ComponentType&lt;[MonthView.AppointmentLayerProps](#monthviewappointmentlayerprops)&gt; | | A component that renders a month view appointment layer.

## Interfaces

### MonthView.CellData

Defines the cell data configuration object. Used to render view cells.

Field | Type | Description
------|------|------------
startDate | Date | Specifies a start time boundary for a cell.
endDate | Date | Specifies an end time boundary for a cell.


### MonthView.LayoutProps

Describes properties passed to a component that renders a month view layout.

Field | Type | Description
------|------|------------
timeScaleComponent | ComponentType&lt;[MonthView.TimeScaleLayoutProps](#monthviewtimescalelayoutprops)&gt; | A component that renders a month view time scale layout.
dayScaleComponent | ComponentType&lt;[MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops)&gt; | A component that renders a month view day scale layout.
timeTableComponent | ComponentType&lt;[MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops)&gt; | A component that renders a month view time table layout.

### MonthView.DayScaleLayoutProps

Describes properties passed to a component that renders a month view day scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[MonthView.CellData](#monthviewcelldata)&gt;&gt; | Specifies a meta data for view cells.
cellComponent | ComponentType&lt;[MonthView.DayScaleCellProps](#monthviewdayscalecellprops)&gt; | A component that renders a month view day scale cell.
rowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | A component that renders a month view day scale row.

### MonthView.DayScaleCellProps

Describes properties passed to a component that renders a month view day scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies a start time boundary for a cell.
endDate? | Date | Specifies an end time boundary for a cell.

### MonthView.TimeTableLayoutProps

Describes properties passed to a component that renders a month view time table layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[MonthView.CellData](#monthviewcelldata)&gt;&gt; | Specifies a meta data for view cells.
tableRef | (ref: ReactInstance) => void | A function that accepts the table's root React element.
cellComponent | ComponentType&lt;[MonthView.TimeTableCellProps](#monthviewtimetablecellprops)&gt; | A component that renders a month view time table cell.
rowComponent | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | A component that renders a month view time table row.

### MonthView.TimeTableCellProps

Describes properties passed to a component that renders a month view time scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies a start time boundary for a cell.
endDate | Date | Specifies an end time boundary for a cell.

### MonthView.AppointmentLayerProps

Describes properties passed to a component that renders a appointment layer.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the appointment layer content.

### MonthView.RowProps

Describes properties passed to a component that renders a month view row.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

## Plugin Components

Name | Properties | Description
-----|------------|------------
MonthView.Layout | ComponentType&lt;[MonthView.LayoutProps](#monthviewlayoutprops)&gt; | A component that renders a month view layout.
MonthView.DayScaleLayout | ComponentType&lt;[MonthView.DayScaleLayoutProps](#monthviewdayscalelayoutprops)&gt; | A component that renders a month view day scale layout.
MonthView.DayScaleCell | ComponentType&lt;[MonthView.DayScaleCellProps](#monthviewdayscalecellprops)&gt; | A component that renders a month view day scale cell.
MonthView.TimeTableLayout | ComponentType&lt;[MonthView.TimeTableLayoutProps](#monthviewtimetablelayoutprops)&gt; | A component that renders a month view time table layout.
MonthView.TimeTableCell | ComponentType&lt;[MonthView.TimeTableCellProps](#monthviewtimetablecellprops)&gt; | A component that renders a month view time table cell.
MonthView.Row | ComponentType&lt;[MonthView.RowProps](#monthviewrowprops)&gt; | A component that renders a month view generic row.
MonthView.AppointmentLayer | ComponentType&lt;[MonthView.AppointmentLayerProps](#monthviewappointmentlayerprops)&gt; | A component that renders a month view appointment layer.

Additional properties are added to the component's root element.
