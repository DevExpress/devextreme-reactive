import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

export const styles = theme => ({
  panel: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  groupInfo: {
    padding: `${theme.spacing.unit * 0.75}px 0`,
    marginBottom: theme.spacing.unit * 1.5,
    display: 'inline-block',
    color: theme.typography.title.color,
  },
  groupIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

const GroupPanelContainerBase = ({ classes, children }) => (
  <div className={classes.panel}>
    {children}
  </div>
);

GroupPanelContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

GroupPanelContainerBase.defaultProps = {
  children: null,
};

export const GroupPanelContainer = withStyles(styles, { name: 'GroupPanelContainer' })(GroupPanelContainerBase);
