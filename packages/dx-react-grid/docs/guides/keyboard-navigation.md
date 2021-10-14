# React Grid - Keyboard Navigation

The Grid component supports keyboard navigation. The following keys can be used:

- Tab / Shift + Tab - Moves the focus one cell forward/back.
- Arrow keys - Navigate to the corresponding element (above, below, left, right).
- Ctrl (Cmd) + Up/Down Arrow - Moves the focus between the header row, filter row, table, and footer.
- Ctrl (Cmd) + F - Moves the focus to the search panel (if it is visible).
- Enter (Return) - Performs the action of the focused element (expands/collapses row or group, switches the focused cell to the edit state).
- Esc - Discards edits (if a row is in the edit state).
- Space - Selects/deselects the focused row (if selection is enabled).
- Ctrl (Cmd) + Left/Right Arrow - Collapses/expands the focused row in tree mode.

## Related Plugins

The following plugins implement grouping features:

- [TableKeyboardNavigation](../reference/table-keyboard-navigation.md) - implements keyboard navigation.

Note that [plugin order](./plugin-overview.md#plugin-order) is important.

## Basic Setup

Import the `TableKeyboardNavigation` plugin to enable a user keyboard navigation.

### Uncontrolled Mode

In [uncontrolled mode](controlled-and-uncontrolled-modes.md#uncontrolled-mode), specify initially focused cell via the `TableKeyboardNavigation` plugin's `defaultFocusedCell` property.

.embedded-demo({ "path": "grid-keyboard-navigation/uncontrolled-mode", "showThemeSelector": true })

### Controlled Mode

In [controlled mode](controlled-and-uncontrolled-modes.md#controlled-mode), pass focused cell to the `TableKeyboardNavigation` plugin's `focusedCell` property and handle the `onFocusedCellChange` event to control focused cell externally.

.embedded-demo({ "path": "grid-keyboard-navigation/controlled-mode", "showThemeSelector": true })

### Focused Row

To apply a focused style to the row that contains the focused cell set the `focusedRowEnabled` property to true.

.embedded-demo({ "path": "grid-keyboard-navigation/focus-row", "showThemeSelector": true })
