# VirtualTable Plugin Reference

The plugin extends the [Table](table.md) plugin. It renders a scrollable table instead of a static one.

## User Reference

### Dependencies

Same as the [Table](table.md#dependencies)'s.

### Properties

Name | Type | Default | Description
-----|------|---------|------------
height | number | 530 | The virtual table's height.
estimatedRowHeight | number | `37` for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3); `48` for [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) | An estimated value of the row height. For a table whose rows have a variable height, specify an average value. The more accurately you estimate the row height, the better the virtual table performs.

This plugin also supports the [Table](table.md#properties) plugin's properties.

## Plugin Components

Name | Properties | Description
-----|------------|------------
VirtualTable.Cell | [TableDataCellProps](table.md#tabledatacellprops) | A component that renders a table data cell.
VirtualTable.Row | [TableDataRowProps](table.md#tabledatarowprops) | A component that renders a table data row.
VirtualTable.NoDataCell | [TableCellProps](table.md#tablecellprops) | A component that renders a table cell when the table is empty.
VirtualTable.NoDataRow | [TableRowProps](table.md#tablerowprops) | A component that renders a table row when the table is empty.
VirtualTable.StubCell | [TableCellProps](table.md#tablecellprops) | A component that renders a stub table cell.
VirtualTable.StubHeaderCell | [TableCellProps](table.md#tablecellprops) | A component that renders a stub table header cell.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Same as the [Table](table.md#imports)'s.

### Exports

Same as the [Table](table.md#exports)'s.
