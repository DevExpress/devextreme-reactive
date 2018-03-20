import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SelectionControl } from './parts/selection-control';

export const TableTreeCheckbox = ({
  style,
  selected,
  someSelected,
  disabled,
  onToggle,
  ...restProps
}) => (
  <SelectionControl
    disabled={disabled}
    checked={selected}
    indeterminate={someSelected}
    onChange={onToggle}
    style={{
      marginRight: '16px',
      ...style,
    }}
    {...restProps}
  />
);

TableTreeCheckbox.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
};

TableTreeCheckbox.defaultProps = {
  style: null,
  selected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
};
