# DxPagingPanel Plugin Reference

A plugin that renders the paging panel used for navigation through data pages.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxPagingPanel } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxPagingPanel } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxPagingState](paging-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
containerComponent | [DxPagingPanel.DxContainer](#dxpagingpaneldxcontainer) | | A component that renders the paging panel.
pageSizes? | Array&lt;number&gt; | [] | The page sizes that a user can select.
messages? | [DxPagingPanel.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Component Types

### DxPagingPanel.DxContainer

#### Props

Field | Type | Description
------|------|------------
totalPages | number | Specifies the total page count.
currentPage | number | Specifies the current page.
totalCount | number | Specifies the total row count.
pageSize | number | Specifies the page size.
pageSizes | Array&lt;number&gt; | Specifies the page sizes that a user can select.
getMessage | ([messageKey](#localization-messages): string, parameters?: { from: number, to: number, count: number }) => string | Returns the paging panel's text.

#### Events

Field | Type | Description
------|------|------------
currentPageChange | (page: number) => void | Handles the current page changes.
pageSizeChange | (size: number) => void | Handles the page size changes.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
showAll? | string | 'All' | Specifies the page size selector's 'All' item text.
info? | (parameters: { from: number, to: number, count: number }) => string &#124; string | {from}-{to} of {count} | Specifies the 'Row count' text template.

## Plugin Components

Name | Type | Description
-----|------|------------
DxPagingPanel.components.DxContainer | [DxPagingPanel.DxContainer](#dxpagingpaneldxcontainer) | A component that renders the paging panel.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
currentPage | Getter | number | The current page.
pageSize | Getter | number | The page size.
totalCount | Getter | number | The total row count.
setCurrentPage | Action | (page: number) => void | Changes the current page.
setPageSize | Action | (size: number) => void | Changes the page size.
footer | Template | object? | A template that renders the grid footer.

### Exports

none
