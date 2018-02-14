# SearchingState Plugin Reference

A plugin that manages the search value state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
searchValue? | string |  | Specifies the applied search value;
defaultSearchValue? | string |  | Specifies the search value initially applied in the uncontrolled mode.
onSearchValueChange? | (searchValue: string) => void | | Handles search value changes.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
filterExpr| Getter | [IntegratedFiltering.FilterExpr](integrated-filtering.md/#integratedfilteringfilterexpr) | The applied filter expressions.
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Grid columns.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
searchValue | Getter | string | The applied search value
filterExpr| Getter | [IntegratedFiltering.FilterExpr](integrated-filtering.md/#integratedfilteringfilterexpr) | The applied filter expressions.
changeSearchValue | Action | ({ searchValue: string }) => void | Fires the `onSearchValueChange` event with the corresponding searchValue and change search value state
