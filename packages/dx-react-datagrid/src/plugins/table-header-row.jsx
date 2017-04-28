import React from 'react';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { getColumnSortingDirection } from '@devexpress/dx-datagrid-core';

export class TableHeaderRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableHeaderRows = tableHeaderRows =>
      [{ type: 'heading' }, ...tableHeaderRows];
  }
  render() {
    const { sortingEnabled, groupingEnabled, headerCellTemplate } = this.props;
    const HeaderCell = headerCellTemplate;

    return (
      <PluginContainer>
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
              sortingSupported: !column.type && sortings !== undefined,
              groupingSupported: !column.type && grouping !== undefined,
            };

            if (result.sortingSupported) {
              result.sortDirection = getColumnSortingDirection(sortings, column.name);
            }

            return result;
          }}
          connectActions={(action, { column }) => ({
            changeSortDirection: ({ keepOther }) => action('setColumnSorting')({ columnName: column.name, keepOther }),
            groupByColumn: () => action('groupByColumn')({ columnName: column.name }),
          })}
        >
          {({ sortingSupported, groupingSupported, ...restParams }) => (
            <HeaderCell
              {...restParams}
              sortingEnabled={sortingEnabled && sortingSupported}
              groupingEnabled={groupingEnabled && groupingSupported}
            />
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableHeaderRow.defaultProps = {
  sortingEnabled: false,
  groupingEnabled: false,
};

TableHeaderRow.propTypes = {
  sortingEnabled: React.PropTypes.bool,
  groupingEnabled: React.PropTypes.bool,
  headerCellTemplate: React.PropTypes.func.isRequired,
};
