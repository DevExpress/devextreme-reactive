import * as React from 'react';
import * as PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export const Layout = React.memo(({
  buttonComponent: Button,
  handleCancel,
  handleConfirm,
  getMessage,
  isDeleting,
  appointmentData,
  ...restProps
}) => (
  <div
    {...restProps}
  >
    <DialogTitle>{getMessage(isDeleting ? 'confirmDeleteMessage' : 'confirmCancelMessage')}</DialogTitle>
    <DialogActions>
      <Button onClick={handleCancel} title={getMessage('cancelButton')} />
      <Button
        onClick={handleConfirm}
        title={getMessage(isDeleting ? 'deleteButton' : 'discardButton')}
        color="primary"
      />
    </DialogActions>
  </div>
));

Layout.propTypes = {
  buttonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  getMessage: PropTypes.func,
  isDeleting: PropTypes.bool,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }),
};

Layout.defaultProps = {
  handleCancel: () => undefined,
  handleConfirm: () => undefined,
  getMessage: () => undefined,
  isDeleting: false,
  appointmentData: { startDate: new Date(), endDate: new Date() },
};
