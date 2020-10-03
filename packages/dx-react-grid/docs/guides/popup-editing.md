# React Grid - Popup Editing

This guide describes how to implement row editing via popup form. Before you start, review the following help topics:

- [Core Concepts](../../../core/docs/guides/fundamentals.md)
- [Custom Plugin Development](./custom-plugin-development.md)

The implementation consists of the following steps:

1. [Add a Custom Plugin](#add-a-custom-plugin)
1. [Handle Data Edits](#handle-data-edits)
1. [Add the Edit Form](#add-the-edit-form)

## Add a Custom Plugin

For information on custom plugins, refer to the following help topic: [Custom Plugin Development](./custom-plugin-development.md). In the following code, the plugin is called `EditPopupPlugin`, but you can rename it if required.

```jsx
const EditPopupPlugin = () => (
  <Plugin name="editPopup">
  </Plugin>
)
```

## Handle Data Edits

To handle data edits, add the following functions:

- `processValueChange` - processes user input
- `applyChanges` - applies data edits
- `cancelChanges` - cancels data edits

The popup form will use these functions later. Implement the functions in the `editPopup` template and pass them to the Popup component along with the row being edited.

```jsx
const EditPopupPlugin = ({ popupComponent: Popup }) => (
  <Plugin name="popupEditing">
    <Template name="editPopup">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
            stopEditRows, cancelAddedRows,
          },
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow;
          let rowId;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    {/* ... */}
  </Plugin>
```

## Add the Popup Edit Form

Implement a component that renders a popup form with multiple text fields and Save and Cancel buttons. Each text field should execute the `processValueChange` function when the `onChange` event is raised. The buttons should execute the `applyChanges` and `cancelChanges` functions.

```jsx
const EditDialog = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => (
  <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
    <DialogContent>
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="firstName"
              label="First Name"
              value={row.firstName || ''}
              onChange={onChange}
            />

          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="primary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);
```
