/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import * as PropTypes from 'prop-types';

export const ProgressBarCell = ({
  value, style, tabIndex, refObject, className,
}) => {
  const percent = value * 100;
  return (
    <td
      tabIndex={tabIndex}
      ref={refObject}
      className={className}
      style={{ position: 'relative', ...style, verticalAlign: 'inherit' }}
    >
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
  tabIndex: PropTypes.number,
  refObject: PropTypes.object,
  className: PropTypes.string,
};
ProgressBarCell.defaultProps = {
  style: {},
  tabIndex: undefined,
  refObject: undefined,
  className: undefined,
};
