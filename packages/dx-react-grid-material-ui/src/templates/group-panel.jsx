import React from 'react';
import PropTypes from 'prop-types';

import List from 'material-ui-icons/List';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('GroupPanel', () => ({
  panel: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  groupIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  groupInfo: {
    marginBottom: '12px',
    display: 'inline-block',
  },
}));

const GroupPanelBase = ({ groupedColumns, groupByColumnText, cellTemplate, classes }) => {
  const text = () => groupByColumnText ||
    <span className={classes.groupInfo}>
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
      <div className={classes.panel}>
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
