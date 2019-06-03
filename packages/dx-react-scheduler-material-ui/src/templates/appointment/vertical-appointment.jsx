import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
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
    lineHeight: `${spacing(1.5)}px`,
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
    padding: `${spacing(0.5)}px ${spacing(1)}px`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'flex',
  },
  container: {
    width: '100%',
  },
  recurringContainer: {
    width: `calc(100% - ${spacing(2)}px)`,
  },
  imageContainer: {
    width: `${spacing(2)}px`,
    height: `${spacing(2)}px`,
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
    <div className={classNames(classes.content, className)} {...restProps}>
      {children || (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </div>
  );
};

VerticalAppointmentBase.propTypes = {
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
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
