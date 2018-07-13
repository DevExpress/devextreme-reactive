import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    fill: 'none',
    strokeWidth: '2px',
  },
});

class PathBase extends React.PureComponent {
  render() {
    const {
      classes,
      className,
      pointComponent,
      pointStyle,
      coordinates,
      path,
      color,
      ...restProps
    } = this.props;
    return (
      <path
        stroke={color}
        className={classNames(classes.root, className)}
        d={path(coordinates)}
        {...restProps}
      />
    );
  }
}

PathBase.propTypes = {
  coordinates: PropTypes.array.isRequired,
  path: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  pointComponent: PropTypes.any,
  pointStyle: PropTypes.any,
  color: PropTypes.string,
};

PathBase.defaultProps = {
  className: undefined,
  pointComponent: undefined,
  pointStyle: undefined,
  color: undefined,
};

export const Path = withStyles(styles)(PathBase);
