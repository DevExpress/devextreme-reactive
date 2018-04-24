# CustomPaging Plugin Reference

A plugin that allows implementing a custom totalCount calculation logic.

## Importing

Use the following import statement:

```js
import { CustomPaging } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
totalCount? | number | 0 | The total row count.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
totalCount | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The total row count.
