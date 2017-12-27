import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, SelectionState, FilteringState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  TableColumnReordering, GroupingPanel, DragDropProvider, Toolbar,
} from '@devexpress/dx-react-grid-bootstrap3';
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

const getRowId = row => row.id;

const Cell = (props) => {
  if (props.column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (props.column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <VirtualTable.Cell {...props} />;
};
Cell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

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
        { columnName: 'amount', align: 'right' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 200000,
      }),
    };
  }
  render() {
    const { rows, columns, tableColumnExtensions } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <DragDropProvider />

        <FilteringState
          defaultFilters={[{ columnName: 'saleDate', value: '2016-02' }]}
        />
        <SortingState
          defaultSorting={[
            { columnName: 'product', direction: 'asc' },
            { columnName: 'saleDate', direction: 'asc' },
          ]}
        />
        <GroupingState
          defaultGrouping={[{ columnName: 'product' }]}
          defaultExpandedGroups={['EnviroCare Max']}
        />
        <SelectionState />

        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedGrouping />
        <IntegratedSelection />

        <VirtualTable
          columnExtensions={tableColumnExtensions}
          cellComponent={Cell}
        />

        <TableColumnReordering defaultOrder={columns.map(column => column.name)} />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        <TableSelection showSelectAll />
        <TableGroupRow />
        <Toolbar />
        <GroupingPanel showSortingControls />
      </Grid>
    );
  }
}
