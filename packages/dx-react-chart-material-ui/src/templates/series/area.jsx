import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    opacity: 0.5,
  },
});

class PathBase extends React.PureComponent {
  render() {
    const {
      x,
      y,
      classes,
      className,
      pointComponent,
      pointStyle,
      coordinates,
      path,
      themeColor,
      ...restProps
    } = this.props;
    return (
      <path
        fill={themeColor}
        transform={`translate(${x} ${y})`}
        className={classNames(classes.root, className)}
        d={path(coordinates)}
        {...restProps}
      />
    );
  }
}


PathBase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  coordinates: PropTypes.array.isRequired,
  path: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  pointComponent: PropTypes.any,
  pointStyle: PropTypes.any,
  themeColor: PropTypes.string,
};

PathBase.defaultProps = {
  className: undefined,
  pointComponent: undefined,
  pointStyle: undefined,
  themeColor: undefined,
};

export const Area = withStyles(styles)(PathBase);
