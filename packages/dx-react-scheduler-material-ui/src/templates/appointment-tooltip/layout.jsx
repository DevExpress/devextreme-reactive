import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';

export const Layout = ({
  headComponent: Head,
  contentComponent: Content,
  openButtonComponent: OpenButton,
  closeButtonComponent: CloseButton,
  deleteButtonComponent: DeleteButton,
  appointment,
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  getAppointmentEndDate,
  getAppointmentStartDate,
  getAppointmentTitle,
  visible, target, onHide,
  ...restProps
}) => (
  <Popover
    open={visible}
    anchorEl={target}
    onClose={onHide}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...restProps}
  >
    <Paper>
      <Head
        openButtonComponent={OpenButton}
        closeButtonComponent={CloseButton}
        deleteButtonComponent={DeleteButton}
        appointment={appointment}
        showOpenButton={showOpenButton}
        showCloseButton={showCloseButton}
        showDeleteButton={showDeleteButton}
        onHide={onHide}

        getAppointmentTitle={getAppointmentTitle}
      />
      <Content
        appointment={appointment}
        getAppointmentStartDate={getAppointmentStartDate}
        getAppointmentEndDate={getAppointmentEndDate}
      />
    </Paper>
  </Popover>
);

Layout.propTypes = {
  headComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
  openButtonComponent: PropTypes.func.isRequired,
  closeButtonComponent: PropTypes.func.isRequired,
  deleteButtonComponent: PropTypes.func.isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  getAppointmentEndDate: PropTypes.func.isRequired,
  getAppointmentStartDate: PropTypes.func.isRequired,
  getAppointmentTitle: PropTypes.func.isRequired,
  appointment: PropTypes.object,
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
};
Layout.defaultProps = {
  appointment: undefined,
  onHide: () => undefined,
  visible: false,
  target: null,
};
