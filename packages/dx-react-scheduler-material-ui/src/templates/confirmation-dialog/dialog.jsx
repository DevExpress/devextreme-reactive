import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import DialogMUI from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  modal: {
    position: 'absolute!important',
  },
};

const DialogBase = ({
  children, visible, onHide, classes, className,
  handleClose, commit, ...restProps
}) => (
  <DialogMUI
    open={visible}
    onClose={onHide}
    className={classNames(classes.modal, className)}
    BackdropProps={{ className: classes.modal }}
    onBackdropClick={onHide}
    {...restProps}
  >
    <div
      {...restProps}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        Do you really want to delete/cancel this?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={commit} color="primary">Commit</Button>
      </DialogActions>
    </div>
  </DialogMUI>
);

DialogBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  className: PropTypes.string,
  handleClose: PropTypes.func,
  commit: PropTypes.func,
};

DialogBase.defaultProps = {
  className: undefined,
  visible: false,
  handleClose: () => undefined,
  commit: () => undefined,
};

export const Dialog = withStyles(styles, { name: 'Dialog' })(DialogBase);
