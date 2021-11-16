import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import {
  VERTICAL_TYPE, HORIZONTAL_TYPE,
  POSITION_START, POSITION_END,
} from '@devexpress/dx-scheduler-core';

const PREFIX = 'AppointmentsContainer';

export const classes = {
  slice: `${PREFIX}-slice`,
  verticalStart: `${PREFIX}-verticalStart`,
  verticalEnd: `${PREFIX}-verticalEnd`,
  horizontalStart: `${PREFIX}-horizontalStart`,
  horizontalEnd: `${PREFIX}-horizontalEnd`,
};

const verticalStyles = {
  width: '100%',
  height: '10px',
};

const horizontalStyles = {
  top: 0,
  width: '10px',
  height: '100%',
};

const StyledDiv = styled('div')({
  [`&.${classes.slice}`]: {
    position: 'absolute',
    zIndex: 50,
  },
  [`&.${classes.verticalStart}`]: {
    ...verticalStyles,
    top: '-10px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
  },
  [`&.${classes.verticalEnd}`]: {
    ...verticalStyles,
    bottom: '-10px',
    boxShadow: '0 -10px 15px rgba(0,0,0,0.2)',
  },
  [`&.${classes.horizontalStart}`]: {
    ...horizontalStyles,
    left: '-10px',
    boxShadow: '10px 0 15px rgba(0,0,0,0.2)',
  },
  [`&.${classes.horizontalEnd}`]: {
    ...horizontalStyles,
    right: '-10px',
    boxShadow: '-10px 0 15px rgba(0,0,0,0.2)',
  },
});

const SplitIndicatorBase = React.memo(({
  position, appointmentType, className, ...restProps
}) => {
  const vertical = appointmentType === VERTICAL_TYPE;
  const start = position === POSITION_START;
  return (
    <StyledDiv
      className={classNames({
        [classes.slice]: true,
        [classes.verticalStart]: vertical && start,
        [classes.verticalEnd]: vertical && !start,
        [classes.horizontalStart]: !vertical && start,
        [classes.horizontalEnd]: !vertical && !start,
      }, className)}
      {...restProps}
    />
  );
});

SplitIndicatorBase.propTypes = {
  appointmentType: PropTypes.oneOf([VERTICAL_TYPE, HORIZONTAL_TYPE]).isRequired,
  position: PropTypes.oneOf([POSITION_START, POSITION_END]).isRequired,
  className: PropTypes.string,
};

SplitIndicatorBase.defaultProps = {
  className: undefined,
};

export const SplitIndicator = (SplitIndicatorBase);
