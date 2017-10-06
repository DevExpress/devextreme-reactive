# PagingPanel Plugin Reference

A plugin that renders a panel, allowing end-users to navigate through data pages if Paging is enabled.

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
pagerTemplate | (args: [PagerArgs](#pager-args)) => ReactElement | | A component that renders a pager based on the supplied parameters.
allowedPageSizes | Array&lt;number&gt; | [] | Specifies the page sizes that can be selected at runtime.
showAllText | string | | Specifies a page size selector's 'All' item text. Available for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) template suites only.

## Interfaces

### <a name="pager-args"></a>PagerArgs

Describes properties passed to a table template when rendered

A value with the following shape:

Field | Type | Description
------|------|------------
totalPages | number | Specifies the total page count.
currentPage | number | Specifies the current page.
onCurrentPageChange | (page: number) => void | Changes the current page.
pageSize | number | Specifies the page size.
onPageSizeChange | (size: number) => void | Changes the page size.
allowedPageSizes | Array&lt;number&gt; | Specifies the page sizes that can be selected at runtime.
showAllText | string | Specifies a page size selector's 'All' item text. Available for [Bootstrap3](https://www.npmjs.com/package/@devexpress/dx-react-grid-bootstrap3) and [Material UI](https://www.npmjs.com/package/@devexpress/dx-react-grid-material-ui) template suites only.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
currentPage | Getter | number | The current page.
pageSize | Getter | number | The count of rows to be shown on a single page.
totalCount | Getter | number | The total row count.
setCurrentPage | Action | (page: number) => void | Changes the current page.
setPageSize | Action | (size: number) => void | Changes the page size.
footer | Template | Object? | A template that renders the grid footer.

### Exports

none
