# GroupingState Plugin Reference

A plugin that manages the grouping state. It controls by which column rows are grouped, and stores information about expanded/collapsed groups.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
grouping | Array&lt;[Grouping](#grouping)&gt; | | Specifies columns to group by
defaultGrouping | Array&lt;[Grouping](#grouping)&gt; | | Specifies initial grouping in the uncontrolled mode
onGroupingChange | (grouping: Array&lt;[Grouping](#grouping)&gt;) => void | | Handles grouping changes
expandedGroups | Array&lt;[GroupKey](#group-key)&gt; | | Specifies expanded groups
defaultExpandedGroups | Array&lt;[GroupKey](#group-key)&gt; } | | Specifies initially expanded groups in the uncontrolled mode
onExpandedGroupsChange | (expandedGroups: Array&lt;[GroupKey](#group-key)&gt; }) => void | | Handles expanded group changes

## Interfaces

### Grouping

Describes applied grouping

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | Specifies a column name to group by

### <a name="group-key"></a>GroupKey

Describes a group that can be nested in another one

A primitive value with the following type:

string

This string consists of values by which rows are grouped. The `|` symbol merges values. For example, the expanded group 'Male' is described as `Male` and 'Male'/'Audi' as `Male|Audi` and so on.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
grouping | Getter | Array&lt;[Grouping](#grouping)&gt; | Applied grouping
expandedGroups | Getter | Set&lt;[GroupKey](#group-key)&gt; | Expanded groups
groupedColumns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns used for grouping
groupByColumn | Action | ({ columnName: string, groupIndex?: number }) => void | Groups by a specified column name or cancels grouping. If `groupIndex` is omitted, the group is added to the last position.
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](#group-key) }) => void | Toggles the expanded group state
