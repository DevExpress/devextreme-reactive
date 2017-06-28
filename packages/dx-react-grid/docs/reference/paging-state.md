# PagingState Plugin Reference

A plugin that manages the paging state. It controls the total page count depending on the total row count and the specified page size, controls the currently selected page number and changes it in response to the corresponding actions.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
totalCount | number | | Specifies the total row count
currentPage | number | | Specifies the current page number
defaultCurrentPage | number | 0 | Specifies the ncontrolled mode's initial current page
onCurrentPageChange | (currentPage: number) => void | | Handles current page changes
pageSize | number | | Specifies the page size. Set this property to `0` to show all rows on a page
defaultPageSize | number | 10 | Specifies tthe uncontrolled mode's he initial page size
onPageSizeChange | (pageSize: number) => void | | Handles page size changes

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
pageSize | Getter | number | The page size
setPageSize | Action | ({ size: number }) => void | Changes the page size
currentPage | Getter | number | The current page number
setCurrentPage | Action | ({ page: number }) => void | Changes the current page number
