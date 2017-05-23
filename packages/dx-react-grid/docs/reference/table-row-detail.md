# TableRowDetail Plugin Reference

A plugin that renders a table detail row.

## User Reference

### Dependencies

- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
template | Component&lt;[DetailContentProps](#detail-content-props)&gt; | | A component that renders row details
detailCellTemplate | Component&lt;[DetailCellProps](#detail-cell-props)&gt; | | A component that renders a detail cell
detailToggleTemplate | Component&lt;[DetailToggleProps](#detail-toggle-props)&gt; | | A component that renders the detail toggle control

## Interfaces

### <a name="detail-content-props"></a>DetailContentProps

Describes properties passed to the template that renders row details

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md#table-row) | A row object for showing row details

### <a name="detail-cell-props"></a>DetailCellProps

Describes properties passed to the template that renders a detail cell for a row

A value with the following shape:

Field | Type | Description
------|------|------------
row | [TableRow](table-view.md#table-row) | A row object
template | Component&lt;void&gt; | A component that renders row details

### <a name="detail-toggle-props"></a>DetailToggleProps

Describes properties passed to the template that renders the detail toggle control

A value with the following shape:

Field | Type | Description
------|------|------------
expanded | boolean | Specifies whether or not row details are displayed
toggleExpanded | () => void | Toggles the expanded state for a row

## Plugin Developer Reference

To be described...
