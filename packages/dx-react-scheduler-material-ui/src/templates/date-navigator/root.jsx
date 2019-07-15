import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { memoize } from '@devexpress/dx-core';

const styles = ({ spacing }) => ({
  root: {
    marginLeft: spacing(0.5),
    '&:first-child': {
      marginLeft: 0,
    },
  },
});

const onNavigateBackMemo = memoize(onNavigate => () => onNavigate('back'));
const onNavigateForwardMemo = memoize(onNavigate => () => onNavigate('forward'));

const RootBase = ({
  navigationButtonComponent: NavigationButton,
  openButtonComponent: OpenButton,
  navigatorText,
  rootRef,
  onVisibilityToggle,
  onNavigate,
  className,
  classes,
  ...restProps
}) => {
  const navigateBack = onNavigateBackMemo(onNavigate);
  const navigateForward = onNavigateForwardMemo(onNavigate);

  return (
    <div
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
    </div>
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

export const Root = withStyles(styles)(RootBase, { name: 'Root' });
