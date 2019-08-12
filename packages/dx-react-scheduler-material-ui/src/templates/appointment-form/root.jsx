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
});

const RootBase = ({
  children,
  visible,
  classes,
  className,
  container,
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

  return (
    <Drawer
      className={classNames(classes.root, className)}
      PaperProps={{ style: drawerPaperStyle }}
      BackdropProps={{ style: { position: 'absolute' } }}
      ModalProps={{
        container,
        style: { position: 'absolute' },
      }}
      variant="temporary"
      open={visible}
      anchor="left"
      transitionDuration={1000}
      {...restProps}
    >
      {children}
    </Drawer>
  );
};


RootBase.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  container: PropTypes.object.isRequired,
  frequency: PropTypes.string.isRequired,
};

RootBase.defaultProps = {
  visible: false,
  className: undefined,
};

export const Root = withStyles(styles)(RootBase, { name: 'Root' });
