import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Item = ({
  item: { column, hidden },
  onToggle,
  className,
  style,
  ...restProps
}) => (
  <button
    className={classNames('list-group-item', className)}
    style={{ outline: 'none', ...style }}
    type="button"
    onClick={onToggle}
    {...restProps}
  >
    <input
      type="checkbox"
      style={{ cursor: 'pointer' }}
      tabIndex={-1}
      checked={!hidden}
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
  onToggle: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

Item.defaultProps = {
  onToggle: () => {},
  className: undefined,
  style: null,
};
