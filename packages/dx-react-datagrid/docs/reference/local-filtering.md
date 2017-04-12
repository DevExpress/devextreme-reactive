# LocalFiltering Plugin Reference

Plugin that performs local data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | array&lt;any&gt; | Rows to be filtered
filters | Getter | array&lt;[Filter](filtering-state.md#filter)&gt; | Column filters to be applied

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | array&lt;any&gt; | Rows with applied local filtering

