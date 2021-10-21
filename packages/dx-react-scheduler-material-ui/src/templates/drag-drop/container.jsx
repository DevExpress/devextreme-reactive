import withStyles from '@mui/styles/withStyles';
import { ContainerBase } from '../common/container';

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    cursor: 'move',
  },
};

export const Container = withStyles(styles, { name: 'DragDropContainer' })(ContainerBase);
