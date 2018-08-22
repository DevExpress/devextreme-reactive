import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    stroke: 'none',
  },
});

class SliceBase extends React.PureComponent {
  render() {
    const {
      x, y, classes, className, value, color, ...restProps
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

SliceBase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

SliceBase.defaultProps = {
  className: undefined,
  color: undefined,
};

export const Slice = withStyles(styles)(SliceBase);
