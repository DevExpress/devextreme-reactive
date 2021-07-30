import React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const FocusCellBase = ({
  component: CellPlaceholder,
  ...restProps
}) => (
  <CellPlaceholder
    {...restProps}
  />
);

FocusCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
};

FocusCellBase.defaultProps = {
  className: undefined,
};

export const FocusCell = withKeyboardNavigation()(FocusCellBase);
