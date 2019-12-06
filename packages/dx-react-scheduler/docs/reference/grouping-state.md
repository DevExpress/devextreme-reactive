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

## Interfaces

### Grouping

Describes grouping options.

Field | Type | Description
------|------|------------
resourceName | string | Specifies the name of the resource by which the appointments are grouped.
