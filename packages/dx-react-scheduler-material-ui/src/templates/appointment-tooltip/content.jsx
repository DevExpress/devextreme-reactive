import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AccessTime from '@material-ui/icons/AccessTime';
import Circle from '@material-ui/icons/Lens';
import moment from 'moment';
import { HOUR_MINUTE_OPTIONS, DAY_LONG_WEEK_DAY_OPTIONS } from '@devexpress/dx-scheduler-core';
import { setColor } from '../utils';

const styles = ({ spacing, palette, typography }) => ({
  content: {
    padding: spacing(3, 1),
    paddingTop: 0,
    backgroundColor: palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  text: {
    ...typography.body2,
    display: 'inline-block',
  },
  title: {
    ...typography.h6,
    color: palette.text.secondary,
    fontWeight: typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: typography.body2.color,
    verticalAlign: 'middle',
  },
  circle: {
    color: setColor(300, palette.primary),
    width: spacing(4.5),
    height: spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: spacing(2),
  },
  container: {
    paddingBottom: spacing(1.5),
  },
});

export const ContentBase = ({
  classes,
  className,
  children,
  appointmentData,
  formatDate,
  ...restProps
}) => {
  const weekDays = moment(appointmentData.endDate).isAfter(appointmentData.startDate, 'day')
    ? `${formatDate(appointmentData.startDate, DAY_LONG_WEEK_DAY_OPTIONS)} - ${formatDate(appointmentData.endDate, DAY_LONG_WEEK_DAY_OPTIONS)}`
    : formatDate(appointmentData.startDate, DAY_LONG_WEEK_DAY_OPTIONS);
  return (
    <div
      className={classNames(classes.content, className)}
      {...restProps}
    >
      <Grid container alignItems="center" className={classes.titleContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <Circle className={classes.circle} />
        </Grid>
        <Grid item xs={10}>
          <div>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {appointmentData.title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              {weekDays}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.container}>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(appointmentData.startDate, HOUR_MINUTE_OPTIONS)}
              - ${formatDate(appointmentData.endDate, HOUR_MINUTE_OPTIONS)}`}
          </div>
        </Grid>
      </Grid>
      {children}
    </div>
  );
};

ContentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appointmentData: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  formatDate: PropTypes.func.isRequired,
};

ContentBase.defaultProps = {
  appointmentData: undefined,
  className: undefined,
  children: undefined,
};

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);
