import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fixedCell: {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    color: 'cornflowerblue',
  },
});

const FixedCellBase = ({
  component: Cell,
  fixedPosition,
  className,
  classes,
  style,
  ...restProps
}) => (
  <Cell
    className={classNames(classes.fixedCell, className)}
    style={{
      ...style,
      [fixedPosition.side === 'before' ? 'left' : 'right']: fixedPosition.index * 100,
    }}
    {...restProps}
  />
);

FixedCellBase.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  fixedPosition: PropTypes.shape({
    side: PropTypes.string,
    index: PropTypes.number,
  }).isRequired,
};

FixedCellBase.defaultProps = {
  className: undefined,
  style: {},
};

export const FixedCell = withStyles(styles)(FixedCellBase);
