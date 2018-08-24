import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    stroke: 'none',
  },
});
class PointBase extends React.PureComponent {
  render() {
    const {
      x, y, classes, className, seriesComponent, value, color, ...restProps
    } = this.props;
    return (
      <path
        fill={color}
        transform={`translate(${x} ${y})`}
        className={classNames(classes.root, className)}
        {...restProps}
      />
    );
  }
}

PointBase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  seriesComponent: PropTypes.any,
  color: PropTypes.string,
};

PointBase.defaultProps = {
  className: undefined,
  seriesComponent: undefined,
  color: undefined,
};

export const Point = withStyles(styles)(PointBase);
