# PagingState Plugin Reference

A plugin that manages paging state. It controls the total page count depending on the total row count and the specified page size. It also controls the currently selected page number and can change it in response to the corresponding actions.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
totalCount | number | | Specifies the total rows count
currentPage | number | | Specifies the current page number
defaultCurrentPage | number | 0 | Specifies the initial current page for the uncontrolled mode
onCurrentPageChange | (currentPage: number) => void | | Handles current page changes
pageSize | number | | Specifies the page size
defaultPageSize | number | 10 | Specifies the initial page size for the uncontrolled mode
onPageSizeChange | (pageSize: number) => void | | Handles page size changes

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
pageSize | Getter | () => number | The page size specified via properties
setPageSize | Action | ({ size: number }) => void | Changes the page size
currentPage | Getter | () => number | The current page number
setCurrentPage | Action | ({ page: number }) => void | Changes the current page number
