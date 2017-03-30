import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';
import { getColumnFilterValue } from '@devexpress/dx-datagrid-core';

export class TableFilterRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableHeaderRows = tableHeaderRows => [...tableHeaderRows, { type: 'filter', id: 'filter', height: props.rowHeight }];
  }
  render() {
    return (
      <div>
        <Getter
          name="tableHeaderRows"
          pureComputed={this._tableHeaderRows}
          connectArgs={getter => [
            getter('tableHeaderRows')(),
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'filter' && !column.type}
          connectGetters={(getter, { column }) => ({
            filter: getColumnFilterValue(getter('filters')(), column.name),
          })}
          connectActions={(action, { column }) => ({
            changeFilter: value => action('setColumnFilter')({ columnName: column.name, value }),
          })}
        >
          {({ filter, changeFilter }) => this.props.filterCellTemplate({ filter, changeFilter })}
        </Template>
      </div>
    );
  }
}

TableFilterRow.propTypes = {
  rowHeight: React.PropTypes.any,
  filterCellTemplate: React.PropTypes.func.isRequired,
};

TableFilterRow.defaultProps = {
  rowHeight: undefined,
};
