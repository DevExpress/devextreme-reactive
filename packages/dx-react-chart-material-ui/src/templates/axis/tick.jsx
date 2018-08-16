import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { getBorderColor } from '../utils';

const styles = theme => ({
  root: {
    stroke: getBorderColor(theme),
    shapeRendering: 'crispEdges',
  },
});

export class TickBase extends React.PureComponent {
  render() {
    const {
      x1, x2, y1, y2, classes, className, ...restProps
    } = this.props;
    return (
      <path
        className={classNames(classes.root, className)}
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        {...restProps}
      />
    );
  }
}

TickBase.propTypes = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TickBase.defaultProps = {
  className: undefined,
};

export const Tick = withStyles(styles)(TickBase);
