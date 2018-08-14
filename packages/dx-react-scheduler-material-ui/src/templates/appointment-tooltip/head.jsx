import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  head: {
    // padding: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    width: '300px',
  },
  text: {
    ...theme.typography.title,
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    color: theme.palette.background.default,
  },
  buttonsLeft: {
    display: 'inline-block',
  },
  buttonsRight: {
    float: 'right',
    display: 'inline-block',
  },
});

const HeadBase = ({
  openButtonComponent: OpenButton,
  closeButtonComponent: CloseButton,
  deleteButtonComponent: DeleteButton,
  appointment,
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  getAppointmentTitle,
  onHide,
  classes,
  ...restProps
}) => (
  <div className={classes.head}>
    <div>
      <div className={classes.buttonsLeft}>
        <OpenButton showOpenButton={showOpenButton} />
      </div>
      <div className={classes.buttonsRight}>
        <DeleteButton showDeleteButton={showDeleteButton} />
        <CloseButton showCloseButton={showCloseButton} onHide={onHide} />
      </div>
    </div>
    <div className={classes.text}>
      {getAppointmentTitle(appointment)}
    </div>
  </div>
);

export const Head = withStyles(styles, { name: 'Head' })(HeadBase);

// Layout.propTypes = {
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
// Layout.defaultProps = {
//   onHide: () => undefined,
//   visible: false,
//   target: null,
// };
