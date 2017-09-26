# React Grid - Controlling Column Visibility

The Grid component has builtin powers for an end-user to control which columns should be displayed. This ability is achieved by a combination of the [TableColumnVisibility](../reference/table-column-visibility.md) Grid plugin and the [ColumnChooser](../reference/column-chooser.md) component.

## Basic configuration

### Preparations

To enable end-user control on the visible Grid columns it is required to complete the following steps. First of all define a property to hold names of the hidden columns in the state of your application (`hiddenColumnNames` is used for this purpose in the demo below). Add the Grid component and configure it according to your requirements.

### HiddenTableColumn configuration

The [TableColumnVisibility](../reference/table-column-visibility.md) plugin is required to enable columns hiding. Add it to your Grid. Then pass the array of names of the columns to be hidden which is stored in the state of your application to the plugin's `hiddenColumnNames` property.


### Adding ColumnChooser

Add the ColumnChooser component to the layout of your application. Then provide both columns and names of hidden columns to the ColumnChooser:
- pass the same columns available to your Grid to the ColumnChooser `columns` property;
- pass the array of hidden columns from your application state to the `hiddenColumnNames` property.

Now both Grid and ColumnChooser are configured to display the same state of visible columns.

### Handling Column Toggling

The only thing left is to allow applying changes to the state of column visibility. To achieve this use the `onHiddenColumnNamesChange` property of the ColumnChooser which accepts a function to handle the change of the hidden column names array. The typical example of this handler is shown below.

```js
this.hiddenColumnNamesChangeHandler = (hiddenColumnNames) => {
  this.setState({ hiddenColumnNames });
};
```

For more details, please check the source code of the demo below.

.embedded-demo(column-chooser/basic)
