import { Path as PathBase, patchProps } from '@devexpress/dx-react-chart';
import classNames from 'classnames';

const setClassName = ({ className, ...restProps }) => ({
  ...restProps,
  className: classNames('dx-c-bs4-fill-none dx-c-bs4-series-path', className),
});

export const Path = patchProps(PathBase, setClassName);
