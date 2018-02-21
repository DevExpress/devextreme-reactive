# React Grid - Searching

The Grid component supports searching data by a value programmatically or using the value an end user types in the corresponding Search Panel editor. 

## Related Plugins

The following plugins implement searching features:

- [SearchState](../reference/search-state.md) - controls the search state
- [IntegratedFiltering](../reference/integrated-filtering.md) - performs built-in data searching and filtering
- [SearchPanel](../reference/search-panel.md) - renders a search panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to set up a Grid with basic searching.

### Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial searching value in the `SearchState` plugin's `defaultSearchValue` property.

.embedded-demo(grid-searching/uncontrolled-mode)

### Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the search option to the `SearchState` plugin's `searchValue` property and handle the `onSearchValueChange` event to control the search state externally.

.embedded-demo(grid-searching/controlled-mode)

## Remote Searching

It is possible to perform searching remotely by handling search value state changes, generating a request, and sending it to the server.

Searching options are updated once an end user modifies the text in a Search Panel editor or other searching control. Handle searching option changes using the `SearchState` plugin's `onSearchValueChange` event and request data from the server using the applied searching options. Once the search data is received from the server, pass it to the `Grid` component's `rows` property.

Note that you do not need to use the `IntegratedFiltering` plugin for remote searching.

.embedded-demo(grid-searching/remote-mode)
