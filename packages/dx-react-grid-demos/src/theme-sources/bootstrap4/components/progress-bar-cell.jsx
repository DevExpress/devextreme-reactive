/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import * as PropTypes from 'prop-types';

export const ProgressBarCell = ({ value, style }) => {
  const percent = value * 100;
  return (
    <td style={{ position: 'relative', ...style, verticalAlign: 'inherit' }}>
      <div
        className="progress"
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          margin: 0,
          borderRadius: 0,
        }}
      >
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={percent.toFixed()}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${percent}%` }}
          title={`${percent.toFixed(1)}%`}
        />
      </div>
    </td>
  );
};
ProgressBarCell.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
};
ProgressBarCell.defaultProps = {
  style: {},
};
