import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const CommandButton = ({
  onExecute, text,
  className,
  ...restProps
}) => (
  <button
    type="button"
    className={classNames('btn btn-link dx-g-bs4-table-edit-command-cell', className)}
    onClick={(e) => {
      e.stopPropagation();
      onExecute();
    }}
    {...restProps}
  >
    {text}
  </button>
);

CommandButton.propTypes = {
  text: PropTypes.string.isRequired,
  onExecute: PropTypes.func.isRequired,
  className: PropTypes.string,
};

CommandButton.defaultProps = {
  className: undefined,
};

export const EditCommandHeadingCell = ({
  children, className,
  tableColumn, tableRow,
  forwardedRef,
  ...restProps
}) => (
  <th
    className={classNames({
      'text-center p-0 text-nowrap': true,
    }, className)}
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </th>
);

EditCommandHeadingCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.func,
};

EditCommandHeadingCell.defaultProps = {
  children: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  className: undefined,
  forwardedRef: undefined,
};

export const EditCommandCell = ({
  tableColumn, tableRow, row,
  children, className,
  forwardedRef,
  ...restProps
}) => (
  <td
    className={classNames({
      'text-center p-0 text-nowrap': true,
    }, className)}
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </td>
);

EditCommandCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  className: PropTypes.string,
  forwardedRef: PropTypes.func,
};

EditCommandCell.defaultProps = {
  children: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  className: undefined,
  forwardedRef: undefined,
};
