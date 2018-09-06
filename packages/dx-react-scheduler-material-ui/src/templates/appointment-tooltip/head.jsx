import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
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
  commandButtonComponent: CommandButton,
  appointment,
  showOpenButton,
  showCloseButton,
  showDeleteButton,
  getAppointmentTitle,
  commandButtonIds,
  onHide,
  classes,
  className,
  ...restProps
}) => (
  <div className={classNames(classes.head, className)} {...restProps}>
    <div>
      <div className={classes.buttonsLeft}>
        {showOpenButton && <CommandButton id={commandButtonIds.open} />}
      </div>
      <div className={classes.buttonsRight}>
        {showDeleteButton && <CommandButton id={commandButtonIds.delete} />}
        {showCloseButton && <CommandButton id={commandButtonIds.close} onClick={onHide} />}
      </div>
    </div>
    <div className={classes.text}>
      {getAppointmentTitle(appointment)}
    </div>
  </div>
);

HeadBase.propTypes = {
  commandButtonComponent: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  showOpenButton: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  getAppointmentTitle: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

HeadBase.defaultProps = {
  className: undefined,
};

export const Head = withStyles(styles, { name: 'Head' })(HeadBase);
