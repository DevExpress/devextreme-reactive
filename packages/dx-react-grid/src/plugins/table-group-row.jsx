import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { tableColumns } from '@devexpress/dx-grid-core';

export const TableGroupRow = ({ groupRowCellTemplate: GroupRowCell }) => (
  <PluginContainer>
    <Getter
      name="tableColumns"
      pureComputed={tableColumns}
      connectArgs={getter => [
        getter('tableColumns'),
        getter('grouping'),
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
  </PluginContainer>
);

TableGroupRow.propTypes = {
  groupRowCellTemplate: PropTypes.func.isRequired,
};
