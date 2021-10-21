import { ScatterSeries, withPatchedProps } from '@devexpress/dx-react-chart';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';

const styles = theme => ({
  point: {
    fill: theme.palette.background.paper,
  },
});

const setClassName = ({ classes, ...restProps }) => {
  if (restProps.state) {
    const { className, ...rest } = restProps;
    return {
      className: classNames(classes.point, className),
      ...rest,
    };
  }
  return restProps;
};

export const Point = withStyles(styles)(
  withPatchedProps(setClassName)(
    ScatterSeries.Point,
  ),
);
