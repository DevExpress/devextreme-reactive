# SearchingPanel Plugin Reference

A plugin that renders a searching panel.

## User Reference

### Dependencies

- [SearchingState](searching-state.md)
- [IntegratedFiltering](integrated-filtering.md)
- [Toolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rootComponent | ComponentType&lt;[SearchPanel.RootProps](#searchpanelrootprops)&gt; | | A component that renders the search panel root element.
messages? | [SearchPanel.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Interfaces

### SearchPanel.RootProps

Describes properties passed to a component that renders the search panel root element.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed in the search panel.
getMessage | ([messageKey](#localization-messages): string) => string | Returns the search panel placeholder text. Available in the "@devexpress/dx-react-grid-material-ui" package.

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
