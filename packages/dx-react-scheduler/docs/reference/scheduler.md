# Scheduler Reference

The Scheduler is a root container component designed to process and display data specified via the `data` property. The Scheduler's functionality (data visualization and data processing) is implemented in several plugins specified as child components.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Scheduler } from '@devexpress/dx-react-scheduler-material-ui';
```

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
data | Array&lt;any&gt; | | An array containing custom data. A user defines the access to this data. Refer to [Data Accessors](../guides/data-accessors.md) for details.
getRowId? | (row: any) => number &#124; string | | Specifies the function used to get a unique row identifier.
getCellValue? | (row: any, columnName: string) => any | | Specifies the function used to get a cell's value.
rootComponent | ComponentType&lt;[Scheduler.RootProps](#schedulerrootprops)&gt; | | A component that renders the scheduler root layout.

## Interfaces

### Column

Defines the column configuration object. Used to display data stored in a row.

Field | Type | Description
------|------|------------
name | string | Specifies the column name or the name of a row field whose value the column displays. If the column name does not match any field name, specify the `getCellValue` function.
title? | string | Specifies the column title.
getCellValue? | (row: any, columnName: string) => any | Specifies the function used to get the column value for a given row.

### Scheduler.RootProps

Describes properties passed to a component that renders the scheduler root layout.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed in the root layout.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Scheduler.Root | [Scheduler.RootProps](#schedulerrootprops) | A component that renders the scheduler root layout.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Scheduler rows.
getRowId | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number &#124; string | A function used to get a unique row identifier.
columns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Column](#column)&gt; | Scheduler columns.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function used to get a given row's column value.
root | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the scheduler root layout.
header | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the scheduler header.
body | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the scheduler body.
footer | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the scheduler footer.
