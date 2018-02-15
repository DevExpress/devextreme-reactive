import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ToggleButton } from './parts/toggle-button';

export const TableTreeToggleButton = ({
  style,
  visible,
  expanded,
  onToggle,
  ...restProps
}) => (
  <ToggleButton
    visible={visible}
    expanded={expanded}
    onToggle={onToggle}
    style={{
      marginRight: '5px',
      ...style,
    }}
    {...restProps}
  />
);

TableTreeToggleButton.propTypes = {
  style: PropTypes.object,
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

TableTreeToggleButton.defaultProps = {
  style: null,
  visible: false,
  expanded: false,
  onToggle: () => {},
};
