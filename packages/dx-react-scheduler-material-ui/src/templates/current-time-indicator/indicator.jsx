import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { getCurrentTimeIndicatorTop } from '@devexpress/dx-scheduler-core';

const useStyles = makeStyles(theme => ({
  line: {
    height: '2px',
    width: '100%',
    transform: 'translate(0, -1px)',
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },
  nowIndicator: {
    position: 'absolute',
    left: 0,
    top: ({ top }) => top,
    background: theme.palette.secondary.main,
    zIndex: 1,
  },
}));

export const Indicator = ({
  startDate,
  endDate,
  currentTime,
  ...restProps
}) => {
  const currentTimeIndicatorTop = getCurrentTimeIndicatorTop(startDate, endDate, currentTime);
  const classes = useStyles({ top: currentTimeIndicatorTop });

  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};

Indicator.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  currentTime: PropTypes.instanceOf(Date),
};

Indicator.defaultProps = {
  startDate: new Date(),
  endDate: new Date(),
  currentTime: new Date(),
};
