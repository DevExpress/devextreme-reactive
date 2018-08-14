import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  return ({
    content: {
      padding: theme.spacing.unit,
      backgroundColor: theme.palette.background.paper,
      // paddingLeft: '24px',
    },
    text: {
      ...theme.typography.body1,
      display: 'inline-block',
      // color: theme.palette.background.default,
    },
  });
};

export const ContentBase = ({
  appointment,
  getAppointmentStartDate,
  getAppointmentEndDate,
  classes,
  ...restProps
}) => (
  <div className={classes.content}>
    <div className={classes.text}>
      {moment(getAppointmentStartDate(appointment)).format('h:mm A')}
    </div>
    {' - '}
    <div className={classes.text}>
      {moment(getAppointmentEndDate(appointment)).format('h:mm A')}
    </div>
  </div>
);

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);

// Layout.propTypes = {
//   headComponent: PropTypes.func.isRequired,
//   contentComponent: PropTypes.func.isRequired,
//   openButtonComponent: PropTypes.func.isRequired,
//   closeButtonComponent: PropTypes.func.isRequired,
//   deleteButtonComponent: PropTypes.func.isRequired,
//   appointment: PropTypes.object.isRequired,
//   showOpenButton: PropTypes.bool.isRequired,
//   showCloseButton: PropTypes.bool.isRequired,
//   showDeleteButton: PropTypes.bool.isRequired,
//   getAppointmentEndDate: PropTypes.func.isRequired,
//   getAppointmentStartDate: PropTypes.func.isRequired,
//   getAppointmentTitle: PropTypes.func.isRequired,
//   visible: PropTypes.bool,
//   onHide: PropTypes.func,
//   target: PropTypes.node,
// };
// Layout.defaultProps = {
//   onHide: () => undefined,
//   visible: false,
//   target: null,
// };
