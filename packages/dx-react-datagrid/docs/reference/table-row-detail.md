# TableRowDetail Plugin Reference

Plugin that manages expanded state for table row details and renders detail row.

## User Reference

### Dependencies

- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
expandedDetails | Array&lt;number&#124;string&gt; | | Specifies expanded rows
defaultExpandedDetails | Array&lt;number&#124;string&gt; | | Specifies starting expanded rows for uncontrolled scenario
expandedDetailsChange | (expandedDetails: Array&lt;number&#124;string&gt;) => void | | Handles expanding change
template | Component&lt;[DetailRowProps](#detail-row-props)&gt; | | Component that renders detail for row
detailToggleTemplate | Component&lt;[DetailToggleProps](#detail-toggle-props)&gt; | | Component that renders detail for row

## Data Structures

### <a name="detail-row-props"></a>DetailRowProps

Describes properties passed to template that renders cell with selection control.

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md) | Row used to display detail

### <a name="detail-toggle-props"></a>DetailToggleProps

Describes properties passed to template that renders cell with selection control.

Field | Type | Description
------|------|------------
expanded | boolean | Specifies whether or not detail for row is displayed
toggleExpanded | () => void | Toggles expanded state for row

## Plugin Developer Reference

To be described...
