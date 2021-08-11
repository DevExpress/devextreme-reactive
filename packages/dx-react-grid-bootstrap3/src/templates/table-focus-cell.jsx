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
  return (
    <CellPlaceholder
      {...restProps}
      style={{
        border: focused ? borderStyle : undefined,
        outline: 'none',
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
