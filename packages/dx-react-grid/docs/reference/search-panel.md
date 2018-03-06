# SearchPanel Plugin Reference

A plugin that renders the Search Panel.

## User Reference

### Dependencies

- [SearchState](search-state.md)
- [IntegratedFiltering](integrated-filtering.md) [Optional]
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
inputComponent | ComponentType&lt;[SearchPanel.InputProps](#searchpanelinputprops)&gt; | | A component that renders the Search Panel input element
messages? | [SearchPanel.LocalizationMessages](#localization-messages) | | An object that specifies localization messages

## Interfaces

### SearchPanel.InputProps

Describes properties passed to a component that renders the Search Panel root element.

Field | Type | Description
------|------|------------
value | string | Specifies the search value
onValueChange | (value:string) => void | Handles the search value changes
getMessage | ([messageKey](#localization-messages): string) => string | Returns a specified localization message

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
searchPlaceholder? | string | 'Search...' | The search editor placeholder text

## Plugin Components

Name | Properties | Description
-----|------------|------------
SearchPanel.Input | [SearchPanel.InputProps](#inputprops) | A component that renders the Search Panel input element

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
searchValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | string | The applied search value
changeSearchValue | [Action](../../../dx-react-core/docs/reference/action.md) | (value:string) => void | Fires the `onValueChange` event with the corresponding value and changes the search value state

### Exports

none
