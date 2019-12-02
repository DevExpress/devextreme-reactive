import { withStyles } from '@material-ui/core/styles';
import { ContainerBase } from '../common/container';

const styles = {
  container: {
    position: 'relative',
    display: 'table',
    minWidth: '100%',
  },
};

export const Container = withStyles(styles, { name: 'AllDayContainer' })(ContainerBase);
