# VirtualTableView Plugin Reference

The plugin extends the [TableView](table-view.md) plugin. It renders a scrollable table instead of static one.

## User Reference

### Dependencies

The plugin requires dependencies from the [TableView](table-view.md#dependencies) plugin.

### Properties

Name | Type | Default | Description
-----|------|---------|------------
height | number | 530 | A number used to specify height of virtual table.
estimatedRowHeight | number | `37` for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and `48` for [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) | A number used as a row height before a row is rendered. Providing a precise estimate of the height of rows can improve the performance of the virtual table. If the table contains variable height rows, you should specify a median row height value.

The plugin supports properties from the [TableView](table-view.md#properties) plugin.

## Plugin Developer Reference

### Imports

The plugin requires imports from the [TableView](table-view.md#imports) plugin.

### Exports

The plugin provides exports from the [TableView](table-view.md#exports) plugin.
