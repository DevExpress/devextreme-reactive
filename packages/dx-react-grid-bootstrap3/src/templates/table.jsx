import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { StyleContext } from './layout';
import { getStickyPosition } from '../utils/css-fallback-properties';

export const Table = React.forwardRef(({
  children, use, style, className, ...restProps
}, ref) => {
  const [stickyPosition, setStickyPosition] = React.useState(getStickyPosition());
  const { backgroundColor } = React.useContext(StyleContext);

  React.useEffect(() => {
    const realStickyPosition = getStickyPosition();

    if (stickyPosition !== realStickyPosition) {
      setStickyPosition(realStickyPosition);
    }
  }, []);

  return (
    <table
      ref={ref}
      className={classNames('table', className)}
      style={{
        tableLayout: 'fixed',
        borderCollapse: 'separate',
        marginBottom: 0,
        ...use ? {
          position: stickyPosition,
          zIndex: 500,
          background: backgroundColor,
        } : null,
        ...use === 'head' ? {
          top: 0,
        } : null,
        ...use === 'foot' ? {
          bottom: 0,
        } : null,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </table>
  );
});

Table.propTypes = {
  use: PropTypes.oneOf(['head', 'foot']),
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

Table.defaultProps = {
  use: undefined,
  style: null,
  className: undefined,
};
