import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';

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
      <div>
        <Getter
          name="tableColumns"
          pureComputed={this._tableColumns}
          connectArgs={getter => [
            getter('tableColumns')(),
            getter('grouping')(),
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => column.type === 'groupColumn' && !row.type}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'groupRow'
            && column.type === 'groupColumn'
            && row.column === column.group.column}
          connectGetters={getter => ({ expandedGroups: getter('expandedGroups')() })}
          connectActions={action => ({ toggleGroupExpanded: action('toggleGroupExpanded') })}
        >
          {({ row, expandedGroups, toggleGroupExpanded }) => (
            <GroupRowCell
              row={row}
              isExpanded={expandedGroups[row.key]}
              toggleGroupExpanded={() => toggleGroupExpanded({ groupKey: row.key })}
            />
          )}
        </Template>
      </div>
    );
  }
}

TableGroupRow.propTypes = {
  groupRowCellTemplate: React.PropTypes.func.isRequired,
};
