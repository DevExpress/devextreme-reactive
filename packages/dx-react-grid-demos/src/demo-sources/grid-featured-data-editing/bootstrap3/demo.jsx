import React, { useState } from 'react';
import {
  SortingState, EditingState, PagingState, SummaryState,
  IntegratedPaging, IntegratedSorting, IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
  TableFixedColumns, TableSummaryRow,
} from '@devexpress/dx-react-grid-bootstrap3';
import { ProgressBarCell } from '../../../theme-sources/bootstrap3/components/progress-bar-cell';
import { HighlightedCell } from '../../../theme-sources/bootstrap3/components/highlighted-cell';
import { CurrencyTypeProvider } from '../../../theme-sources/bootstrap3/components/currency-type-provider';
import { PercentTypeProvider } from '../../../theme-sources/bootstrap3/components/percent-type-provider';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const CommandButton = ({
  onExecute, icon, text, hint, isDanger,
}) => (
  <button
    type="button"
    className="btn btn-link"
    onClick={(e) => {
      onExecute();
      e.stopPropagation();
    }}
    title={hint}
  >
    <span className={isDanger ? 'text-danger' : undefined}>
      {icon ? <i className={`glyphicon glyphicon-${icon}`} style={{ marginRight: text ? 5 : 0 }} /> : null}
      {text}
    </span>
  </button>
);

const AddButton = ({ onExecute }) => (
  <CommandButton icon="plus" text="New" hint="Create new row" onExecute={onExecute} />
);

const EditButton = ({ onExecute }) => (
  <CommandButton text="Edit" hint="Edit row" onExecute={onExecute} />
);

const DeleteButton = ({ onExecute }) => (
  <CommandButton
    icon="trash"
    hint="Delete row"
    isDanger
    onExecute={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
  />
);

const CommitButton = ({ onExecute }) => (
  <CommandButton text="Save" hint="Save changes" onExecute={onExecute} />
);

const CancelButton = ({ onExecute }) => (
  <CommandButton icon="remove" hint="Cancel changes" onExecute={onExecute} isDanger />
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const ButtonComponent = commandComponents[id];
  return (
    <ButtonComponent
      onExecute={onExecute}
    />
  );
};

const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

export const LookupEditCell = ({
  column, availableColumnValues, value, onValueChange,
}) => (
  <td
    style={{
      verticalAlign: 'middle',
      padding: 1,
    }}
  >
    <select
      className="form-control"
      style={{ width: '100%', textAlign: column.align }}
      value={value}
      onChange={e => onValueChange(e.target.value)}
    >
      {availableColumnValues.map(val => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  </td>
);

const Cell = (props) => {
  const { column } = props;
  if (column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
  }
  return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

export default () => {
  const [columns] = useState([
    { name: 'product', title: 'Product' },
    { name: 'region', title: 'Region' },
    { name: 'amount', title: 'Sale Amount' },
    { name: 'discount', title: 'Discount' },
    { name: 'saleDate', title: 'Sale Date' },
    { name: 'customer', title: 'Customer' },
  ]);
  const [rows, setRows] = useState(generateRows({
    columnValues: { id: ({ index }) => index, ...globalSalesValues },
    length: 12,
  }));
  const [tableColumnExtensions] = useState([
    { columnName: 'product', width: 200 },
    { columnName: 'region', width: 180 },
    { columnName: 'amount', width: 180, align: 'right' },
    { columnName: 'discount', width: 180 },
    { columnName: 'saleDate', width: 180 },
    { columnName: 'customer', width: 200 },
  ]);
  const [sorting, getSorting] = useState([]);
  const [editingRowIds, getEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  const [columnOrder, setColumnOrder] = useState(['product', 'region', 'amount', 'discount', 'saleDate', 'customer']);
  const [currencyColumns] = useState(['amount']);
  const [percentColumns] = useState(['discount']);
  const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
  const [totalSummaryItems] = useState([
    { columnName: 'discount', type: 'avg' },
    { columnName: 'amount', type: 'sum' },
  ]);

  const changeAddedRows = value => setAddedRows(
    value.map(row => (Object.keys(row).length ? row : {
      amount: 0,
      discount: 0,
      saleDate: new Date().toISOString().split('T')[0],
      product: availableValues.product[0],
      region: availableValues.region[0],
      customer: availableValues.customer[0],
    })),
  );

  const deleteRows = (deletedIds) => {
    const rowsForDelete = rows.slice();
    deletedIds.forEach((rowId) => {
      const index = rowsForDelete.findIndex(row => row.id === rowId);
      if (index > -1) {
        rowsForDelete.splice(index, 1);
      }
    });
    return rowsForDelete;
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      changedRows = deleteRows(deleted);
    }
    setRows(changedRows);
  };

  return (
    <div>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <SortingState
          sorting={sorting}
          onSortingChange={getSorting}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={getEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />
        <SummaryState
          totalItems={totalSummaryItems}
        />

        <IntegratedSorting />
        <IntegratedPaging />
        <IntegratedSummary />

        <CurrencyTypeProvider for={currencyColumns} />
        <PercentTypeProvider for={percentColumns} />

        <DragDropProvider />

        <Table
          columnExtensions={tableColumnExtensions}
          cellComponent={Cell}
        />
        <TableColumnReordering
          order={columnOrder}
          onOrderChange={setColumnOrder}
        />
        <TableHeaderRow showSortingControls />
        <TableEditRow
          cellComponent={EditCell}
        />
        <TableEditColumn
          width={140}
          showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
          commandComponent={Command}
        />
        <TableSummaryRow />
        <TableFixedColumns
          leftColumns={leftFixedColumns}
        />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    </div>
  );
};
