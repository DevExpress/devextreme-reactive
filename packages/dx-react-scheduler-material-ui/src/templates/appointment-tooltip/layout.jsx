import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';

export const Layout = ({
  headComponent: Head,
  contentComponent: Content,
  commandButtonComponent,
  appointmentMeta,
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  getAppointmentEndDate,
  getAppointmentStartDate,
  getAppointmentTitle,
  visible, onHide,
  ...restProps
}) => (
  <Popover
    open={visible}
    anchorEl={appointmentMeta.target}
    onClose={onHide}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...restProps}
  >
    <Paper>
      <Head
        commandButtonComponent={commandButtonComponent}
        appointment={appointmentMeta.appointment}
        showOpenButton={showOpenButton}
        showCloseButton={showCloseButton}
        showDeleteButton={showDeleteButton}
        onHide={onHide}

        getAppointmentTitle={getAppointmentTitle}
      />
      <Content
        appointment={appointmentMeta.appointment}
        getAppointmentStartDate={getAppointmentStartDate}
        getAppointmentEndDate={getAppointmentEndDate}
      />
    </Paper>
  </Popover>
);

Layout.propTypes = {
  commandButtonComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func.isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  getAppointmentEndDate: PropTypes.func.isRequired,
  getAppointmentStartDate: PropTypes.func.isRequired,
  getAppointmentTitle: PropTypes.func.isRequired,
  appointmentMeta: PropTypes.object,
  visible: PropTypes.bool,
  onHide: PropTypes.func,
};
Layout.defaultProps = {
  onHide: () => undefined,
  appointmentMeta: {},
  visible: false,
};
