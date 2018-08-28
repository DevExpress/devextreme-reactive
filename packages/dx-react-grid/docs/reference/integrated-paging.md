# IntegratedPaging Plugin Reference

A plugin that performs built-in data paging. It also changes the current page if the provided one cannot be applied due to fewer available pages.

## Import

Use the following statement to import the plugin:

```js
import { IntegratedPaging } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be paged.
pageSize | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | Provides the page size.
currentPage | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | Provides the current page.
setCurrentPage | [Action](../../../dx-react-core/docs/reference/action.md) | (page: number) => void | Changes the current page.
getRowLevelKey? | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows with the applied paging.
totalCount | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The total row count.
