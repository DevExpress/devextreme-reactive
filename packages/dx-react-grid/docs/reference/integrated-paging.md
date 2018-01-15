# IntegratedPaging Plugin Reference

A plugin that performs built-in data paging. It also changes the current page if the provided one cannot be applied due to fewer available pages.

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;any&gt; | Rows to be paged.
pageSize | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | number | Provides the page size.
currentPage | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | number | Provides the current page.
setCurrentPage | [Action](/devextreme-reactive/react/core/docs/reference/action) | (page: number) => void | Changes the current page.
getRowLevelKey? | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;any&gt; | Rows with the applied paging.
totalCount | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | number | The total row count.
