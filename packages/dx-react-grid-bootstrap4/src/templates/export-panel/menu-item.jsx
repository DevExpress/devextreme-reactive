import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const MenuItem = ({
  text, onClick, className, ...restProps
}) => (
  <button
    type="button"
    className={classNames('dx-g-bs4-cursor-pointer dropdown-item', className)}
    onClick={onClick}
    {...restProps}
  >
    {text}
  </button>
);

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

MenuItem.defaultProps = {
  onClick: () => {},
  className: undefined,
};
