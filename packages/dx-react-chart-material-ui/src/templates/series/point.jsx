import { ScatterSeries, withPatchedProps } from '@devexpress/dx-react-chart';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';

const PREFIX = 'Point';

const classes = {
  point: `${PREFIX}-point`,
};

const setClassName = (props) => {
  if (props.state) {
    const { className, ...rest } = props;
    return {
      className: classNames(classes.point, className),
      ...rest,
    };
  }
  return props;
};

export const Point = styled(withPatchedProps(setClassName)(
  ScatterSeries.Point,
))(({ theme }) => ({
  [`&.${classes.point}`]: {
    fill: theme.palette.background.paper,
  },
}));
