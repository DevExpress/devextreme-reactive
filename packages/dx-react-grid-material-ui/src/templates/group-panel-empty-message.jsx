import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

export const styles = theme => ({
  groupInfo: {
    padding: `${theme.spacing.unit * 0.75}px 0`,
    marginBottom: theme.spacing.unit * 1.5,
    color: theme.typography.title.color,
  },
});

const GroupPanelEmptyMessageBase = ({ getMessage, classes }) => (
  <div className={classes.groupInfo}>
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessageBase.propTypes = {
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const GroupPanelEmptyMessage = withStyles(styles, { name: 'GroupPanelEmptyMessage' })(GroupPanelEmptyMessageBase);
