import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { SelectionControl } from './parts/selection-control';

export const TableTreeCheckbox = ({
  className,
  selected,
  someSelected,
  disabled,
  onToggle,
  ...restProps
}) => (
  <SelectionControl
    disabled={disabled}
    selected={selected}
    someSelected={someSelected}
    onToggle={onToggle}
    className={classNames('mr-4', className)}
    {...restProps}
  />
);

TableTreeCheckbox.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
};

TableTreeCheckbox.defaultProps = {
  className: undefined,
  selected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
};
