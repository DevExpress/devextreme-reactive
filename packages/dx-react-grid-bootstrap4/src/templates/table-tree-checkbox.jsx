import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

import { SelectionControl } from './parts/selection-control';

export const TableTreeCheckbox = ({
  className,
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
    className={classNames('mr-4', className)}
    {...restProps}
  />
);

TableTreeCheckbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

TableTreeCheckbox.defaultProps = {
  className: undefined,
  checked: false,
  indeterminate: false,
  disabled: false,
  onChange: () => {},
};
