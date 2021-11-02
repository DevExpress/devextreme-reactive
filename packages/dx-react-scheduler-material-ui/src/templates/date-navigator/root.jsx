import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'Root';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledDiv = styled('div')(({
  theme: { spacing },
}) => ({
  [`&.${classes.root}`]: {
    marginLeft: spacing(0.5),
    '&:first-child': {
      marginLeft: 0,
    },
  },
}));

const RootBase = ({
  navigationButtonComponent: NavigationButton,
  openButtonComponent: OpenButton,
  navigatorText,
  rootRef,
  onVisibilityToggle,
  onNavigate,
  className,
  ...restProps
}) => {
  const navigateBack = React.useCallback(() => onNavigate('back'), [onNavigate]);
  const navigateForward = React.useCallback(() => onNavigate('forward'), [onNavigate]);

  return (
    <StyledDiv
      className={classNames(classes.root, className)}
      ref={rootRef}
      {...restProps}
    >
      <NavigationButton
        type="back"
        onClick={navigateBack}
      />
      <NavigationButton
        type="forward"
        onClick={navigateForward}
      />
      <OpenButton
        onVisibilityToggle={onVisibilityToggle}
        text={navigatorText}
      />
    </StyledDiv>
  );
};

RootBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  navigationButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  openButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onVisibilityToggle: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  rootRef: PropTypes.func.isRequired,
  navigatorText: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RootBase.defaultProps = {
  navigatorText: '',
  className: undefined,
};

export const Root = (RootBase);
