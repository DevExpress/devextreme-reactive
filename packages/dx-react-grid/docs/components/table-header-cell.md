# TableHeaderCell Component Reference

A component that represents the default table header cell.

## User Reference

### Properties

Field | Type | Description
------|------|------------
column | [Column](#column) | A column object.
tableColumn | [TableColumn](../reference/table-view.md#table-column) | Table column.
allowSorting | boolean | If true, an end-user can change sorting by a column.
allowResizing | boolean | If true, an end-user can resize a column.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the column's sorting order.
changeSortingDirection | ({ keepOther: boolean, cancel: boolean }) | Changes column sorting direction. Keeps the existing sorting if `keepOther` is set to `true`. Cancels sorting by the current column if `cancel` is set to true.
allowGroupingByClick | boolean | If true, a component that toggles a column's grouping state is rendered.
groupByColumn | () => void | Toggles grouping for a column.
allowDragging | boolean | If true, an end-user can start dragging a column by the header cell.
dragPayload | any | A data object that identifies the corresponding column in the drag-and-drop context.
changeColumnWidth | ({ shift: number }) => void | Changes the column width. A shift is added to the original column width value.
changeDraftColumnWidth | ({ shift: number }) => void | Changes the draft column's width. A shift is added to the original column width value. If a shift is `null`, the draft width for the column is cleared.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in sorting controls within the sorting table header cell.
className? | string | Specifies additional class name for the component. Available in the "@devexpress/dx-react-grid-material-ui" package.
style? | object | Specifies component style.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
sortingHint? | string | 'Sort' | Specifies the 'Sort' hint's text. Available in the "@devexpress/dx-react-grid-material-ui" package.
