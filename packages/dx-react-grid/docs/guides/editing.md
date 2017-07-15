# React Grid Data Editing

## Overview

The Grid component supports the create, update and delete editing features. Editing state management and UI controls are implemented as a set of corresponding plugins. The editing state contains information about rows that are currently being edited, changes applied to a particular row, which rows have been deleted or created but not committed yet. Once a particular change is commited, the change is reset.

## Plugin List

There are several plugins that implement filtering features:
- [EditingState](../reference/editing-state.md)
- [TableEditRow](../reference/table-edit-row.md)
- [TableEditColumn](../reference/table-edit-column.md)

Note that the [plugin order](../README.md#plugin-order) is very important.

## Set up a Simple Editable Grid

To set up basic editing, use the `EditingState`, `TableEditRow` and `TableEditColumn` plugins.

In this example, we use the uncontrolled mode and can optionally specify only the initial editing state via the `defaultAddedRows` and `defaultEditingRows` properties of the `EditingState` plugin. After that, the grid will manage thet editing state internally.

To show editors for the rows being edited, we use the `TableEditRow` plugin. To add a column with a set of editing controls such as the New/Edit/Save/Cancel/Delete buttons, we use the `TableEditColumn` plugin.

To apply the changes introduced by an end-user to your data source (no matter local or remote), handle the `onCommitChanges` event of the `EditingState` plugin.

.embedded-demo(editing/edit-row)

## Controlled Editing State

To fully control the editing state, you need to specify three pairs of the `EditingState` plugin properties. These are `editingState` and `editingStateChange`, `changedRows` and `onChangedRowsChange`, `addedRows` and `onAddedRowsChange`.

Note, the `onAddedRowsChange` event can also be used to initialize a newly created row with some default property values.

.embedded-demo(editing/edit-row-controlled)


