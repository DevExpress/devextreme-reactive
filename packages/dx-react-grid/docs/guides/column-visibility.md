# React Grid - Controlling Column Visibility

A Grid component with the [TableColumnVisibility](../reference/table-column-visibility.md) and [ColumnChooser](../reference/column-chooser.md) plugins provides a capability to hide or show table columns at runtime.

## Related Plugins

- [TableColumnVisibility](../reference/table-column-visibility.md) - manages column visibility.
- [Toolbar](../reference/toolbar.md) - renders the Grid Toolbar.
- [ColumnChooser](../reference/column-chooser.md) - implements the column chooser.

## Basic Setup

Import the plugins listed above to enable a user to hide or show columns at runtime.

### Uncontrolled Mode

In the [uncontrolled mode](controlled-and-uncontrolled-modes.md#uncontrolled-mode), specify the initially hidden columns via the `TableColumnVisibility` plugin's `defaultHiddenColumns` property.

.embedded-demo(column-chooser/uncontrolled)

### Controlled Mode

In the [controlled mode](controlled-and-uncontrolled-modes.md#controlled-mode), pass the hidden columns to the `TableColumnVisibility` plugin's `hiddenColumns` property and handle the `onHiddenColumnsChange` event to control columns visibility externally.

.embedded-demo(column-chooser/controlled)
