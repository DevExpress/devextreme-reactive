# DxTableRowDetail Plugin Reference

A plugin that renders detail rows.

## Importing

Use the following statement to import a plugin with embedded theme components:

```js
import { DxTableRowDetail } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxTableRowDetail } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxRowDetailState](row-detail-state.md)
- [DxTable](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
contentComponent? | object | [DxTableRowDetail.components.DxContent](#dxtablerowdetailcomponentsdxcontent) | A component that renders the detail row's content within the detail cell.
cellComponent | object | [DxTableRowDetail.components.DxCell](#dxtablerowdetailcomponentsdxcell) | A component that renders a detail cell.
rowComponent | object | [DxTableRowDetail.components.DxRow](#dxtablerowdetailcomponentsdxrow) | A component that renders a detail row.
toggleCellComponent | object | [DxTableRowDetail.components.DxToggleCell](#dxtablerowdetailcomponentsdxtogglecell) | A component that renders a cell containing the expand/collapse control.
toggleColumnWidth | number | | Specifies the width of the column containing expand/collapse controls.
rowHeight? | number | | Specifies the detail row height.

## Plugin Components

### DxTableRowDetail.components.DxContent

A component that renders the detail row's content within the detail cell.

#### Props

Field | Type | Description
------|------|------------
row | any | A row.

### DxTableRowDetail.components.DxCell

A component that renders a detail cell.

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
row | any | A row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTableRowDetail.components.DxRow

A component that renders a detail row.

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
row | any | A row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTableRowDetail.components.DxToggleCell

A component that renders a cell containing the expand/collapse control.

#### Slots

Field | Type | Description
------|------|------------
tableRow | [TableRow](table.md#tablerow) | Specifies a table row.
tableColumn | [TableColumn](table.md#tablecolumn) | Specifies a table column.
colSpan? | number | The count of columns that the root cell element spans.
rowSpan? | number | The count of rows that the root cell element spans.
row | any | A row.
expanded | boolean | Specifies whether to expand the detail row.

#### Events

Field | Type | Description
------|------|------------
toggle | () => void | An event that initiates row expanding or collapsing.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered.
expandedDetailRowIds | Getter | Array&lt;number &#124; string&gt; | Expanded rows IDs.
toggleDetailRowExpanded | Action | ({ rowId }) => void | Expands/collapses the specified row.
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object? | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns, including the detail cell.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered, including detailed rows.
