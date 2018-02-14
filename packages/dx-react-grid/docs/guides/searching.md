# React Grid - Searching

The Grid component supports searching data by a value programmatically or using the value an end user types in the corresponding Search Panel editor. 

## Related Plugins

The following plugins implement searching features:

- [SearchingState](../reference/searching-state.md) - controls the searching state
- [IntegratedFiltering](../reference/integrated-filtering.md) - performs built-in data searching and filtering
- [SearchPanel](../reference/search-panel.md) - renders a search panel

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to set up a Grid with basic searching.

### Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial searching value in the `SearchingState` plugin's `defaultSearchValue` property.

.embedded-demo(grid-searching/uncontrolled-mode)

### Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the search option to the `SearchingState` plugin's `searchValue` property and handle the `onSearchValueChange` event to control the search state externally.

.embedded-demo(grid-searching/controlled-mode)
