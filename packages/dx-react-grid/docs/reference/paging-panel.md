# PagingPanel Plugin Reference

A plugin that renders a panel allowing an end-user to navigate through data pages if the Paging feature is enabled.

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
pagerTemplate | Component&lt;[PagerProps](#pager-props)&gt; | | A component that renders a pager based on the supplied parameters
allowedPageSizes | Array&lt;number&gt; | [] | Specifies the page sizes that can be selected at runtime

## Interfaces

### <a name="pager-props"></a>PagerProps

Describes properties passed to a table template when rendered

A value with the following shape:

Field | Type | Description
------|------|------------
totalPages | number | Specifies the total pages count
currentPage | number | Specifies the current page
onCurrentPageChange | (page: number) => void | Changes the current page
pageSize | number | Specifies the page size
onPageSizeChange | (size: number) => void | Changes the page size
allowedPageSizes | Array&lt;number&gt; | Specifies the page sizes that can be selected at runtime

## Plugin Developer Reference

To be described...
