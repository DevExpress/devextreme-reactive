import { withPatchedProps } from '@devexpress/dx-react-chart';
import classNames from 'classnames';

export const withClassName = (value) => {
  const setClassName = ({ className, ...restProps }) => ({
    className: classNames(value, className),
    ...restProps,
  });
  return withPatchedProps(setClassName);
};
