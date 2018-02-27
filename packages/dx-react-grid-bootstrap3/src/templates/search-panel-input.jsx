import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SearchPanelInput = ({
  onValueChange,
  value,
  getMessage,
  style,
  ...restProps
}) => (
  <input
    type="text"
    className="form-control"
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
};

SearchPanelInput.defaultProps = {
  value: null,
  style: null,
};
