# React Grid - Editing in a Popup Form

This guide describes how to implement a pop-up edit form that allows users to edit row data. Before you start, review the following help topics:

- [Core Concepts](../../../core/docs/guides/fundamentals.md)
- [Custom Plugin Development](./custom-plugin-development.md)

The implementation consists of the following steps:

1. [Add a Custom Plugin](#add-a-custom-plugin)
1. [Handle Data Edits](#handle-data-edits)
1. [Add the Popup Edit Form](#add-the-popup-edit-form)

## Add a Custom Plugin

For information on custom plugins, refer to the following help topic: [Custom Plugin Development](./custom-plugin-development.md). In the following code, the plugin is called `PopupEditing` (you can rename it).

```jsx
const PopupEditing = () => (
  <Plugin name="PopupEditing">
  </Plugin>
)
```

## Handle Data Edits

To handle data edits, add the following functions:

- `processValueChange` - processes user input
- `applyChanges` - applies data edits
- `cancelChanges` - cancels data edits

Implement the functions in the `popupEditing` template and pass these functions and the row being edited to the `Popup` component. Pop-up form elements use these functions later.

```jsx
const PopupEditing = ({ popupComponent: Popup }) => (
  <Plugin name="PopupEditing">
    <Template name="popupEditing">
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
            stopEditRows, cancelAddedRows, cancelChangedRows,
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
              cancelChangedRows({ rowIds });
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

Implement the `Popup` component from the previous step. This component renders pop-up form elements: a title, multiple text fields in a grid, and Save and Cancel buttons. When the `onChange` event is raised, each text field executes the `onChange` function passed to the `Popup` (`processValueChange` in the previous step). Similarly, the buttons execute the `Popup`'s `onApplyChanges` and `onCancelChanges` functions (`applyChanges` and `cancelChanges`). All pop-up form elements are components from the Material-UI framework.

```jsx
const Popup = ({
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
            {/* ... */}
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

You can view the demo and the full code below:

.embedded-demo({ "path": "grid-editing/popup-editing", "showThemeSelector": true })
