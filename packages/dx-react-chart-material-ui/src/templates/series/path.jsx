import { Path as PathBase, patchProps } from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    fill: 'none',
    strokeWidth: '2px',
  },
});

const setClassName = ({ className, classes, ...restProps }) => ({
  ...restProps,
  className: classNames(classes.root, className),
});

export const Path = withStyles(styles)(patchProps(PathBase, setClassName));
