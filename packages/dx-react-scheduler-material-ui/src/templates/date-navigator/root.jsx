import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({
  navigationButtonComponent: NavigationButton,
  toggleButtonComponent: ToggleButton,
  navigatorTitle,
  targetRef,
  onToggle,
  onNavigate,
  ...restProps
}) => (
  <div
    ref={targetRef}
    {...restProps}
  >
    <NavigationButton
      back
      onClick={() => { onNavigate({ back: true }); }}
    />
    <ToggleButton
      onToggle={onToggle}
      title={navigatorTitle}
    />
    <NavigationButton
      onClick={() => { onNavigate({ back: false }); }}
    />
  </div>
);

Root.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  targetRef: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
  navigatorTitle: PropTypes.string,
};

Root.defaultProps = {
  navigatorTitle: '',
};
