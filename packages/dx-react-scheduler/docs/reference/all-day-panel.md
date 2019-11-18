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
layoutComponent | ComponentType&lt;[AllDayPanel.LayoutProps](#alldaypanellayoutprops)&gt; | | A component that renders an All Day panel layout.
cellComponent | ComponentType&lt;[AllDayPanel.CellProps](#alldaypanelcellprops)&gt; | | A component that renders an All Day panel cell.
rowComponent | ComponentType&lt;[AllDayPanel.RowProps](#alldaypanelrowprops)&gt; | | A component that renders an All Day panel row.
titleCellComponent | ComponentType&lt;[AllDayPanel.TitleCellProps](#alldaypaneltitlecellprops)&gt; | | A component that renders a title cell.
appointmentLayerComponent | ComponentType&lt;[AllDayPanel.AppointmentLayerProps](#alldaypanelappointmentlayerprops)&gt; | | A component that renders the appointment layer.
containerComponent | ComponentType&lt;[AllDayPanel.ContainerProps](#alldaypanelcontainerprops)&gt; | | A component that renders an All Day panel container.
messages? | [AllDayPanel.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### AllDayPanel.CellData

Describes a cell data configuration object.

Field | Type | Description
------|------|------------
startDate | Date | The cell's start time.
endDate | Date | The cell's end time.

### AllDayPanel.LayoutProps

Describes properties passed to a component that renders an All Day panel layout.

Field | Type | Description
------|------|------------
cellsData | Array&lt;Array&lt;[AllDayPanel.CellData](#alldaypanelcelldata)&gt;&gt; | Cells' meta data.
formatDate | [FormatterFn](./scheduler.md#formatterfn) | A function that formats dates according to the locale.
setCellElementsMeta | (cellElementsMeta: [CellElementsMeta](./scheduler.md#cellelementsmeta)) => void | A function that formats dates according to the locale.
cellComponent | ComponentType&lt;[AllDayPanel.CellProps](#alldaypanelcellprops)&gt; | A component that renders an All Day panel cell.
rowComponent | ComponentType&lt;[AllDayPanel.RowProps](#alldaypanelrowprops)&gt; | A component that renders an All Day panel row.

### AllDayPanel.CellProps

Describes properties passed to a component that renders an All Day panel cell.

Field | Type | Description
------|------|------------
startDate | Date | The cell's start time.
endDate | Date | The cell's end time.

### AllDayPanel.RowProps

Describes properties passed to a component that renders an All Day panel row.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the row content.

### AllDayPanel.TitleCellProps

Describes properties passed to a component that renders a title cell.

Field | Type | Description
------|------|------------
getMessage | ([messageKey](#localization-messages): string) => string | Returns a localization message by the message key.

### AllDayPanel.AppointmentLayerProps

Describes properties passed to a component that renders the appointment layer.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node used to render the appointment layer content.

### AllDayPanel.ContainerProps

Describes properties passed to a component that renders an All Day panel container.

Field | Type | Description
------|------|------------
children | ReactNode | A React node used to render the All Day panel container content.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
allDay? | string | 'All Day' | The All Day panel's title.

## Plugin Components

Name | Properties | Description
-----|------------|------------
AllDayPanel.Layout | [AllDayPanel.LayoutProps](#alldaypanellayoutprops) | A component that renders an All Day panel layout.
AllDayPanel.Cell | [AllDayPanel.CellProps](#alldaypanelcellprops) | A component that renders an All Day panel cell.
AllDayPanel.Row | [AllDayPanel.RowProps](#alldaypanelrowprops) | A component that renders an All Day panel row.
AllDayPanel.TitleCell | [AllDayPanel.TitleCellProps](#alldaypaneltitlecellprops) | A component that renders a title cell.
AllDayPanel.AppointmentLayer | [AllDayPanel.AppointmentLayerProps](#alldaypanelappointmentlayerprops) | A component that renders the appointment layer.
AllDayPanel.Container | [AllDayPanel.ContainerProps](#alldaypanelcontainerprops) | A component that renders an All Day panel container.

Additional properties are added to the component's root element.
