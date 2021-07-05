import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { StyleContext } from '../layout';

class CellBase extends React.PureComponent {
  render() {
    const {
      style, column, value, children,
      tableRow, tableColumn, row, beforeBorder,
      refObject, updateRefForKeyboardNavigation, setFocusedElement,
      ...restProps
    } = this.props;
    const { borderColor } = this.context;

    return (
      <th
        ref={refObject}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          borderTop: 'none',
          borderBottom: `1px solid ${borderColor}`,
          borderRight: `1px solid ${borderColor}`,
          ...beforeBorder ? { borderLeft: `1px solid ${borderColor}` } : null,
          ...style,
        }}
        {...restProps}
      >
        {children}
      </th>
    );
  }
}

CellBase.contextType = StyleContext;

CellBase.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  beforeBorder: PropTypes.bool,
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

CellBase.defaultProps = {
  style: null,
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  beforeBorder: false,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const Cell = withKeyboardNavigation()(CellBase);
