import { Table } from '@devexpress/dx-react-grid';
import * as React from 'react';
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

export const ProgressBarCell = ({ value } : Table.DataCellProps) => {
  const percent = value * 100;
  return (
    <td style={{ position: 'relative', verticalAlign: 'inherit' }}>
      <div
        className="progress"
        style={{
          backgroundColor: 'transparent',
          borderRadius: 0,
          boxShadow: 'none',
          margin: 0,
        }}
      >
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="progress-bar-cell-tooltip">
              {percent.toFixed(1)}%
            </Tooltip>
          }
        >
          <div
            aria-valuenow={parseInt(percent.toFixed(), 10)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
            title={`${percent.toFixed(1)}%`}
          />
        </OverlayTrigger>
      </div>
    </td>
  );
};
