import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(1),
  },
});

const LayoutBase = ({
  saveButtonComponent: SaveButton,
  deleteButtonComponent: DeleteButton,
  cancelButtonComponent: CancelButton,
  commitAppointment,
  cancelCommit,
  deleteAppointment,
  getMessage,
  children,
  classes,
  className,
  ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    <CancelButton
      onExecute={cancelCommit}
      getMessage={getMessage}
    />
    <DeleteButton
      onExecute={deleteAppointment}
      getMessage={getMessage}
    />
    <SaveButton
      getMessage={getMessage}
      onExecute={commitAppointment}
    />
    {children}
  </div>
);

LayoutBase.propTypes = {
  saveButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  deleteButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cancelButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  commitAppointment: PropTypes.func.isRequired,
  cancelCommit: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
