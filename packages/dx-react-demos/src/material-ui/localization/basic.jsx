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

import { TableCell } from 'material-ui';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

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
          tableNoDataCellTemplate={
            ({ style, colSpan }) => (
              <TableCell
                style={{ textAlign: 'center', width: '100%', ...style }}
                colSpan={colSpan}
              >
                Нет данных
              </TableCell>
            )
          }
        />
        <TableHeaderRow allowGroupingByClick allowDragging />

        <TableEditRow />
        <TableEditColumn
          allowAdding
          allowEditing
          allowDeleting
          addCommandText={'Добавить'}
          editCommandText={'Редактировать'}
          deleteCommandText={'Удалить'}
          commitCommandText={'Сохранить'}
          cancelCommandText={'Отменить'}
          width={250}
        />

        <TableFilterRow
          filterPlaceholderText={'Фильтр...'}
        />
        <GroupingPanel
          allowUngroupingByClick
          allowDragging
          dragColumnHeaderText={'Перетащите заголовок колонки для группировки'}
          groupByColumnText={'Кликните на иконку, чтобы сгруппировать по колонке'}
          groupingUnavailableText={'Группировка недоступна'}
        />
        <TableGroupRow />
        <PagingPanel
          allowedPageSizes={[5, 10, 15, 0]}
          showAllText={'Всё'}
          rowsPerPageText={'Строк на странице'}
          infoText={'с {0} по {1} из {2}'}
        />
      </Grid>
    );
  }
}
