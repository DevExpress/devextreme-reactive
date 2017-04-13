# GroupingState Plugin Reference

Plugin that manages grouping state. It controls by which columns rows are grouped. Also it stores information about expanded/collapsed groups.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
grouping | Array&lt;[Grouping](#grouping)&gt; | | Specifies applied grouping
defaultGrouping | Array&lt;[Grouping](#grouping)&gt; | | Specifies starting grouping for uncontrolled scenario
groupingChange | (grouping: Array&lt;[Grouping](#grouping)&gt;) => void | | Handles grouping change
expandedGroups | { [key: [GroupKey](#group-key)]: true } | | Specifies expanded groups
defaultExpandedGroups | { [key: [GroupKey](#group-key)]: true } | | Specifies starting expanded groups for uncontrolled scenario
expandedGroupsChange | (expandedGroups: { [key: [GroupKey](#group-key)]: true }) => void | | Handles expanded groups change

## Data Structures

### Grouping

Describes applied grouping

Field | Type | Description
------|------|------------
column | string | Specifies column name to group by

### <a name="group-key"></a>GroupKey

Describes an group that can be nested in another one

string

String consists of values by which rows are grouped. Values are merged by `_` symbol. For example, expanded group 'Male' is described as `Male` and 'Male'/'Audi' as `Male_Audi` and so on.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
grouping | Getter | () => Array&lt;[Grouping](#grouping)&gt; | Applied grouping
expandedGroups | Getter | () => { [key: [GroupKey](#group-key)]: true } | Expanded groups
groupedColumns | Getter | () => Array&lt;Column&gt; | Columns with applied grouping on them
groupByColumn | Action | ({ columnName: string, groupIndex?: number }) => void | Group by specified column name or cancel grouping for. If `groupIndex` is omitted, group will be added to the last position.
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](#group-key) }) => void | Toggles expanded group state
