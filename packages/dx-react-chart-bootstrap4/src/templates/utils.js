import { patchProps } from '@devexpress/dx-react-chart';
import classNames from 'classnames';

export const withClassName = (value) => {
  const setClassName = ({ className, ...restProps }) => ({
    ...restProps,
    className: classNames(value, className),
  });
  return patchProps(setClassName);
};
