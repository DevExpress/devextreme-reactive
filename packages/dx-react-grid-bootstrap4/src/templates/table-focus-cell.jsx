import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

class FocusCellBase extends React.PureComponent {
  render() {
    const {
      className,
      component: CellPlaceholder,
      ...restProps
    } = this.props;

    return (
      <CellPlaceholder
        className={classNames({
          'dx-g-bs4-focus-cell': true,
        }, className)}
        {...restProps}
      />
    );
  }
}

FocusCellBase.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
};

FocusCellBase.defaultProps = {
  className: undefined,
};

export const FocusCell = withKeyboardNavigation()(FocusCellBase);
