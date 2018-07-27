import * as React from 'react';
import * as PropTypes from 'prop-types';
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
});

const HorizontalAppointmentBase = ({
  classes,
  getTitle,
  appointment,
}) => (
  <div className={classes.main}>
    <div className={classes.title}>
      {getTitle(appointment)}
    </div>
  </div>
);

HorizontalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getTitle: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
};

export const HorizontalAppointment = withStyles(styles, { name: 'HorizontalAppointment' })(HorizontalAppointmentBase);
