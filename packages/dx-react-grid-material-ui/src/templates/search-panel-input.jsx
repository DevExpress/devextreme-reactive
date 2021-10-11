import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.action.active,
  },
});

const SearchPanelInputBase = ({
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

SearchPanelInputBase.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
};
SearchPanelInputBase.defaultProps = {
  value: '',
  inputRef: undefined,
};

export const SearchPanelInput = withStyles(styles)(SearchPanelInputBase);
