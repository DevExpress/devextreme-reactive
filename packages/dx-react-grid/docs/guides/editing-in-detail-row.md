# React Grid - Editing in Detail Row

The [detail row](./detail-row.md) is an expandable pane that displays data row details. The detail row does not allow users to edit data out of the box, but you can create a custom plugin to implement this functionality. Before you start, review the following help topics:

- [Core Concepts](../../../core/docs/guides/fundamentals.md)
- [Custom Plugin Development](./custom-plugin-development.md)

The implementation consists of the following steps:

1. [Add a Custom Plugin](#add-a-custom-plugin)
1. [Handle the Detail Row Expand and Collapse Events](#handle-the-detail-row-expand-and-collapse-events)
1. [Handle Data Edits](#handle-data-edits)
1. [Add the Edit Form](#add-the-edit-form)
1. [Replace the Expand Icon](#replace-the-expand-icon)

## Add a Custom Plugin

For information on custom plugins, refer to the following help topic: [Custom Plugin Development](./custom-plugin-development.md). In the following code, the plugin is called `DetailEditCell`, but you can rename it if required.

```jsx
const DetailEditCell = () => (
  <Plugin name="DetailEditCell">
  </Plugin>
)
```

## Handle the Detail Row Expand and Collapse Events

When a user expands or collapses a detail row, the [TableRowDetail](../reference/table-row-detail.md) plugin executes the `toggleDetailRowExpanded` action. Override this action to switch an expanded row to the edit state or switch a collapsed row back to the normal state.

The IDs of expanded rows are included in the `expandedDetailRowIds` array. To find whether a row is expanded or collapsed, check if this array includes the row ID.

```jsx
const DetailEditCell = () => (
  <Plugin name="DetailEditCell">
    <Action
      name="toggleDetailRowExpanded"
      action={({ rowId }, { expandedDetailRowIds }, { startEditRows, stopEditRows }) => {
        const rowIds = [rowId];
        const isCollapsing = expandedDetailRowIds.indexOf(rowId) > -1;
        if (isCollapsing) {
          stopEditRows({ rowIds });
        } else {
          startEditRows({ rowIds });
        }
      }}
    />
  </Plugin>
)
```

## Handle Data Edits

To handle data edits, add the following functions:

- `processValueChange` - processes user input
- `applyChanges` - applies data edits
- `cancelChanges` - cancels data edits

The detail row and the edit form in it will use these functions later. Implement the functions in the `tableCell` template and pass them as `params` to the [TemplatePlaceholder](../../../dx-react-core/docs/reference/template-placeholder.md) along with the row being edited.

```jsx
const DetailEditCell = () => (
  <Plugin name="DetailEditCell">
    {/* ... */}
    <Template
      name="tableCell"
      predicate={({ tableRow }) => tableRow.type === TableRowDetail.ROW_TYPE}
    >
      {(params) => (
        <TemplateConnector>
          {({
            tableColumns,
            editingRowIds,
            createRowChange,
            rowChanges,
          }, {
            changeRow, commitChangedRows, toggleDetailRowExpanded,
          }) => {
            if (tableColumns.indexOf(params.tableColumn) !== 0) {
              return null;
            }
            const rowId = editingRowIds[0];
            const rowIds = editingRowIds;
            const row = { ...params.tableRow.row, ...rowChanges[rowId] };

            const processValueChange = ({ target: { name, value }}) => {
              const changeArgs = {
                rowId,
                change: createRowChange(row, value, name)
              };
              changeRow(changeArgs);
            };

            const applyChanges = () => {
              toggleDetailRowExpanded({ rowId });
              commitChangedRows({ rowIds });
            };
            const cancelChanges = () => {
              toggleDetailRowExpanded({ rowId });
            };

            return (
              <TemplatePlaceholder params={{
                ...params,
                row,
                tableRow: {
                  ...params.tableRow,
                  row,
                },
                changeRow,
                processValueChange,
                applyChanges,
                cancelChanges,
              }} />
            );
          }}
        </TemplateConnector>
      )}
    </Template>
  </Plugin>
)
```

The functions and the row being edited are then passed on to the child elements of [TableRowDetail.Cell](../reference/table-row-detail.md#tablerowdetailcellprops). These elements are edit form elements.

```jsx
const DetailCell = ({
  children, changeRow, editingRowIds, addedRows, processValueChange,
  applyChanges, cancelChanges,
  ...restProps
}) => {
  const { row } = restProps;

  return (
    <TableRowDetail.Cell {...restProps}>
      {React.cloneElement(children, {
        row, changeRow, processValueChange, applyChanges, cancelChanges,
      })}
    </TableRowDetail.Cell>
  );
};
```

## Add the Edit Form

Implement a component that renders an edit form with multiple text fields and Save and Cancel buttons. Each text field should execute the `processValueChange` function when the `onChange` event is raised. The buttons should execute the `applyChanges` and `cancelChanges` functions.

```jsx
const DetailContent = ({ row, ...rest }) => {
  const {
    processValueChange,
    applyChanges,
    cancelChanges,
  } = rest;
  return (
    ...
      <TextField
        margin="normal"
        name="prefix"
        label="Title"
        value={row.prefix}
        onChange={processValueChange}
      />
    ... // other editors
      <Button onClick={applyChanges} variant="text" color="primary">
          Save
      </Button>
      <Button onClick={cancelChanges} color="secondary">
        Cancel
      </Button>
      ...
  )
}
```

## Replace the Expand Icon

Replace the Expand icon with a text label: `Edit` for collapsed rows, `Cancel` for expanded rows.

```jsx
const styles = theme => ({
  toggleCell: {
    textAlign: 'center',
    textOverflow: 'initial',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
  },
  toggleCellButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    padding: theme.spacing(1),
  },
});

const ToggleCellBase = ({
  style, expanded, classes, onToggle,
  tableColumn, tableRow, row,
  className,
  ...restProps
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };
  return (
    <TableCell
      className={classNames(classes.toggleCell, className)}
      style={style}
      {...restProps}
    >
      <IconButton
        className={classes.toggleCellButton}
        onClick={handleClick}
      >
        {
          expanded
            ? <Cancel />
            : <Edit />
        }
      </IconButton>
    </TableCell>
  );
};

const ToggleCell = withStyles(styles, { name: 'ToggleCell' })(ToggleCellBase);
```

You can view the demo and the full code below:

.embedded-demo({ "path": "grid-editing/detail-row-editing", "showThemeSelector": true })
