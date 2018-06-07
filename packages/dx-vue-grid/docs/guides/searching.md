# Vue Grid - Searching

The Grid component supports searching data programmatically or using the value an end user types in the corresponding Search Panel editor.

## Related Plugins

The following plugins implement the searching feature:

- [DxSearchState](../reference/search-state.md) - controls the search state
- [DxIntegratedFiltering](../reference/integrated-filtering.md) - performs built-in data searching and filtering
- [DxToolbar](../reference/toolbar.md) - renders the Grid Toolbar
- [DxSearchPanel](../reference/search-panel.md) - renders the search panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to set up a Grid with basic searching.

Specify the searching value in the `DxSearchState` plugin's `value` property and subscribe to the `update:value` event. Use the `.sync` modifier for two-way binding.

.embedded-demo({ "path": "grid-searching/basic", "showThemeSelector": true })

## Remote Searching

You can perform searching remotely by handling search value changes, generating a request, and sending it to the server.

Searching options are updated once an end user modifies the text in a Search Panel editor or other searching control. Handle search value changes using the `DxSearchState` plugin's `update:value` event and request data from the server using the applied searching options. Once the search data is received from the server, pass it to the `DxGrid` component's `rows` property.

NOTE: Do not use the `DxIntegratedFiltering` plugin for remote searching.

.embedded-demo({ "path": "grid-searching/remote-mode", "showThemeSelector": true })
