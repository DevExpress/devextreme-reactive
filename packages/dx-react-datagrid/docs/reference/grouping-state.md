# GroupingState Plugin Reference

Plugin that manages grouping state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
grouping | array&lt;[Grouping](#grouping)&gt; | | Specifies applied grouping
defaultGrouping | array&lt;[Grouping](#grouping)&gt; | | Specifies starting grouping for uncontrolled scenario
groupingChange | (grouping: array&lt;[Grouping](#grouping)&gt;) => void | | Handles grouping change
expandedGroups | { [key: [GroupKey](#groupkey)]: true } | | Specifies expanded groups
defaultExpandedGroups | { [key: [GroupKey](#groupkey)]: true } | | Specifies starting expanded groups for uncontrolled scenario
expandedGroupsChange | (expandedGroups: { [key: [GroupKey](#groupkey)]: true }) => void | | Handles expanded groups change

## Data Structures

### Grouping

Describes applied grouping

Field | Type | Description
------|------|------------
column | string | Specifies column name to group by

### GroupKey 

Describes an group that can be nested in another one

string

String consists of values by which rows are grouped. Values are merged by `_` symbol. For example, expanded group 'Male' is described as `Male` and 'Male'/'Audi' as `Male_Audi` and do on.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
grouping | Getter | () => array&lt;[Grouping](#grouping)&gt; | Applied grouping
expandedGroups | Getter | () => { [key: [GroupKey](#groupkey)]: true } | Expanded groups
groupedColumns | Getter | () => array&lt;Column&gt; | Columns with applied grouping on them
groupByColumn | Action | ({ columnName: string, groupIndex?: number }) => void | Group by specified column name or cancel grouping for. If `groupIndex` is omitted, group will be added to the last position.
toggleGroupExpanded | Action | ({ groupKey: [GroupKey](#groupkey) }) => void | Toggles expanded group state
