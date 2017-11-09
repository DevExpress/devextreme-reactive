import React from 'react';
import PropTypes from 'prop-types';

import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

export const ProgressBarCell = ({ value, style }) => (
  <td style={{ position: 'relative', ...style }}>
    <div
      className="progress"
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        margin: 0,
        borderRadius: 0,
      }}
    >
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id="progress-bar-cell-tooltip">
            {value.toFixed(1)}%
          </Tooltip>
        }
      >
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={value.toFixed()}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${value}%` }}
        >
          <span className="sr-only">{value.toFixed()}%</span>
        </div>
      </OverlayTrigger>
    </div>
  </td>
);
ProgressBarCell.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
};
ProgressBarCell.defaultProps = {
  style: {},
};
