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
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const localization = {
  tableView: {
    noDataText: 'Keine Daten verfügba',
  },
  editColumn: {
    addCommandText: 'Neue Zeile',
    editCommandText: 'Bearbeiten',
    deleteCommandText: 'Entfernen',
    commitCommandText: 'Speichern',
    cancelCommandText: 'Abbrechen',
  },
  groupingPanel: {
    groupByColumnText: 'Ziehen Sie eine Spalte hierhin, um danach zu gruppieren',
  },
  pagingPanel: {
    showAllText: 'Alle',
    infoText: 'Zeile {firstRow} von {lastRow}({totalCount} Elemente)',
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
          width={200}
          messages={localization.editColumn}
        />

        <TableFilterRow />
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
