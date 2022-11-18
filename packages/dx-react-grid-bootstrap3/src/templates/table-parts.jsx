import * as React from 'react';
import PropTypes from 'prop-types';

import { StyleContext } from './layout';
import { getStickyStyles } from '../utils/css-fallback-properties';

export const TableHead = ({ isFixed, style, ...restProps }) => (
  <thead
    {...restProps}
    style={{
      ...style,
      ...(isFixed && {
        ...getStickyStyles(React.useContext(StyleContext)),
        top: 0,
      }),
    }}
  />
);

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

export const TableFooter = ({ isFixed, ...restProps }) => (
  <tfoot
    {...restProps}
    style={{
      ...(isFixed && {
        ...getStickyStyles(React.useContext(StyleContext)),
        bottom: 0,
      }),
    }}
  />
);

TableFooter.propTypes = {
  isFixed: PropTypes.bool,
};

TableFooter.defaultProps = {
  isFixed: undefined,
};
