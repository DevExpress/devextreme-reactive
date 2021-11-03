import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';
import getSelectionColor from '../utils/get-selection-color';

const PREFIX = 'TableFocusRow';
export const classes = {
  focusedRow: `${PREFIX}-focusedRow`,
};

const styles = ({ theme }) => ({
  [`&.${classes.focusedRow}`]: {
    backgroundColor: getSelectionColor(theme),
  },
});
class FocusRowBase extends React.PureComponent {
  render() {
    const {
      className,
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
  className: PropTypes.string,
  focused: PropTypes.bool,
};

FocusRowBase.defaultProps = {
  className: undefined,
  focused: undefined,
};

export const FocusRow = styled(FocusRowBase)(styles);
