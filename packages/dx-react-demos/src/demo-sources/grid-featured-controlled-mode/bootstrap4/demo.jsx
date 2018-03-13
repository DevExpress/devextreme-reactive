import * as React from 'react';
import {
  SortingState, EditingState, PagingState,
  IntegratedPaging, IntegratedSorting,
} from '@devexpress/dx-react-grid';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card } from 'reactstrap';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
} from '@devexpress/dx-react-grid-bootstrap4';
import { ProgressBarCell } from '../../../theme-sources/bootstrap4/components/progress-bar-cell';
import { HighlightedCell } from '../../../theme-sources/bootstrap4/components/highlighted-cell';
import { CurrencyTypeProvider } from '../../../theme-sources/bootstrap4/components/currency-type-provider';
import { PercentTypeProvider } from '../../../theme-sources/bootstrap4/components/percent-type-provider';

import { generateRows, globalSalesValues } from '../../../demo-data/generator';

const CommandButton = ({
  onExecute, icon, text, hint, color,
}) => (
  <button
    className="btn btn-link"
    style={{ padding: 11 }}
    onClick={(e) => {
      onExecute();
      e.stopPropagation();
    }}
    title={hint}
  >
    <span className={color || 'undefined'}>
      {icon ? <i className={`oi oi-${icon}`} style={{ marginRight: text ? 5 : 0 }} /> : null}
      {text}
    </span>
  </button>
);

const commandComponentProps = {
  add: {
    icon: 'plus',
    hint: 'Create new row',
  },
  edit: {
    icon: 'pencil',
    hint: 'Edit row',
    color: 'text-warning',
  },
  delete: {
    icon: 'trash',
    hint: 'Delete row',
    color: 'text-danger',
  },
  commit: {
    icon: 'check',
    hint: 'Save changes',
    color: 'text-success',
  },
  cancel: {
    icon: 'x',
    hint: 'Cancel changes',
    color: 'text-danger',
  },
};

const Command = ({ id, onExecute }) => (
  <CommandButton
    {...commandComponentProps[id]}
    onExecute={onExecute}
  />
);

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
      {availableColumnValues.map(val => <option key={val} value={val}>{val}</option>)}
    </select>
  </td>
);

const Cell = (props) => {
  if (props.column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (props.column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  const availableColumnValues = availableValues[props.column.name];
  if (availableColumnValues) {
    return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
  }
  return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'amount', title: 'Sale Amount' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right', width: 150 },
        { columnName: 'discount', width: 110 },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 12,
      }),
      sorting: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      currentPage: 0,
      deletingRows: [],
      pageSize: 0,
      pageSizes: [5, 10, 0],
      columnOrder: ['product', 'region', 'amount', 'discount', 'saleDate', 'customer'],
      currencyColumns: ['amount'],
      percentColumns: ['discount'],
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
    this.changeAddedRows = addedRows => this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
        amount: 0,
        discount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        product: availableValues.product[0],
        region: availableValues.region[0],
        customer: availableValues.customer[0],
      })),
    });
    this.changeRowChanges = rowChanges => this.setState({ rowChanges });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      if (added) {
        const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
    this.deleteRows = () => {
      const rows = this.state.rows.slice();
      this.state.deletingRows.forEach((rowId) => {
        const index = rows.findIndex(row => row.id === rowId);
        if (index > -1) {
          rows.splice(index, 1);
        }
      });
      this.setState({ rows, deletingRows: [] });
    };
    this.changeColumnOrder = (order) => {
      this.setState({ columnOrder: order });
    };
  }
  render() {
    const {
      rows,
      columns,
      tableColumnExtensions,
      sorting,
      editingRowIds,
      addedRows,
      rowChanges,
      currentPage,
      deletingRows,
      pageSize,
      pageSizes,
      columnOrder,
      currencyColumns,
      percentColumns,
    } = this.state;

    return (
      <Card>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />

          <IntegratedSorting />
          <IntegratedPaging />

          <CurrencyTypeProvider for={currencyColumns} />
          <PercentTypeProvider for={percentColumns} />

          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />

          <TableColumnReordering
            order={columnOrder}
            onOrderChange={this.changeColumnOrder}
          />

          <TableHeaderRow showSortingControls />
          <TableEditRow
            cellComponent={EditCell}
          />
          <TableEditColumn
            width={100}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>

        <Modal
          size="large"
          isOpen={!!deletingRows.length}
          onClosed={this.cancelDelete}
        >
          <ModalHeader>
            Delete Row
          </ModalHeader>
          <ModalBody>
            <p>Are you sure to delete the following row?</p>
            <Grid
              rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
              columns={columns}
            >
              <Table
                columnExtensions={tableColumnExtensions}
                cellComponent={Cell}
              />
              <TableHeaderRow />
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.cancelDelete}>Cancel</Button>
            <Button className="btn-danger" onClick={this.deleteRows}>Delete</Button>
          </ModalFooter>
        </Modal>
      </Card>
    );
  }
}
