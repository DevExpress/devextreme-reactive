import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ColumnChooserItem = ({
  item: { column, hidden },
  onToggle,
  className,
  ...restProps
}) => {
  const handleChange = () => onToggle();
  return (
    <button
      className={classNames('list-group-item', className)}
      style={{ outline: 'none' }}
      type="button"
      onClick={handleChange}
      {...restProps}
    >
      <input
        type="checkbox"
        tabIndex={-1}
        checked={!hidden}
        onChange={handleChange}
      />
      &nbsp;
      {column.title || column.name}
    </button>
  );
};

ColumnChooserItem.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
    }),
    hidden: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

ColumnChooserItem.defaultProps = {
  onToggle: () => {},
  className: undefined,
};
