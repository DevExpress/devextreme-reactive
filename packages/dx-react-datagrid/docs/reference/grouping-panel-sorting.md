# GroupingPanelSorting Plugin Reference

This plugin allows an end-user to change sorting of the grouped columns and renders the corresponding sort indicators within the group panel cells.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)
- [GroupingPanel](grouping-panel.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sortableGroupCellTemplate | Component&lt;[SortableGroupCellProps](#sortable-group-cell-props)&gt; | Renders a sort indicator into a group cell

## Interfaces

### <a name="sortable-group-cell-props"></a>SortableGroupCellProps

Describes properties passed to the group panel template when rendering

A value with the following shape:

Field | Type | Description
------|------|------------
direction | 'asc' &#124; 'desc' | Specifies sorting direction if applied
toggleSorting | ({ keepOther: boolean }) => void | Changes the sort order of a column. Keeps existing sorting if `keepOther` is set to `true`

## Plugin Developer Reference

To be described...
