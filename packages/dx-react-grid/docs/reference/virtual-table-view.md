# VirtualTableView Plugin Reference

The plugin extends the [TableView](table-view.md) plugin. It renders a scrollable table instead of a static one.

## User Reference

### Dependencies

Same as the [TableView](table-view.md#dependencies)'s.

### Properties

Name | Type | Default | Description
-----|------|---------|------------
height | number | 530 | The virtual table's height.
estimatedRowHeight | number | `37` for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3); `48` for [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) | An estimated value of the row height. For a table whose rows have a variable height, specify an average value. The more accurately you estimate the row height, the better the virtual table performs.

This plugin also supports the [TableView](table-view.md#properties) plugin's properties.

## Plugin Developer Reference

### Imports

Same as the [TableView](table-view.md#imports)'s.

### Exports

Same as the [TableView](table-view.md#exports)'s.
