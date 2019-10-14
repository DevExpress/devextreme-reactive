import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  panel: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: theme.spacing(1.5),
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
  children: PropTypes.node,
  className: PropTypes.string,
};

GroupPanelContainerBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const GroupPanelContainer = withStyles(styles, { name: 'GroupPanelContainer' })(GroupPanelContainerBase);
