# TableRowDetail Plugin Reference

Plugin that manages expanded state for a table row details and renders detail row.

## User Reference

### Dependencies

- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
expandedDetails | Array&lt;number&#124;string&gt; | | Specifies expanded rows
defaultExpandedDetails | Array&lt;number&#124;string&gt; | | Specifies initially expanded rows for the the uncontrolled mode
expandedDetailsChange | (expandedDetails: Array&lt;number&#124;string&gt;) => void | | Handles expanded rows change
template | Component&lt;[DetailRowProps](#detail-row-props)&gt; | | Component that renders details for a row
detailToggleTemplate | Component&lt;[DetailToggleProps](#detail-toggle-props)&gt; | | Component that renders a details toggle control

## Interfaces

### <a name="detail-row-props"></a>DetailRowProps

Describes properties passed to the template that renders details for a row

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md#table-row) | A row object for showing its details

### <a name="detail-toggle-props"></a>DetailToggleProps

Describes properties passed to the template that renders the details toggle control

A value with the following shape:

Field | Type | Description
------|------|------------
expanded | boolean | Specifies whether or not details for a row are displayed
toggleExpanded | () => void | Toggles expanded state for a row

## Plugin Developer Reference

To be described...
