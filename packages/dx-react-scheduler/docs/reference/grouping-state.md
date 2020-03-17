# GroupingState Plugin Reference

A plugin that manages the grouping state.

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
groupOrientation? | (viewName: string) => [GroupOrientation](#grouporientation) | `() => 'Horizontal'` | A function that allows you to specify different group orientations for different views. Should return `"Vertical"` or `"Horizontal"`.
groupByDate? | (viewName: string) => boolean | `() => false` | Specifies whether appointments should be grouped by date in a specific view.

## Interfaces

### Grouping

Describes grouping options.

Field | Type | Description
------|------|------------
resourceName | string | The name of the resource by which the appointments are grouped.

### GroupOrientation

Describes group orientation.

Type: `Vertical` | `Horizontal`
