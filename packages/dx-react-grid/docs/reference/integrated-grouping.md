# IntegratedGrouping Plugin Reference

A plugin that performs built-in grouping and group expanding/collapsing.

## Import

Use the following statement to import the plugin:

```js
import { IntegratedGrouping } from '@devexpress/dx-react-grid';
```

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
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be grouped.
grouping | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Grouping](grouping-state.md#grouping)&gt; | The current grouping state.
expandedGroups | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[GroupKey](grouping-state.md#groupkey)&gt; | Groups to be expanded.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function that returns a cell value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows with the applied grouping and expanded groups.
isGroupRow | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => boolean | A function that returns a value defining if the row is a group row.
getRowLevelKey | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function that returns a group level key for the row.
getCollapsedRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => Array&lt;any&gt;? | A function used to get collapsed rows associated with the given row.
