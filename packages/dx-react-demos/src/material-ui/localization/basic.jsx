import React from 'react';
import {
  FilteringState,
  LocalFiltering,
  GroupingState,
  LocalGrouping,
  EditingState,
  PagingState,
  LocalPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableFilterRow,
  TableGroupRow,
  GroupingPanel,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropContext,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const tableViewMessages = {
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
      <Grid
        rows={rows}
        columns={columns}
      >
        <DragDropContext />
        <FilteringState defaultFilters={[]} />
        <GroupingState defaultGrouping={[]} />
        <EditingState
          onCommitChanges={this.commitChanges}
        />

        <LocalFiltering />
        <LocalGrouping />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
        />
        <LocalPaging />
        <TableView
          messages={tableViewMessages}
        />
        <TableHeaderRow allowDragging />

        <TableEditRow />
        <TableEditColumn
          allowAdding
          allowEditing
          allowDeleting
          width={250}
          messages={editColumnMessages}
        />

        <TableFilterRow
          messages={filterRowMessages}
        />
        <GroupingPanel
          allowUngroupingByClick
          allowDragging
          messages={groupingPanelMessages}
        />

        <TableGroupRow />
        <PagingPanel
          allowedPageSizes={[5, 10, 15, 0]}
          messages={pagingPanelMessages}
        />
      </Grid>
    );
  }
}
