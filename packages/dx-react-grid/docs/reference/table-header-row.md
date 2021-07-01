# TableHeaderRow Plugin Reference

A plugin that renders the table's header row. The [Column](grid.md#column)'s `title` field specifies the column's title in the header row.

The plugin also allows you to manage a column's sorting and grouping state and initiate column dragging.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
// import { TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { TableHeaderRow } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [GroupingState](grouping-state.md) [Optional]
- [DragDropProvider](drag-drop-provider.md) [Optional]
- [Table](table.md)
- [TableColumnResizing](table-column-resizing.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
cellComponent | ComponentType&lt;[TableHeaderRow.CellProps](#tableheaderrowcellprops)&gt; | | A component that renders a header cell.
rowComponent | ComponentType&lt;[Table.RowProps](table.md#tablerowprops)&gt; | | A component that renders a header row.
contentComponent | ComponentType&lt;[TableHeaderRow.ContentProps](#tableheaderrowcontentprops)&gt; | | A component that renders a header cell's content.
sortLabelComponent | ComponentType&lt;[TableHeaderRow.SortLabelProps](#tableheaderrowsortlabelprops)&gt; | | A component that renders a sort label.
titleComponent | ComponentType&lt;object&gt; | | A component that renders a title.
groupButtonComponent | ComponentType&lt;[TableHeaderRow.GroupButtonProps](#tableheaderrowgroupbuttonprops)&gt; | | A component that renders a group button.
showSortingControls? | boolean | false | Specifies whether to render controls that toggle the column's sorting state. Requires the [SortingState](sorting-state.md) dependency.
showGroupingControls? | boolean | false | Specifies whether to display a button that groups data by column. Requires the [GroupingState](grouping-state.md) dependency.
messages? | [TableHeaderRow.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.
isFixed? | boolean | true | Specifies whether a header row should be fixed on table top.

## Interfaces

### TableHeaderRow.CellProps

Describes properties used to render a table header cell.

Extends [Table.CellProps](table.md#tablecellprops)

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object associated with the header cell.
resizingEnabled | boolean | Specifies whether the column's resizing is enabled.
onWidthChange | (parameters: { shift: number }) => void | An event that initiates the column width change. The initial column width increases by the `shift` value or decreases if `shift` is negative.
onWidthDraft | (parameters: { shift: number }) => void | An event that changes the column width used for preview. The initial column width increases by the `shift` value or decreases if `shift` is less than zero.
onWidthDraftCancel | () => void | An event that cancels the column width change used for preview.
draggingEnabled | boolean | Specifies whether drag-and-drop is enabled.
children | ReactNode | The header cell's children.
isFixed? | boolean | Specifies whether a header cell should be fixed on table top.

### TableHeaderRow.SortLabelProps

Describes properties used to render a sort label.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object associated with the sort label.
align | string | The sort label alignment.
direction | 'asc' &#124; 'desc' | The sorting direction.
onSort | (parameters: { direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean }) => void | An event that invokes a sorting direction change. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the current column if `direction` is set to null.
disabled | boolean | Specifies whether the sort label is disabled.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the sort label's text.
children | ReactNode | The sort label's children.

### TableHeaderRow.ContentProps

Describes properties used to render a cell content.

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | A column object associated with the cell content.
align | string | The content alignment.
children | ReactNode | The content's children.

### TableHeaderRow.GroupButtonProps

Describes properties used to render a group button.

Field | Type | Description
------|------|------------
disabled | boolean | Specifies whether the group button is disabled.
onGroup | () => void | An event that invokes grouping by the associated column.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
sortingHint? | string | 'Sort' | Specifies the 'Sort' hint's text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Plugin Components

Name | Properties | Description
-----|------------|------------
TableHeaderRow.Row | [Table.RowProps](table.md#tablerowprops) | A component that renders a header row.
TableHeaderRow.Cell | [TableHeaderRow.CellProps](#tableheaderrowcellprops) | A component that renders a header cell.
TableHeaderRow.Content | [TableHeaderRow.ContentProps](#tableheaderrowcontentprops) | A component that renders a cell content.
TableHeaderRow.SortLabel | [TableHeaderRow.SortLabelProps](#tableheaderrowsortlabelprops) | A component that renders a sort label.
TableHeaderRow.Title | object | A component that renders a title.
TableHeaderRow.GroupButton | [TableHeaderRow.GroupButtonProps](#tableheaderrowgroupbuttonprops) | A component that renders a group button.

Additional properties are added to the component's root element.

## Static Fields

Field | Type | Description
------|------|------------
ROW_TYPE | symbol | The header row type's identifier.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Header rows to be rendered.
tableColumns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableColumn](table.md#tablecolumn)&gt; | Table columns.
sorting | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Columns' sorting state.
changeColumnSorting | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex?: number }) => void | Changes the column sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column. If `sortIndex` is omitted, the sorting is added to the end of the sorting list.
changeColumnGrouping | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, groupIndex?: number }) => void | Groups data by a specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the end of the group list.
tableColumnResizingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Specifies whether table column resizing is enabled.
changeTableColumnWidth | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, shift: number }) => void | Changes the column width. The initial column width increases by the `shift` value or decreases if `shift` is negative.
draftTableColumnWidth | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, shift: number }) => void | Changes the column width used for preview. The initial column width increases by the `shift` value or decreases if `shift` is less than zero.
cancelTableColumnWidthDraft | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Cancels changes to the column width used for preview.
draggingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Specifies whether drag-and-drop is enabled.
isColumnSortingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function that returns a Boolean value that defines if sorting by a column is enabled.
isColumnGroupingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function that returns a Boolean value that defines if grouping by a column is enabled.
tableCell | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.CellProps](table.md#tablecellprops) | A template that renders a table cell.
tableRow | [Template](../../../dx-react-core/docs/reference/template.md) | [Table.RowProps](table.md#tablerowprops) | A template that renders a table row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableHeaderRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[TableRow](table.md#tablerow)&gt; | Table header rows.
tableHeaderCellBefore | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template used to prepend additional components to the header table cell.
