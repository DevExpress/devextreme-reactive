import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Toolbar from '@mui/material/Toolbar';
import classNames from 'clsx';

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
  textComponent: Text,
  navigationButtonComponent: NavigationButton,
  onNavigate,
  formatDate,
  ...restProps
}) => (
  <Toolbar
    className={classNames(classes.navigator, className)}
    {...restProps}
  >
    <NavigationButton
      type="back"
      onClick={() => { onNavigate({ back: true }); }}
    />
    <Text currentDate={currentDate} formatDate={formatDate} />
    <NavigationButton
      type="forward"
      onClick={() => { onNavigate({ back: false }); }}
    />
  </Toolbar>
);

NavigatorBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  classes: PropTypes.object.isRequired,
  textComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  navigationButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  currentDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
  onNavigate: PropTypes.func,
};

NavigatorBase.defaultProps = {
  className: undefined,
  onNavigate: () => {},
};

export const Navigator = withStyles(styles, { name: 'Navigator' })(NavigatorBase);
