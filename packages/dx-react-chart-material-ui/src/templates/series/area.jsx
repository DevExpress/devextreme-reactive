import { Area as AreaBase, patchProps } from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    opacity: 0.5,
  },
});

const setClassName = ({ className, classes, ...restProps }) => ({
  ...restProps,
  className: classNames(classes.root, className),
});

export const Area = withStyles(styles)(patchProps(AreaBase, setClassName));
