import * as React from 'react';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import PropTypes from 'prop-types';

const PREFIX = 'Arrow';

export const classes = {
  'arrow-top': `${PREFIX}-arrow-top`,
  'arrow-right': `${PREFIX}-arrow-right`,
};

const Root = styled('div')(({ theme }) => {
  const arrowSize = theme.spacing(1.2);
  const arrowWidth = theme.spacing(2.4);
  return {
    [`&.${classes['arrow-top']}`]: {
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
    [`&.${classes['arrow-right']}`]: {
      width: arrowSize,
      height: arrowWidth,
      position: 'absolute',
      top: '25%',
      transform: 'translateX(-100%)',
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
});

export const Arrow = React.forwardRef(({
  className, placement, ...restProps
}, ref) => <Root className={classNames(classes[`arrow-${placement}`], className)} ref={ref} {...restProps} />);

Arrow.propTypes = {
  placement: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Arrow.defaultProps = {
  className: undefined,
};
