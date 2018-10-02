import * as React from 'react';
import * as PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    width: theme.spacing.unit * 50,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    paddingTop: theme.spacing.unit * 2,
    margin: '0 auto',
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
  ...restProps
}) => (
  <Modal
    open={visible}
    {...restProps}
  >
    <Paper className={classes.paper}>
      <Container
        editor={editor}
        button={button}
        appointment={appointment}
        readOnly={readOnly}
        onAppointmentChange={onAppointmentChange}
        onVisibilityChange={onVisibilityChange}
      />
    </Paper>
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
  container: () => undefined,
  editor: () => undefined,
  button: () => undefined,
  visible: false,
  appointment: {},
  readOnly: false,
  onVisibilityChange: () => undefined,
  onAppointmentChange: () => undefined,
};

export const Popup = withStyles(styles)(PopupBase);
