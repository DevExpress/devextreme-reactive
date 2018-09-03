# DxTableRowDetail Plugin Reference

A plugin that renders detail rows.

## Import

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
contentComponent? | [DxTableRowDetail.DxContent](#dxtablerowdetaildxcontent) | | A component that renders the detail row's content within the detail cell.
cellComponent | [DxTableRowDetail.DxCell](#dxtablerowdetaildxcell) | | A component that renders a detail cell.
rowComponent | [DxTableRowDetail.DxRow](#dxtablerowdetaildxrow) | | A component that renders a detail row.
toggleCellComponent | [DxTableRowDetail.DxToggleCell](#dxtablerowdetaildxtogglecell) | | A component that renders a cell containing the expand/collapse control.
toggleColumnWidth | number | | Specifies the width of the column containing expand/collapse controls.
rowHeight? | number | | Specifies the detail row height.

## Component Types

### DxTableRowDetail.DxContent

#### Props

Field | Type | Description
------|------|------------
row | any | A row.

### DxTableRowDetail.DxCell

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

### DxTableRowDetail.DxRow

#### Props

Field | Type | Description
------|------|------------
tableRow | [TableRow](#tablerow) | A table row.
row | any | A row.

#### Slots

Field | Description
------|------------
default | The default Vue slot.

### DxTableRowDetail.DxToggleCell

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

## Plugin Components

Name | Type | Description
-----|------|------------
DxTableRowDetail.components.DxContent | [DxTableRowDetail.DxContent](#dxtablerowdetaildxcontent) | A component that renders the detail row's content within the detail cell.
DxTableRowDetail.components.DxCell | [DxTableRowDetail.DxCell](#dxtablerowdetaildxcell) | A component that renders a detail cell.
DxTableRowDetail.components.DxRow | [DxTableRowDetail.DxRow](#dxtablerowdetaildxrow) | A component that renders a detail row.
DxTableRowDetail.components.DxToggleCell | [DxTableRowDetail.DxToggleCell](#dxtablerowdetaildxtogglecell) | A component that renders a cell containing the expand/collapse control.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered.
expandedDetailRowIds | Getter | Array&lt;number &#124; string&gt; | Expanded rows IDs.
toggleDetailRowExpanded | Action | ({ rowId: number &#124; string, state?: boolean }) => void | Expands/collapses the specified row. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined).
tableCell | Template | object? | A template that renders a table cell.
tableRow | Template | object? | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns, including the detail cell.
tableBodyRows | Getter | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered, including detailed rows.
