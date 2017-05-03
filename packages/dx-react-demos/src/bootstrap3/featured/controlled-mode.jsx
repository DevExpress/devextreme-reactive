import React from 'react';
import {
    DataGrid,
    SortingState, EditingState, PagingState, GroupingState,
    LocalGrouping, LocalPaging, LocalSorting,
} from '@devexpress/dx-react-datagrid';
import {
    TableView, TableHeaderRow, TableEditRow, TableEditColumn,
    PagingPanel, GroupingPanel, TableGroupRow,
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
        length: 10000,
      }),
      sortings: [
        { column: 'product', direction: 'asc' },
        { column: 'saleDate', direction: 'asc' },
      ],
      grouping: [{ column: 'product' }],
      expandedGroups: ['EnviroCare Max'],
      editingRows: [],
      newRows: [],
      changedRows: {},
      currentPage: 0,
    };

    this.changeSortings = sortings => this.setState({ sortings });
    this.changeGrouping = grouping => this.setState({ grouping });
    this.changeExpandedGroups = expandedGroups => this.setState({ expandedGroups });
    this.changeEditingRows = editingRows => this.setState({ editingRows });
    this.changeNewRows = newRows => this.setState({ newRows });
    this.changeChangedRows = changedRows => this.setState({ changedRows });
    this.changeFilters = filters => this.setState({ filters });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.commitChanges = ({ created, updated, deleted }) => {
      let rows = this.state.rows.slice();
      if (created) {
        rows = [
          ...created.map((row, index) => ({
            id: rows.length + index,
            ...row,
          })),
          ...rows,
        ];
      }
      if (updated) {
        Object.keys(updated).forEach((key) => {
          const index = rows.findIndex(row => String(row.id) === key);
          if (index > -1) {
            const change = updated[index];
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
      sortings,
      grouping,
      expandedGroups,
      editingRows,
      newRows,
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
          sortings={sortings}
          sortingsChange={this.changeSortings}
        />
        <GroupingState
          grouping={grouping}
          groupingChange={this.changeGrouping}
          expandedGroups={expandedGroups}
          expandedGroupsChange={this.changeExpandedGroups}
        />
        <PagingState
          currentPage={currentPage}
          currentPageChange={this.changeCurrentPage}
          pageSize={10}
        />

        <LocalSorting />
        <LocalGrouping />
        <LocalPaging />

        <EditingState
          editingRows={editingRows}
          editingRowsChange={this.changeEditingRows}
          changedRows={changedRows}
          changedRowsChange={this.changeChangedRows}
          newRows={newRows}
          newRowsChange={this.changeNewRows}
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

        <TableHeaderRow sortingEnabled groupingEnabled />
        <TableEditRow />
        <TableEditColumn
          allowCreating={!this.state.newRows.length}
          allowEditing
          allowDeleting
        />
        <PagingPanel />
        <TableGroupRow />
        <GroupingPanel sortingEnabled />

      </DataGrid>
    );
  }
}
