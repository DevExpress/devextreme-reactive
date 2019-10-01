import * as React from 'react';
import * as PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export const Layout = React.memo(({
  buttonComponent: Button,
  handleClose,
  confirm,
  getMessage,
  isDeleting,
  ...restProps
}) => (
  <div
    {...restProps}
  >
    <DialogTitle>{getMessage(isDeleting ? 'confirmDeleteMeesage' : 'confirmCancelMessage')}</DialogTitle>
    <DialogActions>
      <Button onClick={handleClose} title={getMessage('cancelButton')} />
      <Button
        onClick={confirm}
        title={getMessage(isDeleting ? 'deleteButton' : 'discardButton')}
        color="primary"
      />
    </DialogActions>
  </div>
));

Layout.propTypes = {
  buttonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  handleClose: PropTypes.func,
  confirm: PropTypes.func,
  getMessage: PropTypes.func,
  isDeleting: PropTypes.bool,
};

Layout.defaultProps = {
  handleClose: () => undefined,
  confirm: () => undefined,
  getMessage: () => undefined,
  isDeleting: false,
};
