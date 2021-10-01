import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

export const ProgressBarCell = ({
  value, style, tabIndex, refObject, className,
}) => {
  const percent = value * 100;
  return (
    <td
      style={{ position: 'relative', ...style }}
      tabIndex={tabIndex}
      ref={refObject}
      className={className}
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
        <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip id="progress-bar-cell-tooltip">
              {percent.toFixed(1)}
              %
            </Tooltip>
)}
        >
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={percent.toFixed()}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${percent}%` }}
          >
            <span className="sr-only">
              {percent.toFixed()}
              %
            </span>
          </div>
        </OverlayTrigger>
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
