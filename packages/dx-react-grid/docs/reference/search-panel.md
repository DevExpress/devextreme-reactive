# SearchPanel Plugin Reference

A plugin that renders a searching panel.

## User Reference

### Dependencies

- [SearchState](search-state.md)
- [IntegratedFiltering](integrated-filtering.md) [Optional]
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
InputComponent | ComponentType&lt;[SearchPanel.InputProps](#searchpanelinputprops)&gt; | | A component that renders the searching panel input element.
messages? | [SearchPanel.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### SearchPanel.InputProps

Describes properties passed to a component that renders the searching panel root element.

Field | Type | Description
------|------|------------
value | string | Specifies the search value
onValueChange | ({ value: string }) => void | Handles the search value changes.
getMessage | ([messageKey](#localization-messages): string) => string | Returns a specified localization message.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
searchPlaceholder? | string | 'Search...' | The search editor placeholder text.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
searchValue | Getter | string | The applied search value
changeSearchValue | Action | ({ value: string }) => void | Fires the `onValueChange` event with the corresponding value and change search value state

### Exports

none
