# PagingPanel Plugin Reference

A plugin that renders the paging panel used for navigation through data pages.

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
containerComponent | ElementType&lt;[ContainerProps](#containerprops)&gt; | | A component that renders the paging panel.
allowedPageSizes | Array&lt;number&gt; | [] | The page sizes that a user can select.
messages | object | | An object that specifies the [localization messages](#localization-messages).

## Interfaces

### ContainerProps

Describes the container component properties.

A value with the following shape:

Field | Type | Description
------|------|------------
totalPages | number | Specifies the total page count.
currentPage | number | Specifies the current page.
onCurrentPageChange | (page: number) => void | Handles the current page changes.
pageSize | number | Specifies the page size.
onPageSizeChange | (size: number) => void | Handles the page size changes.
allowedPageSizes | Array&lt;number&gt; | Specifies the page sizes that a user can select.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the paging panel's text.

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
