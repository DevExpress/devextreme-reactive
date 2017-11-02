# GroupingPanel Plugin Reference

A plugin that renders the Grouping Panel in the Grid's header. This panel displays grouped columns and allows a user to modify grouping options.

Optionally, the plugin allows an end-user to change grouped columns' sorting order and render sorting indicators.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [DragDropContext](drag-drop-context.md) [Optional]
- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
allowSorting | boolean | false | Specifies whether an end-user can sort data by a column. Requires the [SortingState](sorting-state.md) dependency.
allowDragging | boolean | false | Specifies whether an end-user can change the grouping state by dragging columns between the group panel and the table header. Requires the [DragDropContext](drag-drop-context.md) dependency.
allowUngroupingByClick | boolean | false | Specifies whether column headers display a button that cancels grouping by that column.
groupPanelTemplate | (args: [GroupPanelProps](#group-panel-props)) => ReactElement | | Renders a group panel.
groupPanelItemTemplate? | (args: [GroupPanelItemProps](#group-panel-item-props)) => ReactElement | | Renders a group panel item. Available for the [Bootstrap 3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) template suites only.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### <a name="column"></a>Column (Extension)

A value with the [Column](grid.md#column) shape extended by the following fields:

Field | Type | Description
------|------|------------
title? | string | Specifies a table column title.

### <a name="grouping-panel-item"></a>GroupingPanelItem

Describes grouping panel item properties.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](#column) | Specifies the column associated with the item.
draft | boolean | Specifies whether the item should be rendered for the preview.

### <a name="group-panel-props"></a>GroupPanelProps

Describes properties passed to the group panel template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
allowSorting | boolean | Specifies whether an end-user can sort data by columns in the grouping panel.
allowDragging | boolean | Specifies whether an end-user can change the grouping state by dragging columns between the group panel and the table header.
sorting | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The current sorting state.
changeSortingDirection | ({ keepOther: boolean, cancel: boolean, columnName: string }) => void | Changes the specified column's sorting direction. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the specified column if `cancel` is set to true.
groupingPanelItems | Array&lt;[GroupingPanelItem](#grouping-panel-item)&gt; | The Grouping Panel items.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the text displayed in the group panel if grid data is not grouped.
groupByColumn | ({ columnName: string }) => void | Toggles the column's grouping state.
draftGroupingChange | ({ columnName: string, groupIndex?: number }) => void | Sets the `groupingChange` state to the specified value.
cancelGroupingChange | () => void | Resets the `groupingChange` state.
allowUngroupingByClick | boolean | Specifies whether column headers display a button that cancels grouping by the column.
groupPanelItemTemplate | (args: [GroupPanelItemProps](#group-panel-item-props)) => ReactElement | Renders a group panel item. Available for the [Bootstrap 3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) template suites only.

### <a name="group-panel-item-props"></a>GroupPanelItemProps

Describes properties passed to the group panel item template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](#column) | Specifies the column associated with the item.
draft | boolean | Specifies whether the item should be rendered for the preview.
allowSorting | boolean | Specifies whether an end-user can sort data by the column while it is in the grouping panel.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the sorting direction.
changeSortingDirection | ({ keepOther: boolean, cancel: boolean, columnName: string }) => void | Changes the specified column's sorting direction. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the current column if `cancel` is set to true.
groupByColumn | ({ columnName: string }) | Toggles the column's grouping state.
allowUngroupingByClick | boolean | Specifies whether to display a button that cancels grouping by the column.

## Localization Messages

An object with the following shape:

Field | Type | Description
------|------|---------|------------
groupByColumn? | string | The text displayed in the group panel if the grid is not grouped.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](#column)&gt; | Grid columns.
draftGrouping | Getter | Array&lt;[DraftGrouping](grouping-state.md#draft-grouping)&gt; | Grouping options used for the preview.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The current sorting state.
groupByColumn | Action | ({ columnName: string }) => void | Toggles a column's grouping state.
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean | Array&lt;String&gt;, cancel: boolean }) => void | Changes a column's sort direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `cancel` to `true` to cancel sorting by the current column.
draftGroupingChange | Action | ({ columnName: string, groupIndex?: number }) => void | Sets the groupingChange state to the specified value.
cancelGroupingChange | Action | () => void | Resets the groupingChange state.

### Exports

none
