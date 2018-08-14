import * as React from 'react';
import * as PropTypes from 'prop-types';

export const OpenButton = ({
  ...restProps
}) => (
  <button>
    Open
  </button>
);

// OpenButton.propTypes = {
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
// OpenButton.defaultProps = {
//   onHide: () => undefined,
//   visible: false,
//   target: null,
// };
