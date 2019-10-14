import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const PaginationItem = ({
  active,
  disabled,
  ...restProps
}) => (
  <li
    className={classNames('page-item', { active, disabled })}
    {...restProps}
  />
);

PaginationItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

PaginationItem.defaultProps = {
  active: false,
  disabled: false,
};
