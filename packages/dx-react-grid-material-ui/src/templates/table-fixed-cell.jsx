import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  dividerRight: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  dividerLeft: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  fixedCell: {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    zIndex: 300,
    backgroundClip: 'padding-box',
  },
  selected: {
    backgroundColor: 'inherit',
  },
});

class FixedCellBase extends React.PureComponent {
  render() {
    const {
      className,
      classes,
      component: CellPlaceholder,
      position,
      selected,
      showLeftDivider,
      showRightDivider,
      side,
      style,
      ...restProps
    } = this.props;

    return (
      <CellPlaceholder
        className={classNames({
          [classes.dividerLeft]: showLeftDivider,
          [classes.dividerRight]: showRightDivider,
          [classes.fixedCell]: true,
          [classes.selected]: selected,
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
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  position: PropTypes.number,
  selected: PropTypes.bool,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
  side: PropTypes.string.isRequired,
  style: PropTypes.object,
};

FixedCellBase.defaultProps = {
  className: undefined,
  position: undefined,
  selected: false,
  showLeftDivider: false,
  showRightDivider: false,
  style: null,
};

export const FixedCell = withStyles(styles, { name: 'TableFixedCell' })(FixedCellBase);
