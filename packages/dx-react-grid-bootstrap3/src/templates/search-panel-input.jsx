import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const SearchPanelInput = ({
  onValueChange,
  value,
  getMessage,
  style,
  className,
  inputRef,
  ...restProps
}) => (
  <input
    type="text"
    ref={inputRef}
    className={classNames('form-control', className)}
    onChange={e => onValueChange(e.target.value)}
    value={value}
    style={{ maxWidth: '25%', ...style }}
    placeholder={getMessage('searchPlaceholder')}
    {...restProps}
  />
);

SearchPanelInput.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  inputRef: PropTypes.object,
};

SearchPanelInput.defaultProps = {
  value: null,
  style: null,
  className: undefined,
  inputRef: undefined,
};
