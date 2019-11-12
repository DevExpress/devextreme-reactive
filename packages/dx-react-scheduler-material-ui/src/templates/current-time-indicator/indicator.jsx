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
  cellStartDate,
  cellEndDate,
  currentTime,
  ...restProps
}) => {
  const currentTimeIndicatorTop = `${((currentTime - cellStartDate.getTime()) * 100) / (cellEndDate.getTime() - cellStartDate.getTime())}%`;
  const classes = useStyles({ top: currentTimeIndicatorTop });

  return (
    <div {...restProps}>
      <div className={classes.circle} />
      <div className={classes.nowIndicator} />
    </div>
  );
};

Indicator.propTypes = {
  cellStartDate: PropTypes.instanceOf(Date),
  cellEndDate: PropTypes.instanceOf(Date),
  currentTime: PropTypes.number,
};

Indicator.defaultProps = {
  cellStartDate: new Date(),
  cellEndDate: new Date(),
  currentTime: 0,
};
