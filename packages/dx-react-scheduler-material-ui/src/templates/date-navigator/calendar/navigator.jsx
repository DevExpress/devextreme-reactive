import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import classNames from 'clsx';

const PREFIX = 'Navigator';

export const classes = {
  navigator: `${PREFIX}-navigator`,
};

const StyledToolbar = styled(Toolbar)({
  [`&.${classes.navigator}`]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export const Navigator = ({
  className,
  currentDate,
  textComponent: Text,
  navigationButtonComponent: NavigationButton,
  onNavigate,
  formatDate,
  ...restProps
}) => (
  <StyledToolbar
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
  </StyledToolbar>
);

Navigator.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
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

Navigator.defaultProps = {
  className: undefined,
  onNavigate: () => {},
};
