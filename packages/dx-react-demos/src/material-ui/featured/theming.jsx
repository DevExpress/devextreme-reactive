import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  LocalFiltering, LocalGrouping, LocalPaging, LocalSorting,
  ColumnOrderState, RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropContext, TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';

import { MuiThemeProvider, withStyles, createStyleSheet } from 'material-ui/styles';

import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from '../../demoData';

const styleSheet = createStyleSheet('ThemingDemo', () => ({
  detailContainer: {
    margin: 20,
  },
}));

const GridDetailContainerBase = ({
  columns,
  data,
  classes,
}) => (
  <div className={classes.detailContainer}>
    <div>
      <h5>{data.firstName} {data.lastName}&apos;s Tasks:</h5>
    </div>
    <Grid
      rows={data.tasks}
      columns={columns}
    >
      <TableView />
      <TableHeaderRow />
    </Grid>
  </div>
);
GridDetailContainerBase.propTypes = {
  data: PropTypes.shape().isRequired,
  columns: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const GridDetailContainer = withStyles(styleSheet)(GridDetailContainerBase);

// eslint-disable-next-line
const createGrid = () => ({ rows, columns, allowedPageSizes, detailColumns }) => (<Grid
  rows={rows}
  columns={columns}
>
  <ColumnOrderState defaultOrder={columns.map(column => column.name)} />

  <FilteringState />
  <SortingState
    defaultSorting={[
      { columnName: 'product', direction: 'asc' },
    ]}
  />
  <GroupingState />
  <PagingState
    defaultCurrentPage={0}
    defaultPageSize={10}
  />
  <RowDetailState
    defaultExpandedRows={[2]}
  />

  <LocalFiltering />
  <LocalSorting />
  <LocalGrouping />
  <LocalPaging />

  <SelectionState
    defaultSelection={[1, 3, 18]}
  />

  <DragDropContext />

  <TableView allowColumnReordering />

  <TableHeaderRow allowSorting allowGrouping allowDragging />
  <TableFilterRow />
  <PagingPanel
    allowedPageSizes={allowedPageSizes}
  />
  <TableSelection />
  <TableRowDetail
    template={({ row }) => (
      <GridDetailContainer
        data={row}
        columns={detailColumns}
      />
    )}
  />
  <TableGroupRow />
  <GroupingPanel allowSorting />
</Grid>);

export class ThemingDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'prefix', title: 'Title', width: 90 },
        { name: 'firstName', title: 'First Name' },
        { name: 'lastName', title: 'Last Name' },
        { name: 'position', title: 'Position', width: 170 },
        { name: 'state', title: 'State', width: 125 },
        { name: 'birthDate', title: 'Birth Date', width: 135 },
      ],
      detailColumns: [
        { name: 'subject', title: 'Subject' },
        { name: 'startDate', title: 'Start Date', width: 115 },
        { name: 'dueDate', title: 'Due Date', width: 115 },
        { name: 'priority', title: 'Priority', width: 100 },
        { name: 'status', title: 'Status', caption: 'Completed', width: 125 },
      ],
      rows: generateRows({
        columnValues: {
          ...employeeValues,
          tasks: ({ random }) => generateRows({
            columnValues: employeeTaskValues,
            length: Math.floor(random() * 3) + 4,
            random,
          }),
        },
        length: 40,
      }),
      allowedPageSizes: [5, 10, 15],
    };
  }
  render() {
    const { rows, columns, allowedPageSizes, detailColumns } = this.state;
    const GridInst = createGrid();

    return (
      <MuiThemeProvider theme={this.props.theme}>
        <GridInst
          rows={rows}
          columns={columns}
          allowedPageSizes={allowedPageSizes}
          detailColumns={detailColumns}
        />
      </MuiThemeProvider>
    );
  }
}

ThemingDemo.propTypes = {
  theme: PropTypes.object.isRequired,
};
