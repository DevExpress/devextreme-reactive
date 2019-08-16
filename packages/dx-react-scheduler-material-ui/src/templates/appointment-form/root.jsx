import * as React from 'react';
import * as PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = ({ spacing }) => ({
  drawer: {
    overflow: 'hidden',
    paddingTop: spacing(2),
  },
  absoluteDiv: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});

const RootBase = ({
  children,
  visible,
  classes,
  className,
  frequency,
  ...restProps
}) => {
  const drawerPaperStyle = frequency !== 'never' ? {
    position: 'absolute',
    width: '100%',
  } : {
    position: 'absolute',
    width: '50%',
  };
  const container = React.useRef();

  return (
    <div {...restProps}>
      <div className={classNames(classes.absoluteDiv, className)} {...restProps}>
        <div
          className={classes.container}
          ref={container}
        />
      </div>
      <Drawer
        className={classNames(classes.drawer, className)}
        PaperProps={{ style: drawerPaperStyle }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: container.current,
          style: { position: 'absolute' },
        }}
        variant="temporary"
        open={visible}
        anchor="left"
        transitionDuration={1000}
      >
        {children}
      </Drawer>
    </div>
  );
};


RootBase.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  frequency: PropTypes.string.isRequired,
};

RootBase.defaultProps = {
  visible: false,
  className: undefined,
};

export const Root = withStyles(styles)(RootBase, { name: 'Root' });
