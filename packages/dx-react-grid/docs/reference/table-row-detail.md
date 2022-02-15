# TableRowDetail Plugin Reference

A plugin that renders detail rows.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableRowDetail } from '@devexpress/dx-react-grid-material-ui';
// import { TableRowDetail } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableRowDetail } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableRowDetail } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [RowDetailState](row-detail-state.md)
- [Table](table.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
contentComponent? | ComponentType&lt;[TableRowDetail.ContentProps](#tablerowdetailcontentprops)&gt; | | A component that renders the detail row's content within the detail cell.
cellComponent | ComponentType&lt;[TableRowDetail.CellProps](#tablerowdetailcellprops)&gt; | | A component that renders a detail cell.
rowComponent | ComponentType&lt;[TableRowDetail.RowProps](#tablerowdetailrowprops)&gt; | | A component that renders a detail row.
toggleCellComponent | ComponentType&lt;[TableRowDetail.ToggleCellProps](#tablerowdetailtogglecellprops)&gt; | | A component that renders a cell containing the expand/collapse control.
toggleColumnWidth | number | | Specifies the width of the column containing expand/collapse controls.
rowHeight? | number | | Specifies the detail row height.

## Interfaces

### TableRowDetail.ContentProps

Describes properties passed to a component that renders a detail row's content.

Field | Type | Description
------|------|------------
row | any | A row.

### TableRowDetail.CellProps

Describes properties passed to a component that renders a detail cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | any | A row.
children? | ReactNode | A detail cell's child React node.

### TableRowDetail.RowProps

Describes properties passed to a component that renders a detail row.

Extends [Table.RowProps](table.md#tablerowprops)

Field | Type | Description
------|------|------------
row | any | A row.

### TableRowDetail.ToggleCellProps

Describes properties passed to a component that renders a cell containing the expand/collapse control.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
row | any | A row.
expanded | boolean | Specifies whether to expand the detail row.
onToggle | () => void | An event that initiates row expanding or collapsing.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableRowDetail.Cell | [TableRowDetail.CellProps](#tablerowdetailcellprops) | A component that renders a detail cell.
TableRowDetail.Row | [TableRowDetail.RowProps](#tablerowdetailrowprops) | A component that renders a detail row.
TableRowDetail.ToggleCell | [TableRowDetail.ToggleCellProps](#tablerowdetailtogglecellprops) | A component that renders a cell containing the expand/collapse control.

Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
COLUMN&lowbar;TYPE | symbol | The detail column type's identifier.
ROW&lowbar;TYPE | symbol | The detail row type's indentifier.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered.
expandedDetailRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Expanded rows IDs.
toggleDetailRowExpanded | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId: number &#124; string, state?: boolean }) => void | Expands/collapses the specified row. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined).
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns, including the detail cell.
tableBodyRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Body rows to be rendered, including detailed rows.
