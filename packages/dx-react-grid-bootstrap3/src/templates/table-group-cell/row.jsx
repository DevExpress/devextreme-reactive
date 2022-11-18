import * as React from 'react';
import PropTypes from 'prop-types';
import { TableRow as RowBase } from '../table-row';

export const Row = ({ style, ...props }) => (
  <RowBase
    {...props}
    style={{
      cursor: 'pointer',
      ...style,
    }}
  />
);

Row.propTypes = {
  style: PropTypes.object,
};

Row.defaultProps = {
  style: null,
};
