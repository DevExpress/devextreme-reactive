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
} from '@devexpress/dx-react-grid-material-ui';

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
        { name: 'region', title: 'Регион' },
        { name: 'sector', title: 'Сектор' },
        { name: 'channel', title: 'Канал' },
        { name: 'customer', title: 'Клиент' },
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
          width={250}
          texts={localization.editColumn}
        />

<<<<<<< HEAD
        <TableFilterRow
          texts={localization.filterRow}
        />
        <GroupingPanel
          allowUngroupingByClick
          allowDragging
          texts={localization.groupingPanel}
        />
=======
        <TableFilterRow />
        <GroupingPanel allowUngroupingByClick />
>>>>>>> parent of 67dbf2e4... Grouping localization spike
        <TableGroupRow />
        <PagingPanel
          allowedPageSizes={[5, 10, 15, 0]}
          texts={localization.pagingPanel}
        />
      </Grid>
    );
  }
}
