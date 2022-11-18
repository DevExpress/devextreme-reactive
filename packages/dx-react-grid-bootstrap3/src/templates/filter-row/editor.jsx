import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Editor = ({
  value, disabled, getMessage, onChange, className,
  ...restProps
}) => (
  <input
    type="text"
    className={classNames('form-control', className)}
    value={value}
    onChange={event => onChange(event.target.value)}
    readOnly={disabled}
    placeholder={getMessage('filterPlaceholder')}
    {...restProps}
  />
);

Editor.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Editor.defaultProps = {
  value: '',
  disabled: false,
  onChange: () => {},
  className: undefined,
};
