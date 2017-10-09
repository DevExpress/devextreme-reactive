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
    groupByColumnText: 'Перетащите заголовок колонки для группировки',
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
          texts={localization.tableView}
        />
        <TableHeaderRow allowDragging />

        <TableEditRow />
        <TableEditColumn
          allowAdding
          allowEditing
          allowDeleting
          width={200}
          texts={localization.editColumn}
        />

        <TableFilterRow />
        <GroupingPanel
          allowUngroupingByClick
          allowDragging
          texts={localization.groupingPanel}
        />
        <TableGroupRow />
        <PagingPanel
          allowedPageSizes={[5, 10, 15, 0]}
          showAllText={'Всё'}
        />
      </Grid>
    );
  }
}
