# LocalPaging Plugin Reference

Plugin that performs local paging. It also changes current page if the provided one can not be applied due to smaller amount of available pages.

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](datagrid.md#row)&gt; | Rows to be filtered
pageSize | Getter | number | Provided page size
currentPage | Getter | number | Provided current page
setCurrentPage | Action | ({ page: number }) => void | Changes current page

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => Array&lt;[Row](datagrid.md#row)&gt; | Rows with applied paging
totalPages | Getter | () => number | Total pages count
