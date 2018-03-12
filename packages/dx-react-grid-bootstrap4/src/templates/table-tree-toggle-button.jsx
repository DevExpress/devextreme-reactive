import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { ToggleButton } from './parts/toggle-button';

export const TableTreeToggleButton = ({
  className,
  visible,
  expanded,
  onToggle,
  ...restProps
}) => (
  <ToggleButton
    visible={visible}
    expanded={expanded}
    onToggle={onToggle}
    className={classNames('mr-3', className)}
    {...restProps}
  />
);

TableTreeToggleButton.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

TableTreeToggleButton.defaultProps = {
  className: undefined,
  visible: false,
  expanded: false,
  onToggle: () => {},
};
