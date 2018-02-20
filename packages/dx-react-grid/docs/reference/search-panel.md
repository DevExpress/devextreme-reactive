# SearchingPanel Plugin Reference

A plugin that renders a searching panel.

## User Reference

### Dependencies

- [SearchingState](searching-state.md)
- [IntegratedFiltering](integrated-filtering.md) [Optional]
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
inputComponent | ComponentType&lt;[SearchingPanel.InputProps](#searchingpanelinputprops)&gt; | | A component that renders the searching panel input element.
messages? | [SearchingPanel.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### SearchingPanel.InputProps

Describes properties passed to a component that renders the searching panel root element.

Field | Type | Description
------|------|------------
searchValue | string | Specifies the search value
changeSearchValue | ({ searchValue: string }) => Handles the search value changes.
getMessage | ([messageKey](#localization-messages): string) => string | Returns a specified localization message. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
searchPlaceholder? | string | 'Search...' | The search editor placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
searchValue | Getter | string | The applied search value
changeSearchValue | Action | ({ searchValue: string }) => void | Fires the `onSearchValueChange` event with the corresponding searchValue and change search value state

### Exports

none
