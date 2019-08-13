import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

const styles = (theme) => {
  const arrowSize = theme.spacing(1.2);
  return {
    'arrow-top': {
      width: `${arrowSize * 2}px`,
      height: `${arrowSize}px`,
      position: 'absolute',
      top: '100%',
      overflow: 'hidden',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: `${arrowSize}px`,
        height: `${arrowSize}px`,
        background: theme.palette.background.paper,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
        left: '50%',
        boxShadow: theme.shadows[2],
      },
    },
    'arrow-right': {
      width: `${arrowSize}px`,
      height: `${arrowSize * 2}px`,
      position: 'absolute',
      top: '50%',
      transform: 'translateX(-100%)',
      overflow: 'hidden',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: `${arrowSize}px`,
        height: `${arrowSize}px`,
        background: theme.palette.background.paper,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
        top: '50%',
        left: '100%',
        boxShadow: theme.shadows[2],
      },
    },
  };
};

const BaseArrow = React.forwardRef(({
  classes, className, placement, ...restProps
}, ref) => (
  <div className={classNames(classes[`arrow-${placement}`], className)} ref={ref} {...restProps} />
));

BaseArrow.propTypes = {
  placement: PropTypes.string.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object,
};

BaseArrow.defaultProps = {
  className: undefined,
  classes: undefined,
};

export const Arrow = withStyles(styles)(BaseArrow);
