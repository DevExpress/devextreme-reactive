import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, EditingState, PagingState,
  LocalPaging, LocalSorting,
  ColumnOrderState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropContext,
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
  generateData,
  globalSalesValues,
} from '../../demo-data/generator';

const CommandButton = ({ executeCommand, icon, text, hint, isDanger }) => (
  <button
    className="btn btn-link"
    onClick={(e) => {
      executeCommand();
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
  executeCommand: PropTypes.func.isRequired,
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

const commands = {
  add: {
    text: 'New',
    hint: 'Create new rowData',
    icon: 'plus',
  },
  edit: {
    text: 'Edit',
    hint: 'Edit rowData',
  },
  delete: {
    icon: 'trash',
    hint: 'Delete rowData',
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

export const LookupEditCell = ({ column, value, onValueChange, availableValues }) => (
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
      {availableValues.map(val => <option key={val} value={val}>{val}</option>)}
    </select>
  </td>
);
LookupEditCell.propTypes = {
  column: PropTypes.object.isRequired,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  availableValues: PropTypes.array.isRequired,
};
LookupEditCell.defaultProps = {
  value: undefined,
};

const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

const getRowDataId = rowData => rowData.id;

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
      data: generateData({
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
      addedRows: addedRows.map(rowData => (Object.keys(rowData).length ? rowData : {
        amount: 0,
        discount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        product: availableValues.product[0],
        region: availableValues.region[0],
        customer: availableValues.customer[0],
      })),
    });
    this.changeChangedRows = changedRows => this.setState({ changedRows });
    this.changeFilters = filters => this.setState({ filters });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.commitChanges = ({ added, changed, deleted }) => {
      let data = this.state.data;
      if (added) {
        const startingAddedId = (data.length - 1) > 0 ? data[data.length - 1].id + 1 : 0;
        data = [
          ...data,
          ...added.map((rowData, index) => ({
            id: startingAddedId + index,
            ...rowData,
          })),
        ];
      }
      if (changed) {
        data = data.map(rowData =>
          (changed[rowData.id] ? { ...rowData, ...changed[rowData.id] } : rowData));
      }
      this.setState({ data, deletingRows: deleted || this.state.deletingRows });
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
    this.deleteRows = () => {
      const data = this.state.data.slice();
      this.state.deletingRows.forEach((rowId) => {
        const index = data.findIndex(rowData => rowData.id === rowId);
        if (index > -1) {
          data.splice(index, 1);
        }
      });
      this.setState({ data, deletingRows: [] });
    };
    this.changeColumnOrder = (order) => {
      this.setState({ columnOrder: order });
    };

    this.tableCellTemplate = ({ rowData, column, style }) => {
      if (column.name === 'discount') {
        return (
          <ProgressBarCell value={rowData.discount * 100} style={style} />
        );
      } else if (column.name === 'amount') {
        return (
          <HighlightedCell align={column.align} value={rowData.amount} style={style} />
        );
      }
      return undefined;
    };
    this.editCellTemplate = ({ column, value, onValueChange }) => {
      const columnValues = availableValues[column.name];
      if (columnValues) {
        return (
          <LookupEditCell
            column={column}
            value={value}
            onValueChange={onValueChange}
            availableValues={columnValues}
          />
        );
      }
      return undefined;
    };
    this.commandTemplate = ({ executeCommand, id }) => (
      commands[id]
        ? <CommandButton executeCommand={executeCommand} {...commands[id]} />
        : undefined
    );
  }
  render() {
    const {
      data,
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
          data={data}
          columns={columns}
          getRowDataId={getRowDataId}
        >
          <ColumnOrderState
            order={columnOrder}
            onOrderChange={this.changeColumnOrder}
          />

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

          <TableView
            tableCellTemplate={this.tableCellTemplate}
            allowColumnReordering
          />

          <TableHeaderRow allowSorting allowDragging />
          <TableEditRow
            editCellTemplate={this.editCellTemplate}
          />
          <TableEditColumn
            width={100}
            allowAdding={!this.state.addedRows.length}
            allowEditing
            allowDeleting
            commandTemplate={this.commandTemplate}
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
            <p>Are you sure to delete the following rowData?</p>
            <Grid
              data={data.filter(rowData => deletingRows.indexOf(rowData.id) > -1)}
              columns={columns}
            >
              <TableView
                tableCellTemplate={this.tableCellTemplate}
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
