import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import RootRef from '@material-ui/core/RootRef';

export const ToggleButton = ({
  onToggle,
  currentView,
  targetRef,
  ...restProps
}) => (
  <RootRef
    rootRef={targetRef}
  >
    <Button
      onClick={onToggle}
      {...restProps}
    >
      {currentView}
    </Button>
  </RootRef>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func,
  currentView: PropTypes.string,
  targetRef: PropTypes.func,
};

ToggleButton.defaultProps = {
  targetRef: undefined,
  onToggle: undefined,
  currentView: undefined,
};
