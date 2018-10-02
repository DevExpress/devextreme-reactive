import * as React from 'react';
import * as PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    margin: '0 auto',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    paddingTop: theme.spacing.unit * 2,
    transform: 'translateY(20%)',
  },
});

const PopupBase = ({
  classes,
  container: Container,
  editor,
  button,
  visible,
  appointment,
  readOnly,
  onVisibilityChange,
  onAppointmentChange,
}) => (
  <Modal
    open={visible}
  >
    <div className={classes.paper}>
      <Container
        editor={editor}
        button={button}
        appointment={appointment}
        readOnly={readOnly}
        onAppointmentChange={onAppointmentChange}
        onVisibilityChange={onVisibilityChange}
      />
    </div>
  </Modal>
);

PopupBase.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.func,
  editor: PropTypes.func,
  button: PropTypes.func,
  visible: PropTypes.bool,
  appointment: PropTypes.object,
  readOnly: PropTypes.bool,
  onVisibilityChange: PropTypes.func,
  onAppointmentChange: PropTypes.func,
};

PopupBase.defaultProps = {
  container: undefined,
  editor: undefined,
  button: undefined,
  visible: false,
  appointment: {},
  readOnly: false,
  onVisibilityChange: () => undefined,
  onAppointmentChange: () => undefined,
};

export const Popup = withStyles(styles)(PopupBase);
