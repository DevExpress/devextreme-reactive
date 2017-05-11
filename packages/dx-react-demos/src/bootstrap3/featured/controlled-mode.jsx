import React from 'react';
import PropTypes from 'prop-types';
import {
    DataGrid,
    SortingState, EditingState, PagingState,
    LocalPaging, LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    TableView, TableHeaderRow, TableEditRow, TableEditColumn,
    PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';
import {
    ProgressBarCell,
} from './templates/progress-bar-cell';
import {
    HighlightedCell,
} from './templates/highlighted-cell';

import {
  generateRows,
  globalSalesValues,
} from '../../demoData';

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
    hint: 'Create new row',
    icon: 'plus',
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

export class ControlledModeDemo extends React.PureComponent {
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
        length: 200,
      }),
      sorting: [],
      editingRows: [],
      addedRows: [],
      changedRows: {},
      currentPage: 0,
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRows = editingRows => this.setState({ editingRows });
    this.changeAddedRows = addedRows => this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
        amount: 0,
        discount: 0.1,
        saleDate: new Date().toDateString(),
        product: availableValues.product[0],
        region: availableValues.region[0],
        customer: availableValues.customer[0],
      })),
    });
    this.changeChangedRows = changedRows => this.setState({ changedRows });
    this.changeFilters = filters => this.setState({ filters });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.commitChanges = ({ added, changed, deleted }) => {
      let rows = this.state.rows.slice();
      if (added) {
        rows = [
          ...added.map((row, index) => ({
            id: rows.length + index,
            ...row,
          })),
          ...rows,
        ];
      }
      if (changed) {
        Object.keys(changed).forEach((key) => {
          const index = rows.findIndex(row => String(row.id) === key);
          if (index > -1) {
            const change = changed[key];
            rows[index] = Object.assign({}, rows[index], change);
          }
        });
      }
      if (deleted) {
        deleted.forEach((rowId) => {
          const index = rows.findIndex(row => row.id === rowId);
          if (index > -1) {
            rows.splice(index, 1);
          }
        });
      }
      this.setState({ rows });
    };
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
    } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={row => row.id}
      >

        <SortingState
          sorting={sorting}
          onSortingChange={this.changeSorting}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={10}
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

        <TableView
          tableCellTemplate={({ row, column, style }) => {
            if (column.name === 'discount') {
              return (
                <ProgressBarCell value={row.discount * 100} style={style} />
              );
            } else if (column.name === 'amount') {
              return (
                <HighlightedCell align={column.align} value={row.amount} style={style} />
              );
            }
            return undefined;
          }}
        />

        <TableHeaderRow allowSorting />
        <TableEditRow
          editCellTemplate={(props) => {
            const { column } = props;
            const columnValues = availableValues[column.name];
            if (columnValues) {
              return <LookupEditCell {...props} availableValues={columnValues} />;
            }
            return undefined;
          }}
        />
        <TableEditColumn
          width={100}
          allowAdding={!this.state.addedRows.length}
          allowEditing
          allowDeleting
          commandTemplate={({ executeCommand, id }) => (
            commands[id]
            ? <CommandButton executeCommand={executeCommand} {...commands[id]} />
            : undefined
          )}
        />
        <PagingPanel />

      </DataGrid>
    );
  }
}
