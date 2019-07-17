# React Grid - Searching

The Grid component supports searching data programmatically or using the value an end user types in the corresponding Search Panel editor.

## Related Plugins

The following plugins implement the searching feature:

- [SearchState](../reference/search-state.md) - controls the search state
- [IntegratedFiltering](../reference/integrated-filtering.md) - performs built-in data searching and filtering
- [Toolbar](../reference/toolbar.md) - renders the Grid Toolbar
- [SearchPanel](../reference/search-panel.md) - renders the search panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to set up a Grid with basic searching.

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial searching value in the `SearchState` plugin's `defaultValue` property.

.embedded-demo({ "path": "grid-searching/uncontrolled-mode", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md), pass the search option to the `SearchState` plugin's `value` property and handle the `onValueChange` event to control the search state externally.

.embedded-demo({ "path": "grid-searching/controlled-mode", "showThemeSelector": true })

## Search in Visible Columns Only

The Grid component searches all columns, including those that are hidden using the [`TableColumnVisibility`](../reference/table-column-visibility.md) plugin. To prevent a search through invisible columns, use the `IntegratedFiltering` plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-searching/visible-columns-searching", "showThemeSelector": true })

## Remote Searching

You can perform a search remotely by handling search value changes, generating a request, and sending it to the server.

Searching options are updated once an end user modifies the text in a Search Panel editor or other searching control. Handle search value changes using the `SearchState` plugin's `onValueChange` event and request data from the server using the applied searching options. Once the search data is received from the server, pass it to the `Grid` component's `rows` property.

NOTE: Do not use the `IntegratedFiltering` plugin for remote searching.

.embedded-demo({ "path": "grid-searching/remote-mode", "showThemeSelector": true })
