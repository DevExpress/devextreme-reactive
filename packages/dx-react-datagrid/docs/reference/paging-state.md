# GroupingState Plugin Reference

Plugin that manages grouping state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
pageSize | number | | Specifies page size
currentPage | number | | Specifies current page
defaultCurrentPage | number | | Specifies starting current page for uncontrolled scenario
currentPageChange | (currentPage: number) => void | | Handles current page change

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
pageSize | Getter | () => number | Specified page size
currentPage | Getter | () => number | Current page
setCurrentPage | Action | ({ page: number }) => void | Change current page
