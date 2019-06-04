import { withStyles } from '@material-ui/core/styles';
import { ContainerBase } from './common/container';

const styles = {
  container: {
    WebkitOverflowScrolling: 'touch',
    // NOTE: fix sticky positioning in Safari
    width: '100%',
    height: '100%',
  },
};

export const Root = withStyles(styles, { name: 'Root' })(ContainerBase);
