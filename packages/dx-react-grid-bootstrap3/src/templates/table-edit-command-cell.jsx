import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const CommandButton = ({
  onExecute,
  text,
  className,
  ...restProps
}) => (
  <button
    type="button"
    className={classNames('btn', 'btn-link', className)}
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
  children,
  style,
  tableColumn, tableRow,
  ...restProps
}) => (
  <th
    style={{
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: 0,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </th>
);

EditCommandHeadingCell.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

EditCommandHeadingCell.defaultProps = {
  children: undefined,
  style: null,
  tableColumn: undefined,
  tableRow: undefined,
};

export const EditCommandCell = ({
  tableColumn, tableRow, row,
  children, style,
  ...restProps
}) => (
  <td
    style={{
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: 0,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </td>
);

EditCommandCell.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
};

EditCommandCell.defaultProps = {
  children: undefined,
  style: null,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
};
