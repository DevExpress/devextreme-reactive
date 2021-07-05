import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

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

const EditCommandHeadingCellBase = ({
  children, className,
  tableColumn, tableRow,
  refObject,
  updateRefForKeyboardNavigation,
  setFocusedElement,
  ...restProps
}) => (
  <th
    className={classNames({
      'text-center p-0 text-nowrap': true,
      'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
    }, className)}
    ref={refObject}
    {...restProps}
  >
    {children}
  </th>
);

EditCommandHeadingCellBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  className: PropTypes.string,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

EditCommandHeadingCellBase.defaultProps = {
  children: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  className: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const EditCommandHeadingCell = withKeyboardNavigation()(EditCommandHeadingCellBase);

const EditCommandCellBase = ({
  tableColumn, tableRow, row,
  children, className,
  refObject,
  updateRefForKeyboardNavigation,
  setFocusedElement,
  ...restProps
}) => (
  <td
    className={classNames({
      'text-center p-0 text-nowrap': true,
      'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
    }, className)}
    ref={refObject}
    {...restProps}
  >
    {children}
  </td>
);

EditCommandCellBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  className: PropTypes.string,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

EditCommandCellBase.defaultProps = {
  children: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  className: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const EditCommandCell = withKeyboardNavigation()(EditCommandCellBase);
