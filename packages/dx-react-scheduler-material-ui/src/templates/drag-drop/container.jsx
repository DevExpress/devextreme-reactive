import { withStyles } from '@material-ui/core/styles';
import { ContainerBase } from '../common/container';

const containerStyles = () => ({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    cursor: 'move',
  },
});

export const Container = withStyles(containerStyles, { name: 'DragDropContainer' })(ContainerBase);
