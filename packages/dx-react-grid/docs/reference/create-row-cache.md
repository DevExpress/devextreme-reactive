# createRowCache

A function that instantiates the default implementation of row caching. We recommend that you use row caching in [lazy loading mode](../guides/lazy-loading.md) to reduce the number of network requests.

## Import

Use the following statement to import the function:

```js
import { createRowCache } from '@devexpress/dx-react-grid';
```

## User reference

### Arguments

Name | Type | Default | Description
-----|------|---------|------------
pageSize | number | 100 | The number of rows on a virtual page. It should be equal to the `pageSize` property value specified in the [VirtualTableState](virtual-table-state.md#properties) plugin.
capacity | number | Infinity | The maximum number of virtual pages that the cache should store. When capacity is reached, the oldest used page is removed from the cache to make room for new pages.

### Return Value

Type | Description
-----|------------
[RowCache](#rowcache) | A row cache.

## Interfaces

### RowCache

Describes a row cache.

Field | Type | Description
------|------|------------
getRows | (skip: number, take: number) => any[] | Returns from the cache the `take` number of rows starting with the `skip` row.
setRows | (skip: number, rows: ReadonlyArray&lt;any&gt;) => void | Adds `rows` to the cache.
invalidate | () => void | Clears the cache.
