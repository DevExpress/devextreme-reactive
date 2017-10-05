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
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const localization = {
  tableView: {
    noDataText: 'Нет данных',
  },
  editColumn: {
    addCommandText: 'Добавить',
    editCommandText: 'Редактировать',
    deleteCommandText: 'Удалить',
    commitCommandText: 'Сохранить',
    cancelCommandText: 'Отменить',
  },
  groupingPanel: {
    dragColumnHeaderText: 'Перетащите заголовок колонки для группировки',
    groupByColumnText: 'Кликните на иконку, чтобы сгруппировать по колонке',
    groupingUnavailableText: 'Группировка недоступна',
  },
  filterRow: {
    filterPlaceholderText: 'Фильтр...',
  },
  pagingPanel: {
    showAllText: 'Всё',
    rowsPerPageText: 'Строк на странице',
    infoText: 'с {0} по {1} из {2}',
  },
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'channel', title: 'Channel' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
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
          texts={localization.tableView}
        />
        <TableHeaderRow allowGroupingByClick />

        <TableEditRow />
        <TableEditColumn
          allowAdding
          allowEditing
          allowDeleting
        />

        <TableFilterRow />
        <GroupingPanel allowUngroupingByClick />
        <TableGroupRow />
        <PagingPanel
          allowedPageSizes={[5, 10, 15, 0]}
          showAllText={'Всё'}
        />
      </Grid>
    );
  }
}
