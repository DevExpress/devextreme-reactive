import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette, typography }) => ({
  appointment: {
    position: 'absolute',
    display: 'block',
    overflow: 'hidden',
    backgroundColor: palette.primary[300],
    boxSizing: 'border-box',
    borderRight: `1px solid ${palette.background.paper}`,
    ...typography.caption,
    '&:hover': {
      backgroundColor: palette.primary[400],
    },
    '&:focus': {
      backgroundColor: palette.primary[100],
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
