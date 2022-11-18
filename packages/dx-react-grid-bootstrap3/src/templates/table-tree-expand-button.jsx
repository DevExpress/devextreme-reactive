import * as React from 'react';
import PropTypes from 'prop-types';

import { ExpandButton } from './parts/expand-button';

export const TableTreeExpandButton = ({
  style,
  visible,
  expanded,
  onToggle,
  ...restProps
}) => (
  <ExpandButton
    visible={visible}
    expanded={expanded}
    onToggle={onToggle}
    style={{
      marginRight: '8px',
      ...style,
    }}
    {...restProps}
  />
);

TableTreeExpandButton.propTypes = {
  style: PropTypes.object,
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

TableTreeExpandButton.defaultProps = {
  style: null,
  visible: false,
  expanded: false,
  onToggle: () => {},
};
