import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Item = ({
  item: { column, hidden },
  onToggle, className, style,
  ...restProps
}) => (
  <button
    className={classNames('list-group-item list-group-item-action', className)}
    style={{ outline: 'none', cursor: 'pointer', ...style }}
    type="button"
    onClick={onToggle}
    {...restProps}
  >
    <input
      type="checkbox"
      style={{ cursor: 'pointer', marginRight: 20 }}
      tabIndex={-1}
      checked={!hidden}
      onChange={onToggle}
      onClick={e => e.stopPropagation()}
    />
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
  onToggle: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

Item.defaultProps = {
  onToggle: () => {},
  className: undefined,
  style: undefined,
};
