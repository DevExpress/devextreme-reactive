# SearchState Plugin Reference

A plugin that manages the search state.

## Import

Use the following statement to import the plugin:

```js
import { SearchState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
value? | string |  | Specifies the applied search value.
defaultValue? | string |  | Specifies the search value initially applied in the uncontrolled mode.
onValueChange? | (value: string) => void | | Handles search value changes.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
filterExpression | [Getter](../../../dx-react-core/docs/reference/getter.md) | [FilterExpression](integrated-filtering.md#filterexpression) &#124; [Filter](filtering-state.md#filter) | The applied filter expressions.
columns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Column](grid.md#column)&gt; | Grid columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
searchValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | string | The applied search value.
filterExpression | [Getter](../../../dx-react-core/docs/reference/getter.md) | [FilterExpression](integrated-filtering.md#filterexpression) &#124; [Filter](filtering-state.md#filter) | The applied filter expressions.
changeSearchValue | [Action](../../../dx-react-core/docs/reference/action.md) | ({ value: string }) => void | Fires the `onValueChange` event with the corresponding value and changes the search value.
