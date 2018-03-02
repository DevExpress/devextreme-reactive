import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableSelectAllCell = ({
  allSelected, someSelected, disabled, onToggle,
  tableColumn, tableRow, className,
  ...restProps
}) => {
  const toggle = (e) => {
    if (disabled) return;

    e.stopPropagation();
    onToggle();
  };

  return (
    <th
      className={classNames({
        'align-middle': true,
        'dx-rg-bs4-cursor-pointer': !disabled,
      }, className)}
      onClick={toggle}
      {...restProps}
    >
      <input
        className={classNames({
          'd-block m-auto': true,
          'dx-rg-bs4-cursor-pointer': !disabled,
        })}
        type="checkbox"
        disabled={disabled}
        checked={allSelected}
        ref={(ref) => {
          if (ref) {
            const checkbox = ref;
            checkbox.indeterminate = someSelected;
          }
        }}
        onChange={toggle}
        onClick={e => e.stopPropagation()}
      />
    </th>
  );
};

TableSelectAllCell.propTypes = {
  className: PropTypes.string,
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableSelectAllCell.defaultProps = {
  className: undefined,
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
  tableRow: undefined,
  tableColumn: undefined,
};
