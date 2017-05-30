import React from 'react';
import PropTypes from 'prop-types';

import List from 'material-ui-icons/List';

export const GroupPanel = ({ groupedColumns, groupByColumnText, cellTemplate }) => {
  const text = () => groupByColumnText ||
    <span>
      Click
      &nbsp;
      <List />
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
