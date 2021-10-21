import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import AccessTime from '@mui/icons-material/AccessTime';
import Lens from '@mui/icons-material/Lens';
import { HOUR_MINUTE_OPTIONS, WEEKDAY_INTERVAL, viewBoundText } from '@devexpress/dx-scheduler-core';
import { getAppointmentColor, getResourceColor } from '../utils';

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
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
    color: resources => getAppointmentColor(300, getResourceColor(resources), palette.primary),
    width: spacing(4.5),
    height: spacing(4.5),
    verticalAlign: 'super',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%,0)',
  },
  lensMini: {
    width: spacing(2.5),
    height: spacing(2.5),
  },
  textCenter: {
    textAlign: 'center',
    height: spacing(2.5),
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
  resourceContainer: {
    paddingBottom: spacing(0.25),
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
}));

export const Content = ({
  className,
  children,
  appointmentData,
  appointmentResources,
  formatDate,
  recurringIconComponent: RecurringIcon,
  ...restProps
}) => {
  const classes = useStyles(appointmentResources);
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
      {appointmentResources.map(resourceItem => (
        <Grid container alignItems="center" className={classes.resourceContainer} key={`${resourceItem.fieldName}_${resourceItem.id}`}>
          <Grid item xs={2} className={classes.textCenter}>
            <div className={classes.relativeContainer}>
              <Lens
                className={classNames(classes.lens, classes.lensMini)}
                style={{ color: getAppointmentColor(300, resourceItem.color) }}
              />
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className={classes.text}>
              {resourceItem.text}
            </div>
          </Grid>
        </Grid>
      ))}
      {children}
    </div>
  );
};

Content.propTypes = {
  appointmentData: PropTypes.object,
  appointmentResources: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
  formatDate: PropTypes.func.isRequired,
  recurringIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

Content.defaultProps = {
  appointmentData: undefined,
  appointmentResources: [],
  className: undefined,
  children: undefined,
};
