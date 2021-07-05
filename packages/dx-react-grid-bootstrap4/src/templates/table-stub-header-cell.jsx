import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const TableStubHeaderCellBase = ({
  className,
  tableRow,
  tableColumn,
  refObject,
  updateRefForKeyboardNavigation,
  setFocusedElement,
  ...restProps
}) => (
  <th
    className={classNames({
      'p-0': true,
      'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
    }, className)}
    ref={refObject}
    {...restProps}
  />
);

TableStubHeaderCellBase.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableStubHeaderCellBase.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableStubHeaderCell = withKeyboardNavigation()(TableStubHeaderCellBase);
