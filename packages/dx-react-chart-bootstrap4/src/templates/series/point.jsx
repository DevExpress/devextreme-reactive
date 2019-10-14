import { ScatterSeries, withPatchedProps } from '@devexpress/dx-react-chart';
import classNames from 'clsx';

const setClassName = ({ classes, ...restProps }) => {
  if (restProps.state) {
    const { className, ...rest } = restProps;
    return {
      className: classNames('dx-c-bs4-fill-background-color', className),
      ...rest,
    };
  }
  return restProps;
};

export const Point = withPatchedProps(setClassName)(ScatterSeries.Point);
