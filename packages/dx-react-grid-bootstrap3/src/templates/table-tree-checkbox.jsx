import * as React from 'react';
import PropTypes from 'prop-types';

import { SelectionControl } from './parts/selection-control';

export const TableTreeCheckbox = ({
  style,
  checked,
  indeterminate,
  disabled,
  onChange,
  ...restProps
}) => (
  <SelectionControl
    disabled={disabled}
    checked={checked}
    indeterminate={indeterminate}
    onChange={onChange}
    style={{
      marginRight: '16px',
      ...style,
    }}
    {...restProps}
  />
);

TableTreeCheckbox.propTypes = {
  style: PropTypes.object,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

TableTreeCheckbox.defaultProps = {
  style: null,
  checked: false,
  indeterminate: false,
  disabled: false,
  onChange: () => {},
};
