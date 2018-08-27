# PagingState Plugin Reference

A plugin that manages the paging state. It controls the total page count depending on the total row count and the specified page size, controls the currently selected page number and changes it in response to the corresponding actions.

## Import

Use the following statement to import the plugin:

```js
import { PagingState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
currentPage? | number | | Specifies the current page number.
defaultCurrentPage? | number | 0 | Specifies the initial page in uncontrolled mode.
onCurrentPageChange? | (currentPage: number) => void | | Handles current page changes.
pageSize? | number | | Specifies the page size. Set this property to `0` to show all rows on a page.
defaultPageSize? | number | 10 | Specifies the initial page size in uncontrolled mode.
onPageSizeChange? | (pageSize: number) => void | | Handles page size changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
pageSize | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The page size.
setPageSize | [Action](../../../dx-react-core/docs/reference/action.md) | (size: number) => void | Changes the page size.
currentPage | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The current page number.
setCurrentPage | [Action](../../../dx-react-core/docs/reference/action.md) | (page: number) => void | Changes the current page number.
