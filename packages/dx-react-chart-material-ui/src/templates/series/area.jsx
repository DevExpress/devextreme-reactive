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
      classes,
      className,
      coordinates,
      path,
      color,
      ...restProps
    } = this.props;
    return (
      <path
        fill={color}
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
  color: PropTypes.string,
};

PathBase.defaultProps = {
  className: undefined,
  color: undefined,
};

export const Area = withStyles(styles)(PathBase);
