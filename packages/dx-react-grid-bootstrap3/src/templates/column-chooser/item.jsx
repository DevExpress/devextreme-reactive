import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Item = ({
  item: { column, hidden },
  onToggle,
  className,
  disabled,
  ...restProps
}) => (
  <button
    className={classNames('list-group-item', className)}
    style={{ outline: 'none' }}
    type="button"
    disabled={disabled}
    onClick={onToggle}
    {...restProps}
  >
    <input
      type="checkbox"
      style={{ cursor: disabled ? 'default' : 'pointer' }}
      tabIndex={-1}
      checked={!hidden}
      disabled={disabled}
      onChange={onToggle}
      onClick={e => e.stopPropagation()}
    />
    &nbsp;
    {column.title || column.name}
  </button>
);

Item.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
    }),
    hidden: PropTypes.bool,
  }).isRequired,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

Item.defaultProps = {
  onToggle: () => {},
  disabled: false,
  className: undefined,
};
