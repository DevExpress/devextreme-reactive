import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { StyleContext } from './layout';
import { getStickyPosition, getStickyStyles } from '../utils/css-fallback-properties';

export const Table = ({
  children, use, style, className, forwardedRef,
  ...restProps
}) => {
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
      ref={forwardedRef}
      className={classNames('table', className)}
      style={{
        tableLayout: 'fixed',
        borderCollapse: 'separate',
        marginBottom: 0,
        ...use ? {
          ...getStickyStyles({ stickyPosition, backgroundColor }),
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
};

Table.propTypes = {
  use: PropTypes.oneOf(['head', 'foot']),
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Table.defaultProps = {
  use: undefined,
  style: null,
  className: undefined,
  forwardedRef: undefined,
};
