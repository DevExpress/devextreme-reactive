import React from 'react';
import PropTypes from 'prop-types';

import List from 'material-ui-icons/List';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('GroupPanel', () => ({
  groupIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}));

const GroupPanelBase = ({ groupedColumns, groupByColumnText, cellTemplate, classes }) => {
  const text = () => groupByColumnText ||
    <span>
      Click
      &nbsp;
      <span className={classes.groupIcon}>
        <List />
      </span>
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

GroupPanelBase.propTypes = {
  groupedColumns: PropTypes.array.isRequired,
  groupByColumnText: PropTypes.string,
  cellTemplate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

GroupPanelBase.defaultProps = {
  groupByColumnText: undefined,
};

export const GroupPanel = withStyles(styleSheet)(GroupPanelBase);
