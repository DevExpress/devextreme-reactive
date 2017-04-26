import React from 'react';

export const GroupPanel = ({ groupedColumns, groupByColumnText, cellTemplate }) => {
  const text = () => groupByColumnText ||
    <span>
      Click <i className="glyphicon glyphicon-th-list" style={{ margin: '0 8px 0 5px' }} />
      icon in the column header to group by that column
    </span>;

  const GroupPanelCell = cellTemplate;

  return groupedColumns.length
    ? (
      <div>
        {
          groupedColumns.map(column => (
            <GroupPanelCell
              key={column.name}
              column={column}
            />
          ))
        }
      </div>
    )
    : <span>{text()}</span>;
};

GroupPanel.propTypes = {
  groupedColumns: React.PropTypes.array.isRequired,
  groupByColumnText: React.PropTypes.string,
  cellTemplate: React.PropTypes.func.isRequired,
};

GroupPanel.defaultProps = {
  groupByColumnText: undefined,
};
