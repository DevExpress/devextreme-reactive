import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SearchPanelInput = ({
  changeSearchValue, searchValue, getMessage, style, ...restProps
}) => (<input
  type="text"
  className="form-control"
  onChange={e => changeSearchValue({ searchValue: e.target.value })}
  value={searchValue}
  style={{ maxWidth: '25%', ...style }}
  {...restProps}
/>);

SearchPanelInput.propTypes = {
  searchValue: PropTypes.any,
  changeSearchValue: PropTypes.func.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func,
};

SearchPanelInput.defaultProps = {
  searchValue: null,
  style: {},
  getMessage: null,
};
