import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

const PREFIX = 'TableFocusCell';
export const classes = {
  focusedCell: `${PREFIX}-focusedCell`,
  simpleCell: `${PREFIX}-simpleCell`,
};

const styles = ({ theme }) => ({
  [`&.${classes.focusedCell}`]: {
    border: `1px solid ${theme.palette.primary.light}!important`,
  },
  [`&.${classes.simpleCell}`]: {
    outline: 'none',
  },
});
class FocusCellBase extends React.PureComponent {
  render() {
    const {
      className,
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
  className: PropTypes.string,
  focused: PropTypes.bool,
};

FocusCellBase.defaultProps = {
  className: undefined,
  focused: undefined,
};

export const FocusCell = withKeyboardNavigation()(styled(FocusCellBase)(styles));
