import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableSelectAllCell = ({
  allSelected, someSelected, disabled, onToggle,
  tableColumn, tableRow, className, rowSpan,
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
        'align-middle': !rowSpan,
        'align-bottom': !!rowSpan,
        'dx-rg-bs4-cursor-pointer': !disabled,
      }, className)}
      rowSpan={rowSpan}
      onClick={toggle}
      {...restProps}
    >
      <input
        className={classNames({
          'd-block mx-auto': true,
          'my-1': !!rowSpan,
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
  style: PropTypes.object,
  rowSpan: PropTypes.number,
};

TableSelectAllCell.defaultProps = {
  className: undefined,
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
  tableRow: undefined,
  tableColumn: undefined,
  style: null,
  rowSpan: undefined,
};
