import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';

export class TableGroupRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = (tableColumns, grouping) => [
      ...grouping.map(group => ({ type: 'groupColumn', group, width: 20 })),
      ...tableColumns,
    ];
  }
  render() {
    const GroupRowCell = this.props.groupRowCellTemplate;

    return (
      <PluginContainer>
        <Getter
          name="tableColumns"
          pureComputed={this._tableColumns}
          connectArgs={getter => [
            getter('tableColumns'),
            getter('grouping'),
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'groupRow'
            && column.type === 'groupColumn'
            && row.column.name === column.group.column}
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
  }
}

TableGroupRow.propTypes = {
  groupRowCellTemplate: PropTypes.func.isRequired,
};
