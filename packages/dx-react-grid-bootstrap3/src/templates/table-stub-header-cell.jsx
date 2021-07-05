import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableStubHeaderCellBase = ({
  style,
  tableRow,
  tableColumn,
  refObject,
  updateRefForKeyboardNavigation,
  setFocusedElement,
  ...restProps
}) => (
  <th
    ref={refObject}
    style={{
      padding: 0,
      ...style,
    }}
    {...restProps}
  />
);

TableStubHeaderCellBase.propTypes = {
  style: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableStubHeaderCellBase.defaultProps = {
  style: null,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableStubHeaderCell = withKeyboardNavigation()(TableStubHeaderCellBase);
