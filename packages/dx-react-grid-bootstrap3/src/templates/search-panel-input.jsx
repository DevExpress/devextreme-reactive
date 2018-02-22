import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SearchPanelInput = ({
  onChangeSearchValue, searchValue, getMessage, style, ...restProps
}) => (<input
  type="text"
  className="form-control"
  onChange={e => onChangeSearchValue({ searchValue: e.target.value })}
  value={searchValue}
  style={{ maxWidth: '25%', ...style }}
  placeholder={getMessage('searchPlaceholder')}
  {...restProps}
/>);

SearchPanelInput.propTypes = {
  searchValue: PropTypes.any,
  onChangeSearchValue: PropTypes.func.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func.isRequired,
};

SearchPanelInput.defaultProps = {
  searchValue: null,
  style: {},
};
