# DxSearchPanel Plugin Reference

A plugin that renders the Search Panel.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxSearchPanel } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxSearchPanel } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxSearchState](search-state.md)
- [DxIntegratedFiltering](integrated-filtering.md) [Optional]
- [DxToolbar](toolbar.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
inputComponent | [DxSearchPanel.DxInput](#dxsearchpaneldxinput) | | A component that renders the Search Panel input element.
messages? | [DxSearchPanel.LocalizationMessages](#localization-messages) | | An object that specifies localization messages.

## Component Types

### DxSearchPanel.DxInput

#### Props

Field | Type | Description
------|------|------------
value | string | Specifies the search value.
getMessage | ([messageKey](#localization-messages): string) => string | Returns a specified localization message.

#### Events

Field | Type | Description
------|------|------------
valueChange | (value: string) => void | Handles the search value changes.

## Localization Messages

Field | Type | Default | Description
------|------|---------|------------
searchPlaceholder? | string | 'Search...' | The search editor placeholder text.

## Plugin Components

Name | Type | Description
-----|------|------------
DxSearchPanel.components.DxInput | [DxSearchPanel.DxInput](#dxsearchpaneldxinput) | A component that renders the Search Panel input element.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
searchValue | Getter | string | The applied search value.
changeSearchValue | Action | (value:string) => void | Fires the `update:value` event with the corresponding value and changes the search value state.

### Exports

none
