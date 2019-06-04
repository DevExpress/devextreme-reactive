import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fixedCell: {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    zIndex: 300,
    backgroundClip: 'padding-box',
  },
  dividerRight: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  dividerLeft: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
});

class FixedCellBase extends React.PureComponent {
  render() {
    const {
      component: CellPlaceholder,
      side,
      showLeftDivider,
      showRightDivider,
      className,
      classes,
      style,
      position,
      ...restProps
    } = this.props;

    return (
      <CellPlaceholder
        className={classNames({
          [classes.fixedCell]: true,
          [classes.dividerLeft]: showLeftDivider,
          [classes.dividerRight]: showRightDivider,
        }, className)}
        style={{
          ...style,
          [side]: position,
        }}
        {...restProps}
      />
    );
  }
}

FixedCellBase.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  side: PropTypes.string.isRequired,
  position: PropTypes.number,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
};

FixedCellBase.defaultProps = {
  className: undefined,
  style: null,
  showLeftDivider: false,
  showRightDivider: false,
  position: undefined,
};

export const FixedCell = withStyles(styles, { name: 'TableFixedCell' })(FixedCellBase);
