import { withStyles } from '@material-ui/styles';
import { ContainerBase } from '../common/container';

const styles = {
  container: {
    position: 'relative',
  },
};

export const Container = withStyles(styles, { name: 'AllDayContainer' })(ContainerBase);
