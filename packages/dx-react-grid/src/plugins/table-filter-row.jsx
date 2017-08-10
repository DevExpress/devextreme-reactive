import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  getColumnFilterConfig,
  tableHeaderRowsWithFilter,
  isFilterTableCell,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'FilteringState' },
  { pluginName: 'TableView' },
];

export class TableFilterRow extends React.PureComponent {
  render() {
    const { rowHeight, filterCellTemplate } = this.props;

    return (
      <PluginContainer
        pluginName="TableFilterRow"
        dependencies={pluginDependencies}
      >
        <Getter
          name="tableHeaderRows"
          pureComputed={tableHeaderRowsWithFilter}
          connectArgs={getter => [
            getter('tableHeaderRows'),
            rowHeight,
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isFilterTableCell(tableRow, tableColumn)}
          connectGetters={(getter, { tableColumn: { column } }) => ({
            filter: getColumnFilterConfig(getter('filters'), column.name),
          })}
          connectActions={(action, { tableColumn: { column } }) => ({
            setFilter: config => action('setColumnFilter')({ columnName: column.name, config }),
          })}
        >
          {params => filterCellTemplate({ ...params, column: params.tableColumn.column })}
        </Template>
      </PluginContainer>
    );
  }
}

TableFilterRow.propTypes = {
  rowHeight: PropTypes.any,
  filterCellTemplate: PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
};
