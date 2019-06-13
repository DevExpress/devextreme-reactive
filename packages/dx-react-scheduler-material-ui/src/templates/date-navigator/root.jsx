import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({
  navigationButtonComponent: NavigationButton,
  openButtonComponent: OpenButton,
  navigatorText,
  rootRef,
  onVisibilityToggle,
  onNavigate,
  ...restProps
}) => (
  <div
    ref={rootRef}
    {...restProps}
  >
    <NavigationButton
      type="back"
      onClick={() => { onNavigate('back'); }}
    />
    <NavigationButton
      type="forward"
      onClick={() => { onNavigate('forward'); }}
    />
    <OpenButton
      onVisibilityToggle={onVisibilityToggle}
      text={navigatorText}
    />
  </div>
);

Root.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  navigationButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  openButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onVisibilityToggle: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  rootRef: PropTypes.func.isRequired,
  navigatorText: PropTypes.string,
};

Root.defaultProps = {
  navigatorText: '',
};
