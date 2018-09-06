# DxIntegratedPaging Plugin Reference

A plugin that performs built-in data paging. It also changes the current page if the provided one cannot be applied due to fewer available pages.

## Import

Use the following statement to import the plugin:

```js
import { DxIntegratedPaging } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxPagingState](paging-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be paged.
pageSize | Getter | number | Provides the page size.
currentPage | Getter | number | Provides the current page.
setCurrentPage | Action | (page: number) => void | Changes the current page.
getRowLevelKey? | Getter | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows with the applied paging.
totalCount | Getter | number | The total row count.
