import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const SearchPanelInput = ({
  onValueChange,
  value,
  getMessage,
  ...restProps
}) => (
  <input
    type="text"
    className={classNames('form-control w-25')}
    onChange={e => onValueChange(e.target.value)}
    value={value}
    placeholder={getMessage('searchPlaceholder')}
    {...restProps}
  />
);

SearchPanelInput.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};

SearchPanelInput.defaultProps = {
  value: null,
};
