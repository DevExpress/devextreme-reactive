import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

export const Content = ({
  appointment,
  getAppointmentStartDate,
  getAppointmentEndDate,
  ...restProps
}) => (
  <div>
    <div>
      {moment(getAppointmentStartDate(appointment)).format('h:mm A')}
    </div>
    <div>
      {moment(getAppointmentEndDate(appointment)).format('h:mm A')}
    </div>
  </div>
);

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
