import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    fill: 'none',
  },
});

class PathBase extends React.PureComponent {
  render() {
    const {
      x, y, classes, className, pointComponent, pointStyle, ...restProps
    } = this.props;
    return (
      <path
        transform={`translate(${x} ${y})`}
        className={classNames(classes.root, className)}
        {...restProps}
      />
    );
  }
}

PathBase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  pointComponent: PropTypes.any,
  pointStyle: PropTypes.any,
};

PathBase.defaultProps = {
  className: undefined,
  pointComponent: undefined,
  pointStyle: undefined,
};

export const Path = withStyles(styles)(PathBase);
