import * as React from 'react';
import * as PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = ({ spacing }) => ({
  root: {
    overflow: 'hidden',
    paddingTop: spacing(2),
  },
  absolutePosition: {
    position: 'absolute!important',
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  halfSize: {
    height: '100%',
    width: '50%',
  },
});

const RootBase = ({
  children,
  visible,
  classes,
  className,
  fullSize,
  container,
  closeHandler,
  ...restProps
}) => {
  const paperClasses = classNames({
    [classes.absolutePosition]: true,
    [classes.fullSize]: fullSize,
    [classes.halfSize]: !fullSize,
  });

  return (
    <Drawer
      className={classNames(classes.root, className)}
      PaperProps={{ className: paperClasses }}
      BackdropProps={{ className: classes.absolutePosition }}
      ModalProps={{
        className: classes.absolutePosition,
        container,
      }}
      variant="temporary"
      anchor="left"
      transitionDuration={600}
      open={visible}
      onBackdropClick={closeHandler}
      {...restProps}
    >
      {children}
    </Drawer>
  );
};


RootBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  fullSize: PropTypes.bool.isRequired,
  visible: PropTypes.bool,
  className: PropTypes.string,
  container: PropTypes.node,
};

RootBase.defaultProps = {
  className: undefined,
  visible: false,
  container: null,
};

export const Root = withStyles(styles)(RootBase, { name: 'Root' });
