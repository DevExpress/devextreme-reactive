import withStyles from '@mui/styles/withStyles';
import { ContainerBase } from '../common/container';

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
};

export const Container = withStyles(styles, { name: 'AppointmentsContainer' })(ContainerBase);
