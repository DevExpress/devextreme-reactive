import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Item = ({
  item: { column, hidden },
  onToggle,
  className,
  style,
  disabled,
  ...restProps
}) => (
  <button
    className={classNames('list-group-item', className)}
    style={{ outline: 'none', ...style }}
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
      title: PropTypes.string,
    }),
    hidden: PropTypes.bool,
  }).isRequired,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

Item.defaultProps = {
  onToggle: () => {},
  disabled: false,
  className: undefined,
  style: null,
};
