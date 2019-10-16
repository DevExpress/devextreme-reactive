import { withPatchedProps } from '@devexpress/dx-react-chart';
import classNames from 'clsx';

export const withClassName = (...args) => {
  const setClassName = ({ className, ...restProps }) => ({
    className: classNames(...args, className),
    ...restProps,
  });
  return withPatchedProps(setClassName);
};
