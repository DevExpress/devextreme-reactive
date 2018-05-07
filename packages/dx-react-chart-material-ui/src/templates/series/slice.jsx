import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    stroke: 'none',
  },
});

class SliceBase extends React.PureComponent {
  render() {
    const {
      x, y, classes, className, ...restProps
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
  d: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

SliceBase.defaultProps = {
  className: undefined,
};

export const Slice = withStyles(styles)(SliceBase);
