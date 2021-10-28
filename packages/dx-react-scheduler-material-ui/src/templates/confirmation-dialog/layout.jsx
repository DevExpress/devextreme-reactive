import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { SMALL_LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'Layout';

export const classes = {
  title: `${PREFIX}-title`,
  media: `${PREFIX} - ${SMALL_LAYOUT_MEDIA_QUERY}`,
};

const Root = styled('div')(({
  theme: { typography },
}) => ({
  [`& .${classes.title}`]: {
    ...typography.h6,
  },

  [`& .${classes.media}`]: {
    title: {
      fontSize: '1.1rem',
    },
  },
}));

const LayoutBase = React.memo(({
  buttonComponent: Button,
  handleCancel,
  handleConfirm,
  getMessage,
  isDeleting,
  appointmentData,
  ...restProps
}) => (
  <Root
    {...restProps}
  >
    <DialogTitle className={classes.title}>
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
  </Root>
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

export const Layout = (LayoutBase);
