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
  paper: {
    outline: 'none',
  },
  fullSize: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
  halfSize: {
    height: '100%',
    width: '55%',
    maxWidth: '650px',
    '@media (max-width: 700px)': {
      width: '100%',
    },
  },
  transition: {
    transition: 'all 500ms!important',
  },
});

const OverlayBase = ({
  children,
  visible,
  classes,
  className,
  fullSize,
  target,
  onHide,
  ...restProps
}) => {
  const [previouslyOpen, setPreviouslyOpen] = React.useState(false);
  const paperClasses = classNames({
    [classes.absolutePosition]: true,
    [classes.paper]: true,
    [classes.fullSize]: fullSize,
    [classes.halfSize]: !fullSize,
    [classes.transition]: visible && previouslyOpen,
  });

  return (
    <Drawer
      className={classNames(classes.root, className)}
      PaperProps={{ className: paperClasses }}
      BackdropProps={{ className: classes.absolutePosition }}
      ModalProps={{
        className: classes.absolutePosition,
        container: target.current,
      }}
      SlideProps={{
        onEntered: () => setPreviouslyOpen(true),
        onExited: () => setPreviouslyOpen(false),
      }}
      open={visible}
      variant="temporary"
      anchor="left"
      transitionDuration={500}
      onBackdropClick={onHide}
      {...restProps}
    >
      {children}
    </Drawer>
  );
};


OverlayBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  fullSize: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  className: PropTypes.string,
  target: PropTypes.object,
};

OverlayBase.defaultProps = {
  className: undefined,
  visible: false,
  target: null,
};

export const Overlay = withStyles(styles)(OverlayBase, { name: 'Overlay' });
