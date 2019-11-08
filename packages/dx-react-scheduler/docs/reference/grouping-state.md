# GroupingState Plugin Reference

A plugin that manages the grouping state. It lists resources used for grouping and stores information about expanded/collapsed groups.

## Import

Use the following statement to import the plugin:

```js
import { GroupingState } from '@devexpress/dx-react-scheduler';
```

## User Reference

### Dependencies

None

### Properties

Name | Type | Default | Description
-----|------|---------|------------
grouping? | Array&lt;[Grouping](#grouping)&gt; | | Specifies resources to group by.
expandedGroups? | Array&lt;[GroupKey](#groupkey)&gt; | | Specifies expanded groups.
defaultExpandedGroups? | Array&lt;[GroupKey](#groupkey)&gt; | [] | Specifies initially expanded groups in the uncontrolled mode.
onExpandedGroupsChange? | (expandedGroups: Array&lt;[GroupKey](#groupkey)&gt;) => void | | Handles expanded group changes.

## Interfaces

### Grouping

Describes grouping options.

Field | Type | Description
------|------|------------
resourceId | string | Specifies the name of the column by which the data is grouped.

### GroupKey

Type: `string`

Describes a group that can be nested in another one.

A string value that consists of values by which rows are grouped, separated by the `|` character. For example, the expanded group 'Male' is described as `Male` and 'Male'/'Audi' as `Male|Audi` and so on.
