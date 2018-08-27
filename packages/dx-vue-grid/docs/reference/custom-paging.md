# DxCustomPaging Plugin Reference

A plugin that allows implementing a custom totalCount calculation logic.

## Import

Use the following statement to import the plugin:

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
