import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  nowIndicator: {
    left: 0,
    top: ({ top }) => top,
    position: 'absolute',
    height: '2px',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    transform: 'translate(0, -1px)',
  },
  circle: {
    left: 0,
    top: ({ top }) => top,
    position: 'absolute',
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    background: theme.palette.secondary.main,
    transform: 'translate(-50%, -50%)',
  },
}));

export const Indicator = ({
  startDate,
  endDate,
  currentTime,
  ...restProps
}) => {
  const currentTimeIndicatorTop = `${((currentTime - startDate.getTime()) * 100) / (endDate.getTime() - startDate.getTime())}%`;
  const classes = useStyles({ top: currentTimeIndicatorTop });

  return (
    <div {...restProps}>
      <div className={classes.circle} />
      <div className={classes.nowIndicator} />
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
