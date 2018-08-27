# DxSearchState Plugin Reference

A plugin that manages the search state.

## Import

Use the following statement to import the plugin:

```js
import { DxSearchState } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
value | string |  | Specifies the applied search value.

### Events

Name | Type | Default | Description
-----|------|---------|------------
update:value? | (value: string) => void | | Handles search value changes.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
filterExpression | Getter | [FilterExpression](integrated-filtering.md#filterexpression) &#124; [Filter](filtering-state.md#filter) | The applied filter expressions.
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Grid columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
searchValue | Getter | string | The applied search value.
filterExpression | Getter | [FilterExpression](integrated-filtering.md#filterexpression) &#124; [Filter](filtering-state.md#filter) | The applied filter expressions.
changeSearchValue | Action | ({ value: string }) => void | Fires the `update:value` event with the corresponding value and changes the search value.
