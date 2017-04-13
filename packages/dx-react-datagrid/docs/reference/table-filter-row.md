# TableFilterRow Plugin Reference

Plugin that renders filtering controls.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rowHeight | number | | Specifies height for filter row
filterCellTemplate | Component&lt;[FilterCellProps](#filter-cell-props)&gt; | | Component that renders cell with ability to change column filter

## Interfaces

### <a name="filter-cell-props"></a>FilterCellProps

Describes properties passed to template that renders cell with selection control.

Field | Type | Description
------|------|------------
filter | string | Applied filter to column
changeFilter | (filter: string) => void | Changes applied filter with provided value

## Plugin Developer Reference

To be described...
