import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const SearchPanelInput = ({
  onValueChange,
  value,
  getMessage,
  style,
  className,
  refObject,
  ...restProps
}) => (
  <input
    type="text"
    ref={refObject}
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
  refObject: PropTypes.any,
};

SearchPanelInput.defaultProps = {
  value: null,
  style: null,
  className: undefined,
  refObject: undefined,
};
