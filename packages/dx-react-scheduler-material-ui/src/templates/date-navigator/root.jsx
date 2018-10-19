import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Root = ({
  navigationButtonComponent: NavigationButton,
  openButtonComponent: OpenButton,
  navigatorText,
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
    <OpenButton
      onToggle={onToggle}
      text={navigatorText}
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
  openButtonComponent: PropTypes.func.isRequired,
  navigatorText: PropTypes.string,
};

Root.defaultProps = {
  navigatorText: '',
};
