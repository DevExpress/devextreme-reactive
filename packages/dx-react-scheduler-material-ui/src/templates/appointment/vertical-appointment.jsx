import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette, spacing }) => ({
  main: {
    padding: spacing.unit / 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  title: {
    color: palette.background.default,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  time: {
    color: palette.background.default,
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const VerticalAppointmentBase = ({
  classes,
  getTitle,
  getStartDate, getEndDate,
  appointment,
}) => (
  <div className={classes.main}>
    <div className={classes.title}>
      {getTitle(appointment)}
    </div>
    <div className={classes.textContainer}>
      <div className={classes.time}>
        {moment(getStartDate(appointment)).format('h:mm A')}
      </div>
      <div className={classes.time}>
        {' - '}
      </div>
      <div className={classes.time}>
        {moment(getEndDate(appointment)).format('h:mm A')}
      </div>
    </div>
  </div>
);

VerticalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getTitle: PropTypes.func.isRequired,
  getStartDate: PropTypes.func.isRequired,
  getEndDate: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
