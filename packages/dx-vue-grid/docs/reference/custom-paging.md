# DxCustomPaging Plugin Reference

A plugin that allows implementing a custom totalCount calculation logic.

## Importing

Use the following import statement:

```js
import { DxCustomPaging } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxPagingState](paging-state.md)

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
totalCount | Getter | number | The total row count.
