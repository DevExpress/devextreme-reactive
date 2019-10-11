import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core';

const styles = ({ palette, spacing }) => ({
  title: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    lineHeight: 1,
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
    padding: spacing(0.5, 1),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'flex',
  },
  shortContent: {
    padding: spacing(0.25, 1),
  },
  shortContainer: {
    display: 'flex',
  },
  shortTime: {
    textOverflow: 'initial',
    flexShrink: 0.5,
  },
  shortTitle: {
    flexShrink: 3,
  },
  container: {
    width: '100%',
  },
  recurringContainer: {
    width: `calc(100% - ${spacing(2)}px)`,
  },
  imageContainer: {
    width: spacing(2),
    height: spacing(2),
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
  short,
  ...restProps
}) => {
  console.log(short);
  const repeat = !!data.rRule;
  const isShort = short;
  return (
    <div
      className={classNames({
        [classes.content]: true,
        [classes.shortContent]: isShort,
      }, className)}
      {...restProps}
    >
      {children || (
        <>
          <div className={repeat ? classes.recurringContainer : classes.container}>
            {isShort ? (
              <div className={classes.shortContainer}>
                <div className={classNames(classes.title, classes.shortTitle)}>
                  {data.title}
                  ,
                  &nbsp;
                </div>
                <div className={classNames(classes.time, classes.shortTime)}>
                  {formatDate(data.startDate, HOUR_MINUTE_OPTIONS)}
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
          {repeat ? (
            <div className={classes.imageContainer}>
              <RecurringIcon className={classes.image} />
            </div>
          ) : undefined}
        </>
      )}
    </div>
  );
};

VerticalAppointmentBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  short: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

VerticalAppointmentBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
