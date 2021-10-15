import * as React from 'react';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';
import * as PropTypes from 'prop-types';

const styles = (theme) => {
  const arrowSize = theme.spacing(1.2);
  const arrowWidth = theme.spacing(2.4);
  return {
    'arrow-top': {
      width: arrowWidth,
      height: arrowSize,
      position: 'absolute',
      top: '100%',
      overflow: 'hidden',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: arrowSize,
        height: arrowSize,
        background: theme.palette.background.paper,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
        left: '50%',
        boxShadow: theme.shadows[2],
      },
    },
    'arrow-right': {
      width: arrowSize,
      height: arrowWidth,
      position: 'absolute',
      top: '25%!important',
      transform: 'translateX(-100%)!important',
      overflow: 'hidden',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: arrowSize,
        height: arrowSize,
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
}, ref) => <div className={classNames(classes[`arrow-${placement}`], className)} ref={ref} {...restProps} />);

BaseArrow.propTypes = {
  placement: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

BaseArrow.defaultProps = {
  className: undefined,
};

export const Arrow = withStyles(styles)(BaseArrow);
