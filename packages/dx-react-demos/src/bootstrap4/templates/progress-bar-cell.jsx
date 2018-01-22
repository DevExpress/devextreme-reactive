import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

export const ProgressBarCell = ({ value, style }) => {
  const percent = value * 100;
  // eslint-disable-next-line prefer-template
  const id = 'id' + (Math.random()).toString().substr(2, 8);
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
          id={id}
          role="progressbar"
          aria-valuenow={percent.toFixed()}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${percent}%` }}
        />
        <UncontrolledTooltip target={id} delay={0}>
          {percent.toFixed()}%
        </UncontrolledTooltip>
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
