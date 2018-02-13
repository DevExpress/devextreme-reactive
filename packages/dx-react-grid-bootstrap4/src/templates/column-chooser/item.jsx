import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './item.css';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

export const Item = ({
  item: { column, hidden },
  onToggle, className,
  disabled, ...restProps
}) => (
  <button
    className={classNames('dropdown-item column-chooser__item cursor-pointer', className)}
    type="button"
    onClick={onToggle}
    onMouseDown={handleMouseDown}
    onBlur={handleBlur}
    disabled={disabled}
    {...restProps}
  >
    <input
      type="checkbox"
      className={classNames({
        'cursor-pointer': !disabled,
        'column-chooser__item__input': true,
      })}
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
  disabled: PropTypes.bool,
};

Item.defaultProps = {
  onToggle: () => {},
  className: undefined,
  disabled: false,
};
