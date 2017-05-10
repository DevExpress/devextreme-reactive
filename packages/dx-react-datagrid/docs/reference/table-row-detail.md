# TableRowDetail Plugin Reference

A plugin that manages the expanded state for table row details and renders a detail row.

## User Reference

### Dependencies

- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
expandedRows | Array&lt;number&#124;string&gt; | | Specifies expanded rows
defaultExpandedRows | Array&lt;number&#124;string&gt; | | Specifies initially expanded rows for the uncontrolled mode
onExpandedRowsChange | (expandedRows: Array&lt;number&#124;string&gt;) => void | | Handles expanded row changes
template | Component&lt;[DetailRowProps](#detail-row-props)&gt; | | A component that renders details for a row
detailToggleTemplate | Component&lt;[DetailToggleProps](#detail-toggle-props)&gt; | | A component that renders the detail toggle control

## Interfaces

### <a name="detail-row-props"></a>DetailRowProps

Describes properties passed to the template that renders details for a row

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md#table-row) | A row object for showing its details

### <a name="detail-toggle-props"></a>DetailToggleProps

Describes properties passed to the template that renders the detail toggle control

A value with the following shape:

Field | Type | Description
------|------|------------
expanded | boolean | Specifies whether or not row details are displayed
toggleExpanded | () => void | Toggles the expanded state for a row

## Plugin Developer Reference

To be described...
