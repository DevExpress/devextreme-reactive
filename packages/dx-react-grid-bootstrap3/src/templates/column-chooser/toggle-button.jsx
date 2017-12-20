import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ToggleButton = ({
  onClick, className,
  getRef, ...restProps
}) => (
  <button
    className={classNames('btn btn-link', className)}
    onClick={onClick}
    ref={getRef}
    {...restProps}
  >
    <i className="glyphicon glyphicon-eye-close" />
  </button>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  getRef: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  className: undefined,
};
