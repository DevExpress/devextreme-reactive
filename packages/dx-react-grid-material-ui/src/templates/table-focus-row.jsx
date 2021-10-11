import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';
import getSelectionColor from '../utils/get-selection-color';

const styles = theme => ({
  focusedRow: {
    backgroundColor: getSelectionColor(theme),
  },
});

class FocusRowBase extends React.PureComponent {
  render() {
    const {
      className,
      classes,
      component: RowPlaceholder,
      focused,
      ...restProps
    } = this.props;

    return (
      <RowPlaceholder
        className={classNames({
          [classes.focusedRow]: !!focused,
        }, className)}
        {...restProps}
      />
    );
  }
}

FocusRowBase.propTypes = {
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  focused: PropTypes.bool,
};

FocusRowBase.defaultProps = {
  className: undefined,
  focused: undefined,
};

export const FocusRow = withStyles(styles, { name: 'TableFocusRow' })(FocusRowBase);
