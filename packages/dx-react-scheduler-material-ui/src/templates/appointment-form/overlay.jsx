import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import classNames from 'clsx';
import { TRANSITIONS_TIME, LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'Overlay';

export const classes = {
  root: `${PREFIX}-root`,
  absolutePosition: `${PREFIX}-absolutePosition`,
  paper: `${PREFIX}-paper`,
  fullSize: `${PREFIX}-fullSize`,
  halfSize: `${PREFIX}-halfSize`,
  transition: `${PREFIX}-transition`,
};

const StyledDrawer = styled(Drawer)(({ theme: { spacing } }) => ({
  [`&.${classes.root}`]: {
    overflow: 'hidden',
    paddingTop: spacing(2),
  },
  [`&.${classes.absolutePosition}`]: {
    position: 'absolute!important',
  },
  [`&.${classes.paper}`]: {
    outline: 'none',
  },
  [`&.${classes.fullSize}`]: {
    height: '100%',
    width: '1150px',
    '@media (min-width: 700px) and (max-width: 850px)': {
      width: '700px',
    },
    '@media (min-width: 850px) and (max-width: 1000px)': {
      width: '850px',
    },
    '@media (min-width: 1000px) and (max-width: 1150px)': {
      width: '1000px',
    },
    [`${LAYOUT_MEDIA_QUERY}`]: {
      width: '100%',
      maxWidth: '700px',
    },
  },
  [`&.${classes.halfSize}`]: {
    height: '100%',
    width: '650px',
    [`${LAYOUT_MEDIA_QUERY}`]: {
      width: '100%',
      maxWidth: '700px',
    },
  },
  [`&.${classes.transition}`]: {
    transition: `all ${TRANSITIONS_TIME}ms cubic-bezier(0, 0, 0.2, 1)!important`,
  },
}));

export const Overlay = ({
  children,
  visible,
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
    <StyledDrawer
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
      transitionDuration={TRANSITIONS_TIME}
      onBackdropClick={onHide}
      {...restProps}
    >
      {children}
    </StyledDrawer>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  fullSize: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  className: PropTypes.string,
  target: PropTypes.object,
};

Overlay.defaultProps = {
  className: undefined,
  visible: false,
  target: null,
};
