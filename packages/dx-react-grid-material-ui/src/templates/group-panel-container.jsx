import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

export const styles = theme => ({
  panel: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: theme.spacing.unit * 1.5,
  },
});

const GroupPanelContainerBase = ({
  classes,
  children,
  className,
  ...restProps
}) => (
  <div
    className={classNames(classes.panel, className)}
    {...restProps}
  >
    {children}
  </div>
);

GroupPanelContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

GroupPanelContainerBase.defaultProps = {
  children: null,
  className: undefined,
};

export const GroupPanelContainer = withStyles(styles, { name: 'GroupPanelContainer' })(GroupPanelContainerBase);
