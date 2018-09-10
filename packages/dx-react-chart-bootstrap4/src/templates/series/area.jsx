import { Area as AreaBase, patchProps } from '@devexpress/dx-react-chart';
import classNames from 'classnames';

const setClassName = ({ className, ...restProps }) => ({
  ...restProps,
  className: classNames('dx-c-bs4-series-opacity', className),
});

export const Area = patchProps(AreaBase, setClassName);
