# Vue Grid - Column Visibility

The DxGrid component with the [DxTableColumnVisibility](../reference/table-column-visibility.md) and [DxColumnChooser](../reference/column-chooser.md) plugins provides the capability to hide or show table columns at runtime.

## Related Plugins

- [DxTableColumnVisibility](../reference/table-column-visibility.md) - manages column visibility.
- [DxToolbar](../reference/toolbar.md) - renders the Grid Toolbar.
- [DxColumnChooser](../reference/column-chooser.md) - implements the column chooser.

## Basic Setup

Import the plugins listed above to enable a user to hide or show columns at runtime.

Pass the hidden column names to the `DxTableColumnVisibility` plugin's `hiddenColumnNames` property and subscribe to the `update:hiddenColumnNames` event. Use the `.sync` modifier for two-way binding.

.embedded-demo({ "path": "grid-column-chooser/basic", "showThemeSelector": true })

## Disable Column Visibility Toggling

You can use the [DxTableColumnVisibility](../reference/table-column-visibility.md) plugin's `columnExtensions` property to prevent changing to a specific column's visibility.

.embedded-demo({ "path": "grid-column-chooser/disable-toggling-column-visibility", "showThemeSelector": true })
