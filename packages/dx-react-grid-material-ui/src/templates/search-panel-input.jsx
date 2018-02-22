import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import Search from 'material-ui-icons/Search';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.palette.action.active,
  },
});

const SearchPanelInputBase = ({
  onChangeSearchValue, searchValue, getMessage, ...restProps
}) => (<Input
  onChange={e => onChangeSearchValue({ searchValue: e.target.value })}
  value={searchValue || ''}
  type="text"
  placeholder={getMessage('searchPlaceholder')}
  {...restProps}
  startAdornment={
    <InputAdornment position="start">
      <Search />
    </InputAdornment>
  }
/>);

SearchPanelInputBase.propTypes = {
  onChangeSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
};
SearchPanelInputBase.defaultProps = {
  searchValue: '',
};

export const SearchPanelInput = withStyles(styles)(SearchPanelInputBase);
