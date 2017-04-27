# DataGrid Editing

## Overview

The DataGrid component supports the create, update and delete editing features. Editing state management and UI controls are implemented as a set of corresponding plugins. Editing state contains the knowledge about which rows are currently being edited, what changes have been applied to a particular row, which rows have been deleted or newlly created but not commited yet. Once a particular change is commited the change is reset.

## Plugin List

There are several plugins that implement filtering features:
- [EditingState](../reference/editing-state.md)
- [TableEditRow](../reference/table-edit-row.md)
- [TableEditColumn](../reference/table-edit-column.md)

Note that [plugin order](../README.md#plugin-order) is very important.

## Set up a Simple Editable DataGrid

To set up basic editing, use the `EditingState`, `TableEditRow` and `TableEditColumn` plugins.

In this example, we use the uncontrolled mode and can optionally specify only the initial editing state via the `defaultNewRows` and `defaultEditingRows` properties of the `EditingState` plugin. After that, the grid will manage editing state internally.

To show editors for the rows that are being edited we use the `TableEditRow` plugin. To add a column with a set of editing controls such as New/Edit/Save/Cancel/Delete buttons we use the `TableEditColumn` plugin.

In order to apply the changes introduced by an end-user to your data source (doesn't matter local or remote) you can handle the `onCommitChanges` event of the `EditingState` plugin.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/editing/edit-row)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/editing/edit-row.jsx)

## Controlled Editing State

To fully control the editing state, you need to specify three pairs of the `EditingState` plugin properties. These are `editingState` and `editingStateChange`, `changedRows` and `changedRowsChange`, `newRows` and `newRowsChange`.

Note, that the `newRowsChange` event can also be used to initialize a newlly created row with some default property values.

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/editing/edit-row-controlled)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/editing/edit-row-controlled.jsx)


