# LocalGrouping Plugin Reference

A plugin that performs local grouping and group expanding/collapsing.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### <a name="properties"></a>Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnIdentity | (columnName: string) => [Identity](#identity) &#124; undefined | | A function calculating a grouping identity. See the [Grouping guide](../guides/grouping.md#custom-grouping-values) for more details.

## Interfaces

### <a name="identity"></a>Identity

A function with the following signature `(value: any) => { key: string | number, value?: any }`.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be grouped.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state.
expandedGroups | Getter | Set&lt;[GroupKey](grouping-state.md#group-key)&gt; | Groups to be expanded.
getCellValue | Getter | (row: any, columnName: string) => any | The function used to get a cell value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows with the applied grouping and expanded groups.
isGroupRow | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey | Getter | (row: any) => string? | A function used to get group row level key.
