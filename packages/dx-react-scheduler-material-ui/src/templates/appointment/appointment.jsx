import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appointment: {
    position: 'absolute',
    display: 'block',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary[300],
    ...theme.typography.caption,
    '&:hover': {
      backgroundColor: theme.palette.primary[400],
    },
    '&:focus': {
      backgroundColor: theme.palette.primary[100],
      outline: 0,
    },
  },
});

const AppointmentBase = ({
  classes, className,
  children, getTitle,
  getStartDate, getEndDate,
  appointment, top,
  left, width,
  height,
  ...restProps
}) => (
  <div
    className={classNames(classes.appointment, className)}
    style={{
      top, left, width, height,
    }}
    {...restProps}
  >
    {children || (
      <div>
        <p>
          {getTitle(appointment)}
        </p>
        <span>
          {moment(getStartDate(appointment)).format('D MMM H:mmA')}
        </span>
        -
        <span>
          {moment(getEndDate(appointment)).format('D MMM H:mmA')}
        </span>
      </div>
    )}
  </div>
);

AppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  getTitle: PropTypes.func.isRequired,
  getStartDate: PropTypes.func.isRequired,
  getEndDate: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

AppointmentBase.defaultProps = {
  className: undefined,
  children: null,
};

export const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);
