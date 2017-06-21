# GroupingPanel Plugin Reference

A plugin that renders a panel showing grouped columns in the Grid's header. An end-user can change the grouping options by interacting with this panel.

Optionally, the plugin allows an end-user to change grouped columns' sorting order and renders the corresponding sort indicators.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]
- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
allowSorting | boolean | false | Allows an end-user to change sorting by a column if true
groupPanelTemplate | (args: [GroupPanelProps](#group-panel-props)) => ReactElement | | Renders a group panel
groupPanelCellTemplate? | (args: [GroupPanelCellProps](#group-panel-cell-props)) => ReactElement | | Renders a group panel cell. Available for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) template suites only.

## Interfaces

### <a name="group-panel-props"></a>GroupPanelProps

Describes properties passed to the group panel template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
allowSorting | boolean | Allows an end-user to change sorting by a column if true
sorting | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The currently applied sorting
changeSortingDirection | ({ keepOther: boolean, cancel: boolean }) => void | Changes a column's sorting order. Keeps existing sorting if `keepOther` is set to `true`. Cancels sorting by the current column if `cancel` is set to true.
groupedColumns | Array&lt;[Column](grid.md#column)&gt; | The grid is currently grouped by these columns
groupByColumn | ({ columnName: string }) => void | Toggles a column's grouping state
groupByColumnText | string | The text which is displayed in the group panel when no grouping is set
groupPanelCellTemplate | (args: [GroupPanelCellProps](#group-panel-cell-props)) => ReactElement | Renders a group panel cell. Available for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) template suites only.

### <a name="group-panel-cell-props"></a>GroupPanelCellProps

Describes properties passed to the group panel cell template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
column | [Column](grid.md#column) | Specifies a column associated with the cell
allowSorting | boolean | An end-user can change sorting by the current column if true
sortingDirection? | 'asc' &#124; 'desc' | Specifies sorting direction
changeSortingDirection | ({ keepOther: boolean, cancel: boolean }) => void | Changes a column's sorting order. Keeps existing sorting if `keepOther` is set to `true`. Cancels sorting by the current column if `cancel` is set to true.
groupByColumn | ({ columnName: string }) | Toggles a column's grouping state

## Plugin Developer Reference

To be described...
