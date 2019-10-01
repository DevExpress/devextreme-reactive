import * as React from 'react';
import * as PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const Layout = React.memo(({
  buttonComponent: Button,
  handleClose,
  confirm,
  availableOperations,
  getMessage,
  isDeleting,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
    >
      <DialogTitle>{getMessage(isDeleting ? 'dialogDeleteTitle' : 'dialogEditTitle')}</DialogTitle>
      <DialogContent>
        {getMessage(isDeleting ? 'dialogDeleteContent' : 'dialogCancelContent')}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} title={getMessage('cancelButton')} />
        <Button onClick={confirm} title={getMessage('confirmButton')} color="primary" />
      </DialogActions>
    </div>
  );
});

Layout.propTypes = {
  buttonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  availableOperations: PropTypes.array.isRequired,
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
