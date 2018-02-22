import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SearchPanelInput = ({
  onChangeValue, value, getMessage, style, ...restProps
}) => (<input
  type="text"
  className="form-control"
  onChange={e => onChangeValue({ value: e.target.value })}
  value={value}
  style={{ maxWidth: '25%', ...style }}
  placeholder={getMessage('searchPlaceholder')}
  {...restProps}
/>);

SearchPanelInput.propTypes = {
  value: PropTypes.any,
  onChangeValue: PropTypes.func.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func.isRequired,
};

SearchPanelInput.defaultProps = {
  value: null,
  style: {},
};
