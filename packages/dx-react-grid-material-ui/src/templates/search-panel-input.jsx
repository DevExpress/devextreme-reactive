import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from 'material-ui/Input';

export const SearchPanelInput = ({
  changeSearchValue, searchValue, getMessage, ...restProps
}) => (<Input
  onChange={e => changeSearchValue({ searchValue: e.target.value })}
  value={searchValue || ''}
  placeholder={getMessage('searchPlaceholder')}
  {...restProps}
/>);

SearchPanelInput.propTypes = {
  changeSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
};
SearchPanelInput.defaultProps = {
  searchValue: '',
};
