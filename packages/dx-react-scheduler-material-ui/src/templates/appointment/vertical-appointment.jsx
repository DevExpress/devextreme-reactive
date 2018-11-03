import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Appointment } from './appointment';

const styles = {
  title: {
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
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

const VerticalAppointmentBase = ({
  classes,
  mapAppointmentData,
  data,
  children,
  ...restProps
}) => {
  const { title, startDate, endDate } = mapAppointmentData(data);
  return (
    <Appointment
      data={data}
      {...restProps}
    >
      {children || (
      <React.Fragment>
        <div className={classes.title}>
          {title}
        </div>
        <div className={classes.textContainer}>
          <div className={classes.time}>
            {moment(startDate).format('h:mm A')}
          </div>
          <div className={classes.time}>
            {' - '}
          </div>
          <div className={classes.time}>
            {moment(endDate).format('h:mm A')}
          </div>
        </div>
      </React.Fragment>
      )}
    </Appointment>
  );
};

VerticalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  mapAppointmentData: PropTypes.func,
  children: PropTypes.node,
};

VerticalAppointmentBase.defaultProps = {
  children: undefined,
  mapAppointmentData: () => undefined,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
