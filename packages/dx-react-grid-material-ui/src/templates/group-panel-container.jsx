import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

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
  forwardedRef,
  ...restProps
}) => (
  <div
    ref={forwardedRef}
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
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

GroupPanelContainerBase.defaultProps = {
  children: undefined,
  className: undefined,
  forwardedRef: undefined,
};

export const GroupPanelContainer = withStyles(styles, { name: 'GroupPanelContainer' })(GroupPanelContainerBase);
