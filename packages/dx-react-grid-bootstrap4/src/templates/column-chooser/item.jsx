import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

export const Item = ({
  item: { column, hidden },
  onToggle, className, style,
  disabled, ...restProps
}) => (
  <button
    className={classNames('dropdown-item', className)}
    style={{
      cursor: 'pointer',
      fontSize: 'initial',
      ...style,
    }}
    type="button"
    onClick={onToggle}
    onMouseDown={handleMouseDown}
    onBlur={handleBlur}
    disabled={disabled}
    {...restProps}
  >
    <input
      type="checkbox"
      style={{ cursor: disabled ? 'default' : 'pointer', marginRight: 10 }}
      tabIndex={-1}
      checked={!hidden}
      disabled={disabled}
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
  disabled: PropTypes.bool,
};

Item.defaultProps = {
  onToggle: () => {},
  className: undefined,
  style: undefined,
  disabled: false,
};
