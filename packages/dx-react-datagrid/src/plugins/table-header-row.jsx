import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';
import { getColumnSortingDirection } from '@devexpress/dx-datagrid-core';

export class TableHeaderRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableHeaderRows = tableHeaderRows =>
      [{ type: 'heading', id: 'heading' }, ...tableHeaderRows];
  }
  render() {
    const { sortingEnabled, groupingEnabled, headerCellTemplate } = this.props;
    const HeaderCell = headerCellTemplate;

    return (
      <div>
        <Getter
          name="tableHeaderRows"
          pureComputed={this._tableHeaderRows}
          connectArgs={getter => [
            getter('tableHeaderRows'),
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ row }) => row.type === 'heading'}
          connectGetters={(getter, { column }) => {
            const sortings = getter('sortings');
            const grouping = getter('grouping');

            const result = {
              sortingEnabled: !column.type && sortings !== undefined,
              groupingEnabled: !column.type && grouping !== undefined,
            };

            if (result.sortingEnabled) {
              result.sortDirection = getColumnSortingDirection(sortings, column.name);
            }

            return result;
          }}
          connectActions={(action, { column }) => ({
            changeSortDirection: ({ keepOther }) => action('setColumnSorting')({ columnName: column.name, keepOther }),
            groupByColumn: () => action('groupByColumn')({ columnName: column.name }),
          })}
        >
          {params => (
            <HeaderCell
              {...params}
              sortingEnabled={params.sortingEnabled && sortingEnabled}
              groupingEnabled={params.groupingEnabled && groupingEnabled}
            />
          )}
        </Template>
      </div>
    );
  }
}

TableHeaderRow.defaultProps = {
  sortingEnabled: true,
  groupingEnabled: true,
};

TableHeaderRow.propTypes = {
  sortingEnabled: React.PropTypes.bool,
  groupingEnabled: React.PropTypes.bool,
  headerCellTemplate: React.PropTypes.func.isRequired,
};
