import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

const styles = theme => ({
  navbarEmpty: {
    borderBottom: getBorder(theme),
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
  },
});

export const NavbarEmptyBase = ({
  classes,
  className,
  ...restProps
}) => <div {...restProps} className={classNames(classes.navbarEmpty, className)} />;

NavbarEmptyBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

NavbarEmptyBase.defaultProps = {
  className: undefined,
};

export const NavbarEmpty = withStyles(styles, { name: 'NavbarEmpty' })(NavbarEmptyBase);
