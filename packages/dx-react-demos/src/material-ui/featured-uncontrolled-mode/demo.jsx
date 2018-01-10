import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropProvider, TableColumnReordering, Toolbar,
  TableColumnVisibility, ColumnChooser,
} from '@devexpress/dx-react-grid-material-ui';

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

const Cell = (props) => {
  if (props.column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (props.column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
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
      rows: generateRows({ columnValues: globalSalesValues, length: 1000 }),
      pageSizes: [5, 10, 15],
    };
  }
  render() {
    const {
      rows, columns, tableColumnExtensions, pageSizes,
    } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <FilteringState

            defaultFilters={[{ columnName: 'saleDate', value: '2016-02' }]}
          />
          <SortingState
            defaultSorting={[
              { columnName: 'product', direction: 'asc' },
              { columnName: 'saleDate', direction: 'asc' },
            ]}
          />

          <SelectionState />

          <GroupingState
            defaultGrouping={[{ columnName: 'product' }]}
            defaultExpandedGroups={['EnviroCare Max']}
          />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={10}
          />

          <IntegratedGrouping />
          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableSelection showSelectAll />

          <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

          <TableHeaderRow showSortingControls />
          <TableFilterRow />
          <PagingPanel
            pageSizes={pageSizes}
          />

          <TableGroupRow />
          <TableColumnVisibility
            defaultHiddenColumnNames={['customer']}
          />
          <Toolbar />
          <GroupingPanel showSortingControls />
          <ColumnChooser />
        </Grid>
      </Paper>
    );
  }
}
