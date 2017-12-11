import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, EditingState, PagingState,
  LocalPaging, LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropContext, TableColumnReordering,
} from '@devexpress/dx-react-grid-bootstrap3';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import {
  ProgressBarCell,
} from '../templates/progress-bar-cell';
import {
  HighlightedCell,
} from '../templates/highlighted-cell';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

const CommandButton = ({
  onExecute, icon, text, hint, isDanger,
}) => (
  <button
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
CommandButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
  icon: PropTypes.string,
  text: PropTypes.string,
  hint: PropTypes.string,
  isDanger: PropTypes.bool,
};
CommandButton.defaultProps = {
  icon: undefined,
  text: undefined,
  hint: undefined,
  isDanger: false,
};

const AddButton = ({ onExecute }) => (
  <CommandButton
    text="New"
    hint="Create new row"
    icon="plus"
    onExecute={onExecute}
  />
);
AddButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const EditButton = ({ onExecute }) => (
  <CommandButton
    text="Edit"
    hint="Edit row"
    onExecute={onExecute}
  />
);
EditButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const DeleteButton = ({ onExecute }) => (
  <CommandButton
    icon="trash"
    hint="Delete row"
    onExecute={onExecute}
    isDanger
  />
);
DeleteButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const CommitButton = ({ onExecute }) => (
  <CommandButton
    text="Save"
    hint="Save changes"
    onExecute={onExecute}
  />
);
CommitButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const CancelButton = ({ onExecute }) => (
  <CommandButton
    icon="remove"
    hint="Cancel changes"
    onExecute={onExecute}
    isDanger
  />
);
CancelButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

export const LookupEditCell = ({
  column, value, onValueChange,
}) => {
  const availableColumnValues = availableValues[column.name];
  return (
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
};
LookupEditCell.propTypes = {
  column: PropTypes.object.isRequired,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
};
LookupEditCell.defaultProps = {
  value: undefined,
};

const getRowId = row => row.id;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'amount', title: 'Sale Amount', align: 'right' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 12,
      }),
      sorting: [],
      editingRows: [],
      addedRows: [],
      changedRows: {},
      currentPage: 0,
      deletingRows: [],
      pageSize: 0,
      allowedPageSizes: [5, 10, 0],
      columnOrder: ['product', 'region', 'amount', 'discount', 'saleDate', 'customer'],
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRows = editingRows => this.setState({ editingRows });
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
    this.changeChangedRows = changedRows => this.setState({ changedRows });
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

    this.getCellComponent = (columnName) => {
      if (columnName === 'discount') {
        return ProgressBarCell;
      }
      if (columnName === 'amount') {
        return HighlightedCell;
      }
      return undefined;
    };
    this.getEditCellComponent = (columnName) => {
      if (availableValues[columnName]) {
        return LookupEditCell;
      }
      return undefined;
    };
    this.getEditCommandComponent = id => commandComponents[id];
  }
  render() {
    const {
      rows,
      columns,
      sorting,
      editingRows,
      addedRows,
      changedRows,
      currentPage,
      deletingRows,
      pageSize,
      allowedPageSizes,
      columnOrder,
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

          <LocalSorting />
          <LocalPaging />

          <EditingState
            editingRows={editingRows}
            onEditingRowsChange={this.changeEditingRows}
            changedRows={changedRows}
            onChangedRowsChange={this.changeChangedRows}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />

          <DragDropContext />

          <Table
            getCellComponent={this.getCellComponent}
          />

          <TableColumnReordering
            order={columnOrder}
            onOrderChange={this.changeColumnOrder}
          />

          <TableHeaderRow allowSorting allowDragging />
          <TableEditRow
            getCellComponent={this.getEditCellComponent}
          />
          <TableEditColumn
            width={100}
            allowAdding={!this.state.addedRows.length}
            allowEditing
            allowDeleting
            getCommandComponent={this.getEditCommandComponent}
          />
          <PagingPanel
            allowedPageSizes={allowedPageSizes}
          />
        </Grid>

        <Modal
          bsSize="large"
          show={!!deletingRows.length}
          onHide={this.cancelDelete}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Row</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure to delete the following row?</p>
            <Grid
              rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
              columns={columns}
            >
              <Table
                getCellComponent={this.getCellComponent}
              />
              <TableHeaderRow />
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.cancelDelete}>Cancel</Button>
            <Button className="btn-danger" onClick={this.deleteRows}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
