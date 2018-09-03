# DxPagingState Plugin Reference

A plugin that manages the paging state. It controls the total page count depending on the total row count and the specified page size, controls the currently selected page number and changes it in response to the corresponding actions.

## Import

Use the following statement to import the plugin:

```js
import { DxPagingState } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
currentPage | number | | Specifies the current page number.
pageSize? | number | | Specifies the page size. Set this property to `0` to show all rows on a page.

#### Events

Name | Type | Default | Description
-----|------|---------|------------
update:currentPage? | (currentPage: number) => void | | Handles current page changes.
update:pageSize? | (pageSize: number) => void | | Handles page size changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
pageSize | Getter | number | The page size.
setPageSize | Action | (size: number) => void | Changes the page size.
currentPage | Getter | number | The current page number.
setCurrentPage | Action | (page: number) => void | Changes the current page number.
