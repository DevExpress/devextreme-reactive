# PagingState Plugin Reference

A plugin that manages paging state. It controls the total page count depending on the total row count and the specified page size. It also controls the currently selected page number and can change it in response to the corresponding actions.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
pageSize | number | | Specifies the page size
totalCount | number | | Specifies the total rows count
currentPage | number | | Specifies the current page number
defaultCurrentPage | number | | Specifies the initial current page for the uncontrolled mode
onCurrentPageChange | (currentPage: number) => void | | Handles current page changes

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
pageSize | Getter | () => number | The page size specified via properties
currentPage | Getter | () => number | The current page number
setCurrentPage | Action | ({ page: number }) => void | Changes the current page number
