import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  root: {
    stroke: getBorderColor(theme),
  },
});

export class LineBase extends React.PureComponent {
  render() {
    const {
      x1, x2, y1, y2, classes, className,
    } = this.props;
    return (
      <line
        className={classNames(classes.root, className)}
        shapeRendering="crispEdges"
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
      />
    );
  }
}

LineBase.propTypes = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

LineBase.defaultProps = {
  className: undefined,
};

export const Line = withStyles(styles)(LineBase);
