import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  root: {
    shapeRendering: 'crispEdges',
  },
});

class RootBase extends React.PureComponent {
  render() {
    const {
      x, y, refsHandler, children, className, classes, ...restProps
    } = this.props;
    return (
      <g
        className={classNames(classes.root, className)}
        ref={refsHandler}
        transform={`translate(${x} ${y})`}
        {...restProps}
      >
        {children}
      </g>
    );
  }
}

RootBase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  refsHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RootBase.defaultProps = {
  className: undefined,
};

export const Root = withStyles(styles)(RootBase);
