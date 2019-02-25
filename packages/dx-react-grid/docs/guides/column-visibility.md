# React Grid - Column Visibility

A Grid component with the [TableColumnVisibility](../reference/table-column-visibility.md) and [ColumnChooser](../reference/column-chooser.md) plugins provides the capability to hide or show table columns at runtime.

## Related Plugins

- [TableColumnVisibility](../reference/table-column-visibility.md) - manages column visibility.
- [Toolbar](../reference/toolbar.md) - renders the Grid Toolbar.
- [ColumnChooser](../reference/column-chooser.md) - implements the column chooser.

## Basic Setup

Import the plugins listed above to enable a user to hide or show columns at runtime.

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md#uncontrolled-mode), specify initially hidden column names via the `TableColumnVisibility` plugin's `defaultHiddenColumnNames` property.

.embedded-demo({ "path": "grid-column-chooser/uncontrolled", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md#controlled-mode), pass the hidden column names to the `TableColumnVisibility` plugin's `hiddenColumnNames` property and handle the `onHiddenColumnNamesChange` event to control column visibility externally.

.embedded-demo({ "path": "grid-column-chooser/controlled", "showThemeSelector": true })

## Disallow Toggling Column Visibility

You can use the [TableColumnVisibility](../reference/table-column-visibility.md) plugin's `columnExtensions` property to prevent changing to a specific column's visibility.

.embedded-demo({ "path": "grid-column-chooser/disable-toggling-column-visibility", "showThemeSelector": true })
