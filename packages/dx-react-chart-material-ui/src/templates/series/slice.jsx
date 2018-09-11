import { Slice as SliceBase, patchProps } from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    stroke: 'none',
  },
});

const setClassName = ({ className, classes, ...restProps }) => ({
  ...restProps,
  className: classNames(classes.root, className),
});

export const Slice = withStyles(styles)(patchProps(SliceBase, setClassName));
