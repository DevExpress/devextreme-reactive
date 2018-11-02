# DayView Plugin Reference

A plugin that renders Scheduler data for a day. This plugin arranges appointments from top to bottom. If their time intervals overlap, their width is decreased and they are placed next to each other.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DayView } from '@devexpress/dx-react-scheduler-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DayView } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name? | string | `Day` | Specifies the view name. This is required property if you want to add many same plugins.
intervalCount? | number | 1 | Multiplies the default view interval.
cellDuration? | number | 30 | Specifies the cell duration in minutes.
startDayHour? | number | 0 | Specifies the start hour of the view time scale.
endDayHour? | number | 24 | Specifies the end hour of the view time scale.
layoutComponent | ComponentType&lt;[DayView.LayoutProps](#dayviewlayoutprops)&gt; | | A component that renders a day view layout.
timeScaleLayoutComponent | ComponentType&lt;[DayView.TimeScaleLayoutProps](#dayviewtimescalelayoutprops)&gt; | | A component that renders a day view time scale layout.
timeScaleRowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | | A component that renders a day view time scale row.
timeScaleCellComponent | ComponentType&lt;[DayView.TimeScaleCellProps](#dayviewtimescalecellprops)&gt; | | A component that renders a day view time scale cell.
dayScaleLayoutComponent | ComponentType&lt;[DayView.DayScaleLayoutProps](#dayviewdayscalelayoutprops)&gt; | | A component that renders a day view day scale layout.
dayScaleCellComponent | ComponentType&lt;[DayView.DayScaleCellProps](#dayviewdayscalecellprops)&gt; | | A component that renders a day view day scale cell.
dayScaleRowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | | A component that renders a day view day scale row.
dayScaleEmptyCellComponent | ComponentType&lt;[DayView.DayScaleEmptyCellProps](#dayviewdayscaleemptycellprops)&gt; | | A component that renders a day view day scale empty cell.
timeTableLayoutComponent | ComponentType&lt;[DayView.TimeTableLayoutProps](#dayviewtimetablelayoutprops)&gt; | | A component that renders a day view time table layout.
timeTableCellComponent | ComponentType&lt;[DayView.TimeTableCellProps](#dayviewtimetablecellprops)&gt; | | A component that renders a day view time table cell.
timeTableRowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | | A component that renders a day view time table row.
appointmentLayerComponent | ComponentType&lt;[DayView.AppointmentLayerProps](#dayviewappointmentlayerprops)&gt; | | A component that renders a day view appointment layer.

## Interfaces

### DayView.CellData

Defines the cell data configuration object. Used to render view cells.

Field | Type | Description
------|------|------------
startDate | Date | Specifies a start time boundary for a cell.
endDate | Date | Specifies an end time boundary for a cell.


### DayView.LayoutProps

Describes properties passed to a component that renders a day view layout.

Field | Type | Description
------|------|------------
timeScaleComponent | ComponentType&lt;[DayView.TimeScaleLayoutProps](#dayviewtimescalelayoutprops)&gt; | A component that renders a day view time scale layout.
dayScaleComponent | ComponentType&lt;[DayView.DayScaleLayoutProps](#dayviewdayscalelayoutprops)&gt; | A component that renders a day view day scale layout.
timeTableComponent | ComponentType&lt;[DayView.TimeTableLayoutProps](#dayviewtimetablelayoutprops)&gt; | A component that renders a day view time table layout.
dayScaleEmptyCellComponent | ComponentType&lt;[DayView.DayScaleEmptyCellProps](#dayviewdayscaleemptycellprops)&gt; | A component that renders a day view day scale empty cell.

### DayView.TimeScaleLayoutProps

Describes properties passed to a component that renders a day view time scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[DayView.CellData](#dayviewcelldata)&gt;&gt; | Specifies a meta data for view cells.
cellComponent | ComponentType&lt;[DayView.TimeScaleCellProps](#dayviewtimescalecellprops)&gt; | A component that renders a day view time scale cell.
rowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | A component that renders a day view time scale row.

### DayView.TimeScaleCellProps

Describes properties passed to a component that renders a day view time scale cell.

Field | Type | Description
------|------|------------
endDate | Date | Specifies an end time boundary for a cell.
startDate? | Date | Specifies a start time boundary for a cell.

### DayView.DayScaleLayoutProps

Describes properties passed to a component that renders a day view day scale layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[DayView.CellData](#dayviewcelldata)&gt;&gt; | Specifies a meta data for view cells.
cellComponent | ComponentType&lt;[DayView.DayScaleCellProps](#dayviewdayscalecellprops)&gt; | A component that renders a day view day scale cell.
rowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | A component that renders a day view day scale row.

### DayView.DayScaleCellProps

Describes properties passed to a component that renders a day view day scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies a start time boundary for a cell.
endDate? | Date | Specifies an end time boundary for a cell.

### DayView.DayScaleEmptyCellProps

Describes properties passed to a component that renders a day view day scale empty cell.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

### DayView.TimeTableLayoutProps

Describes properties passed to a component that renders a day view time table layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[DayView.CellData](#dayviewcelldata)&gt;&gt; | Specifies a meta data for view cells.
tableRef | (ref: ReactInstance) => void | A function that accepts the table's root React element.
cellComponent | ComponentType&lt;[DayView.TimeTableCellProps](#dayviewtimetablecellprops)&gt; | A component that renders a day view time table cell.
rowComponent | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | A component that renders a day view time table row.

### DayView.TimeTableCellProps

Describes properties passed to a component that renders a day view time scale cell.

Field | Type | Description
------|------|------------
startDate | Date | Specifies a start time boundary for a cell.
endDate | Date | Specifies an end time boundary for a cell.

### DayView.AppointmentLayerProps

Describes properties passed to a component that renders a appointment layer.

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
DayView.Layout | ComponentType&lt;[DayView.LayoutProps](#dayviewlayoutprops)&gt; | A component that renders a day view layout.
DayView.TimeScaleLayout | ComponentType&lt;[DayView.TimeScaleLayoutProps](#dayviewtimescalelayoutprops)&gt; | A component that renders a day view time scale layout.
DayView.TimeScaleCell | ComponentType&lt;[DayView.TimeScaleCellProps](#dayviewtimescalecellprops)&gt; | A component that renders a day view time scale cell.
DayView.DayScaleLayout | ComponentType&lt;[DayView.DayScaleLayoutProps](#dayviewdayscalelayoutprops)&gt; | A component that renders a day view day scale layout.
DayView.DayScaleCell | ComponentType&lt;[DayView.DayScaleCellProps](#dayviewdayscalecellprops)&gt; | A component that renders a day view day scale cell.
DayView.DayScaleEmptyCell | ComponentType&lt;[DayView.DayScaleEmptyCellProps](#dayviewdayscaleemptycellprops)&gt; | A component that renders a day view day scale empty cell.
DayView.TimeTableLayout | ComponentType&lt;[DayView.TimeTableLayoutProps](#dayviewtimetablelayoutprops)&gt; | A component that renders a day view time table layout.
DayView.TimeTableCell | ComponentType&lt;[DayView.TimeTableCellProps](#dayviewtimetablecellprops)&gt; | A component that renders a day view time table cell.
DayView.Row | ComponentType&lt;[DayView.RowProps](#dayviewrowprops)&gt; | A component that renders a day view generic row.
DayView.AppointmentLayer | ComponentType&lt;[DayView.AppointmentLayerProps](#dayviewappointmentlayerprops)&gt; | A component that renders a day view appointment layer.

Additional properties are added to the component's root element.
