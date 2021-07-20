import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.action.active,
  },
});

const SearchPanelInputBase = ({
  onValueChange, value, getMessage, refObject, ...restProps
}) => (
  <Input
    ref={refObject}
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
  refObject: PropTypes.any,
};
SearchPanelInputBase.defaultProps = {
  value: '',
  refObject: undefined,
};

export const SearchPanelInput = withStyles(styles)(SearchPanelInputBase);
