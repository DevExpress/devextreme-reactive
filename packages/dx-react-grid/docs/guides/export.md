# React Grid - Export

The Grid component supports exporting data in Excel format.

## Related Plugins

- [Toolbar](../reference/toolbar.md) - renders the Grid Toolbar
- [ExportPanel](../reference/export-panel.md) - renders the Export Panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Related Components

- [GridExporter](../reference/grid-exporter.md) - performs data export

## Basic Setup

1. Import GridExporter

Import the [GridExporter](../reference/grid-exporter.md) component and place it outside the Grid. Specify the `ref` property and ass the `columns` and `rows` properties to the GridExporter.

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

2. Import ExportPanel

Import the [ExportPanel](../reference/export-panel.md) plugin and add it to your Grid.

3. Initiate export

Call the GridExporter's `exportGrid` method using a ref from the first step. This method can be called in the `ExportPanel`'s `startExport` callback or anywhere else in your code.

```jsx
exporterRef.current.exportGrid();
```

4. File saving

The `GridExporter` component provides the `onSave` callback that allows you to handle file saving. The recommended approach is to use the `file-saver` package as shown below.

```jsx
import saveAs from 'file-saver';
...
const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
  });
};
```

The following example demonstrates a basic export configuration.

.embedded-demo({ "path": "grid-export/basic", "showThemeSelector": true })

## Supported Grid features

### Sorting and Filtering

Pass the sorting and filtering options to the GridExporter. The rows will be exported in the same order as in the corresponding Grid component.

### Summaries

Pass the `totalSummaryItems` and `groupSummaryItems` to the GridExporter.

### Grouping

Pass the `grouping` configuration to the GridExporter.

### Selection

To export only selected rows, pass the `selection` prop to the GridExporter.

### Appearance customization

To adjust a data cell appearance, specify the `customizeCell` function. Use the `customizeSummaryCell` function to adjust a summary cells appearance.

### Header and Footer

The sheet's header and footer can be customized in 
Specify the `customizeHeader` and `customizeFooter` 

Below is an example demonstrating all features described in this section.

.embedded-demo({ "path": "grid-export/advanced-customization", "showThemeSelector": true })
