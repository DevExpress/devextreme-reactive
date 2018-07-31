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
      x, y, classes, className, value, ...restProps
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

SliceBase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
};

SliceBase.defaultProps = {
  className: undefined,
};

export const Slice = withStyles(styles)(SliceBase);
