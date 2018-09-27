# PagingPanel Plugin Reference

A plugin that renders the paging panel used for navigation through data pages.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { PagingPanel } from '@devexpress/dx-react-grid-material-ui';
// import { PagingPanel } from '@devexpress/dx-react-grid-bootstrap4';
// import { PagingPanel } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { PagingPanel } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [PagingState](paging-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
containerComponent | ComponentType&lt;[PagingPanel.ContainerProps](#pagingpanelcontainerprops)&gt; | | A component that renders the paging panel.
pageSizes? | Array&lt;number&gt; | [] | The page sizes that a user can select.
messages? | [PagingPanel.LocalizationMessages](#localization-messages) | | An object that specifies the localization messages.

## Interfaces

### PagingPanel.ContainerProps

Describes the container component properties.

Field | Type | Description
------|------|------------
totalPages | number | Specifies the total page count.
currentPage | number | Specifies the current page.
onCurrentPageChange | (page: number) => void | Handles the current page changes.
pageSize | number | Specifies the page size.
totalCount | number | Specifies the total row count.
onPageSizeChange | (size: number) => void | Handles the page size changes.
pageSizes | Array&lt;number&gt; | Specifies the page sizes that a user can select.
getMessage | ([messageKey](#localization-messages): string, parameters?: { from: number, to: number, count: number }) => string | Returns the paging panel's text.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
showAll? | string | 'All' | Specifies the page size selector's 'All' item text.
rowsPerPage? | string | 'Rows per page:' | Specifies the 'Rows per page' label's text. Available in the "@devexpress/dx-react-grid-material-ui" package.
info? | (parameters: { from: number, to: number, count: number }) => string &#124; string | {from}-{to} of {count} | Specifies the 'Row count' text template.

## Plugin Components

Name | Properties | Description
-----|------------|------------
PagingPanel.Container | [PagingPanel.ContainerProps](#pagingpanelcontainerprops) | A component that renders the paging panel.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
currentPage | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The current page.
pageSize | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The page size.
totalCount | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The total row count.
setCurrentPage | [Action](../../../dx-react-core/docs/reference/action.md) | (page: number) => void | Changes the current page.
setPageSize | [Action](../../../dx-react-core/docs/reference/action.md) | (size: number) => void | Changes the page size.
footer | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the grid footer.

### Exports

none
