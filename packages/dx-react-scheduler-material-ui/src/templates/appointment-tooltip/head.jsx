import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Head = ({
  openButtonComponent: OpenButton,
  closeButtonComponent: CloseButton,
  deleteButtonComponent: DeleteButton,
  appointment,
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  getAppointmentTitle,
  onHide,
  ...restProps
}) => (
  <div>
    <OpenButton showOpenButton={showOpenButton} />
    <DeleteButton showDeleteButton={showDeleteButton} />
    <CloseButton showCloseButton={showCloseButton} onHide={onHide} />
    <div>
      {getAppointmentTitle(appointment)}
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
