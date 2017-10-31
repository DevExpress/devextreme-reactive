# PagingPanel Plugin Reference

A plugin that renders a panel, allowing end-users to navigate through data pages if Paging is enabled.

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
pagerTemplate | (args: [PagerArgs](#pager-args)) => ReactElement | | A component that renders a pager based on the specified parameters.
allowedPageSizes | Array&lt;number&gt; | [] | Specifies the page sizes that a user can select.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### <a name="pager-args"></a>PagerArgs

Describes properties passed to a pager template when it is being rendered.

A value with the following shape:

Field | Type | Description
------|------|------------
totalPages | number | Specifies the total page count.
currentPage | number | Specifies the current page.
onCurrentPageChange | (page: number) => void | Handles the current page change.
pageSize | number | Specifies the page size.
onPageSizeChange | (size: number) => void | Handles the page size change.
allowedPageSizes | Array&lt;number&gt; | Specifies the page sizes that a user can select.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the pager's text.

## Localization Messages

An object with the following shape:

Field | Type | Default | Description
------|------|---------|------------
showAll? | string | 'All' | Specifies the page size selector's 'All' item text.
rowsPerPage? | string | 'Rows per page:' | Specifies the 'Rows per page' label's text. Available in the "@devexpress/dx-react-grid-material-ui" package.
info? | string &#124; ({ from: number, to: number, count: number }) => string | {from}-{to} of {count} | Specifies the 'Row count' text template.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
currentPage | Getter | number | The current page.
pageSize | Getter | number | The page size.
totalCount | Getter | number | The total row count.
setCurrentPage | Action | (page: number) => void | Changes the current page.
setPageSize | Action | (size: number) => void | Changes the page size.
footer | Template | Object? | A template that renders the grid footer.

### Exports

none
