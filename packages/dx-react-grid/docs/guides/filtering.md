# React Grid Data Filtering

The Grid component supports filtering data by a column value programmatically or using the value an end-user types in the corresponding Filter Row editor. The filtering state management, Filter Row rendering, and filtering logic are implemented in the following plugins:

## Related Plugins

The following plugins implement filtering features:
- [FilteringState](../reference/filtering-state.md) - controls the filtering state
- [LocalFiltering](../reference/local-filtering.md) - performs local data filtering
- [TableFilterRow](../reference/table-filter-row.md) - renders a filter row

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Set up Local Filtering with the Filter Row

Import the plugins listed above to set up a Grid with basic filtering.

## Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial filtering conditions in the `FilteringState` plugin's `defaultFilters` property.

.embedded-demo(filtering/local-filter-row)

## Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the filtering options to the `FilteringState` plugin's `filters` property and handle the `onFiltersChange` event to control the filterings state externally.

.embedded-demo(filtering/local-filtering-controlled)

## Filter Row Customization

Define a filter row cell template using the `TableFilterRow` plugin's `filterCellTemplate` property to use a custom editor instead of the built-in one. Pass a function that renders a custom component to the `filterCellTemplate` property. Define the component's state and handle its changes using the `filter` and `setFilter` arguments respectively to delegate the component's state control to the `TableFilterRow` plugin. In this case, the `FilteringState` plugin handles changes internally, which allows you to use the Grid in both controlled and uncontrolled modes.

## Custom Filtering Algorithm

You can also specify a filtering predicate using the `LocalFiltering` plugin's `predicate` property to implement a custom filtering logic.

.embedded-demo(filtering/custom-filter-row)

## Remote Filtering

You can handle the Grid filtering state changes to request data from the server with the corresponding filters applied if your data service supports filtering operations.

Filtering options are updated once an end-user modifies a text within a Filter Row editor or other filtering control. Handle filtering option changes using the `FilteringState` plugin's `onFiltersChange` event and request data from the server using the applied filtering options. Once the filtered data is received from the server, pass it to the `Grid` component's `rows` property.

Note that in the case of remote filtering, you do not need to use the `LocalFiltering` plugin.

## Using Filtering with Other Data Processing Plugins

When you use filtering features with paging or grouping, take a note of the order in which the plugins appear in the Grid's container. You need to choose whether to paginate filtered rows or filter the current page. In the first case, put the `LocalFiltering` plugin before the `LocalPaging` one. Otherwise, inverse the plugins' order.

