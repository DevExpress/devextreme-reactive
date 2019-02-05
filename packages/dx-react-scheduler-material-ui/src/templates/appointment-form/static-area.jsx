import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing.unit,
  },
});

const StaticAreaBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    {children}
  </div>
);

StaticAreaBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

StaticAreaBase.defaultProps = {
  className: undefined,
};

export const StaticArea = withStyles(styles)(StaticAreaBase, { name: 'StaticArea' });
