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

const localization = {
  tableView: {
    noData: 'Keine Daten verfügba',
  },
  editColumn: {
    addCommand: 'Neue Zeile',
    editCommand: 'Bearbeiten',
    deleteCommand: 'Entfernen',
    commitCommand: 'Speichern',
    cancelCommand: 'Abbrechen',
  },
  groupingPanel: {
    groupByColumnText: 'Ziehen Sie eine Spalte hierhin, um danach zu gruppieren',
  },
  filterRow: {
    filterPlaceholder: 'Filter...',
  },
  pagingPanel: {
    showAll: 'Alle',
    rowsPerPage: 'Zeilen pro Seite',
    info: 'Zeile {firstRow} von {lastRow}({totalCount} Elemente)',
  },
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
          onCommitChanges={() => {}}
        />

        <LocalFiltering />
        <LocalGrouping />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
        />
        <LocalPaging />
        <TableView
          messages={localization.tableView}
        />
        <TableHeaderRow allowDragging />

        <TableEditRow />
        <TableEditColumn
          allowAdding
          allowEditing
          allowDeleting
          width={250}
          messages={localization.editColumn}
        />

        <TableFilterRow
          messages={localization.filterRow}
        />
        <GroupingPanel
          allowUngroupingByClick
          allowDragging
          messages={localization.groupingPanel}
        />

        <TableGroupRow />
        <PagingPanel
          allowedPageSizes={[5, 10, 15, 0]}
          messages={localization.pagingPanel}
        />
      </Grid>
    );
  }
}
