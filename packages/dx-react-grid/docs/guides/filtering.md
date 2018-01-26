# React Grid - Filtering

The Grid component supports filtering data by a column value programmatically or using the value an end-user types in the corresponding Filter Row editor. The filtering state management, Filter Row rendering, and filtering logic are implemented in the related plugins.

## Related Plugins

The following plugins implement filtering features:

- [FilteringState](../reference/filtering-state.md) - controls the filtering state
- [IntegratedFiltering](../reference/integrated-filtering.md) - performs built-in data filtering
- [TableFilterRow](../reference/table-filter-row.md) - renders a filter row

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the plugins listed above to set up a Grid with basic filtering.

### Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md), specify the initial filtering conditions in the `FilteringState` plugin's `defaultFilters` property.

.embedded-demo(grid-filtering/filter-row)

### Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md), pass the filtering options to the `FilteringState` plugin's `filters` property and handle the `onFiltersChange` event to control the filtering state externally.

.embedded-demo(grid-filtering/controlled-mode)

### <a name="using-custom-filtering-algorithm"></a>Using Custom Filtering Algorithms

You can also specify a filtering predicate using the `IntegratedFiltering` plugin's `columnExtenstions` property to implement custom filtering logic for specific columns.

.embedded-demo(grid-filtering/custom-filtering-algorithm)

## Remote Filtering

It is possible to perform filtering remotely by handling filtering state changes, generating a request, and sending it to the server.

Filtering options are updated once an end-user modifies a text within a Filter Row editor or other filtering control. Handle filtering option changes using the `FilteringState` plugin's `onFiltersChange` event and request data from the server using the applied filtering options. Once the filtered data is received from the server, pass it to the `Grid` component's `rows` property.

Note that in the case of remote filtering, you do not need to use the `IntegratedFiltering` plugin.

.embedded-demo(grid-filtering/remote-filtering)

## Customizing Filter Row Appearance

Pass a function that returns a custom component to the `TableFilterRow` plugin's `cellComponent` property to substitute the built-in filter row editors. In this case, you should also delegate the component's state management to the `TableFilterRow` plugin assigning the function's `filter` and `onFilter` arguments to the appropriate component's properties.

.embedded-demo(grid-filtering/custom-filter-row)

## Using Filtering with Other Data Processing Plugins

The order in which the plugins appear in the Grid's container is important when you use filtering features with paging or grouping. You need to choose whether to paginate filtered rows or filter the current page. In the first case, put the `IntegratedFiltering` plugin before the `IntegratedPaging` one. Otherwise, inverse the plugins' order.
