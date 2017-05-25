import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { tableColumnsWithGroups } from '@devexpress/dx-grid-core';

export class TableGroupRow extends React.PureComponent {
  render() {
    const {
      groupColumnWidth,
      groupRowCellTemplate: GroupRowCell,
      groupIndentCellTemplate: GroupIndentCell,
    } = this.props;

    return (
      <PluginContainer>
        <Getter
          name="tableColumns"
          pureComputed={tableColumnsWithGroups}
          connectArgs={getter => [
            getter('tableColumns'),
            getter('grouping'),
            groupColumnWidth,
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'groupRow'
            && column.type === 'groupColumn'
            && row.column.name === column.group.columnName}
          connectGetters={getter => ({ expandedGroups: getter('expandedGroups') })}
          connectActions={action => ({ toggleGroupExpanded: action('toggleGroupExpanded') })}
        >
          {({ expandedGroups, toggleGroupExpanded, ...params }) => (
            <GroupRowCell
              {...params}
              isExpanded={expandedGroups.has(params.row.key)}
              toggleGroupExpanded={() => toggleGroupExpanded({ groupKey: params.row.key })}
            />
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => (
            column.type === 'groupColumn'
            && (
              !row.type
              || (row.type === 'groupRow' && row.column.name !== column.group.columnName)
            )
          )}
        >
          {({ ...params }) => (
            <GroupIndentCell
              {...params}
            />
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableGroupRow.propTypes = {
  groupRowCellTemplate: PropTypes.func.isRequired,
  groupIndentCellTemplate: PropTypes.func.isRequired,
  groupColumnWidth: PropTypes.number.isRequired,
};
