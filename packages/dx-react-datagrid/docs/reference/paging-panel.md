# PagingPanel Plugin Reference

Plugin that renders pager.

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
pagerTemplate | Component&lt;[PagerProps](#pager-props)&gt; | | Component that renders pager based on supplied parameters

## Interfaces

### <a name="pager-props"></a>PagerProps

Describes properties passed to table template when rendered

Field | Type | Description
------|------|------------
currentPage | number | Specifies current page
totalPages | number | Specifies total pages count
onCurrentPageChange | (page: number) => void | Changes current page

## Plugin Developer Reference

To be described...
