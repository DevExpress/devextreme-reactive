# React Grid - Controlling Column Visibility

The Grid component with the [TableColumnVisibility](../reference/table-column-visibility.md) plugin provides a capability to hide existing columns in the table view. You can also use the [ColumnChooser](../reference/column-chooser.md) component to enable a user to show or hide columns at runtime.

## Related Components and Plugins

- The Grid component's [TableColumnVisibility](../reference/table-column-visibility.md) plugin manages the columns visibility.
- The [ColumnChooser](../reference/column-chooser.md) component provides the UI for column visibility management.

## Basic configuration

The steps required to enable a user to hide or show columns at runtime are described below.

### Configuring HiddenTableColumn plugin

Add the [TableColumnVisibility](../reference/table-column-visibility.md) plugin to the Grid. Assign an application's state variable holding hidden column names to the plugin's `hiddenColumns` property. In this case, the grid rerenders columns once the `hiddenColumns` state has been changed.

### Adding ColumnChooser

Add the ColumnChooser component to your application. Pass the information about all existing columns to ColumnChooser assigning the columns configuration array to the ColumnChooser's `columns` property. Finally, assign the applicatin's `hiddenColumns` state variable to the `hiddenColumns` property.

### Handling Column Visibility Changes

Assign a function that updates the `hiddenColumns` state variable to the ColumnChooser's `onHiddenColumnsChange` property to update the state once a user checks or unchecks a column item.

```js
this.hiddenColumnsChangeHandler = (hiddenColumns) => {
  this.setState({ hiddenColumns });
};
```

At this point, the Grid and the ColumnChooser a synchronized.

.embedded-demo(column-chooser/basic)
