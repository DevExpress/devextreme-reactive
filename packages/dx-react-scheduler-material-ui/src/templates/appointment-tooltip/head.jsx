import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    ...theme.typography.title,
    padding: theme.spacing.unit * 1.75,
    color: theme.palette.background.default,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  <div className={classes.head} {...restProps}>
    <div>
      <div className={classes.buttonsLeft}>
        {showOpenButton && <OpenButton />}
      </div>
      <div className={classes.buttonsRight}>
        {showDeleteButton && <DeleteButton />}
        {showCloseButton && <CloseButton onHide={onHide} />}
      </div>
    </div>
    <div className={classes.text}>
      {getAppointmentTitle(appointment)}
    </div>
  </div>
);

HeadBase.propTypes = {
  openButtonComponent: PropTypes.func.isRequired,
  closeButtonComponent: PropTypes.func.isRequired,
  deleteButtonComponent: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  getAppointmentTitle: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Head = withStyles(styles, { name: 'Head' })(HeadBase);
