# VirtualTableState Plugin Reference

A plugin that manages the remote data for the virtual table.

## Import

Use the following statement to import the plugin:

```js
import { VirtualTableState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
start | number | | Specifies the data index of first row in rows.
rowCount | number | | Specifies a total row count in data source.
virtualPageSize? | number | 100 | Specifies the count of rows in chunk.
loading | boolean | | Specifies whether
infinite? | boolean | | Enables infinite scrolling mode where rows are loaded consequently.
getRows | (skip: number, take: number) => void | | Initiates remote rows loading.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be rendered.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
remoteDataEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Specifies whether remote virtual scrolling is enabled.
remoteDataLoading | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Specifies whether remote rows are currently loading.
infiniteScrollingMode | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Specifies whether infinite scrolling mode is enabled.
start | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | Specifies first row data index.
requestNextPage | [Action](../../../dx-react-core/docs/reference/action.md) | (skip: number, take: number) => void | Initiates remote rows loading.
invalidateVirtalRowsCache | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Clears virtual rows cache.
