import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { getColumnFilterConfig, tableHeaderRowsWithFilter } from '@devexpress/dx-grid-core';

export class TableFilterRow extends React.PureComponent {
  render() {
    const { rowHeight, filterCellTemplate } = this.props;

    return (
      <PluginContainer>
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
          predicate={({ row, column }) => row.type === 'filter' && !column.type}
          connectGetters={(getter, { column }) => ({
            filter: getColumnFilterConfig(getter('filters'), column.name),
          })}
          connectActions={(action, { column }) => ({
            setFilter: config => action('setColumnFilter')({ columnName: column.name, config }),
          })}
        >
          {({ row, ...restParams }) => filterCellTemplate(restParams)}
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
