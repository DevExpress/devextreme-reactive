import React from 'react';
import PropTypes from 'prop-types';

import List from 'material-ui-icons/List';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { GroupPanelLayout } from '@devexpress/dx-react-grid';

// eslint-disable-next-line react/prop-types
const getDefaultText = ({ classes }) => (
  <span className={classes.groupInfo}>
    Click
    &nbsp;
    <span className={classes.groupIcon}>
      <List />
    </span>
    &nbsp;
    icon in the column header to group by that column
  </span>
);

const styleSheet = createStyleSheet('GroupPanel', () => ({
  groupIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  groupInfo: {
    marginBottom: '12px',
    display: 'inline-block',
  },
}));

const GroupPanelBase = ({ groupByColumnText, classes, ...restProps }) => (
  <GroupPanelLayout
    groupByColumnText={groupByColumnText || getDefaultText({ classes })}
    {...restProps}
  />
);

GroupPanelBase.propTypes = {
  groupByColumnText: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

GroupPanelBase.defaultProps = {
  groupByColumnText: undefined,
};

export const GroupPanel = withStyles(styleSheet)(GroupPanelBase);
