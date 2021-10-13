import React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const FocusCellBase = ({
  component: CellPlaceholder,
  focused,
  style,
  ...restProps
}) => {
  const borderStyle = '1px solid #337ab7';
  const border = {
    borderTop: borderStyle,
    borderLeft: borderStyle,
    borderRight: borderStyle,
    borderBottom: borderStyle,
  };
  return (
    <CellPlaceholder
      {...restProps}
      style={{
        outline: 'none',
        ...focused ? border : null,
        ...style,
      }}
    />
  );
};

FocusCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  style: PropTypes.object,
};

FocusCellBase.defaultProps = {
  focused: undefined,
  style: undefined,
};

export const FocusCell = withKeyboardNavigation()(FocusCellBase);
