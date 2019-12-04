import * as React from 'react';
import * as PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { MOBILE_LAYOUT_QUERY } from '../constants';

const styles = ({ typography }) => ({
  title: {
    ...typography.h6,
  },
  [`${MOBILE_LAYOUT_QUERY}`]: {
    title: {
      fontSize: '1.1rem',
    },
  },
});

const LayoutBase = React.memo(({
  buttonComponent: Button,
  handleCancel,
  handleConfirm,
  getMessage,
  isDeleting,
  appointmentData,
  classes,
  ...restProps
}) => (
  <div
    {...restProps}
  >
    <DialogTitle className={classes.title} disableTypography>
      {getMessage(isDeleting ? 'confirmDeleteMessage' : 'confirmCancelMessage')}
    </DialogTitle>
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

LayoutBase.propTypes = {
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
  classes: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  handleCancel: () => undefined,
  handleConfirm: () => undefined,
  getMessage: () => undefined,
  isDeleting: false,
  appointmentData: { startDate: new Date(), endDate: new Date() },
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
