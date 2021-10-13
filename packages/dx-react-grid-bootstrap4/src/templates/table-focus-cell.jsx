import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

class FocusCellBase extends React.PureComponent {
  render() {
    const {
      className,
      component: CellPlaceholder,
      focused,
      ...restProps
    } = this.props;

    return (
      <CellPlaceholder
        className={classNames({
          'border border-primary dx-g-bs-focus-cell': !!focused,
          'dx-g-bs4-simple-cell': true,
        }, className)}
        {...restProps}
      />
    );
  }
}

FocusCellBase.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
  focused: PropTypes.bool,
};

FocusCellBase.defaultProps = {
  className: undefined,
  focused: undefined,
};

export const FocusCell = withKeyboardNavigation()(FocusCellBase);
