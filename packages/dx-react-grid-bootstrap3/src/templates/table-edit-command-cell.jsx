import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

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

const EditCommandHeadingCellBase = ({
  children,
  style,
  tableColumn, tableRow,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <th
    ref={refObject}
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

EditCommandHeadingCellBase.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

EditCommandHeadingCellBase.defaultProps = {
  children: undefined,
  style: null,
  tableColumn: undefined,
  tableRow: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const EditCommandHeadingCell = withKeyboardNavigation()(EditCommandHeadingCellBase);

const EditCommandCellBase = ({
  tableColumn, tableRow, row,
  children, style,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <td
    ref={refObject}
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

EditCommandCellBase.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

EditCommandCellBase.defaultProps = {
  children: undefined,
  style: null,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const EditCommandCell = withKeyboardNavigation()(EditCommandCellBase);
