# React Grid - Export

React Grid users can export grid data to an Excel document.

## Related Plugins

- [Toolbar](../reference/toolbar.md) - renders the Toolbar
- [ExportPanel](../reference/export-panel.md) - renders the Export Panel

Note that the [plugin order](./plugin-overview.md#plugin-order) is important.

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
   const startExport = (options) => {
     exporterRef.current.exportGrid(options);
   };
   ...
   <ExportPanel startExport={startExport} />
   ```

4. Save the file

   To save the file to the user's local storage at runtime, implement the `onSave` callback for the `GridExporter` component. In the following code, the file is saved via the `file-saver` package, but you can use any other similar package.

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

To apply the Grid's data shaping settings to an exported Excel document, pass the settings to the following `GridExporter` properties:

- `sorting`
- `filtering`
- `grouping`
- `selection`
- `totalSummaryItems` and `groupSummaryItems`

.embedded-demo({ "path": "grid-export/supported-grid-features", "showThemeSelector": true })

## Excel Document Customization

### Cell Customization

Use the `customizeCell` and `customizeSummaryCell` functions to change the appearance of data cells or summary cells, respectively.

### Header and Footer Customization

Use the `customizeHeader` and `customizeFooter` functions to add a header and a footer.

.embedded-demo({ "path": "grid-export/advanced-customization", "showThemeSelector": true })
