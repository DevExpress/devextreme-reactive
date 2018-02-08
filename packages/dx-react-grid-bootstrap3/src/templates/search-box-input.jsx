import React from 'react';
import PropTypes from 'prop-types';

export const SearchBoxInput = ({
  changeSearchValue, searchValue, getMessage, style, ...restProps
}) => (<input
  type="text"
  className="form-control"
  onChange={e => changeSearchValue({ searchValue: e.target.value })}
  value={searchValue}
  style={{ maxWidth: '25%', ...style }}
  {...restProps}
/>);

SearchBoxInput.propTypes = {
  searchValue: PropTypes.any,
  changeSearchValue: PropTypes.func.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func,
};

SearchBoxInput.defaultProps = {
  searchValue: undefined,
  style: {},
  getMessage: undefined,
};
