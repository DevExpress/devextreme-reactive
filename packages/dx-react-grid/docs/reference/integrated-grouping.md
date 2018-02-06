# IntegratedGrouping Plugin Reference

A plugin that performs built-in grouping and group expanding/collapsing.

## User Reference

### Dependencies

- [GroupingState](grouping-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[IntegratedGrouping.ColumnExtension](#integratedgroupingcolumnextension)&gt; | | Additional column properties that the plugin can handle.

## Interfaces

### IntegratedGrouping.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
criteria? | (value: any) => { key: string &#124; number, value?: any } | A grouping criterion function. It returns an object with the **key** field by which data is grouped. If you need to group data by a non-primitive value (for example, a date), assign its string representation to the **key** field and the value to the **value** field.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be grouped.
grouping | Getter | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state.
expandedGroups | Getter | Array&lt;[GroupKey](grouping-state.md#group-key)&gt; | Groups to be expanded.
getCellValue | Getter | (row: any, columnName: string) => any | A function that returns a cell value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows with the applied grouping and expanded groups.
isGroupRow | Getter | (row: any) => boolean | A function that returns a value defining if the row is a group row.
getRowLevelKey | Getter | (row: any) => string? | A function that returns a group level key for the row.
