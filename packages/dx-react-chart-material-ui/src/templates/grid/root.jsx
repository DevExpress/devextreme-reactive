import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    shapeRendering: 'crispEdges',
  },
});

class RootBase extends React.PureComponent {
  render() {
    const {
      children, className, classes, ...restProps
    } = this.props;
    return (
      <g
        className={classNames(classes.root, className)}
        {...restProps}
      >
        {children}
      </g>
    );
  }
}

RootBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RootBase.defaultProps = {
  className: undefined,
};

export const Root = withStyles(styles)(RootBase);
