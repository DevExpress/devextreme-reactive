# GroupingPanelSorting Plugin Reference

Plugin that renders sort indicators inside grouping panel.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)
- [GroupingPanel](grouping-panel.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sortableGroupCellTemplate | Component&lt;[SortableGroupCellProps](#sortable-group-cell-props)&gt; | Renders sort indicator into group cell template

## Interfaces

### <a name="sortable-group-cell-props"></a>SortableGroupCellProps

Describes properties passed to group panel template when rendered

Field | Type | Description
------|------|------------
direction | 'asc'&#124;'desc' | Specifies sorting direction if applied
toggleSorting | ({ keepOther: boolean }) => void | Changes sorting for column. Keep other sortings if `keepOther` is set to `true`

## Plugin Developer Reference

To be described...
