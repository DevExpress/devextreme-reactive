# GroupingPanel Plugin Reference

A plugin that renders the Grouping Panel (a panel that shows grouped columns in the Grid's header). An end-user can use this panel to modify grouping options.

Optionally, the plugin allows an end-user to change grouped columns' sorting order and renders the corresponding sorting indicators.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [DragDropContext](drag-drop-context.md) [Optional]
- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
allowSorting | boolean | false | Specifies whether an end-user can sort data by a column. Requires the [SortingState](sorting-state.md) dependency.
allowDragging | boolean | false | Specifies whether an end-user can change grouping state by dragging columns between the group panel and the table header. Requires the [DragDropContext](drag-drop-context.md) dependency.
allowUngroupingByClick | boolean | false | Specifies whether column headers display a button that cancels grouping by that column.
groupPanelTemplate | (args: [GroupPanelProps](#group-panel-props)) => ReactElement | | Renders a group panel.
groupPanelItemTemplate? | (args: [GroupPanelItemProps](#group-panel-item-props)) => ReactElement | | Renders a group panel item. Available for the [Bootstrap 3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) template suites only.

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
column | [Column](#column) | Specifies the user column associated with the item.
draft | boolean | Specifies whether the item should be rendered for the preview.

### <a name="group-panel-props"></a>GroupPanelProps

Describes properties passed to the group panel template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
allowSorting | boolean | Specifies whether an end-user can sort data by a column.
allowDragging | boolean | Specifies whether an end-user can change grouping state by dragging columns between the group panel and the table header.
sorting | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The current sorting state.
changeSortingDirection | ({ keepOther: boolean, cancel: boolean, columnName: string }) => void | Changes the direction of sorting by the column specified using the `columnName` argument. Keeps the current sorting state if `keepOther` is set to true. Cancels sorting by the current column if `cancel` is set to true.
groupingPanelItems | Array&lt;[GroupingPanelItem](#grouping-panel-item)&gt; | GroupingPanel items representing the columns by which the grid data is currently grouped.
groupByColumnText | string | The text displayed in the group panel if the grid is not grouped.
groupByColumn | ({ columnName: string }) => void | Toggles a column's grouping state.
draftGroupingChange | ({ columnName: string, groupIndex?: number }) => void | Sets the groupingChange state to the specified value.
cancelGroupingChange | () => void | Resets the groupingChange state.
allowUngroupingByClick | boolean | Specifies whether column headers display a button that cancels grouping by the column.
groupPanelItemTemplate | (args: [GroupPanelItemProps](#group-panel-item-props)) => ReactElement | Renders a group panel item. Available for the [Bootstrap 3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) template suites only.

### <a name="group-panel-item-props"></a>GroupPanelItemProps

Describes properties passed to the group panel item template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](#column) | Specifies the column associated with the item.
draft | boolean | Specifies whether the item should be rendered for the preview.
allowSorting | boolean | Specifies whether an end-user can sort data by the column.
sortingDirection? | 'asc' &#124; 'desc' | Specifies the sorting direction.
changeSortingDirection | ({ keepOther: boolean, cancel: boolean, columnName: string }) => void | Changes the direction of sorting by the column using the `columnName` argument. Keeps the current sorting options if `keepOther` is set to true. Cancels sorting by the current column if `cancel` is set to true.
groupByColumn | ({ columnName: string }) | Toggles the column's grouping state.
allowUngroupingByClick | boolean | Specifies whether to display the button that cancels grouping by the column.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](#column)&gt; | Grid columns.
draftGrouping | Getter | Array&lt;[DraftGrouping](grouping-state.md#draft-grouping)&gt; | Grouping options used for preview.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The current sorting state.
groupByColumn | Action | ({ columnName: string }) => void | Toggles a column's grouping state.
setColumnSorting | Action | ({ columnName: string, direction: 'asc' &#124; 'desc', keepOther: boolean, cancel: boolean }) => void | Changes column sorting.
draftGroupingChange | Action | ({ columnName: string, groupIndex?: number }) => void | Sets the groupingChange state to the specified value.
cancelGroupingChange | Action | () => void | Resets the groupingChange state.

### Exports

none
