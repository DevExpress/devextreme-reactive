# VirtualTable Plugin Reference

A plugin that renders a scrollable table instead of a static one. It contains the [VirtualTable.Row](#plugin-components) and [VirtualTable.Cell](#plugin-components) components that provide ways to customize virtual table rows and columns and can be extended by other plugins.

## User Reference

### Dependencies

- [DragDropProvider](drag-drop-provider.md) [Optional]
- [DataTypeProvider](data-type-provider.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
height | number | 530 | The virtual table's height.
estimatedRowHeight | number | `37` for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3); `48` for [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) | Estimated row height. Specify the average value for a table whose rows have different heights.
columnExtensions | Array&lg;[TableColumnExtension](table.md#tablecolumnextension)&gt; | Additional column properties that the plugin can handle.
layoutComponent | ElementType&lt;[TableLayoutProps](table.md#tablelayoutprops)&gt; | | A component that renders a table layout.
cellComponent | ElementType&lt;[TableDataCellProps](table.md#tabledatacellprops)&gt; | | A component that renders a table cell.
rowComponent | ElementType&lt;[TableDataRowProps](table.md#tabledatarowprops)&gt; | | A component that renders a table row.
noDataCellComponent | ElementType&lt;[TableNoDataCellProps](table.md#tablenodatacellprops)&gt; | | A component that renders a table cell when the table is empty.
noDataRowComponent | ElementType&lt;[TableRowProps](table.md#tablerowprops)&gt; | | A component that renders a table row when the table is empty.
stubCellComponent | ElementType&lt;[TableCellProps](table.md#tablecellprops)&gt; | | A component that renders a stub table cell if the cell value is not provided.
stubHeaderCellComponent | ElementType&lt;[TableCellProps](table.md#tablecellprops)&gt; | | A component that renders a stub header cell if the cell value is not provided.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
noData? | string | 'No data' | Specifies text that is displayed when the Grid does not contain data.

## Plugin Components

Name | Properties | Description
-----|------------|------------
VirtualTable.Cell | [TableDataCellProps](table.md#tabledatacellprops) | Renders a table data cell.
VirtualTable.Row | [TableDataRowProps](table.md#tabledatarowprops) | Renders a table data row.
VirtualTable.NoDataCell | [TableCellProps](table.md#tablecellprops) | Renders a table cell when the table is empty.
VirtualTable.NoDataRow | [TableRowProps](table.md#tablerowprops) | Renders a table row when the table is empty.
VirtualTable.StubCell | [TableCellProps](table.md#tablecellprops) | Renders a stub table cell.
VirtualTable.StubHeaderCell | [TableCellProps](table.md#tablecellprops) | Renders a stub table header cell.

If you specify additional properties, they are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be rendered by the virtual table view.
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns the virtual table view should render.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get a cell’s value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered.
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Columns to be rendered.
table | Template | Object? | A template that renders the virtual table.
tableCell | Template | [TableCellProps](table.md#tablecellprops) | A template that renders a virtual table cell.
tableRow | Template | [TableRowProps](table.md#tablerowprops) | A template that renders a virtual table row.
