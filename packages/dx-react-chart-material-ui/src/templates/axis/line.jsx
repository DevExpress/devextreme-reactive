import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  root: {
    stroke: getBorderColor(theme),
    shapeRendering: 'crispEdges',
  },
});

export class LineBase extends React.PureComponent {
  render() {
    const {
      width, height, orientation, classes, className, ...restProps
    } = this.props;
    return (
      <path
        className={classNames(classes.root, className)}
        d={`M 0 0 L ${orientation === 'horizontal' ? width : 0} ${orientation === 'horizontal' ? 0 : height}`}
        {...restProps}
      />
    );
  }
}

LineBase.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

LineBase.defaultProps = {
  className: undefined,
};

export const Line = withStyles(styles)(LineBase);
