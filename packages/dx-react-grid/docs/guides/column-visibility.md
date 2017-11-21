# React Grid - Controlling Column Visibility

A Grid component with the [TableColumnVisibility](../reference/table-column-visibility.md) plugin provides the capability to hide existing columns in the table view. You can also use the [ColumnChooser](../reference/column-chooser.md) component to allow a user to show or hide columns at runtime.

## Related Components and Plugins

- The Grid component's [TableColumnVisibility](../reference/table-column-visibility.md) plugin manages column visibility.
- The [ColumnChooser](../reference/column-chooser.md) component provides the UI for column visibility management.

## Basic configuration

Follow the steps below to enable a user to hide or show columns at runtime.

### Configuring HiddenTableColumn plugin

Add the [TableColumnVisibility](../reference/table-column-visibility.md) plugin to the Grid. Assign an application's state variable storing hidden column names to the plugin's `hiddenColumns` property. In this case, the grid rerenders columns once the `hiddenColumns` state changes.

### Adding ColumnChooser

Add the ColumnChooser component to your application. Pass the existing columns' information to the ColumnChooser by assigning the columns' configuration array to the ColumnChooser's `columns` property. Finally, assign the application's `hiddenColumns` state variable to the `hiddenColumns` property.

### Handling Column Visibility Changes

Assign a function that sends the `hiddenColumns` state variable to the ColumnChooser's `onHiddenColumnsChange` property to update the state once a user checks or unchecks a column item.

```js
this.hiddenColumnsChangeHandler = (hiddenColumns) => {
  this.setState({ hiddenColumns });
};
```

.embedded-demo(column-chooser/basic)
