# AllDayPanel Plugin Reference

A plugin that renders the All Day Panel.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { AllDayPanel } from '@devexpress/dx-react-grid-material-ui';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { AllDayPanel } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [DayView](day-view.md) [Optional]
- [WeekView](week-view.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
layoutComponent | ComponentType&lt;[AllDayPanel.LayoutProps](#alldaypanellayoutprops)&gt; | | A component that renders the All Day Panel layout component.
cellComponent | ComponentType&lt;[AllDayPanel.CellProps](#alldaypanelcellprops)&gt; | | A component that renders the All Day Panel cell component.
rowComponent | ComponentType&lt;[AllDayPanel.RowProps](#alldaypanelrowprops)&gt; | | A component that renders the All Day Panel row component.
titleCellComponent | ComponentType&lt;[AllDayPanel.TitleCellProps](#alldaypaneltitlecellprops)&gt; | | A component that renders the All Day Panel title cell component.
appointmentLayerComponent | ComponentType&lt;[AllDayPanel.AppointmentLayerProps](#alldaypanelappointmentlayerprops)&gt; | | A component that renders the All Day Panel appointment layer component.
messages? | [AllDayPanel.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### AllDayPanel.CellData

Describes a cell data configuration object.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell start time.
endDate | Date | Specifies the cell end time.

### AllDayPanel.LayoutProps

Describes properties passed to a component that renders the All Day Panel layout element.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[AllDayPanel.CellData](#alldaypanelcelldata)&gt;&gt; | Specifies the cells meta data.
allDayPanelRef | (ref: ReactInstance) => void | A function that accepts the All Dat Panel root React element.
cellComponent | ComponentType&lt;[AllDayPanel.CellProps](#alldaypanelcellprops)&gt; | A component that renders the All Day Panel cell component.
rowComponent | ComponentType&lt;[AllDayPanel.RowProps](#alldaypanelrowprops)&gt; | A component that renders the All Day Panel row component.

### AllDayPanel.CellProps

Describes properties passed to a component that renders the All Day Panel cell element.

Field | Type | Description
------|------|------------
startDate | Date | Specifies the cell a start time.
endDate | Date | Specifies the cell end time.

### AllDayPanel.RowProps

Describes properties passed to a component that renders the All Day Panel row element.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

### AllDayPanel.TitleCellProps

Describes properties passed to a component that renders the All Day Panel title cell element.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns a specified localization message.

### AllDayPanel.AppointmentLayerProps

Describes properties passed to a component that renders the All Day Panel appointment layer element.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
allDay? | string | 'All Day' | The title cell component text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AllDayPanel.Layout | ComponentType&lt;[AllDayPanel.LayoutProps](#alldaypanellayoutprops)&gt; | A component that renders the All Day Panel layout component.
AllDayPanel.Cell | ComponentType&lt;[AllDayPanel.CellProps](#alldaypanelcellprops)&gt; | A component that renders the All Day Panel cell component.
AllDayPanel.Row | ComponentType&lt;[AllDayPanel.RowProps](#alldaypanelrowprops)&gt; | A component that renders the All Day Panel row component.
AllDayPanel.TitleCell | ComponentType&lt;[AllDayPanel.TitleCellProps](#alldaypaneltitlecellprops)&gt; | A component that renders the All Day Panel title cell component.
AllDayPanel.AppointmentLayer | ComponentType&lt;[AllDayPanel.AppointmentLayerProps](#alldaypanelappointmentlayerprops)&gt; | A component that renders the All Day Panel appointment layer component.

Additional properties are added to the component's root element.
