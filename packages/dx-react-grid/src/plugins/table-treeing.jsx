import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';
import {} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'TreeingState' },
  { name: 'Table' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class TableTreeing extends React.PureComponent {
  render() {
    return (
      <Plugin
        name="TableTreeing"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={({ tableColumns }) => [{ key: 'adfadsf', type: 'ololo' }, ...tableColumns]} />
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => tableRow.row && tableColumn.type === 'ololo'}
        >
          {params => (
            <TemplateConnector>
              {({ getCollapsedRows, getRowLevelKey, expandedRowIds }, { toggleRowExpanded }) => (
                <td
                  onClick={() => toggleRowExpanded({ rowId: params.tableRow.rowId })}
                >
                  {(!!getCollapsedRows(params.tableRow.row) || expandedRowIds.indexOf(params.tableRow.rowId) > -1) && (
                    `[${expandedRowIds.indexOf(params.tableRow.rowId) > -1 ? '-' : '+'}]`
                  )}
                  {' '}
                  {getRowLevelKey(params.tableRow.row)}
                </td>
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

TableTreeing.propTypes = {
};
