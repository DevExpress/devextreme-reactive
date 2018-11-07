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
  data,
  children,
  ...restProps
}) => (
  <Appointment
    data={data}
    {...restProps}
  >
    {children || (
      <React.Fragment>
        <div className={classes.title}>
          {data.title}
        </div>
        <div className={classes.textContainer}>
          <div className={classes.time}>
            {moment(data.startDate).format('h:mm A')}
          </div>
          <div className={classes.time}>
            {' - '}
          </div>
          <div className={classes.time}>
            {moment(data.endDate).format('h:mm A')}
          </div>
        </div>
      </React.Fragment>
    )}
  </Appointment>
);

VerticalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
};

VerticalAppointmentBase.defaultProps = {
  children: undefined,
};

export const VerticalAppointment = withStyles(styles, { name: 'VerticalAppointment' })(VerticalAppointmentBase);
