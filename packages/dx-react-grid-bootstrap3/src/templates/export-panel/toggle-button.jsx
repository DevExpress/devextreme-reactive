import * as React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import classNames from 'clsx';

export const ToggleButton = ({
  onToggle, getMessage, buttonRef, className,
  ...restProps
}) => (
  <button
    type="button"
    className={classNames('btn btn-link', className)}
    onClick={onToggle}
    ref={buttonRef}
    {...restProps}
  >
    <Glyphicon glyph="save" />
  </button>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  buttonRef: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  className: undefined,
};
