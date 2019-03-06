import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  wrapper: {
    position: 'relative',
  },
});

export const WrapperBase = ({
  children, classes, className, ...restProps
}) => (
  <div className={classNames(classes.wrapper, className)} {...restProps}>
    {children}
  </div>
);

WrapperBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

WrapperBase.defaultProps = {
  className: undefined,
};

export const Wrapper = withStyles(styles, { name: 'TitleCell' })(WrapperBase);
