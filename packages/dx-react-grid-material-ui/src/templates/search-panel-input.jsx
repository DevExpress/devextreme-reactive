import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

export const SearchPanelInput = ({
  onValueChange, value, getMessage, inputRef, ...restProps
}) => (
  <Input
    ref={inputRef}
    onChange={e => onValueChange(e.target.value)}
    value={value}
    type="text"
    placeholder={getMessage('searchPlaceholder')}
    {...restProps}
    startAdornment={(
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
)}
  />
);

SearchPanelInput.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
};
SearchPanelInput.defaultProps = {
  value: '',
  inputRef: undefined,
};
