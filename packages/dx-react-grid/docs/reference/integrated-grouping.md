# LocalGrouping Plugin Reference

A plugin that performs local grouping and group expanding/collapsing.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### <a name="properties"></a>Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnIdentity | (columnName: string) => [Identity](#identity) &#124; undefined | | A function that defines a column's grouping identity. See [Grouping](../guides/grouping.md#local-grouping-with-custom-values) for details.

## Interfaces

### <a name="identity"></a>Identity

A function with the following signature: `(value: any) => { key: string | number, value?: any }`. This function returns an object by whose **key** field data is grouped. If you need to group data by a non-primitive value (for example, a date), assign its string representation to the **key** field and the value to the **value** field.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be grouped.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state.
expandedGroups | Getter | Set&lt;[GroupKey](grouping-state.md#group-key)&gt; | Groups to be expanded.
getCellValue | Getter | (row: any, columnName: string) => any | A function that returns a cell value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows with the applied grouping and expanded groups.
isGroupRow | Getter | (row: any) => boolean | A function that returns a value defining if the row is a group row.
getRowLevelKey | Getter | (row: any) => string? | A function that returns a group level key for the row.
