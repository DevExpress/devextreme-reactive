import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ToggleButton = ({
  onToggle, className,
  getMessage, refHandler,
  ...restProps
}) => (
  <button
    className={classNames('btn btn-link', className)}
    onClick={onToggle}
    ref={refHandler}
    {...restProps}
  >
    <i className="glyphicon glyphicon-eye-close" />
  </button>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  refHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  className: undefined,
};
