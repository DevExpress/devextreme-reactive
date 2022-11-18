import * as React from 'react';
import PropTypes from 'prop-types';

export const Content = ({
  column, children, align, style, ...restProps
}) => (
  <div
    style={{
      width: '100%',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      // eslint-disable-next-line no-nested-ternary
      justifyContent: align === 'center' ? 'center' : (align === 'right' ? 'flex-end' : 'flex-start'),
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

Content.propTypes = {
  column: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  align: PropTypes.string,
  style: PropTypes.object,
};

Content.defaultProps = {
  column: undefined,
  align: 'left',
  style: null,
  children: undefined,
};
