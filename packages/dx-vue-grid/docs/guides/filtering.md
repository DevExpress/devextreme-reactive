# Vue Grid - Filtering

The Grid component supports filtering data by a column value programmatically or using the value an end user types in the corresponding Filter Row editor. The filtering state management, Filter Row rendering, and filtering logic are implemented in the related plugins.

## Related Plugins

The following plugins implement filtering features:

- [DxFilteringState](../reference/filtering-state.md) - controls the filtering state
- [DxIntegratedFiltering](../reference/integrated-filtering.md) - performs built-in data filtering
- [DxTableFilterRow](../reference/table-filter-row.md) - renders a filter row

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to set up a Grid with basic filtering.

Specify the filtering conditions in the `DxFilteringState` plugin's `filters` property and subscribe to the `update:filters` event. Use the `.sync` modifier for two-way binding.

.embedded-demo({ "path": "grid-filtering/basic", "showThemeSelector": true })

## Using Custom Filtering Algorithms

Specify a filtering predicate using the `DxIntegratedFiltering` plugin's `columnExtenstions` property to implement custom filtering logic for specific columns.

.embedded-demo({ "path": "grid-filtering/custom-filtering-algorithm", "showThemeSelector": true })

## Disable Filtering by a Column

You can prevent filtering by a specific column using the [DxFilteringState](../reference/filtering-state.md) plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-filtering/disable-column-filtering", "showThemeSelector": true })

## Custom Filter Operations

Specify the [DxTableFilterRow](../reference/table-filter-row.md) plugin's `showFilterSelector` property to allow filter operation selection for an end user. Define which filter operations are available for particular columns using the [DxDataTypeProvider](../reference/data-type-provider.md) `availableFilterOperations` property. You can also define a custom operation by passing a filtering predicate to the [DxIntegratedFiltering](../reference/integrated-filtering.md) plugin's `columnExtensions` property.

.embedded-demo({ "path": "grid-filtering/advanced-filter-row", "showThemeSelector": true })

## Customizing Filter Row Appearance

Pass a function that returns a custom component to the `DxTableFilterRow` plugin's `cellComponent` property to substitute the built-in filter row editors. In this case, delegate the component's state management to the `DxTableFilterRow` plugin by assigning the function's `filter` and `onFilter` arguments to the appropriate component's properties.

.embedded-demo({ "path": "grid-filtering/custom-filter-row", "showThemeSelector": true })

## Remote Filtering

It is possible to perform filtering remotely by handling filtering state changes, generating a request, and sending it to the server.

Filtering options are updated once an end user modifies the text in a Filter Row editor or other filtering control. Handle filtering option changes using the `DxFilteringState` plugin's `update:filters` event and request data from the server using the applied filtering options. Once the filtered data is received from the server, pass it to the `DxGrid` component's `rows` property.

Note that you do not need to use the `DxIntegratedFiltering` plugin for remote filtering.

.embedded-demo({ "path": "grid-filtering/remote-filtering", "showThemeSelector": true })

## Using Filtering with Other Data Processing Plugins

The order in which the plugins appear in the Grid's container is important when you use filtering features with paging or grouping. You need to choose whether to paginate filtered rows or filter the current page. In the first case, put the `DxIntegratedFiltering` plugin before the `DxIntegratedPaging` one. Otherwise, inverse the plugins' order.
