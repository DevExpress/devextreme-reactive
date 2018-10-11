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
  onNavigate,
  ...restProps
}) => (
  <Toolbar
    className={classNames(classes.navigator, className)}
    {...restProps}
  >
    <NavigationButton
      back
      onClick={() => { onNavigate({ back: true }); }}
    />
    <Title currentDate={currentDate} />
    <NavigationButton
      onClick={() => { onNavigate({ back: false }); }}
    />
  </Toolbar>
);

NavigatorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  titleComponent: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  currentDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  className: PropTypes.string,
  onNavigate: PropTypes.func,
};

NavigatorBase.defaultProps = {
  className: undefined,
  onNavigate: () => {},
};

export const Navigator = withStyles(styles, { name: 'Navigator' })(NavigatorBase);
