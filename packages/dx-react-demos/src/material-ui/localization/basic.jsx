import React from 'react';
import {
  FilteringState,
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping,
  EditingState,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableGroupRow,
  GroupingPanel,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const tableMessages = {
  noData: 'Keine Daten verfügbar',
};
const editColumnMessages = {
  addCommand: 'Neue Zeile',
  editCommand: 'Bearbeiten',
  deleteCommand: 'Entfernen',
  commitCommand: 'Speichern',
  cancelCommand: 'Abbrechen',
};
const groupingPanelMessages = {
  groupByColumn: 'Ziehen Sie eine Spalte hierhin, um danach zu gruppieren',
};
const filterRowMessages = {
  filterPlaceholder: 'Filter...',
};
const pagingPanelMessages = {
  showAll: 'Alle',
  rowsPerPage: 'Zeilen pro Seite',
  info: 'Zeilen {from} bis {to} ({count} Elemente)',
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sektor' },
        { name: 'channel', title: 'Kanal' },
        { name: 'customer', title: 'Kunde' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 14 }),
    };

    // eslint-disable-next-line no-alert
    this.commitChanges = () => alert('Datenänderungen sind in dieser Demo nicht implementiert');
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <DragDropProvider />
          <FilteringState defaultFilters={[]} />
          <GroupingState defaultGrouping={[]} />
          <EditingState
            onCommitChanges={this.commitChanges}
          />

          <IntegratedFiltering />
          <IntegratedGrouping />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={5}
          />
          <IntegratedPaging />
          <Table
            messages={tableMessages}
          />
          <TableHeaderRow />

          <TableEditRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
            width={250}
            messages={editColumnMessages}
          />

          <TableFilterRow
            messages={filterRowMessages}
          />
          <Toolbar />
          <GroupingPanel
            showGroupingControls
            messages={groupingPanelMessages}
          />

          <TableGroupRow />
          <PagingPanel
            pageSizes={[5, 10, 15, 0]}
            messages={pagingPanelMessages}
          />
        </Grid>
      </Paper>
    );
  }
}
