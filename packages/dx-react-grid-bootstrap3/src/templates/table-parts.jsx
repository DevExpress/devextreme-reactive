import * as React from 'react';
import * as PropTypes from 'prop-types';

import { StyleContext } from './layout';

export const TableHead = ({ isFixed, style, ...restProps }) => {
  const { backgroundColor, stickyPosition } = React.useContext(StyleContext);
  return (
    <thead
      {...restProps}
      style={{
        ...style,
        ...(isFixed && {
          position: stickyPosition,
          top: 0,
          backgroundColor,
          zIndex: 500,
        }),
      }}
    />
  );
};
TableHead.propTypes = {
  style: PropTypes.object,
  isFixed: PropTypes.bool,
};

TableHead.defaultProps = {
  isFixed: undefined,
  style: undefined,
};

export const TableBody = ({ isFixed, ...restProps }) => <tbody {...restProps} />;
TableBody.propTypes = {
  isFixed: PropTypes.bool,
};

TableBody.defaultProps = {
  isFixed: undefined,
};

export const TableFooter = ({ isFixed, ...restProps }) => <tfoot {...restProps} />;
TableFooter.propTypes = {
  isFixed: PropTypes.bool,
};

TableFooter.defaultProps = {
  isFixed: undefined,
};
