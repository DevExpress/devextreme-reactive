import React from 'react';

import {
    ProgressBar,
} from 'react-bootstrap';

export const ProgressBarCell = ({ value, style }) => (
  <td style={style}>
    <ProgressBar
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        margin: 0,
        borderRadius: 0,
      }}
      now={value}
      label={`${value}%`}
      srOnly
    />
  </td>
);
ProgressBarCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  style: React.PropTypes.object,
};
ProgressBarCell.defaultProps = {
  style: {},
};
