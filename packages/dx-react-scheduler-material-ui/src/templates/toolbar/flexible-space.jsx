import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';

const styles = {
  flexibleSpace: {
    flex: '0 0 0',
    marginLeft: 'auto',
  },
};

export const FlexibleSpaceBase = ({
  children,
  classes,
  className,
  ...restProps
}) => (
  <div
    className={classNames(classes.flexibleSpace, className)}
    {...restProps}
  >
    {children}
  </div>
);

FlexibleSpaceBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

FlexibleSpaceBase.defaultProps = {
  children: null,
  className: undefined,
};

export const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(FlexibleSpaceBase);
