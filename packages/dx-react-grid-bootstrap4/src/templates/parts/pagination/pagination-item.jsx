import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const PaginationItem = ({
  active,
  activeButtonClass,
  disabled,
  ...restProps
}) => (
  <li
    className={classNames('page-item', { active, disabled, [activeButtonClass]: active })}
    {...restProps}
  />
);

PaginationItem.propTypes = {
  active: PropTypes.bool,
  activeButtonClass: PropTypes.string,
  disabled: PropTypes.bool,
};

PaginationItem.defaultProps = {
  active: false,
  activeButtonClass: '',
  disabled: false,
};
