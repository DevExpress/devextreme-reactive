# GroupingState Plugin Reference

A plugin that manages the grouping state. It lists columns currently used for grouping and stores information about expanded/collapsed groups.

## User Reference

### Dependencies

- [SortingState](sorting-state.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
grouping? | Array&lt;[Grouping](#grouping)&gt; | | Specifies columns to group by.
defaultGrouping? | Array&lt;[Grouping](#grouping)&gt; | [] | Specifies initial grouping options in the uncontrolled mode.
onGroupingChange? | (grouping: Array&lt;[Grouping](#grouping)&gt;) => void | | Handles grouping option changes.
expandedGroups? | Array&lt;[GroupKey](#group-key)&gt; | | Specifies expanded groups.
defaultExpandedGroups? | Array&lt;[GroupKey](#group-key)&gt; | [] | Specifies initially expanded groups in the uncontrolled mode.
onExpandedGroupsChange? | (expandedGroups: Array&lt;[GroupKey](#group-key)&gt;) => void | | Handles expanded group changes.

## Interfaces

### Grouping

Describes grouping options.

Field | Type | Description
------|------|------------
columnName | string | Specifies the name of the column by which the data is grouped.

### GroupKey

Describes a group that can be nested in another one.

A string value that consists of values by which rows are grouped, separated by the `|` character. For example, the expanded group 'Male' is described as `Male` and 'Male'/'Audi' as `Male|Audi` and so on.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Grid columns.
sorting? | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Applied column sorting.
changeColumnSorting? | Action | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex?: number }) => void | Changes the column sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column. If `sortIndex` is omitted, the sorting is added to the end of the sorting list.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
grouping | Getter | Array&lt;[Grouping](#grouping)&gt; | The current grouping state.
draftGrouping | Getter | Array&lt;[Grouping](#grouping)&gt; | Grouping options used for the preview.
changeColumnGrouping | Action | ({ columnName: string, groupIndex?: number }) => void | Groups data by a specified column or cancels grouping. If `groupIndex` is omitted, the group is added to the last position.
draftColumnGrouping | Action | ({ columnName: string, groupIndex?: number }) => void | Sets or clears grouping options used for the preview. If `groupIndex` is omitted, the group is added to the last position.
cancelColumnGroupingDraft | Action | () => void | Cancels changes to the column grouping options used for the preview.
expandedGroups | Getter | Array&lt;[GroupKey](#group-key)&gt; | Expanded groups.
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](#group-key) }) => void | Toggles the expanded group state.
