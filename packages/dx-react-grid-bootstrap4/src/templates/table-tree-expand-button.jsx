import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

import { ExpandButton } from './parts/expand-button';

export const TableTreeExpandButton = ({
  className,
  visible,
  expanded,
  onToggle,
  ...restProps
}) => (
  <ExpandButton
    visible={visible}
    expanded={expanded}
    onToggle={onToggle}
    className={classNames('mr-3', className)}
    {...restProps}
  />
);

TableTreeExpandButton.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

TableTreeExpandButton.defaultProps = {
  className: undefined,
  visible: false,
  expanded: false,
  onToggle: () => {},
};
