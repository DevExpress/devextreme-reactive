import React from 'react';
import { Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { getColumnSortingDirection } from '@devexpress/dx-datagrid-core';
import extendWithEventListener from '../utils/extendWithEventListener';

export class TableHeaderRowSorting extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableExtraProps = (tableExtraProps, tableHeaderRows, tableColumns, setColumnSorting) =>
      extendWithEventListener(tableExtraProps, 'onClick', ({ rowId, columnName, e }) => {
        const clickedRow = tableHeaderRows.find(row => row.id === rowId);
        const clickedColumn = tableColumns.find(column => column.name === columnName);
        if (!clickedRow || clickedRow.type !== 'heading' || !clickedColumn || clickedColumn.type) return;
        setColumnSorting({ columnName, keepOther: e.shiftKey });
      });
  }
  render() {
    const SortableCell = this.props.sortableCellTemplate;

    return (
      <div>
        <Getter
          name="tableExtraProps"
          pureComputed={this._tableExtraProps}
          connectArgs={(getter, action) => [
            getter('tableExtraProps'),
            getter('tableHeaderRows'),
            getter('tableColumns'),
            action('setColumnSorting'),
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'heading' && !column.type}
          connectGetters={(getter, { column }) => ({
            direction: getColumnSortingDirection(getter('sortings'), column.name),
          })}
          connectActions={(action, { column }) => ({
            changeDirection: ({ keepOther }) => action('setColumnSorting')({ columnName: column.name, keepOther }),
          })}
        >
          {({ direction, changeDirection }) => (
            <SortableCell direction={direction} changeDirection={changeDirection}>
              <TemplatePlaceholder />
            </SortableCell>
          )}
        </Template>
      </div>
    );
  }
}

TableHeaderRowSorting.propTypes = {
  sortableCellTemplate: React.PropTypes.func.isRequired,
};
