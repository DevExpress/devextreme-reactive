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

## Interfaces

### <a name="group-panel-props"></a>GroupPanelProps

Describes properties passed to the group panel template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
groupedColumns | Array&lt;[Column](grid.md#column)&gt; | The grid is currently grouped by these columns
groupByColumn | ({ columnName: string }) => void | Toggles a column's grouping state
allowSorting | boolean | An end-user can change sorting by the current column if true
sorting | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | The currently applied sorting
changeSortingDirection | ({ keepOther: boolean, cancel: boolean }) => void | Changes a column's sorting order. Keeps existing sorting if `keepOther` is set to `true`. Cancels sorting by the current column if `cancel` is set to true.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | () => Array&lt;[TableColumn](#table-column)&gt; | Columns of the table
grouping | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | | Columns to group by

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | () => Array&lt;[TableColumn](table-view.md#table-column)&gt; | Columns to be rendered inside the table excluding grouped ones
