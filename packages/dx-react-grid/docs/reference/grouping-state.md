# GroupingState Plugin Reference

A plugin that manages the grouping state. It lists columns used for grouping and stores information about expanded/collapsed groups.

## Import

Use the following statement to import the plugin:

```js
import { GroupingState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
grouping? | Array&lt;[Grouping](#grouping)&gt; | | Specifies columns to group by.
defaultGrouping? | Array&lt;[Grouping](#grouping)&gt; | [] | Specifies initial grouping options in the uncontrolled mode.
onGroupingChange? | (grouping: Array&lt;[Grouping](#grouping)&gt;) => void | | Handles grouping option changes.
expandedGroups? | Array&lt;[GroupKey](#groupkey)&gt; | | Specifies expanded groups.
defaultExpandedGroups? | Array&lt;[GroupKey](#groupkey)&gt; | [] | Specifies initially expanded groups in the uncontrolled mode.
columnGroupingEnabled? | boolean | true | Specifies whether grouping is enabled for all columns.
columnExtensions? | Array&lt;[GroupingState.ColumnExtension](#groupingstatecolumnextension)&gt; | | Additional column properties that the plugin can handle.
onExpandedGroupsChange? | (expandedGroups: Array&lt;[GroupKey](#groupkey)&gt;) => void | | Handles expanded group changes.

## Interfaces

### Grouping

Describes grouping options.

Field | Type | Description
------|------|------------
columnName | string | Specifies the name of the column by which the data is grouped.

### GroupKey

Type: `string`

Describes a group that can be nested in another one.

A string value that consists of values by which rows are grouped, separated by the `|` character. For example, the expanded group 'Male' is described as `Male` and 'Male'/'Audi' as `Male|Audi` and so on.

### GroupingState.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
groupingEnabled | boolean | Specifies whether grouping is enabled for a column.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
sorting? | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Applied column sorting.
changeColumnSorting? | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex?: number }) => void | Changes the column's sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column. If `sortIndex` is omitted, the sorting is added to the end of the sorting list.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
grouping | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Grouping](#grouping)&gt; | The current grouping state.
draftGrouping | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Grouping](#grouping)&gt; | Grouping options used for the preview.
isColumnGroupingEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function that returns a Boolean value that defines if grouping by a column is enabled.
changeColumnGrouping | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, groupIndex?: number }) => void | Groups data by a specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the last position.
draftColumnGrouping | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, groupIndex?: number }) => void | Sets or clears grouping options used for the preview. If `groupIndex` is omitted, the group is added to the last position.
cancelColumnGroupingDraft | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Cancels changes to the column grouping options used for the preview.
expandedGroups | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[GroupKey](#groupkey)&gt; | Expanded groups.
toggleGroupExpanded | [Action](../../../dx-react-core/docs/reference/action.md) | ({ groupKey: [GroupKey](#groupkey) }) => void | Toggles the expanded group state.
