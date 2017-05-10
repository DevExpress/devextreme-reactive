import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { getColumnFilterConfig } from '@devexpress/dx-datagrid-core';

export class TableFilterRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableHeaderRows = tableHeaderRows => [...tableHeaderRows, { type: 'filter', height: props.rowHeight }];
  }
  render() {
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
          predicate={({ row }) => row.type === 'filter'}
          connectGetters={(getter, { column }) => ({
            filter: getColumnFilterConfig(getter('filters'), column.name),
          })}
          connectActions={(action, { column }) => ({
            changeFilter: config => action('setColumnFilter')({ columnName: column.name, config }),
          })}
        >
          {params => this.props.filterCellTemplate(params)}
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
