import * as React from 'react';
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
import {
  Modal,
  Button,
} from 'react-bootstrap';
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

const commandComponentProps = {
  add: {
    icon: 'plus',
    text: 'New',
    hint: 'Create new row',
  },
  edit: {
    text: 'Edit',
    hint: 'Edit row',
  },
  delete: {
    icon: 'trash',
    hint: 'Delete row',
    isDanger: true,
  },
  commit: {
    text: 'Save',
    hint: 'Save changes',
  },
  cancel: {
    icon: 'remove',
    hint: 'Cancel changes',
    isDanger: true,
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
        { columnName: 'product', width: 200 },
        { columnName: 'region', width: 180 },
        { columnName: 'amount', width: 180, align: 'right' },
        { columnName: 'discount', width: 180 },
        { columnName: 'saleDate', width: 180 },
        { columnName: 'customer', width: 200 },
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
      fixedColumnTypes: [TableEditColumn.COLUMN_TYPE],
      totalSummaryItems: [
        { columnName: 'discount', type: 'avg' },
        { columnName: 'amount', type: 'sum' },
      ],
    };
    const getStateDeletingRows = () => {
      const { deletingRows } = this.state;
      return deletingRows;
    };

    const getStateRows = () => {
      const { rows } = this.state;
      return rows;
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
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
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
      this.setState({ rows, deletingRows: deleted || getStateDeletingRows() });
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
    this.deleteRows = () => {
      const rows = getStateRows().slice();
      getStateDeletingRows().forEach((rowId) => {
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
      fixedColumnTypes,
      totalSummaryItems,
    } = this.state;

    return (
      <div>
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
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
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
            onOrderChange={this.changeColumnOrder}
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
          <TableFixedColumns
            leftColumnTypes={fixedColumnTypes}
          />
          <TableSummaryRow />
          <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>

        <Modal
          bsSize="large"
          show={!!deletingRows.length}
          onHide={this.cancelDelete}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Delete Row
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure to delete the following row?
            </p>
            <Grid
              rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
              columns={columns}
            >
              <CurrencyTypeProvider for={currencyColumns} />
              <PercentTypeProvider for={percentColumns} />
              <Table
                columnExtensions={tableColumnExtensions}
                cellComponent={Cell}
              />
              <TableHeaderRow />
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.cancelDelete}>
              Cancel
            </Button>
            <Button className="btn-danger" onClick={this.deleteRows}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
