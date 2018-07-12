import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';

const styles = {
  navigator: {
    paddingLeft: 0,
    paddingRight: 0,
  },
};

const NavigatorBase = ({
  classes,
  className,
  currentDate,
  titleComponent: Title,
  navigationButtonComponent: NavigationButton,
  ...restProps
}) => (
  <Toolbar
    className={classNames({
      [classes.navigator]: true,
    }, className)}
    {...restProps}
  >
    <NavigationButton back />
    <Title currentDate={currentDate} />
    <NavigationButton />
  </Toolbar>
);

NavigatorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  titleComponent: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  currentDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  className: PropTypes.string,
};

NavigatorBase.defaultProps = {
  className: undefined,
};

export const Navigator = withStyles(styles, { name: 'Navigator' })(NavigatorBase);
