import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { BodyColorContext } from './layout';

export const Table = ({
  children, use, style, className, forwardedRef,
  ...restProps
}) => {
  const backgroundColor = React.useContext(BodyColorContext);

  return (
    <table
      ref={forwardedRef}
      className={classNames({
        'table dx-g-bs4-table': true,
        'dx-g-bs4-table-sticky': !!use,
        'dx-g-bs4-table-head': use === 'head',
        'dx-g-bs4-table-foot': use === 'foot',
      }, className)}
      {...restProps}
      style={{
        ...style,
        ...use ? {
          backgroundColor,
        } : null,
      }}
    >
      {children}
    </table>
  );
};

Table.propTypes = {
  use: PropTypes.oneOf(['head', 'foot']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Table.defaultProps = {
  className: undefined,
  use: undefined,
  style: null,
  forwardedRef: undefined,
};
