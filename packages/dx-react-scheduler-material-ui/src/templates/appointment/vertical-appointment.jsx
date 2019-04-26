import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';

const styles = ({ palette, spacing }) => ({
  title: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    lineHeight: `${spacing.unit * 1.5}px`,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  time: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    color: palette.common.white,
    padding: `${spacing.unit / 2}px ${spacing.unit}px`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'flex',
  },
  container: {
    width: '100%',
  },
  recurringContainer: {
    width: `calc(100% - ${spacing.unit * 2}px)`,
  },
  imageContainer: {
    width: `${spacing.unit * 2}px`,
    height: `${spacing.unit * 2}px`,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const VerticalAppointmentBase = ({
  classes,
  data,
  children,
  className,
  formatDate,
  recurringIconComponent: RecurringIcon,
  ...restProps
}) => {
  const repeat = !!data.rRule;
  return (
    children || (
    <div className={classNames(classes.content, className)} {...restProps}>
      <div className={repeat ? classes.recurringContainer : classes.container}>
        <div className={classes.title}>
          {data.title}
        </div>
        <div className={classes.textContainer}>
          <div className={classes.time}>
            {formatDate(data.startDate, HOUR_MINUTE_OPTIONS)}
          </div>
          <div className={classes.time}>
            {' - '}
          </div>
          <div className={classes.time}>
            {formatDate(data.endDate, HOUR_MINUTE_OPTIONS)}
          </div>
        </div>
      </div>
      {repeat ? (
        <div className={classes.imageContainer}>
          <RecurringIcon className={classes.image} />
        </div>
      ) : undefined}
    </div>
    )
  );
};

VerticalAppointmentBase.propTypes = {
  recurringIconComponent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

VerticalAppointmentBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
