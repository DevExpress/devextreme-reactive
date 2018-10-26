import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({
  navigationButtonComponent: NavigationButton,
  openButtonComponent: OpenButton,
  navigatorText,
  targetRef,
  onVisibilityToggle,
  onNavigate,
  ...restProps
}) => (
  <div
    ref={targetRef}
    {...restProps}
  >
    <NavigationButton
      type="back"
      onClick={() => { onNavigate({ back: true }); }}
    />
    <OpenButton
      onVisibilityToggle={onVisibilityToggle}
      text={navigatorText}
    />
    <NavigationButton
      type="forward"
      onClick={() => { onNavigate({ back: false }); }}
    />
  </div>
);

Root.propTypes = {
  onVisibilityToggle: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  targetRef: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  openButtonComponent: PropTypes.func.isRequired,
  navigatorText: PropTypes.string,
};

Root.defaultProps = {
  navigatorText: '',
};
