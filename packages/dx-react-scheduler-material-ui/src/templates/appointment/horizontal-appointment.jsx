import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

const HorizontalAppointmentBase = ({
  classes,
  mapAppointmentData,
  data,
  children,
}) => (
  children || (
    <div className={classes.title}>
      {mapAppointmentData(data).title}
    </div>
  )
);

HorizontalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  mapAppointmentData: PropTypes.func,
  children: PropTypes.node,
};

HorizontalAppointmentBase.defaultProps = {
  mapAppointmentData: () => undefined,
  children: undefined,
};

export const HorizontalAppointment = withStyles(styles, { name: 'HorizontalAppointment' })(HorizontalAppointmentBase);
