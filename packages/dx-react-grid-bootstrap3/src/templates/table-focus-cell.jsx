import React from 'react';
import * as PropTypes from 'prop-types';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

class FocusCellBase extends React.PureComponent {
  render() {
    const {
      component: CellPlaceholder,
      ...restProps
    } = this.props;

    return (
      <CellPlaceholder
        {...restProps}
      />
    );
  }
}

FocusCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
};

FocusCellBase.defaultProps = {
  className: undefined,
};

export const FocusCell = withKeyboardNavigation()(FocusCellBase);
