# createRowCache

A function that instantiates a default implementation of row cache. The cache is advised to be used in [lazy load mode](../guides/lazy-loading.md) to reduce the number of network requests.

## Import

Use the following statement to import the function:

```js
import { createRowCache } from '@devexpress/dx-react-grid';
```

## User reference

### Arguments

Name | Type | Default | Description
-----|------|---------|------------
pageSize | number | 100 | The number of rows on virtual page. It must be equal to the value of pageSize property of the [VirtualTableState](virtual-table-state.md#properties) plugin.
capacity | number | Infinity | The maximum number of pages that cache should store. When the cache reaches its capacity, it discards the least recently used virtual page.

### Return value

Type | Description
-----|------------
[RowCache](#rowcache) | A row cache.

## Interfaces

### RowCache

Describes a row cache.

Field | Type | Description
------|------|------------
getRows | (skip: number, take: number) => any[] | Returns `take` number of rows starting with the `skip` row from the cache.
setRows | (skip: number, rows: ReadonlyArray&lt;any&gt;) => void | Adds `rows` to the cache.
invalidate | () => void | Clears the cache
