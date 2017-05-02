import React from 'react';
import PropTypes from 'prop-types';

export const GroupPanel = ({ groupedColumns, groupByColumnText, cellTemplate }) => {
  const text = () => groupByColumnText ||
    <span>
      Click
      &nbsp;
      <i
        className="glyphicon glyphicon-th-list"
        style={{
          top: '0',
          fontSize: '9px',
        }}
      />
      &nbsp;
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
  groupedColumns: PropTypes.array.isRequired,
  groupByColumnText: PropTypes.string,
  cellTemplate: PropTypes.func.isRequired,
};

GroupPanel.defaultProps = {
  groupByColumnText: undefined,
};
