import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

const SearchBoxInputBase = ({
  changeSearchValue, searchValue, getMessage, classes, ...restProps, className,
}) => (<Input
  className={classNames(classes.input, className)}
  onChange={e => changeSearchValue({ searchValue: e.target.value })}
  value={searchValue || ''}
  placeholder={getMessage('searchPlaceholder')}
  {...restProps}
/>);

SearchBoxInputBase.propTypes = {
  changeSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};
SearchBoxInputBase.defaultProps = {
  searchValue: '',
  className: undefined,
};

export const SearchBoxInput = withStyles({ name: 'SearchBoxInput' })(SearchBoxInputBase);

