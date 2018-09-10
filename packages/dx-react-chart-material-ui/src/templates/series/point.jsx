import { Point as PointBase, patchProps } from '@devexpress/dx-react-chart';
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

export const Point = withStyles(styles)(patchProps(PointBase, setClassName));
