# React Grid - Detail Row Editing

This document describes how to implement row editing via Detail Row. Before using this guide we recommend you explore the following articles: [Core Concepts](../../../core/docs/guides/fundamentals.md), [Custom Plugin Development](./custom-plugin-development.md).

## DetailEditCell plugin
This plugin is an intermediate layer between EditingState and TableDetailRow. It consists of the following plugin primitives:

### The `toggleDetailRowExpanded` Action
The TableDetailRow plugin exports action which is fired when a detail row is collapsed or shown. We use this action to enable editing mode when a detail row is expanded, and cancel editing mode when row is collapsed. This is achieved using the startEditRows and stopEditRows actions. We determine whether the row is collapsed or expanded by analyzing rowId and expandedDetailRowIds action. The code is shown below.

```jsx
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
```

### The `tableCell` Template
The next step is to pass the following data to the Detail Row component:
  - a function that handles onchange event and processes input changes.
```js
const processValueChange = ({ target: { name, value }}) => {
  const changeArgs = {
    rowId,
    change: createRowChange(row, value, name)
  };
  changeRow(changeArgs);
};
```

   - actions to apply and cancel changes
```js
const applyChanges = () => {
  toggleDetailRowExpanded({ rowId });
  commitChangedRows({ rowIds });
};
const cancelChanges = () => {
  toggleDetailRowExpanded({ rowId });
};
```

   - a changed row
```js
const rowId = editingRowIds[0];
const row = { ...params.tableRow.row, ...rowChanges[rowId] };
```

This data is passed via `params` prop to the `TemplatePlaceholder`.
```jsx
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
```

## Detail Cell Component
The props described above are then passed to the cell's content:
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

## Detail Cell Content Form
It is a simple edit form. The `processValueChange` function handles changes in it's inputs. It also has 2 buttons to apply and cancel changes.
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

## Toggle Icon
The last step is to override detail row toggle button icon. It is implemented by overriding a toggleCellComponent with a custom implementation.

.embedded-demo({ "path": "grid-detail-row/detail-row-controlled", "showThemeSelector": true })
