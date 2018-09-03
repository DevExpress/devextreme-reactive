import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 1.75,
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    ...theme.typography.body1,
    display: 'inline-block',
  },
});

export const ContentBase = ({
  appointment,
  getAppointmentStartDate,
  getAppointmentEndDate,
  classes,
  className,
  ...restProps
}) => (
  <div className={classNames(classes.content, className)} {...restProps}>
    <div className={classes.text}>
      {moment(getAppointmentStartDate(appointment)).format('h:mm A')}
    </div>
    {' - '}
    <div className={classes.text}>
      {moment(getAppointmentEndDate(appointment)).format('h:mm A')}
    </div>
  </div>
);

ContentBase.propTypes = {
  appointment: PropTypes.object.isRequired,
  getAppointmentStartDate: PropTypes.func.isRequired,
  getAppointmentEndDate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContentBase.defaultProps = {
  className: undefined,
};

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);
