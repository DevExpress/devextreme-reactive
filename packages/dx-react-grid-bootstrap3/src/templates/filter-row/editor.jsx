import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Editor = ({
  value, disabled, getMessage, onChange,
  style, className,
  ...restProps
}) => (
  <input
    type="text"
    className={classNames('form-control', className)}
    style={{
      display: 'inline-block',
      width: 'calc(100% - 50px)',
      ...style,
    }}
    value={value}
    onChange={onChange}
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
  style: PropTypes.object,
  className: PropTypes.string,
};

Editor.defaultProps = {
  value: '',
  disabled: false,
  onChange: () => {},
  style: {},
  className: undefined,
};
