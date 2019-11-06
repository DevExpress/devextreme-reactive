import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AccessTime from '@material-ui/icons/AccessTime';
import Lens from '@material-ui/icons/Lens';
import { HOUR_MINUTE_OPTIONS, WEEKDAY_INTERVAL, viewBoundText } from '@devexpress/dx-scheduler-core';
import { setColor } from '../utils';

const styles = ({ spacing, palette, typography }) => ({
  content: {
    padding: spacing(1.5, 1),
    paddingTop: spacing(1),
    backgroundColor: palette.background.paper,
    boxSizing: 'border-box',
    ...typography.body2,
  },
  text: {
    display: 'inline-block',
  },
  title: {
    ...typography.h6,
    color: palette.text.secondary,
    fontWeight: typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    verticalAlign: 'middle',
    color: palette.action.active,
  },
  lens: {
    color: setColor(300, palette.primary),
    width: spacing(4.5),
    height: spacing(4.5),
    verticalAlign: 'super',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%,0)',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.4,
  },
  titleContainer: {
    paddingBottom: spacing(2),
  },
  contentContainer: {
    paddingBottom: spacing(1.5),
  },
  recurringIcon: {
    position: 'absolute',
    paddingTop: spacing(0.875),
    left: '50%',
    transform: 'translate(-50%,0)',
    color: palette.background.paper,
    width: spacing(2.625),
    height: spacing(2.625),
  },
  relativeContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});

export const ContentBase = ({
  classes,
  className,
  children,
  appointmentData,
  formatDate,
  recurringIconComponent: RecurringIcon,
  ...restProps
}) => {
  const weekDays = viewBoundText(
    appointmentData.startDate, appointmentData.endDate, WEEKDAY_INTERVAL,
    appointmentData.startDate, 1, formatDate,
  );
  return (
    <div
      className={classNames(classes.content, className)}
      {...restProps}
    >
      <Grid container alignItems="flex-start" className={classes.titleContainer}>
        <Grid item xs={2}>
          <div className={classes.relativeContainer}>
            <Lens className={classes.lens} />
            {!!appointmentData.rRule && (
              <RecurringIcon className={classes.recurringIcon} />
            )}
          </div>
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
      <Grid container alignItems="center" className={classes.contentContainer}>
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
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

ContentBase.defaultProps = {
  appointmentData: undefined,
  className: undefined,
  children: undefined,
};

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);
