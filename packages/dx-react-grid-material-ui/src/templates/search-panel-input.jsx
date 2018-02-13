import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

const SearchPanelInputBase = ({
  changeSearchValue, searchValue, getMessage, classes, ...restProps, className,
}) => (<Input
  className={classNames(classes.input, className)}
  onChange={e => changeSearchValue({ searchValue: e.target.value })}
  value={searchValue || ''}
  placeholder={getMessage('searchPlaceholder')}
  {...restProps}
/>);

SearchPanelInputBase.propTypes = {
  changeSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};
SearchPanelInputBase.defaultProps = {
  searchValue: '',
  className: undefined,
};

export const SearchPanelInput = withStyles({ name: 'SearchPanelInput' })(SearchPanelInputBase);

