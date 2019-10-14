import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const SearchPanelInput = ({
  onValueChange,
  value,
  getMessage,
  className,
  ...restProps
}) => (
  <input
    type="text"
    className={classNames('form-control w-25', className)}
    onChange={e => onValueChange(e.target.value)}
    value={value}
    placeholder={getMessage('searchPlaceholder')}
    {...restProps}
  />
);

SearchPanelInput.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SearchPanelInput.defaultProps = {
  value: null,
  className: undefined,
};
