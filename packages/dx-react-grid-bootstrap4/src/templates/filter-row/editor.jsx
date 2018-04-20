import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Editor = ({
  value, disabled, getMessage, onChange, className,
  ...restProps
}) => (
  <input
    type="text"
    className={classNames('form-control', 'dx-g-bs4-filter-cell-editor', className)}
    value={value}
    onChange={onChange}
    readOnly={disabled}
    placeholder={getMessage('filterPlaceholder')}
    {...restProps}
  />
);

Editor.propTypes = {
  value: PropTypes.string,
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
