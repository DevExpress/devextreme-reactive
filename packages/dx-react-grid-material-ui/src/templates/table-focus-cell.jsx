import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import focusedStyle from '../utils/get-focused-style';

const styles = () => ({
  focusedCell: focusedStyle,
});

class FocusCellBase extends React.PureComponent {
  render() {
    const {
      className,
      classes,
      component: CellPlaceholder,
      ...restProps
    } = this.props;

    return (
      <CellPlaceholder
        className={classNames({
          [classes.focusedCell]: true,
        }, className)}
        {...restProps}
      />
    );
  }
}

FocusCellBase.propTypes = {
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

FocusCellBase.defaultProps = {
  className: undefined,
};

export const FocusCell = withKeyboardNavigation()(withStyles(styles, { name: 'TableFocusCell' })(FocusCellBase));
