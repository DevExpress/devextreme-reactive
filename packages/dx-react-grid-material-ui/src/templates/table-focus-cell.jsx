import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const styles = theme => ({
  focusedCell: {
    border: `1px solid ${theme.palette.primary.light}!important`,
  },
  simpleCell: {
    outline: 'none',
  },
});

class FocusCellBase extends React.PureComponent {
  render() {
    const {
      className,
      classes,
      focused,
      component: CellPlaceholder,
      ...restProps
    } = this.props;

    return (
      <CellPlaceholder
        className={classNames({
          [classes.focusedCell]: !!focused,
          [classes.simpleCell]: true,
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
  focused: PropTypes.bool,
};

FocusCellBase.defaultProps = {
  className: undefined,
  focused: undefined,
};

export const FocusCell = withKeyboardNavigation()(withStyles(styles, { name: 'TableFocusCell' })(FocusCellBase));
