import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableStubCellBase = ({
  style,
  tableRow,
  tableColumn,
  refObject, updateRefForKeyboardNavigation, setFocusedElement,
  ...restProps
}) => (
  <td
    ref={refObject}
    style={{
      padding: 0,
      ...style,
    }}
    {...restProps}
  />
);

TableStubCellBase.propTypes = {
  style: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableStubCellBase.defaultProps = {
  style: null,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableStubCell = withKeyboardNavigation()(TableStubCellBase);
