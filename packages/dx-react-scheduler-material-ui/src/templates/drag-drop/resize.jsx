import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE,
  POSITION_START, POSITION_END,
} from '@devexpress/dx-scheduler-core';

const PREFIX = 'Resize';

export const classes = {
  resize: `${PREFIX}-resize`,
  verticalStart: `${PREFIX}-verticalStart`,
  verticalEnd: `${PREFIX}-verticalEnd`,
  horizontalStart: `${PREFIX}-horizontalStart`,
  horizontalEnd: `${PREFIX}-horizontalEnd`,
};

const verticalStyles = spacing => ({
  width: '100%',
  height: spacing(1),
  cursor: 'ns-resize',
});

const horizontalStyles = spacing => ({
  width: spacing(1),
  height: '100%',
  cursor: 'ew-resize',
});

const StyledDiv = styled('div')(({ theme: { spacing } }) => {
  const vertical = verticalStyles(spacing);
  const horizontal = horizontalStyles(spacing);
  return {
    [`&.${classes.resize}`]: {
      position: 'absolute',
      zIndex: 100,
    },
    [`&.${classes.verticalStart}`]: {
      ...vertical,
      top: 0,
    },
    [`&.${classes.verticalEnd}`]: {
      ...vertical,
      bottom: 0,
    },
    [`&.${classes.horizontalStart}`]: {
      ...horizontal,
      left: 0,
    },
    [`&.${classes.horizontalEnd}`]: {
      ...horizontal,
      right: 0,
    },
  };
});

export const Resize = React.memo(({
  className,
  position, appointmentType,
  forwardedRef, ...restProps
}) => {
  const vertical = appointmentType === VERTICAL_TYPE;
  const start = position === POSITION_START;
  return (
    <StyledDiv
      ref={forwardedRef}
      className={classNames({
        [classes.resize]: true,
        [classes.verticalStart]: vertical && start,
        [classes.verticalEnd]: vertical && !start,
        [classes.horizontalStart]: !vertical && start,
        [classes.horizontalEnd]: !vertical && !start,
      }, className)}
      {...restProps}
    />
  );
});

Resize.propTypes = {
  position: PropTypes.oneOf([POSITION_START, POSITION_END]).isRequired,
  appointmentType: PropTypes.oneOf([HORIZONTAL_TYPE, VERTICAL_TYPE]).isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Resize.defaultProps = {
  className: undefined,
  forwardedRef: undefined,
};
