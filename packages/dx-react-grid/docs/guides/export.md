# React Grid - Export

React Grid users can export grid data to an Excel document.

## Related Plugins

- [Toolbar](../reference/toolbar.md) - renders the Toolbar
- [ExportPanel](../reference/export-panel.md) - renders the Export Panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Related Components

- [GridExporter](../reference/grid-exporter.md) - implements data export

## Basic Setup

1. Configure the `GridExporter`

Import the [GridExporter](../reference/grid-exporter.md) and place it after the Grid component. Specify the `ref`, `columns`, and `rows` properties of the `GridExporter`:

```jsx
const exporterRef = useRef();
...
<Grid>
...
</Grid>
<GridExporter
  ref={exporterRef}
  columns={columns}
  rows={rows}
/>
```

2. Configure the `ExportPanel`

Import the [ExportPanel](../reference/export-panel.md) plugin and add it to the Grid.

3. Initiate export

The `GridExporter` provides an `exportGrid` method that initiates export. Use the ref from the first step to call this method. In the following code, we call it in the `startExport` callback of the `ExportPanel` plugin, but it can be called anywhere else in your code.

```jsx
exporterRef.current.exportGrid();
```

4. Save the file

To handle file saving, implement the `onSave` callback of the `GridExporter` component. In this callback, save the file to the user's local storage. This can be done in many different ways. For example, you can use the `file-saver` package:

```jsx
import saveAs from 'file-saver';
...
const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
  });
};
```

The following demo shows export in action:

.embedded-demo({ "path": "grid-export/basic", "showThemeSelector": true })

## Supported Grid Features

### Sorting and Filtering

Pass the sorting and filtering options to the GridExporter. The rows will be exported in the same order as in the corresponding Grid component.

### Summaries

Pass the `totalSummaryItems` and `groupSummaryItems` to the GridExporter.

### Grouping

Pass the `grouping` configuration to the GridExporter.

### Selection

To export only selected rows, pass the `selection` prop to the GridExporter.

Below is an example demonstrating all features described in this section.

.embedded-demo({ "path": "grid-export/supported-grid-features", "showThemeSelector": true })

## Excel Document Customization

### Appearance customization

To adjust a data cell appearance, specify the `customizeCell` function. Use the `customizeSummaryCell` function to adjust a summary cells appearance.

### Header and Footer

The sheet's header and footer can be customized in 
Specify the `customizeHeader` and `customizeFooter` 

.embedded-demo({ "path": "grid-export/advanced-customization", "showThemeSelector": true })
